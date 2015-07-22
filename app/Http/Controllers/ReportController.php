<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use DB;

use DateTime;
use DateInterval;

use App\Milestone;
use App\Competency;
use App\User;
use App\Form;

class ReportController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["specific"]]);
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
        if($request->input("user") && $request->input("user") != "all"){
            $users = User::where("id", $request->input("user"))->get();
        } else{
            switch($type){
                case "faculty":
                    $users = User::where("status", "active")->where("type", "faculty")->get();
                    $times = $users->map(function($user, $key){
                        $time = 0;
                        foreach($user->evaluatorEvaluations()->where("status", "complete")->get() as $eval){
                            $time += $eval->complete_date->getTimestamp()-$eval->request_date->getTimestamp();
                        }
                        $num = $user->evaluatorEvaluations()->where("status", "complete")->count();
                        if($time > 0 && $num > 0)
                            $time = round($time/$num);
                        $d1 = new DateTime();
                        $d2 = new DateTime();
                        $d2->add(new DateInterval("PT".$time."S"));
                        return $d2->diff($d1)->format("%a days %H hours");
                    });
                    break;
                case "resident":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "!=", "fellow")->get();
                    break;
                case "fellow":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "fellow")->get();
                    break;
            }
        }
        $data = compact("users", "type");
        if($type == "faculty")
            $data["times"] = $times;
        return view("report.get-stats", $data);
    }

    public function needsEvaluations(){
        $milestones = Milestone::all();
        $data = compact("milestones");
        return view("report.needs-eval", $data);
    }

    public function getNeedsEvaluations(){
        $results = [];
        DB::table("responses")
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
            ->where("evaluations.request_date", "<", Carbon::now())
            ->where("evaluations.request_date", ">", Carbon::now()->subMonths(6))
            ->select("subject_id", "milestone_id")
            ->orderBy("milestone_id", "asc")
            ->chunk(200, function($responses) use (&$results){
                foreach($responses as $response){
                    $results[$response->subject_id][$response->milestone_id] = true;
                }
            });

        return $results;
    }

    public function getNeedsEvaluationsJSON(){
        $milestones = Milestone::lists("id");
        $residents = User::where("type", "resident")->where("status", "active")->get();
        $results["data"] = [];
        $evaluations = $this->getNeedsEvaluations();
        foreach($residents as $resident){
            $result = [];
            $result[] = $resident->last_name.", ".$resident->first_name;
            foreach($milestones as $milestone){
                if(isset($evaluations[$resident->id][$milestone]))
                    $result[] = "<span class='glyphicon glyphicon-ok'></span>";
                else
                    $result[] = "<span class='glyphicon glyphicon-remove'></span>";
            }
            $results["data"][] = $result;
        }

        return json_encode($results);
    }

    public function getNeedsEvaluationsTSV(){
        $tsv = "";
        $milestones = Milestone::all();
        $residents = User::where("type", "resident")->where("status", "active")->get();
        $evaluations = $this->getNeedsEvaluations();
        $tsv .= "Resident/Fellow\t";
        foreach($milestones as $milestone)
            $tsv .= $milestone->title."\t";
        $tsv .= "\n";

        $milestones = Milestone::lists("id");
        foreach($residents as $resident){
            $tsv .= $resident->last_name.", ".$resident->first_name."\t";
            foreach($milestones as $milestone){
                if(isset($evaluations[$resident->id][$milestone]))
                    $tsv .= "Y\t";
                else
                    $tsv .= "N\t";
            }
            $tsv .= "\n";
        }

        $filename = "Needs Evaluations ".Carbon::now()->toDateTimeString();

        return response($data)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    public function getTSV(Request $request){
        $filename = $request->input("name")." ".Carbon::now()->toDateTimeString();

        return response($request->input("data"))
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    public function milestonesCompetenciesForms(){
        $forms = Form::where("status", "active")->get();
        $data = compact("forms");
        return view("report.milestones-competencies-forms", $data);
    }

    public function getMilestonesCompetenciesForms($type){
        if($type == "milestones")
            $things = Milestone::all();
        elseif($type == "competencies")
            $things = Competency::all();

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

        return json_encode($results);
    }
}
