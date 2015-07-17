<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use Auth;

use Carbon\Carbon;

use App\User;
use App\Block;
use App\BlockAssignment;
use App\Form;
use App\Evaluation;
use App\Mentorship;
use App\Response;
use App\TextResponse;

class MainController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
    }

    public function dashboard(){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get(); //TODO: abstract this, residents only get themselves
        if($user->type == "faculty"){
            $mentees = $user->mentees->where("status", "active")->unique();
        }
        $data = compact("user", "residents", "mentees");
        return view("dashboard.".$user->type, $data);
    }

    public function request(){
        $user = Auth::user();

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
        $user = Auth::user();

        //$blockId = $request->input("block");
        //$assignments = Block::where("id", $blockId)->assignments();
        $residents = User::where("type", "resident")->get();
        $faculty = User::where("type", "faculty")->get();
        $forms = Form::where("status", "active")->get();

        return view("evaluations.request-block", compact("user", "block", "residents", "faculty", "forms"));
    }

    public function createRequest(Request $request){
        $user = Auth::user();
        $request = new Evaluation($request->all());
        if(!$request->evaluator_id)
            $request->evaluator_id = $user->id;
        elseif(!$request->subject_id)
            $request->subject_id = $user->id;

        $request->requested_by_id = $user->id;
        $request->status = "pending";
        $request->request_date = Carbon::now();
        $request->request_ip = $_SERVER["REMOTE_ADDR"];
        $request->save();
        return redirect("dashboard");
    }

    public function evaluation(Request $request, $id){
        $user = Auth::user();
        $residents = User::where("type", "resident")->get();
        $evaluation = Evaluation::find($id);

        return view("evaluations.evaluation", compact("user", "residents", "evaluation"));
    }

    public function cancelEvaluation(Request $request){
        $eval = Evaluation::find($request->input("id"));
        if($eval->requestor == Auth::user()){
            $eval->status = "canceled by ".$eval->requestor->type;
        }
        $eval->save();
        return redirect("dashboard");
    }

    public function saveEvaluation(Request $request, $id){
        $eval = Evaluation::find($id);
        if($eval->status == "pending" && $eval->evaluator_id == $user->id){ //TODO: middleware
            if($request->input("evaluation_id")){
                $eval->status = "complete";
                $eval->complete_date = Carbon::now();
            }
            $eval->complete_ip = $_SERVER["REMOTE_ADDR"];
            $eval->evaluation_date = $request->input("evaluation_date");

            $input = $request->all();
            foreach($input as $question => $value){
                if(strpos($question, "evaluation_id") === false && strpos($question, "evaluation_date") === false && $question !== "_token"){
                    if(strpos($question, "weight"))
                        $weight = $value;
                    else{
                        if(is_numeric($value)){
                            if(Response::where("evaluation_id", $id)->where("question_id", $question)->exists())
                                $response = Response::where("evaluation_id", $id)->where("question_id", $question)->first();
                            else
                                $response = new Response();

                            $response->weight = $weight;
                        }
                        else{
                            if(TextResponse::where("evaluation_id", $id)->where("question_id", $question)->exists())
                                $response = TextResponse::where("evaluation_id", $id)->where("question_id", $question)->first();
                            else
                                $response = new TextResponse();
                        }

                        $response->question_id = $question;
                        $response->response = $value;
                        $response->evaluation_id = $id;
                        $response->save();
                    }
                }
            }
            $eval->save();
        }
        return redirect("dashboard");
    }

    public function evaluations(Request $request){
        $user = Auth::user();
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
