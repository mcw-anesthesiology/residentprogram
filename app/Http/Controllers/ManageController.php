<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use DOMDocument;
use SimpleXmlElement;

use Auth;
use DB;
use Debugbar;
use Log;
use Mail;
use Setting;

use Carbon\Carbon;

use App\Block;
use App\BlockAssignment;
use App\Competency;
use App\CompetencyQuestion;
use App\Evaluation;
use App\Form;
use App\Mentorship;
use App\Milestone;
use App\MilestoneQuestion;
use App\User;

class ManageController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin");
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

    public function getEvaluations(){
        $results["data"] = [];
        $evaluations = Evaluation::with("subject", "evaluator", "requestor", "form")->get();
        foreach($evaluations as $eval){
			try{
	            $result = [];
	            $result[] = "<a href='/evaluation/{$eval->id}'>{$eval->id}</a>";
	            $result[] = $eval->subject->full_name;
	            $result[] = $eval->evaluator->full_name;
	            $result[] = $eval->requestor->full_name;
	            $result[] = $eval->form->title;
	            $result[] = (string)$eval->request_date;
	            if($eval->complete_date)
	                $result[] = (string)$eval->complete_date;
	            else
	                $result[] = "";

	            if($eval->status == "complete")
	                $badge = "complete";
	            elseif($eval->status == "pending")
	                $badge = "pending";
	            else
	                $badge = "disabled";

	            $result[] = "<span class='status'><span class='badge badge-{$badge}'>{$eval->status}</span></span>";
	            if($eval->status == "disabled"){
	                $buttonClass = "enableEval";
	                $buttonType = "success";
	                $glyphicon = "ok";
	                $buttonText = "Enable";
	            }
	            else{
	                $buttonClass = "disableEval";
	                $buttonType = "danger";
	                $glyphicon = "remove";
	                $buttonText = "Disable";
	            }
	            $action = "<span><button class='{$buttonClass} btn btn-{$buttonType} btn-xs' data-id='{$eval->id}'><span class='glyphicon glyphicon-{$glyphicon}'></span> {$buttonText}</button></span>";
	            $action .= "<span class='cancel'>";
	            if($eval->status == "pending"){
	                $action .= "<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='{$eval->id}'><span class='glyphicon glyphicon-remove'></span> Cancel</button>";
	            }
	            $action .= "</span>";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with evaluation: ".$e);
			}
        }
        return json_encode($results);
    }

    public function editEvaluation(Request $request, $id){
        $eval = Evaluation::find($id);
        if($request->input("action")){
            switch($request->input("action")){
                case "disable":
                    $eval->status = "disabled";
                    break;
                case "enable":
                    if($eval->complete_date)
                        $eval->status = "complete";
                    else
                        $eval->status = "pending";
                    break;
                case "cancel":
                    $eval->status = "canceled by admin";
                    break;
                default:
                    return "false";
                    break;
            }
            $eval->save();
            return $eval->status;
        }
    }

    public function archive(Request $request){
        $evals = Evaluation::where("complete_date", "<", $request->input("archive_date"))->where("status", "complete")->get();
        foreach($evals as $eval){
            $eval->status = "archived";
            $eval->archive_date = Carbon::now();
            $eval->save();
        }
        return redirect("manage.evaluations");
    }

    public function accounts(){
        return view("manage.accounts");
    }

    public function account(Request $request, $action){
        switch($action){
            case "add":
                if($request->input("password") != $request->input("password2"))
                    return redirect("manage/accounts")->with("error", "Passwords do not match for new user");
                elseif(!filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
                    return redirect("manage/accounts")->with("error", "Email appears invalid");
                elseif($request->hasFile("photo") && !$request->file("photo")->isValid())
                    return redirect("manage/accounts")->with("error", "Problem with photo");
                $user = new User();
                $user->username = $request->input("username");
                $user->email = $request->input("email");
                $user->password = bcrypt($request->input("password"));
                $user->first_name = $request->input("firstName");
                $user->last_name = $request->input("lastName");
                $user->status = "active";
                $user->reminder_frequency = "weekly";
                $user->notifications = "no";
                if($request->hasFile("photo") && $request->file("photo")->isValid()){
                    $photoName = uniqid().".".$request->file("photo")->getExtension();
                    $request->file("photo")->move(storage_path("app/photos/"), $photoName);
                    $user->photo_path = "photos/".$photoName;
                }
                if($request->input("accountType") == "resident"){
                    $user->type = $request->input("accountType");
                    $user->training_level = $request->input("trainingLevel");
                } else if($request->input("accountType") == "fellow"){
                    $user->type = "resident";
                    $user->training_level = "fellow";
                } else{
                    $user->type = $request->input("accountType");
                }
                $user->save();
                $data = [];
                $data["firstName"] = $user->first_name;
                $data["lastName"] = $user->last_name;
                $data["username"] = $user->username;
				if($user->type == "resident" && $user->training_level == "fellow")
					$data["userType"] = "fellow";
				else
					$data["userType"] = $user->type;
                $data["password"] = $request->input("password");
                try{
                    Mail::send("emails.new-account", $data, function($message) use ($user){
                        $message->from("admin@residentprogram.com", "ResidentProgram");
                        $message->to($user->email);
                        $message->replyTo(env("ADMIN_EMAIL"));
                        $message->subject("Welcome!");
                    });
                }
                catch(\Exception $e){
					Log::error("Problem sending email: ".$e);
                }
                return redirect("manage/accounts");
                break;
            case "edit":
                if(!filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
                    return redirect("manage/accounts")->with("error", "Email appears invalid");
                if($request->hasFile("photo") && !$request->file("photo")->isValid())
                    return redirect("manage/accounts")->with("error", "Problem with photo");
                $user = User::find($request->input("id"));
                $user->email = $request->input("email");
                $user->first_name = $request->input("firstName");
                $user->last_name = $request->input("lastName");
                if($user->type == "resident"){
                    $user->training_level = $request->input("trainingLevel");
                }
                if($request->hasFile("photo") && $request->file("photo")->isValid()){
                    $photoName = uniqid().".".$request->file("photo")->getExtension();
                    $request->file("photo")->move(storage_path("app/photos/"), $photoName);
                    unlink(storage_path("app/".$user->photo_path));
                    $user->photo_path = "photos/".$photoName;
                }
                if($user->type == "resident")
                    $user->training_level = $request->input("trainingLevel");

                $user->save();
                return redirect("manage/accounts");
                break;
            case "enable":
                $user = User::find($request->input("id"));
                $user->status = "active";
                $user->save();
                return "true";
                break;
            case "disable":
                $user = User::find($request->input("id"));
                $user->status = "inactive";
                $user->save();
                return "true";
                break;
            case "password":
                if($request->input("newPassword") != $request->input("newPassword2"))
                    return redirect("manage/accounts")->with("error", "New passwords do not match");
                elseif(!password_verify($request->input("adminPassword"), Auth::user()->password))
                    return redirect("manage/accounts")->with("error", "Administrator password verification failed");
                else{
                    $user = User::find($request->input("id"));
                    $user->password = bcrypt($request->input("newPassword"));
                    $user->save();
                }
                return redirect("manage/accounts");
                break;
            case "to-faculty":
                $user = User::find($request->input("id"));
                if($user->type == "resident"){
                    $user->type = "faculty";
                    $user->save();
                    return redirect("manage/accounts");
                }
                else
                    return redirect("manage/accounts")->with("error", "User not resident");
                break;
            default:
                return redirect("manage/accounts");
                break;
        }
    }

    public function getAccounts($type){
        $results["data"] = [];
        if($type == "fellow")
            $users = User::where("type", "resident")->where("training_level", "fellow")->get();
        elseif($type == "resident")
            $users = User::where("type", "resident")->where("training_level", "!=", "fellow")->get();
        else
            $users = User::where("type", $type)->get();
        foreach($users as $user){
			try{
	            $result = [];
	            $result[] = $user->full_name;
	            $result[] = $user->username;
	            $result[] = $user->email;
	            if($type == "resident")
	                $result[] = $user->training_level;
	            $result[] = $user->status;
	            $action = "<button class='editUser btn btn-info btn-xs' data-toggle='modal' data-target='.bs-edit-modal' data-type='{$type}' data-id='{$user->id}' data-username='{$user->username}' data-email='{$user->email}' data-first='{$user->first_name}' data-last='{$user->last_name}' data-trainingLevel='{$user->training_level}' data-photo='{$user->photo_path}' id='editBtn'><span class='glyphicon glyphicon-edit'></span> Edit</button> ";
				$action .= "<button class='editPassword btn btn-info btn-xs' data-toggle='modal' data-target='.bs-edit-password-modal' data-id='{$user->id}' id='editPasswordBtn'><span class='glyphicon glyphicon-edit'></span> Password</button> ";
	            // if($type == "resident" || $type == "fellow")
				//          $action .= "<button class='residentToFaculty btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-resident-to-faculty-modal-sm' data-id='{$user->id}' data-name='{$user->first_name} {$user->last_name}' id='residentToFacultyBtn'><span class='glyphicon glyphicon-edit'></span> Change to Faculty</button>";
	            if($user->status == "inactive"){
	                $buttonClass = "enableUser";
	                $buttonType = "success";
	                $glyphicon = "ok";
	                $buttonText = "Enable";
	            } else{
	                $buttonClass = "disableUser";
	                $buttonType = "danger";
	                $glyphicon = "remove";
	                $buttonText = "Disable";
	            }
				$action .= "<span class='enableDisableButton'><button class='{$buttonClass} btn btn-{$buttonType} btn-xs' data-id='{$user->id}'><span class='glyphicon glyphicon-{$glyphicon}'></span> {$buttonText}</button></span>";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with account: ".$e);
			}
        }
        return json_encode($results);
    }

    public function forms(){
        return view("manage.forms.all");
    }

    public function getForms(Request $request, $type){
        $results["data"] = [];
        $forms = Form::where("type", $type)->get();
        foreach($forms as $form){
			try{
	            $result = [];
	            $result[] = $form->title;
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
	            $result[] = "<span class='status'><span class='badge badge-{$badge}'>{$form->status}</span></span>";
	            $result[] = "<a href='/manage/forms/{$form->id}'>View Form</a>";
	            $result[] = "<button type='button' class='{$buttonClass} btn btn-{$buttonType} btn-xs' data-id='{$form->id}'><span class='glyphicon glyphicon-{$glyphicon}'></span> {$buttonText}</button>";
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with form: ".$e);
			}
        }
        return json_encode($results);
    }

    public function formBuilder(){
        $milestones = Milestone::all();
        $competencies = Competency::all();
        $data = compact("milestones", "competencies");
        return view("manage.forms.builder", $data);
    }

    public function addForm(Request $request){
        $formLocation = "evaluation_forms/".uniqid().".xml"; //creates new unique filename for the form

    	$form = new SimpleXmlElement("<form></form>");

    	$questionName = "";

        $input = $request->all();

    	foreach ($input as $key => $value){
            if($key == "_token")
                continue;
            if($key == "form_type"){
                $formType = $value;
                continue;
            }
            if($key == "formTitle"){
    			$form->addChild("title", htmlspecialchars($value));
    			$formTitle = $value;
                continue;
    		}


    		$questionName = substr($key, 0, strpos($key, ":"));
    		if(strpos($key, "name") !== false){
    			$question = $form->addChild("question");
    			$question->addAttribute("name", $questionName);
    			$question->addChild("text", htmlspecialchars($value));
    		}
    		else if(strpos($key, "type") !== false){
    			$question->addAttribute("type", $value);
    		}
    		else if(strpos($key, "required") !== false){
    			if($value == "required")
    				$question->addAttribute("required", "required");
    		}
    		else if(strpos($key, "milestone") !== false){
    			if(strpos($key, "milestone2") !== false){
    				if($value != -1 && isset($milestones[$questionName]) && $milestones[$questionName] !== $value) //don't add second milestone if it isn't set or if it's the same as the first
    					$milestones2[$questionName] = $value;
    			}
    			else{
    				$milestones[$questionName] = $value;
    			}
    		}
    		else if(strpos($key, "competency") !== false){
    			$competencies[$questionName] = $value;
    		}
    		else if(strpos($key, "weight") !== false){
    			$question->addAttribute("weight", $value);
    		}
    		else if(strpos($key, "description") !== false){
    			$option->addAttribute("description", $value);
    		}
    		else{
    			$optionValue = substr($key, strpos($key, ":")+1);
    			$optionValue = substr($optionValue, 0, strpos($optionValue, ":"));
    			$option = $question->addChild("option", htmlspecialchars($value));
    			$option->addAttribute("value", $optionValue);

    		}
    	}

    	$dom = new DOMDocument('1.0');
    	$dom->preserveWhiteSpace = false;
    	$dom->formatOuput = true;
    	$dom->loadXML($form->asXML());
    	$dom->save(storage_path("app")."/".$formLocation);
    	$formStatus = "active";
    	$createdDate = date("Y-m-d H:i:s");

        $newForm = new Form();
        $newForm->title = $formTitle;
        $newForm->type = $formType;
        $newForm->xml_path = $formLocation;
        $newForm->status = $formStatus;
        $newForm->save();

        if($newForm->type != "faculty"){
            foreach($milestones as $questionId => $milestoneId){
                $mq = new MilestoneQuestion();
                $mq->form_id = $newForm->id;
                $mq->question_id = $questionId;
                $mq->milestone_id = $milestoneId;
                $mq->save();
            }
            if(isset($milestones2)){
                foreach($milestones2 as $questionId => $milestoneId){
                    $mq = new MilestoneQuestion();
                    $mq->form_id = $newForm->id;
                    $mq->question_id = $questionId;
                    $mq->milestone_id = $milestoneId;
                    $mq->save();
                }
            }

            foreach($competencies as $questionId => $milestoneId){
                $cq = new CompetencyQuestion();
                $cq->form_id = $newForm->id;
                $cq->question_id = $questionId;
                $cq->competency_id = $milestoneId;
                $cq->save();
            }
        }

        return redirect("manage/forms");
    }

    public function editForm(Request $request, $id){
        if($request->input("action")){
            $form = Form::find($id);
            switch($request->input("action")){
                case "disable":
                    $form->status = "inactive";
                    break;
                case "enable":
                    $form->status = "active";
                    break;
                default:
                    return "false";
                    break;
            }
            $form->save();
            return "true";
        }
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
	            $action = "<button class='editMilestone btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editMS-modal' data-id='{$milestone->id}' id='editBtn'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
	            if($milestone->forms->count() === 0)
	                $action .= "<button class='deleteMilestone btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteMS-modal' data-id='{$milestone->id}' id='deleteBtn'><span class='glyphicon glyphicon-remove'></span> Delete</button>";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with milestone: ".$e);
			}
        }
        return json_encode($results);
    }

    public function getCompetencies(){
        $results["data"] = [];
        $competencies = Competency::all();
        foreach($competencies as $competency){
			try{
	            $result = [];
	            $result[] = $competency->title;
	            $result[] = $competency->description;
	            $action = "<button class='editCompetency btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editC-modal' data-id='{$competency->id}' id='editBtn'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
	            if($competency->forms->count() === 0)
	                $action .= "<button class='deleteCompetency btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteC-modal' data-id='{$competency->id}' id='deleteBtn'><span class='glyphicon glyphicon-remove'></span> Delete</button>";
	            $result[] = $action;
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with competency: ".$e);
			}
        }
        return json_encode($results);
    }

    public function milestone(Request $request, $action){
        switch($action){
            case "add":
                $milestone = new Milestone();
                $milestone->title = $request->input("milestone_title");
				$milestone->type = $resquest->input("milestone_type");
				$milestone->training_level = $request->input("milestone_training_level");
                $milestone->description = $request->input("milestone_description");
                $milestone->save();
                break;
            case "edit":
                $milestone = Milestone::find($request->input("milestone_id"));
                $milestone->title = $request->input("milestone_title");
				$milestone->type = $request->input("milestone_type");
				$milestone->training_level = $request->input("milestone_training_level");
                $milestone->description = $request->input("milestone_description");
                $milestone->save();
                break;
            case "delete":
                $milestone = Milestone::find($request->input("milestone_id"));
                $milestone->delete();
                break;
            default:
                return redirect("manage/milestones-competencies");
                break;
        }
        return redirect("manage/milestones-competencies");
    }

    public function competency(Request $request, $action){
        switch($action){
            case "add":
                $competency = new Competency();
                $competency->title = $request->input("competency_title");
                $competency->description = $request->input("competency_description");
                $competency->save();
                break;
            case "edit":
                $competency = Competency::find($request->input("competency_id"));
                $competency->title = $request->input("competency_title");
                $competency->description = $request->input("competency_description");
                $competency->save();
                break;
            case "delete":
                $competency = Competency::find($request->input("competency_id"));
                $competency->delete();
                break;
            default:
                return redirect("manage/milestones-competencies");
                break;
        }
        return redirect("manage/milestones-competencies");
    }

    public function mentors(){
        $faculty = User::where("type", "faculty")->get();
        $data = compact("faculty");
        return view("manage.mentors", $data);
    }

    public function getMentors(){
        $results["data"] = [];
        $mentorships = Mentorship::where("status", "active")->get();
        foreach($mentorships as $mentorship){
			try{
	            $result = [];
	            $result[] = $mentorship->id;
	            $result[] = $mentorship->mentor->full_name;
	            $result[] = $mentorship->mentee->full_name;
	            $result[] = (string)$mentorship->created_at;
	            $result[] = "<button class='removeMentorship btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-remove-modal' id='rmvBtn' data-id='{$mentorship->id}'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with mentor: ".$e);
			}
        }
        return json_encode($results);
    }

    public function mentor(Request $request, $action){
        switch($action){
            case "add":
                $mentorship = new Mentorship();
                $mentorship->mentor_id = $request->input("faculty");
                $mentorship->mentee_id = $request->input("resident");
                $mentorship->status = "active";
                $mentorship->save();
                break;
            case "delete":
                $mentorship = Mentorship::find($request->input("mentorshipId"));
                $mentorship->status = "inactive";
                $mentorship->save();
                break;
            default:
                break;
        }
        return redirect("manage/mentors");
    }

	public function blocks(){
		return view("manage.blocks");
	}

	public function getBlocks(Request $request){ // TODO
		$results["data"] = [];
		$blocks = Block::where("start_date", "<=", Carbon::now());
		foreach($blocks as $block){
			$result = [];
			$result[] = $block->year;
			$result[] = $block->block_number;
			$result[] = $block->block_name;
			$result[] = $block->start_date;
			$result[] = $block->end_date;
		}
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
        return json_encode($data);
    }

    public function saveBlockAssignments(Request $request){
        $users = User::where("status", "active")->get();
        $now = Carbon::now()->toDateTimeString();
        if(!$request->hasFile("schedule") || !$request->file("schedule")->isValid() || !$request->has("year"))
            return redirect("manage/block-assignments");

        foreach($users as $user){
            $usernames[$user->id] = preg_replace("/\W/", "", strtolower($user->last_name.",".substr($user->first_name, 0, 1)));
        }

        libxml_use_internal_errors(true);

        $dom = new DOMDocument;
        $dom->loadHTMLFile($request->file("schedule"));

        // for exported "xls" file
        $trs = $dom->getElementsByTagName("table")->item(0)->childNodes;

        // for html webcrawling
        //$trs = $dom->getElementById("ctl04_grdReport")->childNodes;

        for($i = 1; $i < $trs->item(0)->childNodes->length; $i++){
        	$blocks[$i] = trim($trs->item(0)->childNodes->item($i)->nodeValue);
        	preg_match("/\((\d\d\/\d\d\/\d\d\d\d) \- (\d\d\/\d\d\/\d\d\d\d)\)/", $blocks[$i], $matches);
        	if(count($matches) == 3){
        		$blockStart[$i] = $matches[1];
        		$blockEnd[$i] = $matches[2];
        	}
        }

        $hits = 0;
        $misses = 0;

        for($i = 1; $i < $trs->length; $i++){
        	if($trs->item($i)->getAttribute("style") == "background-color:LightSteelBlue;")
        		continue;

        	$tds = $trs->item($i)->childNodes;
        	$user = preg_replace("/\W/", "", strtolower($tds->item(0)->nodeValue));

        	for($j = 1; $j < $tds->length; $j++){
        		if($tds->item($j)->nodeType == 3)
        			continue;
        		$entries = $tds->item($j)->getElementsByTagName("td");
        		foreach($entries as $entry){
        			$location = trim(preg_replace("/\(.*\)/", "", $entry->nodeValue));
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
}
