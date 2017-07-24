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

use App\Milestone;
use App\Competency;
use App\User;
use App\Form;

class ReportController extends Controller
{
    public function __construct() {
        $this->middleware("auth");
        $this->middleware("shared");
        $this->middleware("type:admin", ["except" => [
			"specific",
			"getPDF"
		]]);
    }

	public function reports() {
		return view('report/reports');
	}

    public function stats($type) {
        switch($type) {
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

    public function getStats(Request $request, $evaluationType, $userType) {
		if ($request->has("startDate")) {
			$startDate = Carbon::parse($request->input("startDate"));
			$startDate->timezone = "America/Chicago";
		}
		if ($request->has("endDate")) {
	        $endDate = Carbon::parse($request->input("endDate"));
	        $endDate->timezone = "America/Chicago";
		}

        if ($request->input("user") && $request->input("user") != "all") {
            $users = User::where("id", $request->input("user"))->get();
        } else {
            switch($userType) {
                case "faculty":
                    $users = User::where("status", "active")->where("type", "faculty")->with("evaluatorEvaluations.form")->get();
                    break;
				case "trainee":
                case "resident":
                    $users = User::where("status", "active")->where("type", "resident");
					if ($request->has('trainingLevel') && $request->input('trainingLevel') != 'all')
						$users->where('training_level', $request->input('trainingLevel'));
					elseif ($userType == 'resident')
						$users->where("training_level", "!=", "fellow");
					$users = $users->with("subjectEvaluations.form")->get();
                    break;
                case "fellow":
                    $users = User::where("status", "active")->where("type", "resident")->where("training_level", "fellow")->with("subjectEvaluations.form")->get();
                    break;
            }
        }

		$times = [];
		$userStats = [];

		$statsType = ($evaluationType == 'faculty' xor $userType == 'faculty')
			? 'evaluator'
			: 'subject';

        foreach ($users as $user) {

            try {
				$requestsQuery = ($statsType == 'evaluator')
					? $user->evaluatorEvaluations()
					: $user->subjectEvaluations();

				$completeQuery = ($statsType == 'evaluator')
					? $user->evaluatorEvaluations()
					: $user->subjectEvaluations();

				$whereHasFilter = ($evaluationType == 'faculty')
					? function($query) {
						$query->where('type', 'faculty');
					}
					: function($query) {
                        $query->whereIn("type", ["resident", "fellow"])
                            ->where("evaluator_type", "faculty");
                    };


				if (!empty($startDate)) {
					$requestsQuery = $requestsQuery->where("request_date", ">=", $startDate);
					$completeQuery = $completeQuery->where("complete_date", ">=", $startDate);
				}
				if (!empty($endDate)) {
					$requestsQuery = $requestsQuery->where("request_date", "<=", $endDate);
					$completeQuery = $completeQuery->where("complete_date", "<=", $endDate);
				}


				$requestsQuery = $requestsQuery->whereIn("status", ["pending", "complete"])
                    ->whereHas("form", $whereHasFilter);
				$completeQuery = $completeQuery->whereIn("status", ["pending", "complete"])
                    ->whereHas("form", $whereHasFilter);

				$userRequests = $requestsQuery->get();
				$userCompleted = $completeQuery->get();

				if ($userRequests->count() == 0)
					$noneRequested[] = $user->full_name;
				if ($userCompleted->where("status", "complete")->count() == 0)
					$noneCompleted[] = $user->full_name;

				$userStats[] = [
                    "id" => $user->id,
                    "name" => $user->full_name,
                    "requested" => $userRequests->where("requested_by_id", $user->id)->count(),
                    "totalRequests" => $userRequests->count(),
                    "completed" => $userCompleted->where("status", "complete")->count(),
                    "ratio" => $userRequests->count() == 0 ? 0 : round(($userCompleted->where("status", "complete")->count()/$userRequests->count()) * 100)
                ];

                if ($statsType == 'evaluator') {
                    $time = 0;
					$timeEvals = $completeQuery->where("status", "complete")->get();
					if (count($timeEvals) > 0) {
						foreach ($timeEvals as $eval) {
	                        $time += $eval->complete_date->getTimestamp()-$eval->request_date->getTimestamp();
	                    }
	                    $num = $timeEvals->count();
	                    if ($time > 0 && $num > 0)
	                        $time = round($time/$num);
	                    $d1 = new DateTime();
	                    $d2 = new DateTime();
	                    $d2->add(new DateInterval("PT".$time."S"));
						$times[] = [
							"name" => $user->full_name,
							"time" => $d2->diff($d1)
								->format("%a days, %h hours, %i minutes"),
							"timespan" => $time
						];
					}
                }

				$eval = $userCompleted->where("status", "complete")
					->sortByDesc("complete_date")->first();
				if (!empty($eval))
					$lastCompleted[] = [
						"name" => $user->full_name,
						"evaluation" => $eval
					];
            } catch(\Exception $e) {
                Log::error("Problem with user in stats: ".$e);
            }
        }
        $data = compact('evaluationType', 'userType', 'statsType',
			"noneRequested", "noneCompleted", "lastCompleted",
			"userStats", "startDate", "endDate");
        if ($statsType == 'evaluator')
            $data["averageCompletionTimes"] = $times;

		if (in_array($userType, ['trainee', 'resident']) && $request->has('trainingLevel'))
			$data['trainingLevel'] = $request->input('trainingLevel');

		return $data;
    }

	public function needsEvaluations(Request $request) {
		$startDate = Carbon::parse($request->input("startDate"));
		$startDate->timezone = "America/Chicago";
		$endDate = Carbon::parse($request->input("endDate"));
		$endDate->timezone = "America/Chicago";
		$trainingLevel = $request->input("trainingLevel");
		$evalThreshold = $request->input("evalThreshold");

		return $this->getUsersNeedingEvaluations($startDate, $endDate,
			$trainingLevel, $evalThreshold);
	}

	function getUsersNeedingEvaluations($startDate, $endDate, $trainingLevel = "all", $evalThreshold = "all") {
        $getQueriedEvaluations = function($query)
                use ($startDate, $endDate, $trainingLevel, $evalThreshold) {
            $query->with("evaluator", "requestor", "form")
				->where("evaluation_date_end", ">=", $startDate)
                ->where("evaluation_date_start", "<=", $endDate);
            if ($trainingLevel != "all")
                $query->where("training_level", $trainingLevel);
        };

		$getCompleteEvaluations = function($query)
                use ($startDate, $endDate, $trainingLevel, $evalThreshold) {
            $query->with("evaluator", "requestor", "form")
				->where("evaluation_date_end", ">=", $startDate)
                ->where("evaluation_date_start", "<=", $endDate)
				->where("status", "complete");
            if ($trainingLevel != "all")
                $query->where("training_level", $trainingLevel);
        };

        $needsEvals = User::where("type", "resident")->where("status", "active");
        if ($trainingLevel != "all")
            $needsEvals->where("training_level", $trainingLevel);

        if (!empty($evalThreshold) && $evalThreshold != "all")
            $needsEvals->whereHas("subjectEvaluations", $getCompleteEvaluations, "<", $evalThreshold);

        return $needsEvals->with(["subjectEvaluations" => $getQueriedEvaluations])->get();
    }

    public function getTSV(Request $request) {
        $filename = $request->input("name")." ".Carbon::now()->toDateTimeString().".tsv";

        return response($request->input("data"))
            ->header("Content-Type", "text/tab-separated-values")
            ->header("Content-Disposition", "attachment; filename={$filename}");
    }

	public function getPDF(Request $request) {
		$filename = $request->input("name").".pdf";


		$data = $request->input("data");
		$data = str_replace("/graph/", storage_path("app/graphs/"), $data);
		$data .= "<style>table { border-collapse: collapse; } table, td, th { border: 1px solid black; }</style>";
		$data = '<div class="container body-block">'. $data . '</div>';

		return PDF::loadHTML($data)->download($filename);
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

    public function report($startDate, $endDate, $trainingLevel, $currentTrainingLevel = "all", $milestonesFilter = [], $reportSubject = null, $graphOption = null, $graphOrientation = null) {
        $startDate = Carbon::parse($startDate);
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($endDate);
        $endDate->timezone = "America/Chicago";

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
		$subjectEvaluations = [];
		$competencyQuestions = [];

		$subjects = [];

		if ($currentTrainingLevel != "all") {
			$trainingLevelSubjects = User::where("status", "active")
				->where("type", "resident")
				->where("training_level", $currentTrainingLevel)
				->get();
			foreach ($trainingLevelSubjects as $trainingLevelSubject) {
				$subjects[$trainingLevelSubject->id] = $trainingLevelSubject->full_name;
			}
		}

        $query = DB::table("responses")
            ->join("evaluations", "evaluations.id", "=", "responses.evaluation_id")
            ->join("milestones_questions", function($join) {
                $join->on("milestones_questions.question_id", "=", "responses.question_id")
                    ->on("milestones_questions.form_id", "=", "evaluations.form_id");
            })
            ->join("milestones", "milestones.id", "=", "milestones_questions.milestone_id")
            ->join("competencies_questions", function($join) {
                $join->on("competencies_questions.question_id", "=", "responses.question_id")
                    ->on("competencies_questions.form_id", "=", "evaluations.form_id");
            })
            ->join("competencies", "competencies.id", "=", "competencies_questions.competency_id")
            ->join("forms", "forms.id", "=", "evaluations.form_id")
            ->join("users", "users.id", "=", "evaluations.subject_id")
            ->whereIn("forms.type", ["resident", "fellow"])
            ->where("forms.evaluator_type", "faculty")
            ->where("evaluations.status", "complete")
            ->where("evaluations.evaluation_date_end", ">=", $startDate)
            ->where("evaluations.evaluation_date_start", "<=", $endDate)
			->where("responses.response", ">=", 0);

        if (!empty($milestonesFilter))
            $query->whereIn("milestones.id", $milestonesFilter);

        if ($trainingLevel != "all")
            $query->where("evaluations.training_level", $trainingLevel);

		if ($currentTrainingLevel != "all") {
			$query->where("users.type", "resident")
				->where("users.training_level", $currentTrainingLevel);
		}

        $query->select("milestone_id", "milestones.title as milestone_title", "competency_id", "competencies.title as competency_title")
            ->addSelect("subject_id", "evaluator_id", "last_name", "first_name", "evaluation_id", "response", "weight", "responses.question_id as question_id")
            ->orderBy("milestones.title")->orderBy("competencies.title");
        $query->chunk(20000, function($responses) use (&$subjects,
				&$milestones, &$competencies, &$subjectEvals,
				&$subjectRequests, &$averageMilestone, &$averageMilestoneDenom,
				&$averageCompetency, &$averageCompetencyDenom, &$subjectMilestone,
				&$subjectMilestoneDenom, &$subjectMilestoneEvals, &$subjectCompetency,
				&$subjectCompetencyDenom, &$subjectCompetencyEvals, &$competencyQuestions,
				&$subjectEvaluators) {
            foreach ($responses as $response) {
                if (!isset($subjects[$response->subject_id]))
                    $subjects[$response->subject_id] = $response->last_name.", ".$response->first_name;
                if (!isset($subjectRequests[$response->subject_id]))
                    $subjectRequests[$response->subject_id] = [];

                if (!isset($subjectEvals[$response->subject_id][$response->evaluation_id]))
                    $subjectEvals[$response->subject_id][$response->evaluation_id] = 0;
                if (!isset($subjectMilestoneEvals[$response->subject_id][$response->milestone_id]))
                    $subjectMilestoneEvals[$response->subject_id][$response->milestone_id] = 0;
                if (!isset($subjectCompetencyEvals[$response->subject_id][$response->competency_id]))
                    $subjectCompetencyEvals[$response->subject_id][$response->competency_id] = 0;
                if (!isset($subjectEvaluators[$response->subject_id][$response->evaluator_id]))
                    $subjectEvaluators[$response->subject_id][$response->evaluator_id] = 1;

                if (!isset($averageMilestone[$response->milestone_id]))
                    $averageMilestone[$response->milestone_id] = 0;
                if (!isset($averageMilestoneDenom[$response->milestone_id]))
                    $averageMilestoneDenom[$response->milestone_id] = 0;
                if (!isset($subjectMilestone[$response->subject_id][$response->milestone_id]))
                    $subjectMilestone[$response->subject_id][$response->milestone_id] = 0;
                if (!isset($subjectMilestoneDenom[$response->subject_id][$response->milestone_id]))
                    $subjectMilestoneDenom[$response->subject_id][$response->milestone_id] = 0;

                if (!isset($averageCompetency[$response->competency_id]))
                    $averageCompetency[$response->competency_id] = 0;
                if (!isset($averageCompetencyDenom[$response->competency_id]))
                    $averageCompetencyDenom[$response->competency_id] = 0;
                if (!isset($subjectCompetency[$response->subject_id][$response->competency_id]))
                    $subjectCompetency[$response->subject_id][$response->competency_id] = 0;
                if (!isset($subjectCompetencyDenom[$response->subject_id][$response->competency_id]))
                    $subjectCompetencyDenom[$response->subject_id][$response->competency_id] = 0;

                $subjectEvals[$response->subject_id][$response->evaluation_id]++;
                $subjectMilestoneEvals[$response->subject_id][$response->milestone_id]++;
				if (!isset($competencyEvals[$response->competency_id][$response->evaluation_id]))
                	$subjectCompetencyEvals[$response->subject_id][$response->competency_id]++;

                // Weighted average = sum(response*weight)/sum(weight)
                $milestones[$response->milestone_id] = $response->milestone_title;
                $averageMilestone[$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $averageMilestoneDenom[$response->milestone_id] += floatval($response->weight);
                $subjectMilestone[$response->subject_id][$response->milestone_id] += (floatval($response->response)*floatval($response->weight));
                $subjectMilestoneDenom[$response->subject_id][$response->milestone_id] += floatval($response->weight);

                // Ensure questions with multiple milestones aren't counted twice for competencies
                if (isset($competencyQuestions[$response->evaluation_id][$response->question_id]))
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

        foreach ($milestones as $milestone => $title) {
            if ($averageMilestoneDenom[$milestone])
                $averageMilestone[$milestone] = $averageMilestone[$milestone]/$averageMilestoneDenom[$milestone];
            else
                $averageMilestone[$milestone] = 0;

            foreach ($subjects as $subject => $name) {
                if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
                    // Standard deviation uses array[milestone][resident] while graph uses array[resident][milestone]
                    if (isset($subjectMilestoneDenom[$subject][$milestone]) && $subjectMilestoneDenom[$subject][$milestone])
                        $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = $subjectMilestone[$subject][$milestone]/$subjectMilestoneDenom[$subject][$milestone];
                    else
                        $subjectMilestone[$subject][$milestone] = $milestoneSubject[$milestone][$subject] = 0;
                }
            }
            if (count($milestoneSubject[$milestone]) > 1) {
                $milestoneStd[$milestone] = $this->sd($milestoneSubject[$milestone]);
                foreach ($subjects as $subject => $name) {
                    if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
    					if ($milestoneStd[$milestone] == 0)
    						$subjectMilestoneDeviations[$subject][$milestone] = 0;
                        else // Num standard deviations = ((subject weighted average)-(milestone weighted average))/(standard deviation of subject averages)
                        	$subjectMilestoneDeviations[$subject][$milestone] = ($subjectMilestone[$subject][$milestone]-$averageMilestone[$milestone])/$milestoneStd[$milestone];
                    }
                }
            }
			else{
				foreach ($subjects as $subject => $name) {
                    if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
                        $subjectMilestoneDeviations[$subject][$milestone] = 0;
                    }
				}
			}
        }

        foreach ($competencies as $competency => $title) {
            if ($averageCompetencyDenom[$competency])
                $averageCompetency[$competency] = $averageCompetency[$competency]/$averageCompetencyDenom[$competency];
            else
                $averageCompetency[$competency] = 0;

            foreach ($subjects as $subject => $name) {
                if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
                    // Standard deviation uses array[competency][resident] while graph uses array[resident][competency]
                    if (isset($subjectCompetencyDenom[$subject][$competency]) && $subjectCompetencyDenom[$subject][$competency])
                        $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = $subjectCompetency[$subject][$competency]/$subjectCompetencyDenom[$subject][$competency];
                    else
                        $subjectCompetency[$subject][$competency] = $competencySubject[$competency][$subject] = 0;
                }
            }
            if (count($competencySubject[$competency]) > 1) {
                $competencyStd[$competency] = $this->sd($competencySubject[$competency]);
                foreach ($subjects as $subject => $name) {
                    if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
    					if ($competencyStd[$competency] == 0)
    						$subjectCompetencyDeviations[$subject][$competency] = 0;
    					else // Num standard deviations = ((subject weighted average)-(competency weighted average))/(standard deviation of subject averages)
                        	$subjectCompetencyDeviations[$subject][$competency] = ($subjectCompetency[$subject][$competency]-$averageCompetency[$competency])/$competencyStd[$competency];
                    }
                }
            }
			else{
				foreach ($subjects as $subject => $name) {
                    if (array_key_exists($subject, $subjectEvals) && count($subjectEvals[$subject]) > 0) {
                        $subjectCompetencyDeviations[$subject][$competency] = 0;
                    }
				}
			}
        }

        $reqQuery = DB::table("evaluations")
            ->join("forms", "forms.id", "=", "evaluations.form_id")
			->join("users as subjects", "subjects.id", "=", "evaluations.subject_id")
            ->join("users as evaluators", "evaluators.id", "=", "evaluations.evaluator_id")
            ->whereIn("forms.type", ["resident", "fellow"])
            ->whereIn("forms.evaluator_type", ["faculty"])
            ->whereIn("evaluations.status", ["pending", "complete"])
            ->where("evaluations.evaluation_date_end", ">=", $startDate)
            ->where("evaluations.evaluation_date_start", "<=", $endDate);

        if ($trainingLevel != "all")
            $reqQuery->where("evaluations.training_level", $trainingLevel);
		if ($currentTrainingLevel != "all")
			$reqQuery->where("subjects.training_level", $currentTrainingLevel);

        $reqQuery->select("subject_id", "evaluator_id", "requested_by_id",
			"subjects.last_name as subject_last", "subjects.first_name as subject_first",
            "evaluators.last_name as evaluator_last", "evaluators.first_name as evaluator_first",
			"evaluations.id as evaluation_id", "evaluations.status as evaluation_status",
			"evaluations.evaluation_date_start", "evaluations.evaluation_date_end",
			"forms.title as form_title");
        $reqQuery->chunk(20000, function($evaluations) use (&$subjects, &$subjectRequests,
				&$subjectEvals, &$subjectEvaluators, &$subjectEvaluations) {
            foreach ($evaluations as $evaluation) {
                if (!isset($subjects[$evaluation->subject_id]))
                    $subjects[$evaluation->subject_id] = $evaluation->subject_last . ", " . $evaluation->subject_first;
                if (!isset($subjectEvals[$evaluation->subject_id]))
                    $subjectEvals[$evaluation->subject_id] = [];
                if (!isset($subjectEvaluators[$evaluation->subject_id]))
                    $subjectEvaluators[$evaluation->subject_id] = [];
                if (!isset($subjectRequests[$evaluation->subject_id]))
                    $subjectRequests[$evaluation->subject_id] = [];
				if (!isset($subjectEvaluations[$evaluation->subject_id]))
					$subjectEvaluations[$evaluation->subject_id] = [];

				if ($evaluation->evaluation_status == 'complete')
					$subjectEvaluations[$evaluation->subject_id][] = $evaluation;

                if ($evaluation->subject_id == $evaluation->requested_by_id)
                    $subjectRequests[$evaluation->subject_id][$evaluation->evaluation_id] = 1;
            }
        });

		if (isset($reportSubject)) {
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

        $data = compact("milestones", "competencies", "subjectMilestone",
			"subjectMilestoneDeviations", "subjectMilestoneEvals", "subjectCompetency",
			"subjectCompetencyDeviations", "subjectCompetencyEvals", "subjectEvals",
            "subjectRequests", "subjects", "subjectEvaluators", "averageMilestone",
            "averageCompetency", "graphOption", "trainingLevel", "startDate", "endDate",
			"subjectEvaluations");

		if (!is_null($reportSubject)) {
            $textQuery = DB::table("text_responses")
                ->join("evaluations", "evaluations.id", "=", "evaluation_id")
                ->join("users as evaluators", "evaluators.id", "=", "evaluations.evaluator_id")
				->join("users as subjects", "subjects.id", "=", "evaluations.subject_id")
                ->join("forms", "evaluations.form_id", "=", "forms.id")
                ->where("evaluators.type", "faculty")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date_end", ">=", $startDate)
                ->where("evaluations.evaluation_date_start", "<=", $endDate)
                ->where("evaluations.subject_id", $reportSubject)
                ->whereIn("forms.type", ["resident", "fellow"])
                ->whereIn("forms.evaluator_type", ["faculty"]);

            if ($trainingLevel != "all")
                $textQuery->where("evaluations.training_level", $trainingLevel);
			if ($currentTrainingLevel != "all")
				$textQuery->where("subjects.training_level", $currentTrainingLevel);

            $textQuery->select("subject_id", "evaluators.first_name", "evaluators.last_name",
                "forms.title as form_title", "evaluation_date_start", "evaluation_date_end",
				"response");

            $subjectTextResponses = $textQuery->get()->all();

            $data["subjectTextResponses"] = $subjectTextResponses;

            $reportEvaluationsQuery = DB::table("evaluations")
				->join("users as evaluators", "evaluators.id", "=", "evaluations.evaluator_id")
				->join("users as subjects", "subjects.id", "=", "evaluations.subject_id")
                ->join("forms", "evaluations.form_id", "=", "forms.id")
				->where("evaluators.type", "faculty")
                ->where("evaluations.status", "complete")
                ->where("evaluations.evaluation_date_end", ">=", $startDate)
                ->where("evaluations.evaluation_date_start", "<=", $endDate)
                ->where("evaluations.subject_id", $reportSubject)
                ->whereIn("forms.type", ["resident", "fellow"])
                ->whereIn("forms.evaluator_type", ["faculty"]);

            if ($trainingLevel != "all")
                $reportEvaluationsQuery->where("evaluations.training_level", $trainingLevel);
			if ($currentTrainingLevel != "all")
				$reportEvaluationsQuery->where("subjects.training_level", $currentTrainingLevel);

            $reportEvaluationsQuery->select("evaluations.id as evaluation_id", "subject_id",
                "evaluators.first_name", "evaluators.last_name", "forms.title as form_title",
				"evaluation_date_start", "evaluation_date_end");

            $data["subjectReportEvaluations"] = $reportEvaluationsQuery->get()->all();
        }
		else {
			$textQuery = DB::table("text_responses")
				->join("evaluations", "evaluations.id", "=", "evaluation_id")
				->join("users as evaluators", "evaluators.id", "=", "evaluations.evaluator_id")
				->join("users as subjects", "subjects.id", "=", "evaluations.subject_id")
				->join("forms", "evaluations.form_id", "=", "forms.id")
				->where("evaluators.type", "faculty")
				->where("evaluations.status", "complete")
				->where("evaluations.evaluation_date_end", ">=", $startDate)
				->where("evaluations.evaluation_date_start", "<=", $endDate)
				->whereIn("evaluations.subject_id", array_keys($subjects))
				->whereIn("forms.type", ["resident", "fellow"])
				->whereIn("forms.evaluator_type", ["faculty"]);

			if ($trainingLevel != "all")
				$textQuery->where("evaluations.training_level", $trainingLevel);
			if ($currentTrainingLevel != "all")
				$textQuery->where("subjects.training_level", $currentTrainingLevel);

			$textQuery->select("subject_id", "evaluators.first_name", "evaluators.last_name",
				"forms.title as form_title", "evaluation_date_start", "evaluation_date_end",
				"response", "evaluation_id");

			$subjectTextResponses = $textQuery->get()->groupBy('subject_id');

			$data["subjectTextResponses"] = $subjectTextResponses;
		}

        return $data;
    }

    public function aggregate(Request $request) {
        return response()->json($this->report($request->input("startDate"),
            $request->input("endDate"), $request->input("trainingLevel"),
			$request->input("currentTrainingLevel", "all"),
			$request->input("milestones")));
    }

    public function specific(Request $request) {
		$user = Auth::user();
        $resident = User::find($request->input("resident"));
        if (!($resident == $user || $user->isType("admin") || $user->mentees->contains($resident)))
            return back()->with("error", "Requested report not authorized");

        $data = [];

        $input = $request->all();
        foreach ($input as $key => $value) {
            if (strpos($key, "startDate") !== FALSE) {
                $startDates[] = $value;
            } elseif (strpos($key, "endDate") !== FALSE) {
                $endDates[] = $value;
            } elseif (strpos($key, "trainingLevel") !== FALSE) {
                $trainingLevels[] = $value;
            }
        }

        if (!isset($startDates))
            return back()->with("error", "Please select a starting date for the report");
        if (!isset($endDates))
            return back()->with("error", "Please select an ending date for the report");
        if (!isset($trainingLevels))
            return back()->with("error", "Please select a training level for the report");
        if (!(count($startDates) == count($endDates) && count($endDates) == count($trainingLevels)))
            return back()->with("error", "Please be sure to complete all fields for each report");

        for($i = 0; $i < count($startDates); $i++) {
            $data["reportData"][$i] = $this->report($startDates[$i], $endDates[$i],
                $trainingLevels[$i], "all", $request->input("milestones"), $request->input("resident"),
				$request->input('graphs'), 'vertical');
			$data["reportData"][$i]["startDate"] = Carbon::parse($startDates[$i]);
			$data["reportData"][$i]["endDate"] = Carbon::parse($endDates[$i]);
			$data["reportData"][$i]["trainingLevel"] = $trainingLevels[$i];
        }

		$data["numReports"] = count($startDates);
        $data["specificSubject"] = User::find($request->input("resident"));
		$data["graphOption"] = $request->input('graphs');

		$request->session()->put("individualReportData", $data);

        return view("report.individual", $data);
    }

    public function formReport(Request $request) {
        // TODO: Allow not having to select a subject
        $startDate = Carbon::parse($request->input("startDate"));
        $startDate->timezone = "America/Chicago";
        $endDate = Carbon::parse($request->input("endDate"));
        $endDate->timezone = "America/Chicago";

		$subjectResponses = [];
		$subjectEvals = [];
		$averageResponses = [];
		$evals = [];
		$evaluations = [];
		$subjects = [];
		$evaluators = [];
		$questions = [];
		$questionResponses = [];
		$averagePercentages = [];
		$subjectResponseValues = [];

		$chunkCallback = function($responses) use(&$subjectResponses,
				&$subjectEvals, &$averageResponses, &$evals, &$subjects, &$evaluators,
				&$evaluations, &$questions, &$questionResponses, &$subjectResponseValues) {
            foreach ($responses as $response) {
				if (!isset($totalResponses[$response->question_id][$response->response]))
					$totalResponses[$response->question_id][$response->response] = 0;
                if (!isset($subjectResponses[$response->subject_id][$response->question_id][$response->response]))
                    $subjectResponses[$response->subject_id][$response->question_id][$response->response] = 0;
                if (!isset($averageResponses[$response->question_id][$response->response]))
                    $averageResponses[$response->question_id][$response->response] = 0;

				if (!isset($subjectEvals[$response->subject_id]))
					$subjectEvals[$response->subject_id] = [];
				if (!in_array($response->evaluation_id, $subjectEvals[$response->subject_id]))
                    $subjectEvals[$response->subject_id][] = $response->evaluation_id;
                if (!in_array($response->evaluation_id, $evals))
                    $evals[] = $response->evaluation_id;
				if (!isset($evaluations[$response->evaluation_id]))
					$evaluations[$response->evaluation_id] = [
						'id' => $response->evaluation_id,
						'evaluation_date_start' => $response->evaluation_date_start,
						'evaluation_date_end' => $response->evaluation_date_end
					];

                if (!isset($subjects[$response->subject_id]))
                    $subjects[$response->subject_id] = 1;
				if (!isset($evaluators[$response->evaluation_id]))
					$evaluators[$response->evaluation_id] = [
						'id' => $response->evaluator_id,
						'full_name' => "{$response->evaluator_last}, {$response->evaluator_first}"
					];
                if (!isset($questions[$response->question_id]))
                    $questions[$response->question_id] = 1;
                if (!isset($questionResponses[$response->question_id][$response->response]))
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
            ->where("evaluation_date_end", ">", $startDate)
            ->where("evaluation_date_start", "<", $endDate);

		$query->select("evaluation_id", "evaluator_id", "subject_id", "response",
			"question_id", "evaluation_date_start", "evaluation_date_end",
			"evaluators.first_name as evaluator_first",
			"evaluators.last_name as evaluator_last");

    	$query->chunk(10000, $chunkCallback);

        $textQuery = DB::table("text_responses")
            ->join("evaluations", "evaluations.id", "=", "evaluation_id")
            ->join("users as evaluators", "evaluators.id", "=", "evaluator_id")
            ->join("users as subjects", "subjects.id", "=", "subject_id")
            ->join("forms", "forms.id", "=", "form_id")
            ->where("evaluations.status", "complete")
            ->where("forms.id", $request->input("form_id"))
            ->where("evaluation_date_end", ">=", $startDate)
            ->where("evaluation_date_start", "<=", $endDate);

        $textQuery->select("evaluation_id", "evaluator_id", "subject_id", "response",
			"question_id", "evaluation_date_start", "evaluation_date_end",
			"evaluators.first_name as evaluator_first",
			"evaluators.last_name as evaluator_last");

    	$textQuery->chunk(10000, $chunkCallback);

        $numEvals = count($evals);
        $subjects = array_keys($subjects);
        $questions = array_keys($questions);
        foreach ($questions as $question_id) {
            $questionResponses[$question_id] = array_keys($questionResponses[$question_id]);
        }

        foreach ($questions as $question_id) {
            foreach ($questionResponses[$question_id] as $response) {
                $averagePercentages[$question_id][$response] = round(($averageResponses[$question_id][$response]/$numEvals)*100);
                foreach ($subjects as $subject_id) {
                    if (isset($subjectResponses[$subject_id][$question_id][$response]))
                        $subjectPercentages[$subject_id][$question_id][$response] =
							round(($subjectResponses[$subject_id][$question_id][$response]
							/ count($subjectEvals[$subject_id])) * 100);
                    else {
                        $subjectResponses[$subject_id][$question_id][$response] = 0;
                        $subjectPercentages[$subject_id][$question_id][$response] = 0;
                    }
                }
            }
        }

		$form = Form::find($request->input("form_id"));

		$formContents = $form->contents;

        $data = compact("evals", "subjectEvals", "subjectResponses",
			"averageResponses", "subjectPercentages", "averagePercentages",
			"questionResponses", "subjectResponseValues", "startDate", "endDate",
			"formContents", "evaluators", "evaluations");

    	return $data;
    }

    public function pendingRequests(Request $request) {
		$user = Auth::user();
        $startDate = Carbon::parse($request->input('startDate'));
        $startDate->timezone = 'America/Chicago';
        $endDate = Carbon::parse($request->input('endDate'));
        $endDate->timezone = 'America/Chicago';
        $type = $request->input('type', 'faculty');

        return User::where('type', $type)->whereHas('evaluatorEvaluations',
                function($query) use ($startDate, $endDate) {
            $query->where('status', 'pending')
                ->where('evaluation_date_end', '>=', $startDate)
                ->where('evaluation_date_start', '<=', $endDate);
        })->with(
            [
                'evaluatorEvaluations' => function($query)
                        use ($startDate, $endDate) {
                    $query->where('evaluation_date_end', '>=', $startDate)
                        ->where('evaluation_date_start', '<=', $endDate);
                },
                'evaluatorEvaluations.subject',
                'evaluatorEvaluations.evaluator',
                'evaluatorEvaluations.requestor',
                'evaluatorEvaluations.form'
            ]
        )->get()->all();
	}
}
