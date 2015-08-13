<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use Auth;
use Mail;
use Debugbar;
use Log;

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

    public function dashboard(){
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
                Debugbar::addMessage($userLocations);
                foreach($userLocations as $location){
                    foreach($block->assignments->where("location", $location)->sortBy("user.last_name") as $assignment){
                        if($user->type == "resident"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "faculty"){
                                $faculty[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->last_name.", ".$assignment->user->first_name];
                            }
                        }
                        elseif($user->type == "faculty"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "resident"){
                                $residents[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->last_name.", ".$assignment->user->first_name];
                            }
                        }
                    }
                }
            }
        }
        if($user->type == "admin" || $user->type == "faculty"){
            $residentModels = User::where("type", "resident")->where("status", "active")->orderBy("last_name")->get();
            foreach($residentModels as $resident)
                $residents[0][] = ["id" => $resident->id, "name" => $resident->last_name.", ".$resident->first_name];
        }
        if($user->type == "admin" || $user->type == "resident"){
            $facultyModels = User::where("type", "faculty")->where("status", "active")->orderBy("last_name")->get();
            foreach($facultyModels as $fac)
                $faculty[0][] = ["id" => $fac->id, "name" => $fac->last_name.", ".$fac->first_name];
        }



        $selectTypes = [
            "resident" => "faculty",
            "faculty" => "interns/residents/fellows",
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
        else{
            if($eval->evaluator->notifications == "yes" && filter_var($eval->evaluator->email, FILTER_VALIDATE_EMAIL)){
                try{
                    $email = $eval->evaluator->email;
                    $evaluationId = $eval->id;
                    $data = compact("evaluationId");
                    Mail::send("emails.notification", $data, function($message) use($email){
                        $message->to($email);
                        $message->from("notifications@residentprogram.com", "ResidentProgram Notifications");
                        $message->replyTo(env("ADMIN_EMAIL"));
                        $message->subject("Evaluation Request Notification");
                    });
                }
                catch (\Exception $e){
                    Log::error($e);
                }
            }
        }

        return redirect("dashboard");
    }

    public function evaluation(Request $request, $id){
        $user = Auth::user();
        $evaluation = Evaluation::find($id);
        if($evaluation->subject_id == $user->id || $evaluation->evaluator_id == $user->id || $user->type == "admin" || $user->mentees->contains($evaluation->subject))
            return view("evaluations.evaluation", compact("evaluation"));
        else
            return redirect("dashboard")->with("error", "Insufficient permissions to view the requested evaluation");
    }

    public function cancelEvaluation(Request $request){
        $user = Auth::user();
        $eval = Evaluation::find($request->input("id"));
        if(($eval->requestor == $user || $user->type == "admin") && $eval->status == "pending"){
            $eval->status = "canceled by ".$eval->requestor->type;
            $eval->save();
            return redirect("dashboard");
        }
        else{
            if(!($eval->requestor == $user || $user->type == "admin"))
                return redirect("dashboard")->with("error", "Only the requestor or an administrator can cancel an evaluation");
            elseif($eval->status != "pending")
                return redirect("dashboard")->with("error", "Only pending evaluations can be canceled");
        }
    }

    public function saveEvaluation(Request $request, $id){
        $user = Auth::user();
        $eval = Evaluation::find($id);
        if($eval->status == "pending" && $eval->evaluator_id == $user->id){ //TODO: middleware
            if($request->input("evaluation_id")){
                $eval->status = "complete";
                $eval->complete_date = Carbon::now();
                $eval->training_level = $eval->subject->training_level;
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
                            $response = Response::firstOrNew(["evaluation_id" => $id, "question_id" => $question]);
                            $response->weight = $weight;
                        }
                        else{
                            $response = TextResponse::firstOrNew(["evaluation_id" => $id, "question_id" => $question]);
                        }

                        // $response->question_id = $question;
                        $response->response = $value;
                        // $response->evaluation_id = $id;
                        $response->save();
                    }
                }
            }
            $eval->save();
            return redirect("dashboard");
        }
        else{
            if($eval->status != "pending")
                return redirect("dashboard")->with("error", "Cannot complete a non-pending evaluation");
            elseif($eval->evaluator_id != $user->id)
                return redirect("dashboard")->with("error", "Only the evaluator can complete an evaluation");
        }

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
                    $evaluations = User::find($menteeId)->subjectEvaluations()->where("status", "complete")->with("subject", "evaluator", "form")->get();
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
                if($type == "complete" || $type == "mentor")
                    $result[] = (string)$eval->complete_date;
                if($type == "pending"){
                    if($eval->requested_by_id == $user->id){
                        $result[] = "<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='{$eval->id}'>".
                        "<span class='glyphicon glyphicon-remove'></span> Cancel</button>";
                    }
                    else
                        $result[] = "";
                } else{

                }
                $results["data"][] = $result;
            }
        }

        return json_encode($results);
    }

    public function user(){
        return view("dashboard.user");
    }

    public function saveUser(Request $request){
        $user = Auth::user();
        if($request->input("new_password") == $request->input("new_password_confirm") && password_verify($request->input("old_password"), $user->password)){
            $user->password = bcrypt($request->input("new_password"));
            $user->save();
            return redirect("dashboard")->with("success", "Password changed successfully!");
        } else{
            if($request->input("new_password") != $request->input("new_password_confirm"))
                $error = "New passwords did not match";
            elseif(!password_verify($request->input("old_password"), $user->password))
                $error = "Current password verification failed";

            return redirect("user")->with("error", $error);
        }
    }

    public function saveUserReminders(Request $request){
        $user = Auth::user();
        $user->reminder_frequency = $request->input("frequency");
        $user->save();
        return redirect("user")->with("success", "Reminder preferences saved successfully!");
    }

    public function saveUserNotifications(Request $request){
        $user = Auth::user();
        $user->notifications = $request->input("notifications");
        $user->save();
        return redirect("user")->with("success", "Notifications preferences saved successfully!");
    }

    public function contact(){
        return view("dashboard.contact");
    }

    public function saveContact(Request $request){
        $user = Auth::user();
        $contact = new Contact();
        $contact->user_id = $user->id;
        $contact->subject = $request->input("subject");
        $contact->body = $request->input("body");
        $contact->save();

        $data = [];
        $data["body"] = $contact->body;
        $data["email"] = $user->email;
        $data["firstName"] = $user->first_name;
        $data["lastName"] = $user->last_name;
        $subject = $contact->subject;
        try{
            Mail::send("emails.contact", $data, function($message) use($subject){
                $message->to(env("ADMIN_EMAIL"));
                $message->from("contact@residentprogram.com");
                $message->subject($subject);
            });
        }
        catch(\Exception $e){

        }
        return redirect("dashboard")->with("success", "Thank you! Your message has been receieved and I will get back to you shortly");
    }

}
