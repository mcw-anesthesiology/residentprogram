<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use DB;

use App\Milestone;
use App\User;

class ReportController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => ["specific"]]);
    }

    public function needsEvaluations(){
        $milestones = Milestone::all();
        $data = compact("milestones");
        return view("report.needs-eval", $data);
    }

    public function getNeedsEvaluations(){
        $results = [];
        //$sql = "select * from responses join evaluations on responses.evaluation_id=evaluations.id join milestones_questions on milestones_questions.form_id=evaluations.form_id and responses.question_id=milestones_questions.question_id join milestones on milestones.id=milestones_questions.milestone_id";
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

        return response($tsv)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");

    }
}
