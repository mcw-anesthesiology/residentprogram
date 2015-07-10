<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use App\Block;
use App\BlockAssignment;
use App\Form;
use App\Evaluation;
use App\Mentorship;

class MainController extends Controller
{
    public function dashboard(){
        $user = User::where("type", "faculty")->first();

        $residents = User::where("type", "resident")->get();
        if($user->type == "faculty"){
            $numPendingRequests = $user->evaluatorEvaluations->where("status", "pending")->count();
            $mentees = $user->mentees->where("status", "active")->unique();
        }
        $data = compact("user", "residents", "numPendingRequests", "mentees");
        return view("dashboard.".$user->type, $data);
    }

    public function request(){
        $user = User::where("type", "resident")->first();

        $residents = User::where("type", "resident")->get();
        $blocks = Block::all();

        $selectTypes = [
            "resident" => "faculty",
            "faculty" => "residents",
            "admin" => "users"
        ];

        return view("evaluations.request", compact("user", "residents", "blocks", "selectTypes"));
    }

    public function requestBlock(Request $request){
        $user = User::where("username", "jmischka")->first();

        //$blockId = $request->input("block");
        //$assignments = Block::where("id", $blockId)->assignments();
        $residents = User::where("type", "resident")->get();
        $faculty = User::where("type", "faculty")->get();
        $forms = Form::all();

        return view("evaluations.request-block", compact("user", "block", "residents", "faculty", "forms"));
    }

    public function evaluations(Request $request){
        $user = User::where("type", "resident")->first();
        $results["data"] = [];
        if($user->type == "admin"){
            $evaluations = Evaluation::all();
            foreach($evaluations as $eval){
                $result = [];
                $result[] = "<a href='evaluation/{$eval->id}'>{$eval->id}</a>";
                $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
                $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
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

                $result[] = "<span class='badge badge-{$badge}'>{$eval->status}</span>";
                $results["data"][] = $result;
            }
        } else{
            $type = $request->input("type");
            if($type == "mentor"){
                $mentorshipId = $request->input("mentorship_id");
                $evaluations = Mentorship::where("id", $mentorshipId)->first()->mentee->subjectEvaluations->all();
            }
            else
                $evaluations = Evaluation::where("status", $type)->where(function($query) use ($user){
                    $query->where("evaluator_id", $user->id)->orWhere("subject_id", $user->id);
                })->get();
            foreach($evaluations as $eval){
                $result = [];
                $result[] = "<a href='evaluation/{$eval->id}'>{$eval->id}</a>";
                if($eval->subject_id == $user->id)
                    $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
                else
                    $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
                $result[] = $eval->form->title;
                $result[] = $eval->request_date;
                if($type == "complete" || $type == "mentor")
                    $result[] = $eval->complete_date;
                if($type == "pending" && $eval->requested_by_id == $user->id){
                    $result[] = "<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='{$eval->id}'>".
                    "<span class='glyphicon glyphicon-remove'></span> Cancel</button>";
                } else{
                    $result[] = "";
                }
                $results["data"][] = $result;
            }
        }

        return json_encode($results);
    }

}
