<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use SimpleXmlElement;
use DOMDocument;

use App\Helpers\FormReader;

use App\Evaluation;
use App\User;
use App\Form;
use App\Milestone;
use App\Competency;
use App\Mentorship;
use App\MilestoneQuestion;
use App\CompetencyQuestion;

class ManageController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("type:admin");
    }

    public function evaluations(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $data = compact("user", "residents");
        return view("manage.evaluations", $data);
    }

    public function getEvaluations(){
        $results["data"] = [];
        $evaluations = Evaluation::all();
        foreach($evaluations as $eval){
            $result = [];
            $result[] = "<a href='evaluation/{$eval->id}'>{$eval->id}</a>";
            $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
            $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
            $result[] = $eval->requestor->last_name.", ".$eval->requestor->first_name;
            $result[] = $eval->form->title;
            $result[] = $eval->request_date;
            if($eval->complete_date)
                $result[] = $eval->complete_date;
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

    public function bulkDisable(Request $request){ //TODO

    }

    public function accounts(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $data = compact("user", "residents");
        return view("manage.accounts", $data);
    }

    public function getAccounts($type){
        
    }

    public function forms(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $data = compact("user", "residents");
        return view("manage.forms.all", $data);
    }

    public function getForms(Request $request){
        $results["data"] = [];
        $forms = Form::all();
        foreach($forms as $form){
            $result = [];
            $result[] = $form->title;
            $result[] = $form->created_at->toDateTimeString();
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
        return json_encode($results);
    }

    public function formBuilder(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $milestones = Milestone::all();
        $competencies = Competency::all();
        $data = compact("user", "residents", "milestones", "competencies");
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
    		//$value = htmlspecialchars($value);
    		//$key = htmlspecialchars($key);

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
    		else if($key == "formTitle"){
    			$form->addChild("title", htmlspecialchars($value));
    			$formTitle = $value;
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
    	//$form->asXML($formLocation);
    	$formTitle = $formTitle;
    	$formStatus = "active";
    	$createdDate = date("Y-m-d H:i:s");

        $newForm = new Form();
        $newForm->title = $formTitle;
        $newForm->xml_path = $formLocation;
        $newForm->status = $formStatus;
        $newForm->save();

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

        return redirect("manage/forms");
    }

    public function editForm(Request $request, $id){
        $form = Form::find($id);
        if($request->input("action")){
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
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $form = Form::find($id);
        $data = compact("user", "residents", "form");
        return view("manage.forms.view", $data);
    }

    public function milestonesCompetencies(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $data = compact("user", "residents");
        return view("manage.milestones-competencies", $data);
    }

    public function getMilestones(){
        $results["data"] = [];
        $milestones = Milestone::all();
        foreach($milestones as $milestone){
            $result = [];
            $result[] = $milestone->title;
            $result[] = $milestone->description;
            $action = "<button class='editMilestone btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editMS-modal' data-id='{$milestone->id}' id='editBtn'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
            if($milestone->forms->count() === 0)
                $action .= "<button class='deleteMilestone btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteMS-modal' data-id='{$milestone->id}' id='deleteBtn'><span class='glyphicon glyphicon-remove'></span> Delete</button>";
            $result[] = $action;
            $results["data"][] = $result;
        }
        return json_encode($results);
    }

    public function getCompetencies(){
        $results["data"] = [];
        $competencies = Competency::all();
        foreach($competencies as $competency){
            $result = [];
            $result[] = $competency->title;
            $result[] = $competency->description;
            $action = "<button class='editCompetency btn btn-info btn-xs' data-toggle='modal' data-target='.bs-editC-modal' data-id='{$competency->id}' id='editBtn'><span class='glyphicon glyphicon-edit'></span> Edit</button>";
            if($competency->forms->count() === 0)
                $action .= "<button class='deleteCompetency btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-deleteC-modal' data-id='{$competency->id}' id='deleteBtn'><span class='glyphicon glyphicon-remove'></span> Delete</button>";
            $result[] = $action;
            $results["data"][] = $result;
        }
        return json_encode($results);
    }

    public function milestone(Request $request, $action){
        switch($action){
            case "add":
                $milestone = new Milestone();
                $milestone->title = $request->input("milestone_title");
                $milestone->description = $request->input("milestone_description");
                $milestone->save();
                break;
            case "edit":
                $milestone = Milestone::find($request->input("milestone_id"));
                $milestone->title = $request->input("milestone_title");
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
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        $faculty = User::where("type", "faculty")->get();
        $data = compact("user", "residents", "faculty");
        return view("manage.mentors", $data);
    }

    public function getMentors(){
        $results["data"] = [];
        $mentorships = Mentorship::where("status", "active")->get();
        foreach($mentorships as $mentorship){
            $result = [];
            $result[] = $mentorship->id;
            $result[] = $mentorship->mentor->last_name.", ".$mentorship->mentor->first_name;
            $result[] = $mentorship->mentee->last_name.", ".$mentorship->mentee->first_name;
            $result[] = $mentorship->created_at->toDateTimeString();
            $result[] = "<button class='removeMentorship btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-remove-modal' id='rmvBtn' data-id='{$mentorship->id}'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
            $results["data"][] = $result;
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
}
