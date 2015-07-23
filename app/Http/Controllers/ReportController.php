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
            ->where("evaluations.request_date", ">", Carbon::now()->subMonths(6)) //TODO: what
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

    function sd_square($x, $mean) {
	// Function to calculate square of value - mean
		return pow($x - $mean,2);
	}


	function sd($array) {
	// Function to calculate standard deviation (uses sd_square)

		// square root of sum of squares devided by N-1
		return sqrt(array_sum(array_map("sd_square", $array, array_fill(0,count($array), (array_sum($array) / count($array)) ) ) ) / (count($array)-1) );
	}

    public function aggregate(Request $request){
        $startDate = Carbon::parse($request->input("startDate"));
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";

        // $redStd = 1;
        // $yellowStd = 0.75;
        // $greenStd = 0.5;

        $query = DB::table("responses")
            ->join("evaluations", "evaluations.id", "=", "evaluation_id")
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
            ->join("users", "users.id", "=", "evaluations.subject_id")
            // ->where("users.status", "active")
            ->where("users.type", "resident")
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date", ">", $startDate)
            ->where("evaluations.evaluation_date", "<", $endDate);

        if($request->input("trainingLevel") != "all")
            $query->where("users.training_level", $request->input("trainingLevel"));

        $averageMilestone = [];
        $averageMilestoneDenom = [];
        $milestoneStd = [];
        $averageCompetency = [];
        $averageCompetencyDenom = [];
        $competencyStd = [];

        $subjectMilestone = [];
        $subjectMilestoneDenom = [];
        $subjectCompetency = [];
        $subjectCompetencyDenom = [];

        $milestones = [];
        $competencies = [];
        $subjectRequests = [];
        $competencyQuestions = [];

        $subjects = $query->select("subject_id")->get();
        foreach($subjects as $subject){
            $subjectRequests[$subject->subject_id] = 0;
        }

        $query->select("milestone_id")->get()->each(function($response, $key) use(&$averageMilestone, &$averageMilestoneDenom){
            $averageMilestone[$response->milestone_id] = 0;
            $averageMilestoneDenom[$response->milestone_id] = 0;
            foreach($subjects as $subject){
                $subjectMilestone[$subject->subject_id][$response->milestone_id] = 0;
                $subjectMilestoneDenom[$subject->subject_id][$response->milestone_id] = 0;
            }
        });

        $query->select("competency_id")->get()->each(function($response, $key) use(&$averageCompetency, &$averageCompetencyDenom){
            $averageCompetency[$response->competency_id] = 0;
            $averageCompetencyDenom[$response->competency_id] = 0;
            foreach($subjects as $subject){
                $subjectCompetency[$subject->subject_id][$response->competency_id] = 0;
                $subjectCompetencyDenom[$subject->subject_id][$response->competency_id] = 0;
            }
        });

        $subjects = [];

        $query->select("milestone_id", "milestones.title as milestone_title", "competency_id", "competencies.title as competency_title")
            ->addSelect("subject_id", "first_name", "last_name", "evaluation_id", "response", "weight", "question_id");

        $query->chunk(200, function($responses) use (&$milestones, &$subjects, &$milestones, &$competencies, &$subjectRequests, &$averageMilestone, &$averageMilestoneDenom, &$averageCompetency, &$averageCompetencyDenom, &$subjectMilestone, &$subjectMilestoneDenom, &$subjectCompetency, &$subjectCompetencyDenom, &$competencyQuestions){
            foreach($responses as $response){
                $subjects[$response->subject_id] = $response->last_name.", ".$response->first_name;
                $subjectRequests[$response->subject_id]++;

                $milestones[$response->milestone_id] = $response->milestone_title;
                $averageMilestone[$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $averageMilestoneDenom[$response->milestone_id] += floatval($response->weight);
                $subjectMilestone[$response->subject_id][$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $subjectMilestoneDenom[$response->subject_id][$response->milestone_id] += floatval($response->weight);

                if($competencyQuestions[$response->evaluation_id][$response->question_id] == 1)
                    continue;
                $competencies[$response->competency_id] = $response->competency_title;
                $averageCompetency[$response->competency_id] += (floatval($response->response)*floatval($response->weight));
                $averageCompetencyDenom[$response->competency_id] += floatval($response->weight);
                $subjectCompetency[$response->subject_id][$response->competency_id] += (floatval($response->response)*floatval($response->weight));
                $subjectCompetencyDenom[$response->subject_id][$response->competency_id] += floatval($response->weight);
            }
        });

        foreach($milestones as $milestone => $title){
            if($averageMilestoneDenom[$milestone]){
                $averageMilestone[$milestone] = $averageMilestone[$milestone]/$averageMilestoneDenom[$milestone];
            } else {
                $averageMilestone[$milestone] = 0;

            }

            foreach($subjects as $subject => $name){
                if($subjectMilestoneDenom[$subject][$milestone])
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = $subjectMilestone[$subject][$milestone]/$subjectMilestoneDenom[$subject][$milestone];
                else
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = 0;
            }
            $milestoneStd[$milestone] = sd($milestoneSubject[$milestone]);
            foreach($subjects as $subject => $name){
                $subjectMilestoneDeviations[$subject][$milestone] = round(($subjectMilestone[$subject][$milestone]-$averageMilestone[$milestone])/$milestoneStd[$milestone]);
            }
        }

        foreach($competencies as $competency => $title){
            if($averageCompetencyDenom[$competency])
                $averageCompetency[$competency] = $averageCompetency[$competency]/$averageCompetencyDenom[$competency];
            else
                $averageCompetency[$competency] = 0;

            foreach($subjects as $subject => $name){
                if($subjectCompetencyDenom[$subject][$competency])
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = $subjectCompetency[$subject][$competency]/$subjectCompetencyDenom[$subject][$competency];
                else
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = 0;


            }
            $competencyStd[$competency] = sd($competencySubject[$competency]);
            foreach($subjects as $subject => $name){
                $subjectCompetencyDeviations[$subject][$competency] = round(($subjectCompetency[$subject][$competency]-$averageCompetency[$competency])/$competencyStd[$competency]);
            }
        }

    }

    public function specific(Request $request){

    }
}
