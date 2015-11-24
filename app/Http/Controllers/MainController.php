<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\FormReader;

use Auth;
use Debugbar;
use Log;
use Mail;
use Setting;

use Carbon\Carbon;

use App\Block;
use App\BlockAssignment;
use App\Contact;
use App\Evaluation;
use App\FlaggedEvaluation;
use App\Form;
use App\Mentorship;
use App\Response;
use App\TextResponse;
use App\User;

class MainController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
    }

    public function dashboard(){
        $user = Auth::user();
        if($user->type == "faculty")
            $mentees = $user->mentees->where("status", "active")->unique();
		elseif($user->type == "admin")
			$numFlagged = Evaluation::has("flag")->count();
        $data = compact("mentees", "numFlagged");
        return view("dashboard.dashboard", $data);
    }

    public function dashboardFaculty(){
		$user = Auth::user();
		$threshold = Setting::get("facultyEvalThreshold");
		$noEvaluations = (Evaluation::where("subject_id", $user->id)->where("status", "complete")->count() < $threshold);
		$data = compact("noEvaluations");
        return view("dashboard.faculty.dashboard", $data);
    }

    public function request(Request $request){
        $user = Auth::user();

		if($request->is("request/faculty")){
			$requestType = "faculty";
			$subjectTypes = ["faculty"];
			$evaluatorTypes = ["resident", "fellow"];
		}
		elseif($user->isType("staff")){
			$requestType = "staff";
			$subjectTypes = ["resident", "fellow"];
			$evaluatorTypes = ["staff"];
		}
		else{
			$requestType = "resident";
			$subjectTypes = ["resident", "fellow"];
			$evaluatorTypes = ["faculty"];
		}

		$evaluationTypes = array_merge($subjectTypes, $evaluatorTypes);

		if(!$user->isType(array_merge($evaluationTypes, ["admin"])))
			return back()->with("error", "Your account type is not allowed to create that kind of evaluation.");

        if($user->isType(["resident", "faculty"])){
            $blocks = Block::where("start_date", "<", Carbon::now())->with("assignments.user")->orderBy("year", "desc")->orderBy("block_number", "desc")->limit(3)->get();
            foreach($blocks as $block){
                $userLocations = $block->assignments->where("user_id", $user->id)->map(function ($item, $key){
                    return $item->location;
                });
                foreach($userLocations as $location){
                    foreach($block->assignments->where("location", $location)->sortBy("user.last_name") as $assignment){
                        if($user->type == "resident"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "faculty"){
                                $faculty[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->full_name, "group" => $assignment->user->training_level];
                            }
                        }
                        elseif($user->type == "faculty"){
                            if($assignment->user_id != $user->id && $assignment->user->type == "resident"){
                                $residents[$block->id][] = ["id" => $assignment->user_id, "name" => $assignment->user->full_name];
                            }
                        }
                    }
                }
            }
        }

        if(!$user->isType("resident") && in_array("resident", $evaluationTypes)){
            $residentModels = User::where("type", "resident")->where("status", "active")->orderBy("last_name")->get();
            foreach($residentModels as $resident)
                $residents[0][] = ["id" => $resident->id, "name" => $resident->full_name, "group" => $resident->training_level];
        }
        if(!$user->isType("faculty") && in_array("faculty", $evaluationTypes)){
            $facultyModels = User::where("type", "faculty")->where("status", "active")->orderBy("last_name")->get();
            foreach($facultyModels as $fac)
                $faculty[0][] = ["id" => $fac->id, "name" => $fac->full_name, "group" => "faculty"];
        }
		if(!$user->isType("staff") && in_array("staff", $evaluationTypes)){
			$staffModels = User::where("type", "staff")->where("status", "active")->orderBy("last_name")->get();
			foreach($staffModels as $staff)
				$staff[0][] = ["id" => $staff->id, "name" => $staff->full_name, "group" => "staff"];
		}

		if($user->isType($subjectTypes)){
			$formModels = Form::where("status", "active")->where("type", $user->specific_type)->whereIn("evaluator_type", $evaluatorTypes)->orderBy("title")->get();
			foreach($formModels as $form){
				$forms[] = ["id" => $form->id, "name" => $form->title, "group" => $form->type];
			}
		}
		elseif($user->isType($evaluatorTypes)){
			$formModels = Form::where("status", "active")->whereIn("type", $subjectTypes)->where("evaluator_type", $user->specific_type)->orderBy("title")->get();
			foreach($formModels as $form){
				$forms[] = ["id" => $form->id, "name" => $form->title, "group" => $form->type];
			}
		}
		else{
			$formModels = Form::where("status", "active")->whereIn("type", $subjectTypes)->whereIn("evaluator_type", $evaluatorTypes)->orderBy("title")->get();
			foreach($formModels as $form){
				$forms[] = ["id" => $form->id, "name" => $form->title, "group" => $form->type];
			}
		}

		$residentGroups = ["intern" => "Intern", "ca-1" => "CA-1", "ca-2" => "CA-2", "ca-3" => "CA-3", "fellow" => "Fellow"];

		switch($requestType){
			case "resident":
				if(!$user->isType($subjectTypes)){
					$subjects = $residents;
					$subjects["groups"] = $residentGroups;
					$groupSubjects = true;
				}
				if(!$user->isType($evaluatorTypes)){
					$evaluators = $faculty;

				}

				$subjectTypeText = "intern, resident, or fellow";
				$subjectTypeTextPlural = "interns, residents, and fellows";
				$evaluatorTypeText = "faculty";

				$formGroups = ["resident" => "Resident", "fellow" => "Fellow"];
				$groupForms = true;
				break;
			case "faculty":
				if(!$user->isType("resident"))
					return back()->with("error", "Only residents or fellows can create faculty evaluations");
				$subjects = $faculty;
				$pendingEvalCount = Evaluation::with("subject", "evaluator", "form")->where("status", "pending")->where("evaluator_id", $user->id)->whereHas("form", function($query){
	                $query->where("type", "faculty");
	            })->count();

				$subjectTypeText = "faculty";
				$subjectTypeTextPlural = "faculty";
				$evaluatorTypeText = "resident";

				$groupForms = false;
				break;
			case "staff":
				if(!$user->isType("staff"))
					return back()->with("error", "Only staff can create staff evaluations");
				$subjects = $residents;
				$subjects["groups"] = $residentGroups;
				$groupSubjects = true;

				$subjectTypeText = "intern, resident, or fellow";
				$subjectTypeTextPlural = "interns, residents, and fellows";
				$evaluatorTypeText = "staff";

				$groupForms = false;
				break;
		}

		for($dt = Carbon::now(), $i = 0; $i < 3; $dt->subMonths(1), $i++){
			$date = $dt->format("Y-m-01");
			$months[$date] = $dt->format("F");
			$endOfMonth[$date] = $dt->format("Y-m-t");
		}

		if(!empty($subjects))
			$subjects = str_replace("'", "", json_encode($subjects));
		if(!empty($evaluators))
			$evaluators = str_replace("'", "", json_encode($evaluators));
		if(!empty($forms))
			$forms = str_replace("'", "", json_encode($forms));
		if(!empty($formGroups))
			$formGroups = str_replace("'", "", json_encode($formGroups));

        $data = compact("forms", "requestType", "months", "endOfMonth", "pendingEvalCount",
			"subjects", "evaluators", "subjectTypeText", "subjectTypeTextPlural", "evaluatorTypeText",
			"blocks", "groupSubjects", "groupEvaluators", "groupForms", "formGroups");

        return view("evaluations.request", $data);
    }

    public function createRequest(Request $request){
        $user = Auth::user();
        $eval = new Evaluation();
        if($request->is("request")){
            if($user->type == "resident")
                $eval->subject_id = $user->id;
            elseif($request->has("subject_id"))
                $eval->subject_id = $request->input("subject_id");

            if($user->type == "faculty")
                $eval->evaluator_id = $user->id;
            elseif($request->has("evaluator_id"))
                $eval->evaluator_id = $request->input("evaluator_id");
        }
        elseif($request->is("request/faculty")){
            if($user->type == "faculty")
                return redirect("dashboard")->with("error", "Faculty cannot request faculty evaluations");

            if($user->type == "resident")
                $eval->evaluator_id = $user->id;
            elseif($request->has("evaluator_id"))
                $eval->evaluator_id = $request->input("evaluator_id");

            if($request->has("subject_id"))
                $eval->subject_id = $request->input("subject_id");
            else
                return back()->withInput()->with("error", "Please select a faculty to be evaluated");
        }

        $eval->form_id = $request->input("form_id");
        $eval->requested_by_id = $user->id;
		$eval->evaluation_date = $request->input("evaluation_date");

		if(empty($eval->subject_id) || empty($eval->evaluator_id) || empty($eval->form_id) || empty($eval->requested_by_id)){ // TODO: try/catch
			$errors = "";
			if(empty($eval->subject_id))
				$errors .= "Please select an evaluation subject. ";
			if(empty($eval->evaluator_id))
				$errors .= "Please select an evaluator. ";
			if(empty($eval->form_id))
				$errors .= "Please select a form. ";
			if(empty($eval->requested_by_id))
				$errors .= "There was a problem with your account, please try logging out and back in. ";

			return back()->with("error", $errors);
		}

		$eval->training_level = $eval->subject->training_level;
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
					$evaluatorLast = $eval->evaluator->last_name;
					$subjectLast = $eval->subject->last_name;
					$formTitle = $eval->form->title;
                    $data = compact("evaluationId", "evaluatorLast", "subjectLast", "formTitle");
                    Mail::send("emails.notification", $data, function($message) use($email){
                        $message->to($email);
                        $message->from("notifications@residentprogram.com", "Resident Program Notifications");
                        $message->replyTo(env("ADMIN_EMAIL"));
                        $message->subject("Evaluation Request Notification");
                    });
                }
                catch (\Exception $e){
                    Log::error("Problem sending email: ".$e);
                }
            }
        }

        return redirect("dashboard");
    }

    public function evaluation(Request $request, $id){
        $user = Auth::user();
        $evaluation = Evaluation::find($id);
        if($evaluation->subject_id == $user->id && $user->type == "faculty"){
            $threshold = Setting::get("facultyEvalThreshold");
            $evaluations = Evaluation::where("subject_id", $user->id)->where("status", "complete")->orderBy("id", "desc")->get();
            $evaluations = $evaluations->splice($evaluations->count()%$threshold);
            if($evaluations->contains($evaluation))
                return view("evaluations.evaluation", compact("evaluation"));
            else
                return redirect("dashboard")->with("error", "Insufficient permissions to view the requested evaluation");
        }
        elseif($evaluation->subject_id == $user->id || $evaluation->evaluator_id == $user->id || $user->type == "admin" || $user->mentees->contains($evaluation->subject)){
			$data = compact("evaluation");
			if($evaluation->evaluator_id == $user->id || $user->type == "admin"){
				switch($evaluation->evaluator->type){
					case "faculty":
						$subjectType = "Resident/Fellow";
						$possibleSubjects = User::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("last_name")->get();
						$possibleForms = Form::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("title")->get();
						break;
					case "resident":
					case "fellow":
						$subjectType = "Faculty";
						$possibleSubjects = User::where("type", "faculty")->where("status", "active")->orderBy("last_name")->get();
						$possibleForms = Form::where("type", "faculty")->where("status", "active")->orderBy("title")->get();
						break;
				}
				$flaggedActions = Setting::get("flaggedActions");
				$data += compact("subjectType", "possibleSubjects", "possibleForms", "flaggedActions");
			}
            return view("evaluations.evaluation", $data);
		}
        else
            return redirect("dashboard")->with("error", "Insufficient permissions to view the requested evaluation");
    }

    public function cancelEvaluation(Request $request){
        $user = Auth::user();
        $eval = Evaluation::find($request->input("id"));
        if(($eval->requestor == $user || $user->type == "admin") && $eval->status == "pending"){
            $eval->status = "canceled by ".$eval->requestor->type;
            $eval->save();
            return "success";
        }
        else{
            if(!($eval->requestor == $user || $user->type == "admin"))
                return "Only the requestor or an administrator can cancel an evaluation";
            elseif($eval->status != "pending")
                return "Only pending evaluations can be canceled";
        }
    }

    public function saveEvaluation(Request $request, $id){
        $user = Auth::user();
        $eval = Evaluation::find($id);
        if($eval->status == "pending" && $eval->evaluator_id == $user->id){
            if($request->input("evaluation_id")){
                $eval->status = "complete";
                $eval->complete_date = Carbon::now();
				if(!$eval->training_level)
                	$eval->training_level = $eval->subject->training_level;
            }
            $eval->complete_ip = $request->ip();
			if(!$eval->evaluation_date)
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

	public function evaluationComment($id, Request $request){
		$user = Auth::user();
		$eval = Evaluation::find($id);
		if($eval->evaluator_id == $user->id && in_array($eval->status, ["complete", "pending"])){
			$eval->comment = $request->input("comment");
			$eval->save();
			return "success";
		}
		return "failure";
	}

	public function editEvaluation($id, Request $request){
		$user = Auth::user();
		$eval = Evaluation::find($id);
		if($eval == null)
			return back()->with("error", "That evaluation does not exist");

		$errors = "";
		$successes = "";

		if($user->type == "admin"){
			if($request->has("evaluation_evaluator") && $request->input("evaluation_evaluator") != ""){
				$newEvaluator = User::find($request->input("evaluation_evaluator"));
				if($newEvaluator == null)
					$errors .= "Evaluator does not exist. ";
				elseif($newEvaluator->type != $eval->evaluator->type)
					$errors .= "Evaluator is not correct account type. ";
				else{
					$eval->evaluator_id = $newEvaluator->id;
					$eval->save();
					$successes .= "Evaluator changed successfully. ";
				}
			}
		}

		if($user->type == "admin" || ($eval->evaluator_id == $user->id && $eval->status == "pending")){
			if($request->has("evaluation_subject") && $request->input("evaluation_subject") != ""){
				$newSubject = User::find($request->input("evaluation_subject"));
				if($newSubject == null)
					$errors .= "Subject does not exist. ";
				elseif($newSubject->type != $eval->form->type)
					$errors .= "Subject is not correct account type. ";
				else{
					$eval->subject_id = $newSubject->id;
					$eval->save();
					$successes .= "Subject changed successfully. ";
				}
			}

			if($request->has("evaluation_form") && $request->input("evaluation_form") != ""){
				$newForm = Form::find($request->input("evaluation_form"));
				if($newForm == null)
					$errors .= "Form does not exist. ";
				elseif($newForm->type != $eval->form->type)
					$errors .= "Form is not correct type. ";
				elseif($eval->responses->count() != 0 || $eval->textResponses->count() != 0)
					$errors .= "Cannot change form for evaluation with saved responses. Please create a new evaluation. ";
				else{
					$eval->form_id = $newForm->id;
					$eval->save();
					$successes .= "Form changed successfully. ";
				}
			}
			if($successes == "" && $errors == "")
				return back()->with("info", "There is nothing to be done.");

			return back()->with("success", $successes)->with("error", $errors);
		}
		return back()->with("error", "You do not have permission to edit this evaluation.");
	}

	public function flagEvaluation($id, Request $request){
		$user = Auth::user();
		$eval = Evaluation::find($id);
		if($eval->evaluator_id == $user->id && in_array($eval->status, ["complete", "pending"])
				&& $request->has("requested_action") && $request->has("reason")){
			$flag = FlaggedEvaluation::firstOrNew(["evaluation_id" => $eval->id]);
			$flag->requested_action = $request->input("requested_action");
			$flag->reason = $request->input("reason");
			$flag->save();
			try{
				$flaggedActions = Setting::get("flaggedActions");

				$data = [];
				$data["flaggerName"] = $user->full_name;
				$data["evaluationId"] = $eval->id;
				$data["requestedAction"] = $actionText[$flag->requested_action];
				$data["reason"] = $flag->reason;
				$data["now"] = Carbon::now();

				Mail::send("emails.flag", $data, function($message){
					$message->to(env("ADMIN_EMAIL"));
					$message->from("flag@residentprogram.com");
					$message->subject("Flagged evaluation");
				});
			} catch (\Exception $e){
				Log::error("Problem sending email: ".$e);
			}
			return back()->with("success", "Your request has been saved, an administrator will review the evaluation shortly.");
		}
		return back()->with("error", "There was an error saving your request.");
	}

	public function removeFlag(Request $request){
		$user = Auth::user();
		if(!$request->has("id"))
			return "Flag does not exist";
		$flag = FlaggedEvaluation::find($request->input("id"));
		if($user->type == "admin" && $flag != null){
			$flag->delete();
			return "success";
		}

		return "Error removing flag";
	}

    public function evaluations(Request $request){
        $user = Auth::user();
        $results["data"] = [];
        if($user->type == "admin"){
            $evaluations = Evaluation::with("subject", "evaluator", "form")->whereHas("form", function($query){
                $query->whereIn("type", ["resident", "fellow"]);
            })->get();
            foreach($evaluations as $eval){
				try{
	                $result = [];
	                $result[] = "<a href='/evaluation/{$eval->id}'>{$eval->id}</a>";
	                $result[] = $eval->subject->full_name;
	                $result[] = $eval->evaluator->full_name;
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
				catch(\Exception $e){
					Log::error("Problem with evaluation: ".$e);
				}
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
                })->with("subject", "evaluator", "form")->whereHas("form", function($query){
                    $query->whereIn("type", ["resident", "fellow"]);
                })->get();
            foreach($evaluations as $eval){
				try{
	                $result = [];
	                $result[] = "<a href='/evaluation/{$eval->id}'>{$eval->id}</a>";
	                if($eval->subject_id == $user->id || $type == "mentor")
	                    $result[] = $eval->evaluator->full_name;
	                else
	                    $result[] = $eval->subject->full_name;
	                $result[] = $eval->form->title;
	                $result[] = (string)$eval->request_date;
	                if($type == "complete" || $type == "mentor")
	                    $result[] = (string)$eval->complete_date;
	                if($type == "pending"){
	                    if($eval->requested_by_id == $user->id){
	                        $result[] = "<button id='cancel-{$eval->id}' class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='{$eval->id}'>".
	                        "<span class='glyphicon glyphicon-remove'></span> Cancel</button>";
	                    }
	                    else
	                        $result[] = "";
	                } else{

	                }
	                $results["data"][] = $result;
				}
				catch(\Exception $e){
					Log::error("Problem with evaluation: ".$e);
				}
            }
        }
        return json_encode($results);
    }

	public function flaggedEvaluations(Request $request){
		$user = Auth::user();
		$results["data"] = [];
		$evaluations = Evaluation::has("flag")->with("flag")->get();

		$flaggedActions = Setting::get("flaggedActions");

		foreach($evaluations as $eval){
			try{
				$result = [];
				$result[] = "<a href='/evaluation/{$eval->id}'>{$eval->id}</a>";
				$result[] = $eval->evaluator->full_name;
				$result[] = $eval->subject->full_name;
				$result[] = $flaggedActions[$eval->flag->requested_action];
				$result[] = $eval->flag->reason;
				$result[] = "<button type='button' class='remove-flag btn btn-primary btn-xs' data-id='{$eval->flag->id}'><span class='glyphicon glyphicon-ok'></span> Complete</button>";
				$results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with flagged evaluation: ".$e);
			}
		}
		return json_encode($results);
	}

    public function facultyEvaluations(Request $request){
        $user = Auth::user();
        $results["data"] = [];
        if($user->type == "admin")
            $evaluations = Evaluation::with("subject", "evaluator", "form")->whereHas("form", function($query){
                $query->where("type", "faculty");
            })->get();
        elseif($user->type == "faculty"){
            $threshold = Setting::get("facultyEvalThreshold");
            $evaluations = Evaluation::where("subject_id", $user->id)->where("status", "complete")->orderBy("id", "desc")->get();
			if($evaluations->count() > 0)
            	$evaluations = $evaluations->splice($evaluations->count()%$threshold);
        }
        elseif($user->type == "resident"){
            $evaluations = Evaluation::with("subject", "evaluator", "form")->where("status", "pending")->where("evaluator_id", $user->id)->whereHas("form", function($query){
                $query->where("type", "faculty");
            })->get();
        }

        foreach($evaluations as $eval){
			try{
	            $result = [];
	            $result[] = "<a href='/evaluation/{$eval->id}'>{$eval->id}</a>";
	            if($user->type == "admin"){
	                $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
	                $result[] = $eval->evaluator->last_name.", ".$eval->evaluator->first_name;
	                $result[] = (string)$eval->request_date;
	                $result[] = (string)$eval->complete_date;
	            }
	            elseif($user->type == "resident"){
	                $result[] = $eval->subject->last_name.", ".$eval->subject->first_name;
	                $result[] = (string)$eval->request_date;
	            }
	            if($user->type == "admin" || $user->type == "faculty"){
	                if(isset($eval->evaluation_date))
	                    $result[] = $eval->evaluation_date->format("F Y");
	                else
	                    $result[] = "";
	            }
	            if($user->type == "admin"){
	                $result[] = "";
	            }

	            $results["data"][] = $result;
			}
			catch(\Exception $e){
				Log::error("Problem with faculty evaluation: ".$e);
			}
        }
        return json_encode($results);
    }

    public function user(){
		$user = Auth::user();
		$frequency = $user->reminder_frequency;
		$onlyIfPending = $user->remind_only_if_pending;
		$notifications = $user->notifications;
		$data = compact("frequency", "onlyIfPending", "notifications");
        return view("dashboard.user", $data);
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
		if($request->has("only_if_pending"))
			$user->remind_only_if_pending = $request->input("only_if_pending");
		else
			$user->remind_only_if_pending = "no";
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
			Log::error("Problem sending email: ".$e);
        }
        return redirect("dashboard")->with("success", "Thank you! Your message has been receieved and I will get back to you shortly");
    }

}
