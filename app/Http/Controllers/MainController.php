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
use App\Contact;

class MainController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
    }

    public function dashboard(Request $request){
        $user = Auth::user();
        if($user->type == "faculty"){
            $mentees = $user->mentees->where("status", "active")->unique();
        }
        $data = compact("mentees");
        return view("dashboard.dashboard", $data);
    }

    public function request(Request $request){
        $user = Auth::user();

        if($user->type == "resident" || $user->type == "faculty"){
            $blocks = Block::where("start_date", "<", Carbon::now())->with("assignments.user")->limit(3)->get();
            foreach($blocks as $block){
                $userLocations = $block->assignments->where("user_id", $user->id)->map(function ($item, $key){
                    return $item->location;
                });
                foreach($userLocations as $location){
                    foreach($block->assignments->where("location", $location) as $assignment){
                        if($user->type == "faculty"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "faculty"){
                                $faculty[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->last_name.", ".$assignment->user->first_name];
                            }
                        }
                        elseif($user->type == "resident"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "resident"){
                                $residents[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->last_name.", ".$assignment->user->first_name];
                            }
                        }
                    }
                }
            }
        }
        if($user->type == "admin" || $user->type == "faculty"){
            $residentModels = User::where("type", "resident")->where("status", "active")->get();
            foreach($residentModels as $resident)
                $residents[0][] = ["id" => $resident->id, "name" => $resident->last_name.", ".$resident->first_name];
        }
        if($user->type == "admin" || $user->type == "resident"){
            $facultyModels = User::where("type", "faculty")->where("status", "active")->get();
            foreach($facultyModels as $fac)
                $faculty[0][] = ["id" => $fac->id, "name" => $fac->last_name.", ".$fac->first_name];
        }



        $selectTypes = [
            "resident" => "faculty",
            "faculty" => "residents",
            "admin" => "users"
        ];
        $forms = Form::where("status", "active")->get();

        $data = compact("selectTypes", "forms");

        if(isset($residents)){
            $residents = json_encode($residents);
            $data["requestResidents"] = str_replace("'", "", $residents);
        }
        if(isset($faculty)){
            $faculty = json_encode($faculty);
            $data["requestFaculty"] = str_replace("'", "", $faculty);
        }
        if(isset($blocks))
            $data["blocks"] = $blocks;

        return view("evaluations.request", $data);
    }

    public function createRequest(Request $request){
        $user = Auth::user();
        $eval = new Evaluation($request->all());
        if(!$eval->evaluator_id)
            $eval->evaluator_id = $user->id;
        elseif(!$eval->subject_id)
            $eval->subject_id = $user->id;

        $eval->requested_by_id = $user->id;
        $eval->status = "pending";
        $eval->request_date = Carbon::now();
        $eval->request_ip = $request->ip();
        $eval->save();
        if($user->id == $eval->evaluator_id)
            return redirect("evaluation/".$eval->id);
        return redirect("dashboard");
    }

    public function evaluation(Request $request, $id){
        $evaluation = Evaluation::find($id);

        return view("evaluations.evaluation", compact("evaluation"));
    }

    public function cancelEvaluation(Request $request){
        $eval = Evaluation::find($request->input("id"));
        if($eval->requestor == Auth::user()){
            $eval->status = "canceled by ".$eval->requestor->type;
            $eval->save();
        }
        return redirect("dashboard");
    }

    public function saveEvaluation(Request $request, $id){
        $user = Auth::user();
        $eval = Evaluation::find($id);
        if($eval->status == "pending" && $eval->evaluator_id == $user->id){ //TODO: middleware
            if($request->input("evaluation_id")){
                $eval->status = "complete";
                $eval->complete_date = Carbon::now();
            }
            $eval->complete_ip = $request->ip();
            $eval->evaluation_date = $request->input("evaluation_date");

            $input = $request->all();
            foreach($input as $question => $value){
                if(strpos($question, "evaluation_id") === false && strpos($question, "evaluation_date") === false && $question !== "_token"){
                    if(strpos($question, "weight"))
                        $weight = $value;
                    else{
                        if(is_numeric($value)){
                            $response = Response::where("evaluation_id", $id)->where("question_id", $question)->firstOrNew();
                            $response->weight = $weight;
                        }
                        else{
                            $response = TextResponse::where("evaluation_id", $id)->where("question_id", $question)->firstOrNew();
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
            $evaluations = Evaluation::with("subject", "evaluator", "form")->get();
            foreach($evaluations as $eval){
                $result = [];
                $result[] = "<a href='evaluation/{$eval->id}'>{$eval->id}</a>";
                $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
                $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
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

                $result[] = "<span class='badge badge-{$badge}'>{$eval->status}</span>";
                $results["data"][] = $result;
            }
        } else{
            $type = $request->input("type");
            if($type == "mentor"){
                $menteeId = $request->input("mentee_id");
                $mentee = User::find($menteeId);
                if($mentee->mentors->contains($user))
                    $evaluations = User::find($menteeId)->subjectEvaluations()->with("subject", "evaluator", "form")->get();
            }
            else
                $evaluations = Evaluation::where("status", $type)->where(function($query) use ($user){
                    $query->where("evaluator_id", $user->id)->orWhere("subject_id", $user->id);
                })->with("subject", "evaluator", "form")->get();
            foreach($evaluations as $eval){
                $result = [];
                $result[] = "<a href='evaluation/{$eval->id}'>{$eval->id}</a>";
                if($eval->subject_id == $user->id || $type == "mentor")
                    $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
                else
                    $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
                $result[] = $eval->form->title;
                $result[] = (string)$eval->request_date;
                if($type == "complete")
                    $result[] = (string)$eval->complete_date;
                elseif($type == "mentor")
                    $result[] = "";
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

    public function user(Request $request){
        return view("dashboard.user");
    }

    public function saveUser(Request $request){
        $user = Auth::user();
        if($request->input("new_password") == $request->input("new_password_confirm") && password_verify($request->input("old_password"), $user->password)){
            $user->password = bcrypt($request->input("new_password"));
            $user->save();
            return redirect("dashboard");
        } else{
            if($request->input("new_password") != $request->input("new_password_confirm"))
                $error = "New passwords did not match";
            elseif(!password_verify($request->input("old_password"), $user->password))
                $error = "Current password verification failed";

            return redirect("user")->with("error", $error);
        }
    }

    public function contact(){
        return view("dashboard.contact");
    }

    public function saveContact(Request $request){
        $user = Auth::user();
        $adminEmail = "jmischka@mcw.edu";
        $contact = new Contact();
        $contact->user_id = $user->id;
        $contact->subject = $request->input("subject");
        $contact->body = $request->input("body");
        $contact->save();

        $emailFrom = "contact@residentprogram.com";
		$emailSubject = "ResidentProgram: ".$contact->subject;
		$emailBody = $contact->body."\n".$user->first_name." ".$user->last_name."\n".$user->email;
		$emailHeaders = "From: ".$emailFrom."\n"."X-Mailer: PHP/5.5";
		mail($adminEmail, $emailSubject, $emailBody, $emailHeaders);
        return "success";
    }

}
