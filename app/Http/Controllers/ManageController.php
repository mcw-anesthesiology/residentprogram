<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use DOMDocument;

use Auth;
use DB;
use Debugbar;
use Log;
use Htmldom;
use Mail;
use Setting;
use Storage;

use Carbon\Carbon;

use App\Alum;
use App\Block;
use App\BlockAssignment;
use App\CaseLog;
use App\CaseLogDetailsSchema;
use App\Competency;
use App\CompetencyQuestion;
use App\DirectoryEntry;
use App\Evaluation;
use App\Form;
use App\Mentorship;
use App\Milestone;
use App\MilestoneLevel;
use App\MilestoneQuestion;
use App\User;
use App\WatchedForm;

class ManageController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["viewForm"]]); // FIXME
    }

    public function settings(){
        $settings = Setting::all();
        return view("manage.settings", $settings);
    }

    public function saveSettings(Request $request){
        Setting::set("facultyEvalThreshold", $request->input("required_faculty_evals"));
        Setting::save();
        return redirect("dashboard");
    }

    public function evaluations(){
        return view("manage/evaluations");
    }

    public function archive(Request $request){
        $evals = Evaluation::where("evaluation_date", "<", $request->input("archive_date"))->where("status", "complete")->get();
        foreach($evals as $eval){
            $eval->status = "archived";
            $eval->archive_date = Carbon::now();
            $eval->save();
        }
        return redirect("manage/evaluations");
    }

    public function accounts(){
        return view("manage.accounts");
    }

	public function advanceAccounts(){
		return view("manage.advance-accounts");
	}

    public function forms(){
        return view("manage.forms");
    }

    public function formBuilder(){
        return view("manage.forms.builder");
    }

	public function copyAndEditForm(Request $request){
		$MULTIPLE_CHOICE_QUESTION_TYPES = config('constants.MULTIPLE_CHOICE_QUESTION_TYPES');

		$form = Form::with('milestoneQuestions', 'competencyQuestions')->findOrFail($request->input("form_id"));
		$formXml = Storage::get($form->xml_path);
		$formDom = new DOMDocument('1.0', 'utf-8');
		$formDom->preserveWhiteSpace = false;
		$formDom->loadXML($formXml);
		$formContents = [];
		$formContents['title'] = $formDom->getElementsByTagName('title')->item(0)->textContent;
		$formContents['items'] = [];
		$root = $formDom->firstChild;
		foreach($root->childNodes as $childNode){
			if(in_array($childNode->nodeName, ['question', 'instruction'])){
				$item = [];
				$item['type'] = $childNode->nodeName;

				if($item['type'] == 'question'){
					$item['id'] = $childNode->getAttribute('name');
					// Remove `q` from beginning of id
					$item['questionIdNum'] = intval(substr($item['id'], 1));
					$item['questionType'] = $childNode->getAttribute('type');
					$item['weight'] = $childNode->getAttribute('weight');
					$item['text'] = $childNode->getElementsByTagName('text')->item(0)->textContent;
					$item['required'] = $childNode->hasAttribute('required');
					$item['milestones'] = $form->milestoneQuestions->where('question_id', $item['id'])->pluck('milestone_id');
					// Only get one competency currently
					$item['competencies'] = $form->competencyQuestions->where('question_id', $item['id'])->pluck('competency_id')->first();


					if(in_array($item['questionType'], $MULTIPLE_CHOICE_QUESTION_TYPES)){
						$item['options'] = [];
						foreach($childNode->getElementsByTagName('option') as $optionNode){
							$option = [];

							$option['text'] = $optionNode->textContent;
							$option['value'] = $optionNode->getAttribute('value');
							$option['description'] = $optionNode->getAttribute('description');

							$item['options'][] = $option;
						}
					}
				}
				elseif($item['type'] == 'instruction'){
					$item['text'] = $childNode->textContent;
				}

				$formContents['items'][] = $item;
			}
		}

		$formContents = json_encode($formContents);
		$data = compact("formContents");
		return view("manage.forms.builder", $data);
	}

    public function viewForm($id){
        $form = Form::with('milestoneQuestions.milestone', 'competencyQuestions.competency')->find($id);
        $data = compact("form");
        return view("manage.forms.view", $data);
    }

    public function milestonesCompetencies(){
		$milestoneTypes = [];
		$milestoneTrainingLevels = [];
		Milestone::all()->each(function($milestone) use ($milestoneTypes){
			if(!empty($milestone->type))
				$milestoneTypes[$milestone->type] = true;
			if(!empty($milestone->training_level))
				$milestoneTrainingLevels[$milestone->training_level] = true;
		});
		$milestoneTypes = array_keys($milestoneTypes);
		$milestoneTrainingLevels = array_keys($milestoneTrainingLevels);

		$data = compact("milestoneTypes", "milestoneTrainingLevels");
        return view("manage.milestones-competencies", $data);
    }

    public function mentors(){
        $faculty = User::where("type", "faculty")->get();
        $data = compact("faculty");
        return view("manage.mentors", $data);
    }

	public function blocks(){
		return view("manage.blocks");
	}

	public function getBlocks(Request $request){
		$results["data"] = [];
		$blocks = Block::where("start_date", "<=", Carbon::now());
		foreach($blocks as $block){
			$result = [];
			$result[] = $block->year;
			$result[] = $block->block_number;
			$result[] = $block->block_name;
			$result[] = $block->start_date;
			$result[] = $block->end_date;
            $results["data"][] = $result;
		}
        return response()->json($results);
	}

    public function blockAssignments(){
        $years = DB::table("blocks")->distinct()->select("year")->get();
        $data = compact("years");

        return view("manage.block-assignments", $data);
    }

    public function blockAssignmentsTable(Request $request){
        $blocks = Block::where("year", $request->input("year"))->orderBy("block_number")->get();
        $data = compact("blocks");

        return view("manage.block-assignments-table", $data);
    }

    public function getBlockAssignments(Request $request){
        $data["data"] = [];
        $blockUsers = User::has("blockAssignments")->with("blockAssignments.block")->get();

        $numBlocks = Block::where("year", $request->input("year"))->orderBy("block_number")->count();
        $lastBlock = 0;
        foreach($blockUsers as $blockUser){
			try{
	            $row = array_fill(0, $numBlocks+1, "");
	            $row[0] = $blockUser->last_name.", ".$blockUser->first_name;
	            foreach($blockUser->blockAssignments->where("block.year", $request->input("year"))->sortBy("block.block_number") as $assignment){
	                if($row[$assignment->block->block_number] != "")
	                    $row[$assignment->block->block_number] .= "<br />".$assignment->location;
	                else
	                    $row[$assignment->block->block_number] = $assignment->location;
	            }

	            $data["data"][] = $row;
			}
			catch(\Exception $e){
				Log::error("Problem with block assignment: ".$e);
			}
        }
        return response()->json($data);
    }

    public function saveBlockAssignments(Request $request){
        $users = User::where("status", "active")->get();
        $now = Carbon::now()->toDateTimeString();
        if(!$request->hasFile("schedule") || !$request->file("schedule")->isValid() || !$request->has("year"))
            return redirect("manage/block-assignments");

        foreach($users as $user){
            $usernames[$user->id] = preg_replace("/\W/", "", strtolower($user->last_name.",".substr($user->first_name, 0, 1)));
        }

        $html = new Htmldom($request->file("schedule"));
        $table = $html->find("table", 0);
        $th = $table->find("tr", 0)->find("th");

        for($i = 1; $i < count($th); $i++){
            $blocks[$i] = trim($th[$i]->innertext);
            preg_match("/\((\d\d\/\d\d\/\d\d\d\d) \- (\d\d\/\d\d\/\d\d\d\d)\)/", $blocks[$i], $matches);
            if(count($matches) == 3){
                $blockStart[$i] = $matches[1];
                $blockEnd[$i] = $matches[2];
            }
        }

        $hits = 0;
        $misses = 0;
        $trs = $table->find("tr");

        for($i = 1; $i < count($trs); $i++){
        	if($trs[$i]->style == "background-color:LightSteelBlue;"
                || $trs[$i]->class == "datagridheaderstyle")
        		continue;

        	$tds = $trs[$i]->children();
        	$user = preg_replace("/\W/", "", strtolower($tds[0]->plaintext));

        	for($j = 1; $j < count($tds); $j++){
        		$entries = $tds[$j]->find("td");
        		foreach($entries as $entry){
        			$location = trim(preg_replace("/\(.*\)/", "", $entry->plaintext));
        			if(in_array($user, $usernames)){
        				$user_id = array_search($user, $usernames);
        				$assignments[$j][$user_id][] = $location;
        				$hits++;
        			} else{
        				$misses++;
        			}
        		}
        	}
        }

        $year = $request->input("year");
        if($year == "new")
            $year = $request->input("new_year");

        foreach($blocks as $blockNumber => $blockName){
            if($blockName == "")
                continue;

            $block = Block::firstOrNew(["year" => $year, "block_number" => $blockNumber]);

            $block->block_name = $blockName;

            if(isset($blockStart[$blockNumber])){
                $nums = explode("/", $blockStart[$blockNumber]);
                $block->start_date = $nums[2]."-".$nums[0]."-".$nums[1];
            }
            if(isset($blockEnd[$blockNumber])){
                $nums = explode("/", $blockEnd[$blockNumber]);
                $block->end_date = $nums[2]."-".$nums[0]."-".$nums[1];
            }
            $block->save();
            $blockIds[$blockNumber] = $block->id;
        }
        DB::delete("delete block_assignments from block_assignments join blocks on blocks.id=block_assignments.block_id where year=?", [$year]);
        $pdo = DB::getPdo();
        $stmt = $pdo->prepare("insert into block_assignments(block_id, user_id, location, created_at, updated_at) values(?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $block_id);
        $stmt->bindParam(2, $user_id);
        $stmt->bindParam(3, $location);
        $stmt->bindParam(4, $now);
        $stmt->bindParam(5, $now);

        if(empty($assignments))
            return back()->with("error", "No matching users found");

        foreach($assignments as $blockNumber => $blockAssignments){
            $blockName = $blocks[$blockNumber];
            foreach($blockAssignments as $user_id => $userAssignments){
                foreach($userAssignments as $location){
                    $block_id = $blockIds[$blockNumber];
                    $stmt->execute();
                }
            }
        }
        return redirect("manage/block-assignments");
    }

    public function editPagerDirectoryEntry(Request $request){
        try{
            $entry = DirectoryEntry::findOrFail($request->input("id"));
            $entry->first_name = $request->input("first_name");
            $entry->last_name = $request->input("last_name");
            $entry->pager = $request->input("pager");
            $entry->save();
            return "success";
        } catch (ModelNotFoundException $e){
            return "Entry not found.";
        } catch (\Exception $e){
            return "Problem editing entry";
        }
    }

    public function deletePagerDirectoryEntry(Request $request){
        return DirectoryEntry::destroy($request->input("id")) > 0 ? "success" : "No entries deleted";
    }

    public function alumni(Request $request){
        return view("manage.alumni");
    }

	public function importAlumni(Request $request){
		return view("manage.import-alumni");
	}

	public function watchedForms(Request $request){
        return view("manage.watched-forms");
    }

	public function userFeatures(Request $request){
		$featureUsers = User::where("status", "active")->orderBy("last_name", "asc")
			->orderBy("first_name", "asc")->get()->groupBy(function($user){
				if($user->type == "resident")
					return $user->training_level;
				return $user->type;
			});
		$userTypeLabels = [
			"intern" => "Intern",
			"ca-1" => "CA-1",
			"ca-2" => "CA-2",
			"ca-3" => "CA-3",
			"fellow" => "Fellow",
			"faculty" => "Faculty"
		];

		$userTypes = [
			"resident" => "Trainee",
			"faculty" => "Faculty"
		];
		$residentTrainingLevels = [
			"intern" => "Intern",
			"ca-1" => "CA-1",
			"ca-2" => "CA-2",
			"ca-3" => "CA-3",
			"fellow" => "Fellow"
		];
		$data = compact("featureUsers", "userTypeLabels", "userTypes", "residentTrainingLevels");

		return view("manage.user-features", $data);
	}

	public function caseLogs(Request $request){
		$schemas = CaseLogDetailsSchema::all()->groupBy("details_type")
			->sortByDesc("version")->transform(function($typeSchemas){
				return $typeSchemas->keyBy("version");
			});
		$newVersions = $schemas->map(function($schemas){
			return $schemas->max("version") + 1;
		});

		$data = compact("schemas", "newVersions");

		return view("manage.case-log.all", $data);
	}
}
