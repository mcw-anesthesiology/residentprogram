<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Controllers\Controller;


use DB;
use Log;
use Htmldom;
use Setting;

use Carbon\Carbon;

use App\Block;
use App\DirectoryEntry;
use App\Form;
use App\Milestone;
use App\User;

class ManageController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["viewForm"]]);
        $this->middleware("active", ["except" => ["viewForm"]]);
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
		$form = Form::with('milestoneQuestions', 'competencyQuestions')->findOrFail($request->input("form_id"));

		$formContents = json_encode($form->contents);
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
        $mentors = User::whereIn("type", ["faculty", "staff"])->get();

		$residents = User::where("type", "resident")->where("status", "active")->orderBy("last_name")->get();
		$residentGroupNames = [
			"intern" => "Intern",
			"ca-1" => "CA-1",
			"ca-2" => "CA-2",
			"ca-3" => "CA-3",
			"fellow" => "Fellow"
		];
        $residentGroups = [
            "Intern" => [],
            "CA-1" => [],
            "CA-2" => [],
            "CA-3" => [],
            "Fellow" => [],
            "Former Residents" => []
        ];
        foreach($residents as $resident){
            $residentGroups[$residentGroupNames[$resident->training_level]][] = $resident;
        }

        $formerResidents = User::formerResidents()->orderBy("last_name")->get();
        foreach($formerResidents as $resident){
            $residentGroups["Former Residents"][] = $resident;
        }

        $data = compact("mentors", 'residentGroups');
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

		$file = $request->file("schedule");
        $contents = $file->openFile('r')->fread($file->getSize());
        $html = new Htmldom($contents);
        $table = $html->find("table", 0);
        $th = $table->find("tr", 0)->find("th");

        for($i = 1; $i < count($th); $i++){
            $blocks[$i] = trim($th[$i]->innertext);
			$dates = substr($blocks[$i], strpos($blocks[$i], '(') + 1, -1);
			[ $blockStart[$i], $blockEnd[$i] ] = array_map(function($d) {
				return trim($d);
			}, explode('-', $dates));
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
                [ $startMonth, $startDay, $startYear ] = explode("/", $blockStart[$blockNumber]);
				if ($startYear < 1000)
					$startYear = 2000 + $startYear;
				$block->start_date = Carbon::create($startYear, $startMonth, $startDay);
            }
            if(isset($blockEnd[$blockNumber])){
                [ $endMonth, $endDay, $endYear ] = explode("/", $blockEnd[$blockNumber]);
				if ($endYear < 1000)
					$endYear = 2000 + $endYear;
				$block->end_date = Carbon::create($endYear, $endMonth, $endDay);
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

	public function watchedForms(Request $request){
		$groupNames = [
			"intern" => "Intern",
			"ca-1" => "CA-1",
			"ca-2" => "CA-2",
			"ca-3" => "CA-3",
			"fellow" => "Fellow",
			"faculty" => "Faculty",
			"staff" => "Staff",
			"admin" => "Administrator",
			'external' => 'External'
		];

		$userGroups = User::where("status", "active")->orderBy("last_name")
			->get()->groupBy(function($item) use ($groupNames){
				if($item["specific_type"] == "resident" && $item["training_level"])
					return $groupNames[$item["training_level"]];
				elseif($item["specific_type"])
					return $groupNames[$item["specific_type"]];
			})->sortBy(function($group, $name) use ($groupNames){
				return array_search($name, array_values($groupNames));
			});

        $formGroups = Form::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("title")
            ->get()->groupBy(function($form){
                if($form->type == "fellow")
                    return "Fellow";
                elseif($form->evaluator_type == "staff")
                    return "Staff";
                else
                    return "Resident";
            });

        $data = compact('formGroups', 'userGroups');

        return view("manage.watched-forms", $data);
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

    public function scheduledRequests() {
        return view('manage.scheduled-requests');
    }

    public function newsItems() {
        return view('manage.news-items');
    }

    public function highlightedQuestions() {
        return view('manage.highlighted-questions');
    }

	public function programs() {
		return view('manage.programs');
	}

	public function beyondMilestones() {
		return view('manage.beyond-milestones');
	}

	public function users() {
		return view('manage.users');
	}

	public function userGroups() {
		return view('manage.user-groups');
	}
}
