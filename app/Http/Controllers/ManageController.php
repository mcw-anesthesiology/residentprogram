<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use DOMDocument;
use SimpleXmlElement;

use Auth;
use DB;
use Debugbar;
use Log;
use Htmldom;
use Mail;
use Setting;

use Carbon\Carbon;

use App\Alum;
use App\Block;
use App\BlockAssignment;
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

    public function forms(){
        return view("manage.forms");
    }

    public function getForms(Request $request, $type){
        $results["data"] = [];
        $forms = Form::where("type", $type)->get();
        foreach($forms as $form){
			try{
	            $result = [];
	            $result[] = $form->title;
				$result[] = ucfirst($form->evaluator_type);
	            $result[] = (string)$form->created_at;
	            if($form->status == "inactive"){
	                $buttonClass = "enableEval";
	                $buttonType = "success";
	                $glyphicon = "ok";
	                $buttonText = "Enable";
	                $badge = "disabled";
	            } else{
	                $buttonClass = "disableEval";
	                $buttonType = "danger";
	                $glyphicon = "remove";
	                $buttonText = "Disable";
	                $badge = "complete";
	            }
				switch($form->visibility){
					case "visible":
						$eyeType = "open";
						$visBtnType = "btn-info";
						break;
					case "anonymous":
						$eyeType = "close";
						$visBtnType = "";
						break;
					case "hidden":
						$eyeType = "close";
						$visBtnType = "btn-default";
						break;
				}
	            $result[] = "<span class='status'><span class='badge badge-{$badge}'>" .
					ucfirst($form->status) . "</span></span>";
				$result[] = "<button type='button' " .
					"class='visibility visibility-{$form->visibility} btn {$visBtnType} btn-xs' " .
					"data-id='{$form->id}'>" . ucfirst($form->visibility) .
					" <span class='glyphicon glyphicon-eye-{$eyeType}'></span></button>";
	            $result[] = "<a href='/manage/forms/{$form->id}'>View Form</a>";
	            $actionField = "<button type='button' class='{$buttonClass} btn btn-{$buttonType} btn-xs' data-id='{$form->id}'><span class='glyphicon glyphicon-{$glyphicon}'></span> {$buttonText}</button>";
				$actionField .= " <button type='button' class='edit-form-button btn btn-info btn-xs' data-id='{$form->id}' data-title='{$form->title}' data-type='{$form->type}' data-visibility='{$form->visibility}' data-toggle='modal' data-target='#edit-form-modal'><span class='glyphicon glyphicon-pencil'></span> Edit</button>";
				$result[] = $actionField;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with form: ".$e);
			}
        }
        return response()->json($results);
    }

    public function formBuilder(){
        $milestones = Milestone::all();
        $competencies = Competency::all();
        $data = compact("milestones", "competencies");
        return view("manage.forms.builder", $data);
    }

    public function viewForm($id){
        $form = Form::find($id);
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

    public function getMilestones(){
        $results["data"] = [];
        $milestones = Milestone::all();
        foreach($milestones as $milestone){
			try{
	            $result = [];
	            $result[] = $milestone->title;
				$result[] = $milestone->type;
				$result[] = $milestone->training_level;
	            $result[] = $milestone->description;
	            $action = "<button id='edit-milestone-button-{$milestone->id}' class='editMilestone btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editMS-modal' data-id='{$milestone->id}'><span class='glyphicon glyphicon-edit'></span> Edit</button> ";
                $action .= "<button class='btn btn-info btn-xs edit-milestone-levels' data-milestone-id='{$milestone->id}' data-milestone-title='{$milestone->title}'><span class='glyphicon glyphicon-th-list'></span> Levels</button> ";
	            if($milestone->forms->count() === 0)
	                $action .= "<button id='delete-milestone-button-{$milestone->id}' class='deleteMilestone btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteMS-modal' data-id='{$milestone->id}'><span class='glyphicon glyphicon-remove'></span> Delete</button> ";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with milestone: ".$e);
			}
        }
        return response()->json($results);
    }

	public function getMilestone($id, $field = null){
		$milestone = Milestone::find($id);
        if($field == "levels")
            return response()->json($milestone->levels);
		return response()->json($milestone);
	}

    public function getCompetencies(){
        $results["data"] = [];
        $competencies = Competency::all();
        foreach($competencies as $competency){
			try{
	            $result = [];
	            $result[] = $competency->title;
	            $result[] = $competency->description;
	            $action = "<button id='edit-competency-button-{$competency->id}' class='editCompetency btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editC-modal' data-id='{$competency->id}'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
	            if($competency->forms->count() === 0)
	                $action .= "<button id='delete-competency-button-{$competency->id}' class='deleteCompetency btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteC-modal' data-id='{$competency->id}'><span class='glyphicon glyphicon-remove'></span> Delete</button>";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with competency: ".$e);
			}
        }
        return response()->json($results);
    }

    public function milestone(Request $request, $action){
        switch($action){
            case "add":
                $milestone = new Milestone();
                $milestone->title = $request->input("title");
				$milestone->type = $request->input("type");
				$milestone->training_level = $request->input("training_level");
                $milestone->description = $request->input("description");
                $milestone->save();
                break;
            case "edit":
                $milestone = Milestone::find($request->input("id"));
                $milestone->title = $request->input("title");
				$milestone->type = $request->input("type");
				$milestone->training_level = $request->input("training_level");
                $milestone->description = $request->input("description");
                $milestone->save();
                break;
            case "delete":
                Milestone::destroy($request->input("id"));
                break;
			case "levels":
                $milestoneId = $request->input("id");
				$milestone = Milestone::find($milestoneId);
				$levels = $request->input("levels");
				foreach($levels as $levelNum => $level){
					$milestoneLevel = MilestoneLevel::firstOrNew([
                        "milestone_id" => $milestoneId,
                        "level_number" => $levelNum + 1
                    ]);
					$milestoneLevel->milestone_id = $request->input("id");
					$milestoneLevel->level_number = $levelNum + 1;
					$milestoneLevel->name = $level["name"];
					$milestoneLevel->description = $level["description"];
					$milestoneLevel->save();
				}
                MilestoneLevel::where("milestone_id", $milestoneId)
                    ->where("level_number", ">", count($levels))
                    ->delete();
				break;
            default:
                return redirect("manage/milestones-competencies");
                break;
        }
		if($request->has("ajax") && !empty($request->input("ajax")))
			return "true";
		else
        	return redirect("manage/milestones-competencies");
    }

    public function competency(Request $request, $action){
        switch($action){
            case "add":
                $competency = new Competency();
                $competency->title = $request->input("title");
                $competency->description = $request->input("description");
                $competency->save();
                break;
            case "edit":
                $competency = Competency::find($request->input("id"));
                $competency->title = $request->input("title");
                $competency->description = $request->input("description");
                $competency->save();
                break;
            case "delete":
                Competency::destroy($request->input("id"));
                break;
            default:
                return redirect("manage/milestones-competencies");
                break;
        }
		if($request->has("ajax") && !empty($request->input("ajax")))
			return "true";
		else
        	return redirect("manage/milestones-competencies");
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

    public function getAlumni(Request $request){
        $results["data"] = [];
        $alumni = Alum::all();
        foreach($alumni as $alum){
            try {
                $result = [];
                $result[] = $alum->full_name;
                $result[] = $alum->email;
                if($alum->graduation_date)
                    $result[] = $alum->graduation_date->format("Y");
                else
                    $result[] = "";

                $actionButtons = "";

                $buttonClass = "disabled";
                $buttonExtra = "disabled";
                $sendLinkClass = "";
                $emailClass = "";
                if($alum->do_not_contact){
                    $buttonTitle = "Unsubscribed";
                } elseif(!$alum->email) {
                    $buttonTitle = "No email";
                } else {
                    $buttonClass = "";
                    $buttonExtra = "";
                    $sendLinkClass = "alumni-send-link-button";
                    $emailClass = "alumni-email-button";
                    $buttonExtra = "data-id='{$alum->id}' data-email='{$alum->email}'";
                    $buttonTitle = "";
                }
                $actionButtons .= "<button type='button' class='btn btn-xs btn-info {$buttonClass} {$sendLinkClass}' title='{$buttonTitle}' {$buttonExtra}><span class='glyphicon glyphicon-send'></span> Send info update link</button> ";
                $actionButtons .= "<button type='button' class='btn btn-xs btn-info {$buttonClass} {$emailClass}' title='{$buttonTitle}' {$buttonExtra}><span class='glyphicon glyphicon-send'></span> Email</button> ";




                $result[] = $actionButtons;

                $results["data"][] = $result;
            } catch(\Exception $e){
                Log::error("Problem with alumn: " . $e);
            }
        }
        return response()->json($results);
    }

    public function saveAlumni(Request $request, $action){
        try {
            $isAjax = ($request->has("ajax") && $request->input("ajax"));
            $successful = false;
            switch($action){
                case "add":
                    $alum = Alum::create($request->all());
                    if($alum->email)
                    $alum->sendEmail();
                    break;
                case "send-link":
                    $alum = Alum::findOrFail($request->input("id"));
                    $alum->sendEmail();
                    break;
                case "send-all-links":
                    $successfulEmails = [];
                    $failedEmails = [];
                    foreach(Alum::all() as $alum){
                        try {
                            $alum->sendEmail();
                            $successfulEmails[] = $alum;
                        } catch(\Swift_TransportException $e){
                            $failedEmails[] = $alum;
                        }
                    }

                    $responseInfo = [];
                    if(count($failedEmails) > 0){
                        $error = "Failed sending emails to ";
                        foreach($failedEmails as $failedAlum){
                            $error .= $failedAlum->email . ", ";
                        }
                        $error = substr($error, -2); // Remove final ', '
                        $responseInfo["error"] = $error;
                    }
                    if(count($successfulEmails) > 0){
                        $success = "Successfully sent emails to ";
                        foreach($successfulEmails as $successfulAlum){
                            $success .= $successfulAlum->email . ", ";
                        }
                        $success = substr($success, -2); // Remove final ', '
                        $responseInfo["success"] = $success;
                    }
                    $responseInfo["info"] = count($successfulEmails) .
                        " emails sent successfully. " . count($failedEmails) .
                        " failed attempts.";

                    if($isAjax){
                        return $responseInfo;
                    }
                    else{
                        return back()->with($responseInfo);
                    }
                    break;
                case "send-message": // TODO
                case "send-all-message": // TODO
                default:
                    throw new \InvalidArgumentException("Unsupported alumni action");
                    break;
            }
            $successful = true;
        } catch (ModelNotFoundException $e) {
            Log::error("No alum found: " . $e);
            $message = "The requested alum was not found. If this continues, " .
                "please let me know at " . config("app.admin_email");
        } catch(\Swift_TransportException $e){
            Log::error("Problem sending alumni email: " . $e);
            $message = "There was a problem sending the alumni email.";
            if($action == "add")
                $message .= " The record was still created. Please do not create a new record, instead try modifying the record and resending the email.";
        } catch(\InvalidArgumentException $e){
            $message = $e->getMessage();
        } catch (\Exception $e) {
            Log::error("Problem with saveAlumni: " . $e);
            $message = "There was a problem saving the alum. If this continues, " .
                "please let me know at " . config("app.admin_email");
        }

        if($successful){
            if($isAjax)
                return "successful";
            else
                return back();
        }
        else{
            if($isAjax)
                return $message;
            else
                return back()->with("error", $message);
        }
    }

	public function watchedForms(Request $request){
        return view("manage.watched-forms");
    }
}
