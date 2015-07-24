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
		return sqrt(array_sum(array_map(array($this, "sd_square"), $array, array_fill(0,count($array), (array_sum($array) / count($array)) ) ) ) / (count($array)-1) );
	}

    public function report($startDate, $endDate, $trainingLevel, $graphOption, $reportSubject){
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
            ->join("users", "users.id", "=", "evaluations.subject_id")
            // ->where("users.status", "active")
            ->where("users.type", "resident")
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date", ">", $startDate)
            ->where("evaluations.evaluation_date", "<", $endDate);

        if($trainingLevel != "all")
            $query->where("users.training_level", $trainingLevel);

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
        $competencyQuestions = [];

        $subjects = [];
        if(is_null($reportSubject))
            $subjectModels = $query->select("subject_id", "first_name", "last_name")->get();
        else
            $subjectModels = User::find($reportSubject)->get();
        foreach($subjectModels as $subject){
            $subjects[$subject->subject_id] = $subject->last_name.", ".$subject->first_name;
            $subjectEvals[$subject->subject_id] = 0;
        }

        // Initialize arrays to 0
        foreach($query->select("milestone_id")->get() as $key => $response){
            $averageMilestone[$response->milestone_id] = 0;
            $averageMilestoneDenom[$response->milestone_id] = 0;
            foreach($subjects as $subject_id => $name){
                $subjectMilestone[$subject_id][$response->milestone_id] = 0;
                $subjectMilestoneDenom[$subject_id][$response->milestone_id] = 0;
                $subjectMilestoneEvals[$subject_id][$response->milestone_id] = 0;
            }
        };

        foreach($query->select("competency_id")->get() as $key => $response){
            $averageCompetency[$response->competency_id] = 0;
            $averageCompetencyDenom[$response->competency_id] = 0;
            foreach($subjects as $subject_id => $name){
                $subjectCompetency[$subject_id][$response->competency_id] = 0;
                $subjectCompetencyDenom[$subject_id][$response->competency_id] = 0;
                $subjectCompetencyEvals[$subject_id][$response->competency_id] = 0;
            }
        };

        $query->select("milestone_id", "milestones.title as milestone_title", "competency_id", "competencies.title as competency_title")
            ->addSelect("subject_id", "evaluation_id", "response", "weight", "responses.question_id as question_id");

        $query->chunk(200, function($responses) use (&$milestones, &$subjects, &$milestones, &$competencies, &$subjectEvals, &$averageMilestone, &$averageMilestoneDenom, &$averageCompetency, &$averageCompetencyDenom, &$subjectMilestone, &$subjectMilestoneDenom, &$subjectMilestoneEvals, &$subjectCompetency, &$subjectCompetencyDenom, &$subjectCompetencyEvals, &$competencyQuestions){
            foreach($responses as $response){
                // $subjects[$response->subject_id] = $response->last_name.", ".$response->first_name;
                $subjectEvals[$response->subject_id]++;
                $subjectMilestoneEvals[$response->subject_id][$response->milestone_id]++;
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
                // Standard deviation uses array[milestone][resident] while graph uses array[resident][milestone]
                if($subjectMilestoneDenom[$subject][$milestone])
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = $subjectMilestone[$subject][$milestone]/$subjectMilestoneDenom[$subject][$milestone];
                else
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = 0;
            }
            $milestoneStd[$milestone] = $this->sd($milestoneSubject[$milestone]);
            foreach($subjects as $subject => $name){
                // Num standard deviations = ((subject weighted average)-(milestone weighted average))/(standard deviation of subject averages)
                $subjectMilestoneDeviations[$subject][$milestone] = ($subjectMilestone[$subject][$milestone]-$averageMilestone[$milestone])/$milestoneStd[$milestone];
            }
        }

        foreach($competencies as $competency => $title){
            if($averageCompetencyDenom[$competency])
                $averageCompetency[$competency] = $averageCompetency[$competency]/$averageCompetencyDenom[$competency];
            else
                $averageCompetency[$competency] = 0;

            foreach($subjects as $subject => $name){
                // Standard deviation uses array[competency][resident] while graph uses array[resident][competency]
                if($subjectCompetencyDenom[$subject][$competency])
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = $subjectCompetency[$subject][$competency]/$subjectCompetencyDenom[$subject][$competency];
                else
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = 0;


            }
            $competencyStd[$competency] = $this->sd($competencySubject[$competency]);
            foreach($subjects as $subject => $name){
                // Num standard deviations = ((subject weighted average)-(competency weighted average))/(standard deviation of subject averages)
                $subjectCompetencyDeviations[$subject][$competency] = ($subjectCompetency[$subject][$competency]-$averageCompetency[$competency])/$competencyStd[$competency];
            }
        }

        $graphs = [];
        $maxResponse = 10; // assuming
        switch($graphOption){
            case "all":
                foreach($subjects as $subject => $subject_name){
                    $graphs[] = RadarGraphs::draw($subjectMilestone[$subject], $averageMilestone, $milestones, $subjectCompetency[$subject], $averageCompetency, $competencies, $subject_name, $trainingLevel, $maxResponse);
                }
                break;
            case "average":
                $graphs[] = RadarGraphs::draw(null, $averageMilestone, $milestones, null, $averageCompetency, $competencies, "Average", $trainingLevel, $maxResponse);
                break;
        }

        $data = compact("milestones", "competencies", "subjectMilestone", "subjectMilestoneDeviations", "subjectMilestoneEvals", "subjectCompetency", "subjectCompetencyDeviations", "subjectCompetencyEvals", "subjectEvals", "graphs", "subjects");

        if(!is_null($reportSubject)){
            $subjectTextResponses = [];

            $textQuery = DB::table("text_responses")
                ->join("evaluations", "evaluations.id", "=", "evaluation_id")
                ->join("users as evaluators", "users.id", "=", "evaluations.evaluator_id")
                ->where("users.type", "resident")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date", ">", $startDate)
                ->where("evaluations.evaluation_date", "<", $endDate)
                ->whereIn("evaluations.subject_id", array_keys($subjects));

            if($trainingLevel != "all")
                $textQuery->where("users.training_level", $trainingLevel);

            $textQuery->select("subject_id", "first_name", "last_name", "response");

            $textQuery->chunk(200, function($response) use (&$subjectTextResponses){
                $subjectTextResponses[$subject_id][$response->last_name.", ".$response->first_name][] = $response->response;
            });

            $data["subjectTextResponses"] = $subjectTextResponses;
        }

        return $data;
    }

    public function aggregate(Request $request){
        $data = $this->report($request->input("startDate"), $request->input("endDate"), $request->input("trainingLevel"), $request->input("graphs"), null);
        $data["reportType"] = "aggregate";

        return view("report.report", $data);
    }

    public function specific(Request $request){
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

        for($i = 0; $i < count($startDates); $i++){
            $data = array_merge_recursive($data, $this->report($startDates[$i], $endDates[$i], $trainingLevels[$i], $request->input("graphs"), $request->input("resident")));
        }

        $data["reportType"] = "specific";
        return view("report.report", $data);
    }
}
