<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use DB;
use Log;
use Session;

use Auth;
use DateTime;
use DateInterval;
use Debugbar;
use Mail;
use PDF;

use App\Helpers\RadarGraphs;

use App\Milestone;
use App\Competency;
use App\User;
use App\Form;

class ReportController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["specific", "getPDF"]]);
    }

    public function stats($type){
        switch($type){
            case "faculty":
                $users = User::where("status", "active")->where("type", "faculty")->orderBy("last_name")->get();
                break;
            case "resident":
                $users = User::where("status", "active")->where("type", "resident")->where("training_level", "!=", "fellow")->orderBy("last_name")->get();
                break;
            case "fellow":
                $users = User::where("status", "active")->where("type", "resident")->where("training_level", "fellow")->orderBy("last_name")->get();
                break;
        }
        $data = compact("type", "users");
        return view("report.stats", $data);
    }

    public function getStats(Request $request, $type){
		if($request->has("startDate")){
			$startDate = Carbon::parse($request->input("startDate"));
			$startDate->timezone = "America/Chicago";
		}
		if($request->has("endDate")){
	        $endDate = Carbon::parse($request->input("endDate"));
	        $endDate->timezone = "America/Chicago";
		}

        if($request->input("user") && $request->input("user") != "all"){
            $users = User::where("id", $request->input("user"))->get();
        } else{
            switch($type){
                case "faculty":
                    $users = User::where("status", "active")->where("type", "faculty")->with("evaluatorEvaluations.form")->get();
                    break;
                case "resident":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "!=", "fellow")->with("subjectEvaluations.form")->get();
                    break;
                case "fellow":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "fellow")->with("subjectEvaluations.form")->get();
                    break;
            }
        }
        foreach($users as $user){
            try{

                $userEvaluations = $type == "faculty" ? $user->evaluatorEvaluations() : $user->subjectEvaluations();
                if(!empty($startDate))
                    $userEvaluations->where("evaluation_date", ">=", $startDate);
                if(!empty($endDate))
                    $userEvaluations->where("evaluation_date", "<=", $endDate);

                $userEvaluations->whereIn("status", ["pending", "complete"])
                    ->whereHas("form", function($query){
                        $query->whereIn("type", ["resident", "fellow"])
                            ->where("evaluator_type", "faculty");
                    });

                $userEvals = $userEvaluations->get();

                if($type == "faculty"){
                    if($userEvals->count() == 0)
                        $noneRequested[] = $user->full_name;
                    if($userEvals->where("status", "complete")->count() == 0)
                        $noneCompleted[] = $user->full_name;
                    $eval = $userEvals->where("status", "complete")
                        ->sortByDesc("complete_date")->first();
                    if(!empty($eval))
                        $lastCompleted[$user->full_name] = $eval->complete_date;

                    $time = 0;
                }
                else{
                    if($userEvals->count() == 0)
                        $noneRequested[] = $user->full_name;
                    if($userEvals->where("status", "complete")->count() == 0)
                        $noneCompleted[] = $user->full_name;
                    $eval = $userEvals->where("status", "complete")
                        ->sortByDesc("complete_date")->first();
                    if(!empty($eval))
                        $lastCompleted[$user->full_name] = $eval->complete_date;
                }


                $userStats[] = [
                    "id" => $user->id,
                    "name" => $user->full_name,
                    "requested" => $userEvals->whereLoose("requested_by_id", $user->id)->count(),
                    "totalRequests" => $userEvals->count(),
                    "completed" => $userEvals->where("status", "complete")->count(),
                    "ratio" => $userEvals->count() == 0 ? 0 : round(($userEvals->where("status", "complete")->count()/$userEvals->count()) * 100)
                ];

                // Line chart
                if(count($users) == 1){
                    $statEvalData = $userEvaluations->get([
                        "id",
                        "request_date",
                        "complete_date",
                        "status"
                    ])->toArray();
                }

                if($type == "faculty"){
                    $timeEvals = $userEvaluations->where("status", "complete")->get();
                    foreach($timeEvals as $eval){
                        $time += $eval->complete_date->getTimestamp()-$eval->request_date->getTimestamp();
                    }
                    $num = $timeEvals->count();
                    if($time > 0 && $num > 0)
                        $time = round($time/$num);
                    $d1 = new DateTime();
                    $d2 = new DateTime();
                    $d2->add(new DateInterval("PT".$time."S"));
                    $times[$user->full_name] = $d2->diff($d1)->format("%a days %H hours");
                }
            } catch(\Exception $e){
                Log::error("Problem with user in stats: ".$e);
            }
        }
        $data = compact("users", "type", "startDate", "endDate", "noneRequested",
            "noneCompleted", "lastCompleted", "userStats", "statEvalData");
        if($type == "faculty")
            $data["averageCompletionTimes"] = $times;
        return view("report.get-stats", $data);
    }

    public function needsEvaluations(){
        $milestones = Milestone::all();
        $competencies = Competency::all();
        $data = compact("milestones", "competencies");
        return view("report.needs-eval", $data);
    }

    function getUsersNeedingEvaluations($startDate, $endDate, $trainingLevel, $evalThreshold){
        $getQueriedEvaluations = function($query)
                use ($startDate, $endDate, $trainingLevel, $evalThreshold){
            $query->where("evaluation_date", ">=", $startDate)
                ->where("evaluation_date", "<=", $endDate);
            if($trainingLevel != "all")
                $query->where("training_level", $trainingLevel);
        };

        $needsEvals = User::where("type", "resident")->where("status", "active");
        if($trainingLevel != "all")
            $needsEvals->where("training_level", $trainingLevel);

        if($evalThreshold != "all")
            $needsEvals->whereHas("subjectEvaluations", $getQueriedEvaluations, "<", $evalThreshold);

        return $needsEvals->with(["subjectEvaluations" => $getQueriedEvaluations])->get();
    }

    public function getNeedsEvaluations(Request $request){
        $startDate = Carbon::parse($request->input("startDate"));
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";
        $trainingLevel = $request->input("trainingLevel");
        $evalThreshold = $request->input("evalThreshold");

        $usersNeedingEvals = $this->getUsersNeedingEvaluations($startDate, $endDate, $trainingLevel, $evalThreshold);

        $results["data"] = [];
        foreach($usersNeedingEvals as $user){
            $result = [];
            $result[] = $user->profile_link;
            $count = $user->subjectEvaluations->count();
            $result[] = $count;
            $result[] = "<button type='button' class='btn btn-xs btn-info send-user-reminder' "
                . "data-id='{$user->id}' data-first='{$user->first_name}' "
                . "data-last='{$user->last_name}' data-email='{$user->email}' "
                . "data-count='{$count}'>"
                . "<span class='glyphicon glyphicon-send'></span> Send reminder"
                . "</button>";
            $results["data"][] = $result;
        }

        return response()->json($results);
    }

    public function getNeedsCompetencies(Request $request){
        $startDate = Carbon::parse($request->input("startDate"));
		$startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";
		$trainingLevel = $request->input("trainingLevel");

        $results = [];
        $query = DB::table("responses")
            ->join("evaluations", "responses.evaluation_id", "=", "evaluations.id")
            ->join("competencies_questions", function($join){
                $join->on("competencies_questions.form_id", "=", "evaluations.form_id")
                    ->on("competencies_questions.question_id", "=", "responses.question_id");
            })
            ->join("competencies", "competencies.id", "=", "competencies_questions.competency_id")
            ->join("users", "users.id", "=", "evaluations.subject_id")
            ->where("users.status", "active")
            ->where("users.type", "resident")
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date", ">=", $startDate)
            ->where("evaluations.evaluation_date", "<=", $endDate);

        if($trainingLevel != "all")
			$query->where("evaluations.training_level", $trainingLevel);

		$query->select("subject_id", "competency_id")
            ->orderBy("competency_id", "asc")
            ->chunk(10000, function($responses) use (&$results){
                foreach($responses as $response){
                    $results[$response->subject_id][$response->competency_id] = true;
                }
            });

        return $results;
    }

    public function getNeedsCompetenciesJSON(Request $request){
        $competencies = Competency::lists("id");
        $residentsQuery = User::where("type", "resident")->where("status", "active");
        if($request->input("trainingLevel") != "all")
            $residentsQuery->where("training_level", $request->input("trainingLevel"));
        $residents = $residentsQuery->get();
        $results["data"] = [];
        $evaluations = $this->getNeedsCompetencies($request);
        foreach($residents as $resident){
            $result = [];
            $result[] = $resident->full_name;
            foreach($competencies as $competency){
                if(isset($evaluations[$resident->id][$competency]))
                    $result[] = "<span class='glyphicon glyphicon-ok'></span>";
                else
                    $result[] = "<span class='glyphicon glyphicon-remove'></span>";
            }
            $results["data"][] = $result;
        }
        return response()->json($results);
    }

    public function getNeedsCompetenciesTSV(Request $request){
        $tsv = "";
        $competencies = Competency::all();
        $residentsQuery = User::where("type", "resident")->where("status", "active");
        if($request->input("trainingLevel") != "all")
            $residentsQuery->where("training_level", $request->input("training_level"));
        $residents = $residentsQuery->get();
        $evaluations = $this->getNeedsCompetencies($request);
        $tsv .= "Resident/Fellow\t";
        foreach($competencies as $competency)
            $tsv .= $competency->title."\t";
        $tsv .= "\n";

        foreach($residents as $resident){
            $tsv .= $resident->full_name."\t";
            foreach($competencies as $competency){
                if(isset($evaluations[$resident->id][$competency->id]))
                    $tsv .= "Y\t";
                else
                    $tsv .= "N\t";
            }
            $tsv .= "\n";
        }

        $filename = "Needs Competencies ".Carbon::now()->toDateTimeString().".tsv";

        return response($tsv)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    public function getNeedsMilestones(Request $request){
		$startDate = Carbon::parse($request->input("startDate"));
		$startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";
		$trainingLevel = $request->input("trainingLevel");

        $results = [];
        $query = DB::table("responses")
            ->join("evaluations", "responses.evaluation_id", "=", "evaluations.id")
            ->join("milestones_questions", function($join){
                $join->on("milestones_questions.form_id", "=", "evaluations.form_id")
                    ->on("milestones_questions.question_id", "=", "responses.question_id");
            })
            ->join("milestones", "milestones.id", "=", "milestones_questions.milestone_id")
            ->join("users", "users.id", "=", "evaluations.subject_id")
            ->where("users.status", "active")
            ->where("users.type", "resident")
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date", ">=", $startDate)
            ->where("evaluations.evaluation_date", "<=", $endDate);

		if($trainingLevel != "all")
			$query->where("evaluations.training_level", $trainingLevel);

		$query->select("subject_id", "milestone_id")
            ->orderBy("milestone_id", "asc")
            ->chunk(10000, function($responses) use (&$results){
                foreach($responses as $response){
                    $results[$response->subject_id][$response->milestone_id] = true;
                }
            });

        return $results;
    }

    public function getNeedsMilestonesJSON(Request $request){
        $milestones = Milestone::lists("id");
        $residentsQuery = User::where("type", "resident")->where("status", "active");
		if($request->input("trainingLevel") != "all")
			$residentsQuery->where("training_level", $request->input("trainingLevel"));
		$residents = $residentsQuery->get();
        $results["data"] = [];
        $evaluations = $this->getNeedsMilestones($request);
        foreach($residents as $resident){
            $result = [];
            $result[] = $resident->full_name;
            foreach($milestones as $milestone){
                if(isset($evaluations[$resident->id][$milestone]))
                    $result[] = "<span class='glyphicon glyphicon-ok'></span>";
                else
                    $result[] = "<span class='glyphicon glyphicon-remove'></span>";
            }
            $results["data"][] = $result;
        }

        return response()->json($results);
    }

    public function getNeedsMilestonesTSV(Request $request){
        $tsv = "";
        $milestones = Milestone::all();
		$residentsQuery = User::where("type", "resident")->where("status", "active");
		if($request->input("trainingLevel") != "all")
			$residentsQuery->where("training_level", $request->input("trainingLevel"));
		$residents = $residentsQuery->get();
        $evaluations = $this->getNeedsMilestones($request);
        $tsv .= "Resident/Fellow\t";
        foreach($milestones as $milestone)
            $tsv .= $milestone->title."\t";
        $tsv .= "\n";

        foreach($residents as $resident){
            $tsv .= $resident->full_name."\t";
            foreach($milestones as $milestone){
                if(isset($evaluations[$resident->id][$milestone->id]))
                    $tsv .= "Y\t";
                else
                    $tsv .= "N\t";
            }
            $tsv .= "\n";
        }

        $filename = "Needs Milestones ".Carbon::now()->toDateTimeString().".tsv";

        return response($tsv)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    public function sendNeedsEvaluationReminder(Request $request){
        try{
            $user = Auth::user();
            $remindedUser = User::findOrFail($request->input("id"));
            $subject = $request->input("subject");
            $body = $request->input("body");
            Mail::send([], [], function($message)
                    use ($user, $remindedUser, $subject, $body){
                $message->from("reminders@residentprogram.com", "ResidentProgram Reminders");
                $message->replyTo($user->email);
                $message->to($remindedUser->email);
                $message->subject($subject);
                $message->setBody($body, "text/html");
            });
            return "success";
        } catch (ModelNotFoundException $e){
            Log::error("User not found in sendNeedsEvaluationReminder: " . $e);
        } catch (\Swift_TransportException $e){
            Log::error("Error sending mail: " . $e);
        } catch (\Exception $e){
            Log::error($e);
        }
    }

    public function sendAllNeedsEvaluationReminders(Request $request){
        $user = Auth::user();
        $evalsRequired = $request->input("evalsRequired");
        $subject = $request->input("subject");
        $bodyTemplate = $request->input("body");
        $usersNeedingEvals = $request->input("users");

        $namePlaceholder = '<span class="label label-info">Name</span>';
        $numCompletedPlaceholder = '<span class="label label-info"># Completed</span>';
        $numNeededPlaceholder = '<span class="label label-info"># Needed</span>';

        $sentUsers = [];
        foreach($usersNeedingEvals as $remindedUser){
            try{
                $numCompleted = $remindedUser["numCompleted"];
                $remindedUser = User::findOrFail($remindedUser["id"]);
                $body = str_replace($namePlaceholder, $remindedUser->last_name, $bodyTemplate);
                $body = str_replace($numCompletedPlaceholder, $numCompleted, $body);
                $body = str_replace($numNeededPlaceholder, $evalsRequired - $numCompleted, $body);

                Mail::send([], [], function($message)
                        use ($user, $remindedUser, $subject, $body){
                    $message->from("reminders@residentprogram.com", "ResidentProgram Reminders");
                    $message->replyTo($user->email);
                    $message->to($remindedUser->email);
                    $message->subject($subject);
                    $message->setBody($body, "text/html");
                });
                $sentUsers[] = $remindedUser->id;
            } catch (ModelNotFoundException $e){
                Log::error("User not found in sendNeedsEvaluationReminder: " . $e);
            } catch (\Swift_TransportException $e){
                Log::error("Error sending mail: " . $e);
            } catch (\Exception $e){
                Log::error($e);
            }
        }
        return response()->json($sentUsers);
    }

    public function getTSV(Request $request){
        $filename = $request->input("name")." ".Carbon::now()->toDateTimeString().".tsv";

        return response($request->input("data"))
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

	public function getPDF(Request $request){
		$filename = $request->input("name").".pdf";


		$data = $request->input("data");
		$data = str_replace("/graph/", storage_path("app/graphs/"), $data);
		$data .= "<style>table { border-collapse: collapse; } table, td, th { border: 1px solid black; }</style>";
		$data = '<div class="container body-block">'. $data . '</div>';

		return PDF::loadHTML($data)->download($filename);
	}

    public function milestonesCompetenciesForms(){
        $forms = Form::where("status", "active")->get();
        $data = compact("forms");
        return view("report.milestones-competencies-forms", $data);
    }

    public function getMilestonesCompetenciesForms($type){
        if($type == "milestones")
            $things = Milestone::with("forms")->get();
        elseif($type == "competencies")
            $things = Competency::with("forms")->get();

        $forms = Form::where("status", "active")->get();

        $results["data"] = [];

        foreach($things as $thing){
            $result = [];
            $result[] = $thing->title;
            $thingForms = $thing->forms;
            foreach($forms as $form){
                if($thingForms->contains($form))
                    $result[] = "<span class='glyphicon glyphicon-ok'></span>";
                else
                    $result[] = "<span class='glyphicon glyphicon-remove'></span>";
            }
            $results["data"][] = $result;
        }

        return response()->json($results);
    }

    public function exportMilestonesCompetenciesForms($type){
        $forms = Form::where("status", "active")->get();
        if($type == "milestones")
            $things = Milestone::with("forms")->get();
        elseif($type == "competencies")
            $things = Competency::with("forms")->get();

        $tsv = ucfirst($type)."\t";
        foreach($forms as $form){
            $tsv .= $form->title."\t";
        }
        foreach($things as $thing){
            $tsv .= "\n".$thing->title."\t";
            $thingForms = $thing->forms;
            foreach($forms as $form){
                if($thingForms->contains($form))
                    $tsv .= "Y\t";
                else
                    $tsv .= "N\t";
            }
        }
        $filename = ucfirst($type)."-Forms ".Carbon::now()->toDateTimeString().".tsv";
        return response($tsv)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    function sd_square($x, $mean) {
	// Function to calculate square of value - mean
		return pow($x - $mean,2);
	}


	function sd($array) {
	// Function to calculate standard deviation (uses sd_square)

		// square root of sum of squares devided by N-1
		return sqrt(array_sum(array_map(array($this, "sd_square"), $array, array_fill(0,count($array), (array_sum($array) / count($array)) ) ) ) / (count($array)-1) );
	}

    public function report($startDate, $endDate, $trainingLevel, $graphOption, $graphOrientation, $reportSubject, $milestones){
        // TODO: Add "Evals Requested" to report somehow
        $startDate = Carbon::parse($startDate);
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($endDate);
        $endDate->timezone = "America/Chicago";

        // $redStd = 1;
        // $yellowStd = 0.75;
        // $greenStd = 0.5;

        $query = DB::table("responses")
            ->join("evaluations", "evaluations.id", "=", "responses.evaluation_id")
            ->join("milestones_questions", function($join){
                $join->on("milestones_questions.question_id", "=", "responses.question_id")
                    ->on("milestones_questions.form_id", "=", "evaluations.form_id");
            })
            ->join("milestones", "milestones.id", "=", "milestones_questions.milestone_id")
            ->join("competencies_questions", function($join){
                $join->on("competencies_questions.question_id", "=", "responses.question_id")
                    ->on("competencies_questions.form_id", "=", "evaluations.form_id");
            })
            ->join("competencies", "competencies.id", "=", "competencies_questions.competency_id")
            ->join("forms", "forms.id", "=", "evaluations.form_id")
            ->join("users", "users.id", "=", "evaluations.subject_id")
            // ->where("users.status", "active")
            // ->where("users.type", "resident")
            ->whereIn("forms.type", ["resident", "fellow"])
            ->whereIn("forms.evaluator_type", ["faculty"])
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date", ">=", $startDate)
            ->where("evaluations.evaluation_date", "<=", $endDate);

        if(!empty($milestones))
            $query->whereIn("milestones.id", $milestones);

        if($trainingLevel != "all")
            $query->where("evaluations.training_level", $trainingLevel);

        $averageMilestone = [];
        $averageMilestoneDenom = [];
        $milestoneStd = [];
        $averageCompetency = [];
        $averageCompetencyDenom = [];
        $competencyStd = [];

        $subjectMilestone = [];
        $subjectMilestoneDenom = [];
        $subjectMilestoneEvals = [];
        $subjectCompetency = [];
        $subjectCompetencyDenom = [];
        $subjectCompetencyEvals = [];

        $milestones = [];
        $competencies = [];
        $subjectEvals = [];
        $subjectRequests = [];
        $subjectEvaluators = [];
        $competencyQuestions = [];

        $subjects = [];

        $query->select("milestone_id", "milestones.title as milestone_title", "competency_id", "competencies.title as competency_title")
            ->addSelect("subject_id", "evaluator_id", "last_name", "first_name", "evaluation_id", "response", "weight", "responses.question_id as question_id")
            ->orderBy("milestones.title")->orderBy("competencies.title");
        Debugbar::info($query->toSql());
        $query->chunk(20000, function($responses) use (&$milestones, &$subjects, &$milestones, &$competencies, &$subjectEvals, &$subjectRequests, &$subjectRequests, &$averageMilestone, &$averageMilestoneDenom, &$averageCompetency, &$averageCompetencyDenom, &$subjectMilestone, &$subjectMilestoneDenom, &$subjectMilestoneEvals, &$subjectCompetency, &$subjectCompetencyDenom, &$subjectCompetencyEvals, &$competencyQuestions, &$subjectEvaluators){
            foreach($responses as $response){
                if(!isset($subjects[$response->subject_id]))
                    $subjects[$response->subject_id] = $response->last_name.", ".$response->first_name;
                if(!isset($subjectRequests[$response->subject_id]))
                    $subjectRequests[$response->subject_id] = [];

                if(!isset($subjectEvals[$response->subject_id][$response->evaluation_id]))
                    $subjectEvals[$response->subject_id][$response->evaluation_id] = 0;
                if(!isset($subjectMilestoneEvals[$response->subject_id][$response->milestone_id]))
                    $subjectMilestoneEvals[$response->subject_id][$response->milestone_id] = 0;
                if(!isset($subjectCompetencyEvals[$response->subject_id][$response->competency_id]))
                    $subjectCompetencyEvals[$response->subject_id][$response->competency_id] = 0;
                if(!isset($subjectEvaluators[$response->subject_id][$response->evaluator_id]))
                    $subjectEvaluators[$response->subject_id][$response->evaluator_id] = 1;

                if(!isset($averageMilestone[$response->milestone_id]))
                    $averageMilestone[$response->milestone_id] = 0;
                if(!isset($averageMilestoneDenom[$response->milestone_id]))
                    $averageMilestoneDenom[$response->milestone_id] = 0;
                if(!isset($subjectMilestone[$response->subject_id][$response->milestone_id]))
                    $subjectMilestone[$response->subject_id][$response->milestone_id] = 0;
                if(!isset($subjectMilestoneDenom[$response->subject_id][$response->milestone_id]))
                    $subjectMilestoneDenom[$response->subject_id][$response->milestone_id] = 0;

                if(!isset($averageCompetency[$response->competency_id]))
                    $averageCompetency[$response->competency_id] = 0;
                if(!isset($averageCompetencyDenom[$response->competency_id]))
                    $averageCompetencyDenom[$response->competency_id] = 0;
                if(!isset($subjectCompetency[$response->subject_id][$response->competency_id]))
                    $subjectCompetency[$response->subject_id][$response->competency_id] = 0;
                if(!isset($subjectCompetencyDenom[$response->subject_id][$response->competency_id]))
                    $subjectCompetencyDenom[$response->subject_id][$response->competency_id] = 0;

                $subjectEvals[$response->subject_id][$response->evaluation_id]++;
                $subjectMilestoneEvals[$response->subject_id][$response->milestone_id]++;
				if(!isset($competencyEvals[$response->competency_id][$response->evaluation_id]))
                	$subjectCompetencyEvals[$response->subject_id][$response->competency_id]++;

                // Weighted average = sum(response*weight)/sum(weight)
                $milestones[$response->milestone_id] = $response->milestone_title;
                $averageMilestone[$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $averageMilestoneDenom[$response->milestone_id] += floatval($response->weight);
                $subjectMilestone[$response->subject_id][$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $subjectMilestoneDenom[$response->subject_id][$response->milestone_id] += floatval($response->weight);

                // Ensure questions with multiple milestones aren't counted twice for competencies
                if(isset($competencyQuestions[$response->evaluation_id][$response->question_id]))
                    continue;
				$competencyQuestions[$response->evaluation_id][$response->question_id] = true;
				$competencyEvals[$response->competency_id][$response->evaluation_id] = true;
                $competencies[$response->competency_id] = $response->competency_title;
                $averageCompetency[$response->competency_id] += (floatval($response->response)*floatval($response->weight));
                $averageCompetencyDenom[$response->competency_id] += floatval($response->weight);
                $subjectCompetency[$response->subject_id][$response->competency_id] += (floatval($response->response)*floatval($response->weight));
                $subjectCompetencyDenom[$response->subject_id][$response->competency_id] += floatval($response->weight);
            }
        });

        foreach($milestones as $milestone => $title){
            if($averageMilestoneDenom[$milestone])
                $averageMilestone[$milestone] = $averageMilestone[$milestone]/$averageMilestoneDenom[$milestone];
            else
                $averageMilestone[$milestone] = 0;

            foreach($subjects as $subject => $name){
                if(count($subjectEvals[$subject]) > 0){
                    // Standard deviation uses array[milestone][resident] while graph uses array[resident][milestone]
                    if(isset($subjectMilestoneDenom[$subject][$milestone]) && $subjectMilestoneDenom[$subject][$milestone])
                        $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = $subjectMilestone[$subject][$milestone]/$subjectMilestoneDenom[$subject][$milestone];
                    else
                        $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = 0;
                }
            }
            if(count($milestoneSubject[$milestone]) > 1){
                $milestoneStd[$milestone] = $this->sd($milestoneSubject[$milestone]);
                foreach($subjects as $subject => $name){
                    if(count($subjectEvals[$subject]) > 0){
    					if($milestoneStd[$milestone] == 0)
    						$subjectMilestoneDeviations[$subject][$milestone] = 0;
                        else // Num standard deviations = ((subject weighted average)-(milestone weighted average))/(standard deviation of subject averages)
                        	$subjectMilestoneDeviations[$subject][$milestone] = ($subjectMilestone[$subject][$milestone]-$averageMilestone[$milestone])/$milestoneStd[$milestone];
                    }
                }
            }
			else{
				foreach($subjects as $subject => $name){
                    if(count($subjectEvals[$subject]) > 0){
                        $subjectMilestoneDeviations[$subject][$milestone] = 0;
                    }
				}
			}
        }

        foreach($competencies as $competency => $title){
            if($averageCompetencyDenom[$competency])
                $averageCompetency[$competency] = $averageCompetency[$competency]/$averageCompetencyDenom[$competency];
            else
                $averageCompetency[$competency] = 0;

            foreach($subjects as $subject => $name){
                if(count($subjectEvals[$subject]) > 0){
                    // Standard deviation uses array[competency][resident] while graph uses array[resident][competency]
                    if(isset($subjectCompetencyDenom[$subject][$competency]) && $subjectCompetencyDenom[$subject][$competency])
                        $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = $subjectCompetency[$subject][$competency]/$subjectCompetencyDenom[$subject][$competency];
                    else
                        $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = 0;
                }
            }
            if(count($competencySubject[$competency]) > 1){
                $competencyStd[$competency] = $this->sd($competencySubject[$competency]);
                foreach($subjects as $subject => $name){
                    if(count($subjectEvals[$subject]) > 0){
    					if($competencyStd[$competency] == 0)
    						$subjectCompetencyDeviations[$subject][$competency] = 0;
    					else // Num standard deviations = ((subject weighted average)-(competency weighted average))/(standard deviation of subject averages)
                        	$subjectCompetencyDeviations[$subject][$competency] = ($subjectCompetency[$subject][$competency]-$averageCompetency[$competency])/$competencyStd[$competency];
                    }
                }
            }
			else{
				foreach($subjects as $subject => $name){
                    if(count($subjectEvals[$subject]) > 0){
                        $subjectCompetencyDeviations[$subject][$competency] = 0;
                    }
				}
			}
        }

        $reqQuery = DB::table("evaluations")
            ->join("forms", "forms.id", "=", "evaluations.form_id")
            ->join("users", "users.id", "=", "evaluations.subject_id")
            ->whereIn("forms.type", ["resident", "fellow"])
            ->whereIn("forms.evaluator_type", ["faculty"])
            ->whereIn("evaluations.status", ["pending", "complete"])
            ->where("evaluations.evaluation_date", ">=", $startDate)
            ->where("evaluations.evaluation_date", "<=", $endDate);

        if($trainingLevel != "all")
            $reqQuery->where("evaluations.training_level", $trainingLevel);

        $reqQuery->select("subject_id", "evaluator_id", "requested_by_id",
            "last_name", "first_name", "evaluations.id as evaluation_id");
        $reqQuery->chunk(20000, function($evaluations) use (&$subjects, &$subjectRequests, &$subjectEvals, &$subjectEvaluators){
            foreach($evaluations as $evaluation){
                if(!isset($subjects[$evaluation->subject_id]))
                    $subjects[$evaluation->subject_id] = $evaluation->last_name . ", " . $evaluation->first_name;
                if(!isset($subjectEvals[$evaluation->subject_id]))
                    $subjectEvals[$evaluation->subject_id] = [];
                if(!isset($subjectEvaluators[$evaluation->subject_id]))
                    $subjectEvaluators[$evaluation->subject_id] = [];
                if(!isset($subjectRequests[$evaluation->subject_id]))
                    $subjectRequests[$evaluation->subject_id] = [];

                if($evaluation->subject_id == $evaluation->requested_by_id)
                    $subjectRequests[$evaluation->subject_id][$evaluation->evaluation_id] = 1;
            }
        });

        if(isset($reportSubject)){
            $subjects = [];
            $subject = User::find($reportSubject);
            $subjects[$subject->id] = $subject->last_name.", ".$subject->first_name;
        }

        $graphs = [];
        $maxResponse = 10; // assuming

		asort($subjects);
		ksort($averageMilestone);
        ksort($milestones);
        ksort($averageCompetency);
        ksort($competencies);

        switch($graphOption){
            case "all":
                foreach($subjects as $subject => $subject_name){
                    if(!isset($subjectMilestone[$subject]) || !isset($subjectCompetency[$subject]))
                        continue;
                    ksort($subjectMilestone[$subject]);
                    ksort($subjectCompetency[$subject]);
                    $graphs[] = RadarGraphs::draw($subjectMilestone[$subject], $averageMilestone, $milestones, $subjectCompetency[$subject], $averageCompetency, $competencies, $subject_name, $startDate, $endDate, $trainingLevel, $maxResponse, $graphOrientation);
                }
                break;
            case "average":
                $graphs[] = RadarGraphs::draw(null, $averageMilestone, $milestones, null, $averageCompetency, $competencies, "Average", $startDate, $endDate, $trainingLevel, $maxResponse, $graphOrientation);
                break;
        }

        $data = compact("milestones", "competencies", "subjectMilestone",
			"subjectMilestoneDeviations", "subjectMilestoneEvals", "subjectCompetency",
			"subjectCompetencyDeviations", "subjectCompetencyEvals", "subjectEvals", "subjectRequests",
			"graphs", "subjects", "subjectEvaluators", "averageMilestone",
			"averageCompetency", "graphOption", "trainingLevel", "startDate", "endDate");

        if(!is_null($reportSubject)){
            $textQuery = DB::table("text_responses")
                ->join("evaluations", "evaluations.id", "=", "evaluation_id")
                ->join("users", "users.id", "=", "evaluations.evaluator_id")
                ->join("forms", "evaluations.form_id", "=", "forms.id")
                ->where("users.type", "faculty")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date", ">=", $startDate)
                ->where("evaluations.evaluation_date", "<=", $endDate)
                ->where("evaluations.subject_id", $reportSubject)
                ->whereIn("forms.type", ["resident", "fellow"])
                ->whereIn("forms.evaluator_type", ["faculty"]);

            if($trainingLevel != "all")
                $textQuery->where("evaluations.training_level", $trainingLevel);

            $textQuery->select("subject_id", "first_name", "last_name",
                "forms.title as form_title", "evaluation_date", "response");

            $subjectTextResponses = $textQuery->get();

            $data["subjectTextResponses"] = $subjectTextResponses;

            $reportEvaluationsQuery = DB::table("evaluations")
                ->join("users", "users.id", "=", "evaluations.evaluator_id")
                ->join("forms", "evaluations.form_id", "=", "forms.id")
                ->where("users.type", "faculty")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date", ">=", $startDate)
                ->where("evaluations.evaluation_date", "<=", $endDate)
                ->where("evaluations.subject_id", $reportSubject)
                ->whereIn("forms.type", ["resident", "fellow"])
                ->whereIn("forms.evaluator_type", ["faculty"]);

            if($trainingLevel != "all")
                $reportEvaluationsQuery->where("evaluations.training_level", $trainingLevel);

            $reportEvaluationsQuery->select("evaluations.id as evaluation_id", "subject_id",
                "first_name", "last_name", "forms.title as form_title", "evaluation_date");

            $data["subjectReportEvaluations"] = $reportEvaluationsQuery->get();
        }

        return $data;
    }

    public function aggregate(Request $request){
        $data = $this->report($request->input("startDate"), $request->input("endDate"), $request->input("trainingLevel"), $request->input("graphs"), "horizontal", null, $request->input("milestones"));

        return view("report.report", $data);
    }

    public function specific(Request $request){
        $user = Auth::user();
        $resident = User::find($request->input("resident"));
        if(!($resident == $user || $user->isType("admin") || $user->mentees->contains($resident)))
            return back()->with("error", "Requested report not authorized");

        $data = [];

        $input = $request->all();
        foreach($input as $key => $value){
            if(strpos($key, "startDate") !== FALSE){
                $startDates[] = $value;
            } elseif(strpos($key, "endDate") !== FALSE){
                $endDates[] = $value;
            } elseif(strpos($key, "trainingLevel") !== FALSE){
                $trainingLevels[] = $value;
            }
        }

        if(!isset($startDates))
            return back()->with("error", "Please select a starting date for the report");
        if(!isset($endDates))
            return back()->with("error", "Please select an ending date for the report");
        if(!isset($trainingLevels))
            return back()->with("error", "Please select a training level for the report");
        if(!(count($startDates) == count($endDates) && count($endDates) == count($trainingLevels)))
            return back()->with("error", "Please be sure to complete all fields for each report");

        for($i = 0; $i < count($startDates); $i++){
            $data["reportData"][$i] = $this->report($startDates[$i], $endDates[$i], $trainingLevels[$i], $request->input("graphs"), "vertical", $request->input("resident"), $request->input("milestones"));
			$data["reportData"][$i]["startDate"] = Carbon::parse($startDates[$i]);
			$data["reportData"][$i]["endDate"] = Carbon::parse($endDates[$i]);
			$data["reportData"][$i]["trainingLevel"] = $trainingLevels[$i];
        }

		$data["graphOption"] = $request->input("graphs");
		$data["numReports"] = count($startDates);
        $data["specificSubject"] = User::find($request->input("resident"));

		$request->session()->put("individualReportData", $data);

        return view("report.individual", $data);
    }

    public function formReport(Request $request){
        // TODO: Allow not having to select a subject
        $startDate = Carbon::parse($request->input("startDate"));
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";

		$subjectResponses = [];
		$subjectEvals = [];
		$averageResponses = [];
		$averageEvals = [];
		$subjects = [];
		$questions = [];
		$questionResponses = [];
		$subjectResponseValues = [];

		$chunkCallback = function($responses) use(&$subjectResponses, &$subjectEvals, &$averageResponses, &$averageEvals, &$subjects, &$questions, &$questionResponses, &$subjectResponseValues){
            foreach($responses as $response){
                if(!isset($subjectResponses[$response->subject_id][$response->question_id][$response->response]))
                    $subjectResponses[$response->subject_id][$response->question_id][$response->response] = 0;
                if(!isset($averageResponses[$response->question_id][$response->response]))
                    $averageResponses[$response->question_id][$response->response] = 0;

                if(!isset($subjectEvals[$response->subject_id][$response->evaluation_id]))
                    $subjectEvals[$response->subject_id][$response->evaluation_id] = 1;
                if(!isset($averageEvals[$response->evaluation_id]))
                    $averageEvals[$response->evaluation_id] = 1;

                if(!isset($subjects[$response->subject_id]))
                    $subjects[$response->subject_id] = 1;
                if(!isset($questions[$response->question_id]))
                    $questions[$response->question_id] = 1;
                if(!isset($questionResponses[$response->question_id][$response->response]))
                    $questionResponses[$response->question_id][$response->response] = 1;

                $subjectResponses[$response->subject_id][$response->question_id][$response->response]++;
                $subjectResponseValues[$response->subject_id][$response->question_id][$response->evaluation_id] = $response->response;
                $averageResponses[$response->question_id][$response->response]++;
            }
        };

		$query = DB::table("responses")
            ->join("evaluations", "evaluations.id", "=", "evaluation_id")
            ->join("users as evaluators", "evaluators.id", "=", "evaluator_id")
            ->join("users as subjects", "subjects.id", "=", "subject_id")
            ->join("forms", "forms.id", "=", "form_id")
            ->where("evaluations.status", "complete")
            ->where("forms.id", $request->input("form_id"))
            ->where("evaluation_date", ">", $startDate)
            ->where("evaluation_date", "<", $endDate);

		$query->select("evaluation_id", "evaluator_id", "subject_id", "response", "question_id");

    	$query->chunk(10000, $chunkCallback);

        $textQuery = DB::table("text_responses")
            ->join("evaluations", "evaluations.id", "=", "evaluation_id")
            ->join("users as evaluators", "evaluators.id", "=", "evaluator_id")
            ->join("users as subjects", "subjects.id", "=", "subject_id")
            ->join("forms", "forms.id", "=", "form_id")
            ->where("evaluations.status", "complete")
            ->where("forms.id", $request->input("form_id"))
            ->where("evaluation_date", ">=", $startDate)
            ->where("evaluation_date", "<=", $endDate);

        $textQuery->select("evaluation_id", "evaluator_id", "subject_id", "response", "question_id");

    	$textQuery->chunk(10000, $chunkCallback);

        foreach($subjectEvals as $subject_id => $null){
            $subjectEvals[$subject_id] = count($subjectEvals[$subject_id]);
        }
        $averageEvals = count($averageEvals);
        $subjects = array_keys($subjects);
        $questions = array_keys($questions);
        foreach($questions as $question_id){
            $questionResponses[$question_id] = array_keys($questionResponses[$question_id]);
        }

        foreach($questions as $question_id){
            foreach($questionResponses[$question_id] as $response){
                $averagePercentages[$question_id][$response] = round(($averageResponses[$question_id][$response]/$averageEvals)*100);
                foreach($subjects as $subject_id){
                    if(isset($subjectResponses[$subject_id][$question_id][$response]))
                        $subjectPercentages[$subject_id][$question_id][$response] = round(($subjectResponses[$subject_id][$question_id][$response]/$subjectEvals[$subject_id])*100);
                    else{
                        $subjectResponses[$subject_id][$question_id][$response] = 0;
                        $subjectPercentages[$subject_id][$question_id][$response] = 0;
                    }
                }
            }
        }

		$subjectId = $request->input("subject");
		$form = Form::find($request->input("form_id"));
		$subject = User::find($subjectId);
        $subjectName = $subject->full_name;
        $formTitle = $form->title;

		if(!isset($subjectEvals[$subjectId]))
			return back()->with("error", "No completed evaluations for {$subjectName} between {$startDate} and {$endDate} for form {$formTitle}");

        $formPath = $form->xml_path;
        $subjectResponses = $subjectResponses[$subjectId];
        $subjectPercentages = $subjectPercentages[$subjectId];
        $subjectEvals = $subjectEvals[$subjectId];
        $subjectResponseValues = $subjectResponseValues[$subjectId];

        $subjectResponses = $this->encodeAndStrip($subjectResponses);
        $subjectPercentages = $this->encodeAndStrip($subjectPercentages);
        $subjectResponseValues = $this->encodeAndStrip($subjectResponseValues);
        $subjectEvals = $this->encodeAndStrip($subjectEvals);
        $averagePercentages = $this->encodeAndStrip($averagePercentages);
        $averageEvals = $this->encodeAndStrip($averageEvals);
        $subjects = $this->encodeAndStrip($subjects);
        $questions = $this->encodeAndStrip($questions);
        $questionResponses = $this->encodeAndStrip($questionResponses);

        $data = compact("subjectResponses", "formPath", "subjectEvals", "averageEvals",
        	"subjectPercentages", "averagePercentages", "subjectId", "subjects",
			"questions", "questionResponses", "subjectResponseValues", "subjectName",
			"formTitle", "startDate", "endDate");

        return view("report.form-report", $data);
    }

    private function encodeAndStrip($array){
        $array = addslashes(json_encode($array));
        str_replace("'", "", $array);
        return $array;
    }
}
