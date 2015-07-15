<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;

use App\Evaluation;
use App\User;
use App\Form;
use App\Milestone;
use App\Competency;
use App\Mentor;

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

    }

    public function forms(){

    }

    public function milestonesCompetencies(){

    }

    public function mentors(){

    }
}
