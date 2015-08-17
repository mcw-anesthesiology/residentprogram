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
use Debugbar;
use Auth;

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
                    $users = User::where("status", "active")->where("type", "faculty")->with("evaluatorEvaluations")->get();
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
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "!=", "fellow")->with("subjectEvaluations")->get();
                    break;
                case "fellow":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "fellow")->with("subjectEvaluations")->get();
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
            ->where("evaluations.evaluation_date", "<", Carbon::now())
            ->where("evaluations.evaluation_date", ">", Carbon::now()->subMonths(6)) //TODO: what
            ->select("subject_id", "milestone_id")
            ->orderBy("milestone_id", "asc")
            ->chunk(10000, function($responses) use (&$results){
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

        $filename = "Needs Evaluations ".Carbon::now()->toDateTimeString().".tsv";

        return response($data)
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

    public function getTSV(Request $request){
        $filename = $request->input("name")." ".Carbon::now()->toDateTimeString().".tsv";

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

        return json_encode($results);
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
        $subjectEvaluators = [];
        $competencyQuestions = [];

        $subjects = [];

        $query->select("milestone_id", "milestones.title as milestone_title", "competency_id", "competencies.title as competency_title")
            ->addSelect("subject_id", "evaluator_id", "last_name", "first_name", "evaluation_id", "response", "weight", "responses.question_id as question_id")
            ->orderBy("milestones.title")->orderBy("competencies.title");
        $query->chunk(10000, function($responses) use (&$milestones, &$subjects, &$milestones, &$competencies, &$subjectEvals, &$averageMilestone, &$averageMilestoneDenom, &$averageCompetency, &$averageCompetencyDenom, &$subjectMilestone, &$subjectMilestoneDenom, &$subjectMilestoneEvals, &$subjectCompetency, &$subjectCompetencyDenom, &$subjectCompetencyEvals, &$competencyQuestions, &$subjectEvaluators){
            foreach($responses as $response){
                if(!isset($subjects[$response->subject_id]))
                    $subjects[$response->subject_id] = $response->last_name.", ".$response->first_name;
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
                if(isset($subjectMilestoneDenom[$subject][$milestone]) && $subjectMilestoneDenom[$subject][$milestone])
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = $subjectMilestone[$subject][$milestone]/$subjectMilestoneDenom[$subject][$milestone];
                else
                    $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = 0;
            }
            if(count($milestoneSubject[$milestone]) > 1){
                $milestoneStd[$milestone] = $this->sd($milestoneSubject[$milestone]);
                foreach($subjects as $subject => $name){
                    // Num standard deviations = ((subject weighted average)-(milestone weighted average))/(standard deviation of subject averages)
                    $subjectMilestoneDeviations[$subject][$milestone] = ($subjectMilestone[$subject][$milestone]-$averageMilestone[$milestone])/$milestoneStd[$milestone];
                }
            }
        }

        foreach($competencies as $competency => $title){
            if($averageCompetencyDenom[$competency])
                $averageCompetency[$competency] = $averageCompetency[$competency]/$averageCompetencyDenom[$competency];
            else
                $averageCompetency[$competency] = 0;

            foreach($subjects as $subject => $name){
                // Standard deviation uses array[competency][resident] while graph uses array[resident][competency]
                if(isset($subjectCompetencyDenom[$subject][$competency]) && $subjectCompetencyDenom[$subject][$competency])
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = $subjectCompetency[$subject][$competency]/$subjectCompetencyDenom[$subject][$competency];
                else
                    $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = 0;


            }
            if(count($competencySubject[$competency]) > 1){
                $competencyStd[$competency] = $this->sd($competencySubject[$competency]);
                foreach($subjects as $subject => $name){
                    // Num standard deviations = ((subject weighted average)-(competency weighted average))/(standard deviation of subject averages)
                    $subjectCompetencyDeviations[$subject][$competency] = ($subjectCompetency[$subject][$competency]-$averageCompetency[$competency])/$competencyStd[$competency];
                }
            }
        }

        if(isset($reportSubject)){
            $subjects = [];
            $subject = User::find($reportSubject);
            $subjects[$subject->id] = $subject->last_name.", ".$subject->first_name;
        }

        $graphs = [];
        $maxResponse = 10; // assuming

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
                    $graphs[] = RadarGraphs::draw($subjectMilestone[$subject], $averageMilestone, $milestones, $subjectCompetency[$subject], $averageCompetency, $competencies, $subject_name, $startDate, $endDate, $trainingLevel, $maxResponse);
                }
                break;
            case "average":
                $graphs[] = RadarGraphs::draw(null, $averageMilestone, $milestones, null, $averageCompetency, $competencies, "Average", $startDate, $endDate, $trainingLevel, $maxResponse);
                break;
        }

        $data = compact("milestones", "competencies", "subjectMilestone", "subjectMilestoneDeviations", "subjectMilestoneEvals", "subjectCompetency", "subjectCompetencyDeviations", "subjectCompetencyEvals", "subjectEvals", "graphs", "subjects", "subjectEvaluators");

        if(!is_null($reportSubject)){
            $textQuery = DB::table("text_responses")
                ->join("evaluations", "evaluations.id", "=", "evaluation_id")
                ->join("users", "users.id", "=", "evaluations.evaluator_id")
                ->join("forms", "evaluations.form_id", "=", "forms.id")
                ->where("users.type", "faculty")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date", ">", $startDate)
                ->where("evaluations.evaluation_date", "<", $endDate)
                ->where("evaluations.subject_id", $reportSubject);

            if($trainingLevel != "all")
                $textQuery->where("users.training_level", $trainingLevel);

            $textQuery->select("subject_id", "first_name", "last_name", "forms.title as form_title", "evaluation_date", "response");

            $subjectTextResponses = $textQuery->get();
            Debugbar::addMessage($subjectTextResponses);

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
        $user = Auth::user();
        $resident = User::find($request->input("resident"));
        if(!($resident == $user || $user->type == "admin" || $user->mentees->contains($resident)))
            return redirect("dashboard")->with("error", "Requested report not authorized");

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
        $data["numReports"] = count($startDates);
        $data["specificSubject"] = User::find($request->input("resident"));
        return view("report.report", $data);
    }

    public function facultyReport(Request $request){
        $startDate = Carbon::parse($request->input("startDate"));
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";

        $query = DB::table("text_responses")
            ->join("evaluations", "evaluations.id", "=", "evaluation_id")
            ->join("users as evaluators", "evaluators.id", "=", "evaluator_id")
            ->join("users as subjects", "subjects.id", "=", "subject_id")
            ->join("forms", "forms.id", "=", "form_id")
            ->where("evaluations.status", "complete")
            ->where("forms.type", "faculty")
            ->where("evaluators.type", "resident")
            ->where("forms.id", $request->input("form_id"))
            ->where("evaluation_date", ">", $startDate)
            ->where("evaluation_date", "<", $endDate);

        $subjectResponses = [];
        $subjectEvals = [];
        $averageResponses = [];
        $averageEvals = [];
        $subjects = [];
        $questions = [];
        $questionResponses = [];

        $query->select("evaluation_id", "evaluator_id", "subject_id", "response", "question_id");

    $query->chunk(10000, function($responses) use(&$subjectResponses, &$subjectEvals, &$averageResponses, &$averageEvals, &$subjects, &$questions, &$questionResponses){
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
                $averageResponses[$response->question_id][$response->response]++;
            }
        });

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
                    $subjectPercentages[$subject_id][$question_id][$response] = round(($subjectResponses[$subject_id][$question_id][$response]/$subjectEvals[$subject_id])*100);
                }
            }
        }


        $formPath = Form::find($request->input("form_id"))->xml_path;
        $subjectPercentages = json_encode($subjectPercentages);
        str_replace("'", "", $subjectPercentages);
        $subjectEvals = json_encode($subjectEvals);
        str_replace("'", "", $subjectEvals);
        $averagePercentages = json_encode($averagePercentages);
        str_replace("'", "", $averagePercentages);
        $averageEvals = json_encode($averageEvals);
        str_replace("'", "", $averageEvals);
        $subjects = json_encode($subjects);
        str_replace("'", "", $subjects);
        $questions = json_encode($questions);
        str_replace("'", "", $questions);
        $questionResponses = json_encode($questionResponses);
        str_replace("'", "", $questionResponses);

        $subjectId = $request->input("faculty");
        $data = compact("subjectResponses", "formPath", "subjectEvals", "averageEvals", "subjectPercentages", "averagePercentages", "subjectId", "subjects", "questions", "questionResponses");

        return view("report.faculty-report", $data);
    }
}
