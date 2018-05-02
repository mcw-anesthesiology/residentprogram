<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Helpers\DisplayHelpers;
use App\Helpers\FormReader;

use Auth;
use Debugbar;
use Hashids;
use Log;
use Mail;
use Setting;
use View;

use Carbon\Carbon;

use App\Block;
use App\BlockAssignment;
use App\Evaluation;
use App\FacultyPeerEvaluation;
use App\FlaggedEvaluation;
use App\Form;
use App\Location;
use App\Response;
use App\ScheduledRequest;
use App\TextResponse;
use App\User;
use App\WatchedForm;

class MainController extends Controller
{
    public function __construct() {
        $this->middleware("auth", ["except" => [
            "evaluationByHashLink",
            "saveEvaluationByHashLink"
        ]]);

        $this->middleware("shared", ["except" => [
            "evaluationByHashLink",
            "saveEvaluationByHashLink"
        ]]);

		$this->middleware("type:admin", ["only" => [
            "flaggedEvaluations",
            "getEvaluation"
        ]]);

		$this->middleware(function($request, $next) {
			try {
				$user = Auth::user();
				$requestType = array_key_exists('requestType', $request->route()->parameters())
					? $request->route()->parameters()['requestType']
					: 'resident';

				if (!in_array($requestType, [
					'resident',
					'faculty',
					'app',
					'staff',
					'self',
					'intern360'
				]))
					throw new \DomainException("Sorry, {$requestType} is not currently a valid request type");

				if ($requestType == 'resident') {
					if (!config('features.trainee_evaluations'))
						throw new \DomainException('That evalutaion type is not currently enabled');
				}

                if ($requestType == "faculty") {
					if (!config('features.faculty_evaluations'))
						throw new \DomainException('That evalutaion type is not currently enabled');

                    if ($user->type == "faculty")
                        throw new \DomainException("Faculty cannot request faculty evaluations");
                }

				if ($requestType == 'app') {
					if (!config('features.app_evaluations'))
						throw new \DomainException('That evalutaion type is not currently enabled');

					if (!$user->isType(['app', 'faculty', 'admin']))
						throw new \DomainException('Sorry, you are not currently allowed to create an APP evaluation');
				}

				if ($requestType == 'intern360') {
					if (!config('features.intern360_evaluations'))
						throw new \DomainException('That evalutaion type is not currently enabled');

					if (!$user->isType(['admin', 'intern', 'ca-1', 'ca-2', 'ca-3', 'fellow']))
						throw new \DomainException('Sorry, you are not currently allowed to make that kind of request');
				}

				return $next($request);
			} catch (\DomainException $e) {
				return back()->with('error', $e->getMessage());
			}

            $adminEmail = config('app.admin_email');
            return back()->with('error', "There was a problem creating the request. "
                + "If this continues to happen, please let me know at {$adminEmail}");
		})->only(
			'request',
			'createRequest'
		);
    }

	public function dashboard() {
		if (config('features.evaluations'))
			return $this->evalsDashboard();
		if (config('features.faculty_merit'))
			return redirect('/merit');
	}

    public function evalsDashboard() {
        $user = Auth::user();
        switch ($user->type) {
            case "resident":
                $numStaffEvals = $user->subjectEvaluations()
                    ->notHidden()
                    ->where("status", "complete")
                    ->whereHas("form", function ($query) {
                        return $query->where("evaluator_type", "staff");
                    })
                    ->count();
                $numSelfEvals = $user->subjectEvaluations()
                    ->notHidden()
                    ->where("status", "complete")
                    ->whereHas("form", function ($query) {
                        return $query->where("evaluator_type", "self");
                    })
                    ->count();
                break;
            case "faculty":
                $mentees = $user->mentees->where("status", "active")->unique();
                break;
            case "admin":
                $numFlagged = Evaluation::has("flag")->count();
                $flaggedActions = config('constants.FLAGGED_ACTIONS');
                break;
        }
        $data = compact("mentees", "numFlagged", "numStaffEvals", "numSelfEvals",
			'flaggedActions');
        return view("dashboard.dashboard", $data);
    }

    public function dashboardFaculty() {
		$user = Auth::user();
		$threshold = Setting::get("facultyEvalThreshold");
		$noEvaluations = (Evaluation::where("subject_id", $user->id)->where("status", "complete")->count() < $threshold);
        $no360Evaluations = ( FacultyPeerEvaluation::where('subject_id', $user->id)
                ->where('status', 'complete')
                ->count() === 0);
		$data = compact("noEvaluations", 'no360Evaluations');
        return view("dashboard.faculty.dashboard", $data);
    }

    public function request(Request $request, $requestType = "resident") {
		try {
	        $user = Auth::user();
			// FIXME: `RESIDENT` means actual resident, `resident` means any trainee
			switch ($requestType) {
				case 'faculty':
					$subjectTypes = ["faculty"];
					$evaluatorTypes = ["resident", "fellow"];
					$requestorTypes = $evaluatorTypes;
					break;
				case 'staff':
					$subjectTypes = ["resident", "fellow"];
					$evaluatorTypes = ["staff"];
					$requestorTypes = $evaluatorTypes;
					break;
				case 'self':
					$subjectTypes = ["resident", "fellow"];
					$evaluatorTypes = ["self"];
					$requestorTypes = ["admin"];
					break;
				case 'app':
					$subjectTypes = ['app'];
					$evaluatorTypes = ['faculty'];
					$requestorTypes = ['app', 'faculty', 'admin'];
					break;
				case 'intern360':
					$subjectTypes = ['intern'];
					$evaluatorTypes = ['ca-1', 'ca-2', 'ca-3', 'fellow'];
					$requestorTypes = array_merge($subjectTypes, $evaluatorTypes, ['admin']);
					break;
				default:
					$subjectTypes = ["resident", "fellow"];
					$evaluatorTypes = ["faculty"];
					$requestorTypes = array_merge($subjectTypes, $evaluatorTypes);
					break;
			}

			$evaluationTypes = array_merge($subjectTypes, $evaluatorTypes);

			$userFields = [
				'id',
				'type',
				'training_level',
				'full_name',
			];

			$formFields = [
				'id',
				'type',
				'title'
			];

			$hideModelFields = function($model) {
				$model->hideFields();
			};

			if (!$user->isType(array_merge($requestorTypes, ["admin"])))
				throw new \Exception("Your account type is not allowed to create that kind of evaluation.");

	        if ($user->isType(["resident", "faculty"])) {
	            $blocks = Block::where("start_date", "<", Carbon::now())->with("assignments.user")->orderBy("year", "desc")->orderBy("block_number", "desc")->limit(3)->get();
	            foreach ($blocks as $block) {
	                $userLocations = $block->assignments->where("user_id", $user->id)->map(function ($item, $key) {
	                    return $item->location;
	                });
	                foreach ($userLocations as $location) {
						$people = $block->assignments->where("location", $location)->sortBy("user.last_name")->pluck('user');
						if ($user->type == "resident") {
							foreach ($people as $person) {
								$person->hideFields();
								if ($person->id != $user->id && $person->type == "faculty") {
									$faculty[$block->id][] = $person;
								}
							}
						} elseif ($user->type == "faculty") {
							foreach ($people as $person) {
								$person->hideFields();
								if ($person->id != $user->id && $person->type == "resident") {
									$residents[$block->id][] = $person;
								}
							}
						}
	                }
	            }
	        }

	        if (!$user->isType("resident") && in_array("resident", $evaluationTypes)) {
	            $residents[0] = User::where("type", "resident")
					->where("status", "active")
					->orderBy("last_name")
					->get()
					->each($hideModelFields);
	            if (empty($residents))
	                throw new \Exception("There are not any registered resident accounts");
	        }
	        if (!$user->isType("faculty") && in_array("faculty", $evaluationTypes)) {
	            $faculty[0] = User::where("type", "faculty")
					->where("status", "active")
					->orderBy("last_name")
					->get()
					->each($hideModelFields);
	            if (empty($faculty))
	                throw new \Exception("There are not any registered faculty accounts");
	        }
			if (!$user->isType("staff") && in_array("staff", $evaluationTypes)) {
				$staff[0] = User::where("type", "staff")
					->where("status", "active")
					->orderBy("last_name")
					->get()
					->each($hideModelFields);
	            if (empty($staff))
	                throw new \Exception("There are not any registered staff accounts");
			}
            if (!$user->isType('app') && in_array('app', $evaluationTypes)) {
                $apps[0] = User::where('type', 'app')
                    ->where('status', 'active')
                    ->orderBy('last_name')
                    ->get()
                    ->each($hideModelFields);
                if (empty($apps))
                    throw new \Exception('There are not any registered APP accounts');
            }
            if (!$user->isType('intern') && in_array('intern', $evaluationTypes)) {
                $interns[0] = User::ofType('resident')
					->where('training_level', 'intern')
					->active()
					->orderBy('last_name')
					->get()
					->each($hideModelFields);
            }
			if (!$user->isType('ca-1') && in_array('ca-1', $evaluationTypes)) {
                $ca1s[0] = User::ofType('resident')
					->where('training_level', 'ca-1')
					->active()
					->orderBy('last_name')
					->get()
					->each($hideModelFields);
            }
			if (!$user->isType('ca-2') && in_array('ca-2', $evaluationTypes)) {
                $ca2s[0] = User::ofType('resident')
					->where('training_level', 'ca-2')
					->active()
					->orderBy('last_name')
					->get()
					->each($hideModelFields);
            }
			if (!$user->isType('ca-3') && in_array('ca-3', $evaluationTypes)) {
                $ca3s[0] = User::ofType('resident')
					->where('training_level', 'ca-3')
					->active()
					->orderBy('last_name')
					->get()
					->each($hideModelFields);
            }
			if (!$user->isType('fellow') && in_array('fellow', $evaluationTypes)) {
                $fellows[0] = User::ofType('resident')
					->where('training_level', 'fellow')
					->active()
					->orderBy('last_name')
					->get()
					->each($hideModelFields);
            }

			if ($user->isType($subjectTypes)) {
				$specificTypes = [$user->specificType];
				if ($user->isType('intern')) {
					$specificTypes[] = 'intern';
				}
				$forms = Form::where("status", "active")
					->whereIn("type", $specificTypes)
					->whereIn("evaluator_type", $evaluatorTypes)
					->orderBy("title")
					->get()
					->each($hideModelFields);
			} elseif ($user->isType($evaluatorTypes)) {
                $evalTypes = [$user->specific_type];
                // FIXME: Remove this if/when trainee user type is added
                if ($user->isType('fellow') && $requestType == 'faculty')
                    $evalTypes[] = $user->type;
				// FIXME: Workaround for form evaluator_type not being an array
				if ($user->isType(['ca-1', 'ca-2', 'ca-3', 'fellow']) && $requestType == 'intern360')
					$evalTypes[] = 'ca-1';

				$forms = Form::where("status", "active")
					->whereIn("type", $subjectTypes)
					->whereIn("evaluator_type", $evalTypes)
					->orderBy("title")
					->get()
					->each($hideModelFields);
			} else {
				$forms = Form::where("status", "active")
					->whereIn("type", $subjectTypes)
					->whereIn("evaluator_type", $evaluatorTypes)
					->orderBy("title")
					->get()
					->each($hideModelFields);
			}

	        if (empty($forms))
	            throw new \Exception("No forms exist for that request type");

			$requestTypeText = $requestType;

			switch ($requestType) {
				case "resident":
					if (!$user->isType($subjectTypes))
						$subjects = $residents;
					if (!$user->isType($evaluatorTypes))
						$evaluators = $faculty;

					$subjectTypeText = "intern, resident, or fellow";
					$subjectTypeTextPlural = "interns, residents, and fellows";
					$evaluatorTypeText = "faculty";
					$requestTypeText = "trainee";
					break;
				case "faculty":
					$subjects = $faculty;
	                if (!$user->isType("resident")) {
	                    $evaluators = $residents;
	                }

					$pendingEvalCount = Evaluation::with("subject", "evaluator", "form")->where("status", "pending")->where("evaluator_id", $user->id)->whereHas("form", function($query) {
		                $query->where("type", "faculty");
		            })->count();

					$subjectTypeText = "faculty";
					$subjectTypeTextPlural = "faculty";
					$evaluatorTypeText = "resident";
					$requestTypeText = "faculty";
					break;
				case "staff":
					$subjects = $residents;

	                if (!$user->isType("staff")) {
	                    $evaluators = $staff;
	                }

					$subjectTypeText = "intern, resident, or fellow";
					$subjectTypeTextPlural = "interns, residents, and fellows";
					$evaluatorTypeText = "staff";
					$requestTypeText = "staff";
					break;
	            case "self":
	                $subjects = $residents;
	                $subjectTypeText = "intern/resident/fellow";
	                $subjectTypeTextPlural = "interns/residents/fellows";
	                $evaluatorTypeText = "self";
					$requestTypeText = "self";
	                break;
                case 'app':
                    if (!$user->isType($subjectTypes))
                        $subjects = $apps;
					if (!$user->isType($evaluatorTypes))
						$evaluators = $faculty;

                    $subjectTypeText = 'APP';
                    $subjectTypeTextPlural = 'APPs';
                    $evaluatorTypeText = 'faculty';
                    $requestTypeText = 'APP';
                    break;
				case 'intern360':
					if (!$user->isType('intern'))
						$subjects = $interns;
					if (!$user->isType(['ca-1', 'ca-2', 'ca-3', 'fellow'])) {
						$evaluators = [[]];
						if (!empty($ca1s) && !empty($ca1s[0]))
							$evaluators[0] = array_merge($evaluators[0], $ca1s[0]->toArray());
						if (!empty($ca2s) && !empty($ca2s[0]))
							$evaluators[0] = array_merge($evaluators[0], $ca2s[0]->toArray());
						if (!empty($ca3s) && !empty($ca3s[0]))
							$evaluators[0] = array_merge($evaluators[0], $ca3s[0]->toArray());
						if (!empty($fellows) && !empty($fellows[0]))
							$evaluators[0] = array_merge($evaluators[0], $fellows[0]->toArray());
					}

					$subjectTypeText = 'intern';
					$subjectTypeTextPlural = 'interns';
					$evaluatorTypeText = 'resident or fellow';
					$requestTypeText = 'intern 360';
					break;
			}

			if (!empty($subjects))
				$subjects = collect($subjects)->toJson();
			if (!empty($evaluators))
				$evaluators = collect($evaluators)->toJson();
			if (!empty($forms))
				$forms = collect($forms)->toJson();

	        $data = compact("forms", "requestType", "pendingEvalCount",
				"subjects", "evaluators", "subjectTypeText",
				"subjectTypeTextPlural", "evaluatorTypeText", "blocks",
				"evaluatorTypes", "subjectTypes", "requestTypeText");
			return view("evaluations.request", $data);
		} catch(\Exception $e) {
			return back()->with("error", $e->getMessage());
		}

		return back()->with('error', 'Sorry, there was a problem starting your request');
    }

    public function createRequest(Request $request, $requestType = "resident") {
		$user = Auth::user();

		try {
			if (
				(
					in_array($requestType, ["resident", "self"])
					&& $user->isType("resident")
				)
				|| $requestType == 'app' && $user->isType('app')
				|| (
					$requestType == 'intern360'
					&& $user->isType('intern')
				)
			) {
				$subjects = [$user->id];
			} else {
				$subjects = $request->input("subject_id");
				if (!is_array($subjects))
					$subjects = [$subjects];
			}

			if (
				(in_array($requestType, ['resident', 'app']) && $user->isType("faculty"))
				|| ($requestType == "staff" && $user->isType("staff"))
				|| ($requestType == "faculty" && $user->isType("resident"))
				|| ($requestType == 'intern360' && $user->isType(['ca-1', 'ca-2', 'ca-3', 'fellow']))
			) {
				$evaluators = [$user->id];
            } else {
				$evaluators = $request->input("evaluator_id");
				if (!is_array($evaluators))
					$evaluators = [$evaluators];
			}

            $evaluationDates = $request->input("evaluation_date");
            if (!is_array($evaluationDates) ||
					array_key_exists('startDate', $evaluationDates))
                $evaluationDates = [$evaluationDates];

			$errors = "";
			if (empty($subjects) || count($subjects) == 0)
				$errors .= "Please select an evaluation subject. ";
			if (empty($evaluators) || count($evaluators) == 0)
				$errors .= "Please select an evaluator. ";
            if (empty($evaluationDates) || count($evaluationDates) == 0)
				$errors .= "Please select an evaluation date. ";
			if (!$request->has("form_id"))
				$errors .= "Please select a form. ";

			if ($errors)
				throw new \DomainException($errors);



			foreach ($subjects as $subject) {
				if ($requestType == "self")
                    $evaluators = [$subject];

				foreach ($evaluators as $evaluator) {
                    foreach ($evaluationDates as $evaluationDate) {

						$values = [
							'form_id' => $request->input('form_id'),
							'evaluator_id' => $evaluator,
							'subject_id' => $subject,
							'requested_by_id' => $user->id,
							'request_date' => Carbon::now(),
							'evaluation_date_start' => $evaluationDate['startDate'],
							'evaluation_date_end' => $evaluationDate['endDate'],
							'request_ip' => $request->ip(),
							'request_type' => $requestType,
                            'request_note' => $request->input('request_note'),
							'send_hash' => ($user->isType('admin') && $request->has('send_hash')),
							'hash_expires_in' => $request->input('hash_expires_in', 30),
							'force_notification' => ($user->isType('admin') && $request->has('force_notification'))
						];

						if ($user->isType('admin') && $request->has('schedule')) {
							$values['request_date'] = $request->input('request_date');
							$values['scheduled_date'] = Carbon::now();

							ScheduledRequest::schedule($values);
						} else {
							$eval = Evaluation::request($values);
						}
                    }
				}
			}

	        if ((!$request->has('schedule') || !$user->isType('admin'))
					&& count($subjects) == 1
					&& count($evaluators) == 1
					&& count($evaluationDates) == 1
                    && $user->id == $eval->evaluator_id)
	            return redirect("evaluation/{$eval->id}");

		} catch(\DomainException $e) {
			return back()->withInput()->with("error", $e->getMessage());
		}

        return back();
    }

    public function evaluationByHashLink(Request $request, $hash) {
        try {
            $eval = Evaluation::where("completion_hash", $hash)->where("status", "pending")->where("hash_expires", ">", Carbon::now())->firstOrFail();
            Auth::onceUsingId($eval->evaluator_id);
            return $this->evaluation($request, $eval->id)->with(["noNavbar" => true, "user" => Auth::user()]);
        } catch (ModelNotFoundException $e) {
            return view("evaluations.invalid-hash-link")->with(["noNavbar" => true]);
        }
    }

    public function saveEvaluationByHashLink(Request $request, $hash) {
        try {
            $eval = Evaluation::where("completion_hash", $hash)->where("status", "pending")->where("hash_expires", ">", Carbon::now())->firstOrFail();
            Auth::onceUsingId($eval->evaluator_id);
            $this->saveEvaluation($request, $eval->id);
            $eval = $eval->fresh();
            if ($eval->status == "complete") {
                $eval->completion_hash = null;
                $eval->save();
                return view("evaluations.complete")->with(["noNavbar" => true]);
            } else
                return view("evaluations.saved")->with(["noNavbar" => true, "evalExpiration" => $eval->hash_expires->toDayDateTimeString()]);
        } catch (ModelNotFoundException $e) {
            return view("evaluations.invalid-hash-link")->with(["noNavbar" => true]);
        }
    }

    public function evaluation(Request $request, $id) {
		try {
	        $user = Auth::user();
			try {
				$evaluation = Evaluation::with('form.milestoneQuestions.milestone', 'form.competencyQuestions.competency')->findOrFail($id);
				if ($evaluation->isAnonymousToUser())
					throw new \Exception();
			} catch (\Exception $e) {
				$id = Hashids::decode($id)[0];
				$evaluation = Evaluation::with('form.milestoneQuestions.milestone', 'form.competencyQuestions.competency')->findOrFail($id);
			}
	        if ($user->isType("admin") || $user->mentees->contains($evaluation->subject) || $user->id == $evaluation->subject_id
					|| ($user->usesFeature('RESIDENT_EVALS') && $evaluation->subject->isType('RESIDENT')))
	            $subjectString = "<a href='/profile/{$evaluation->subject_id}'>{$evaluation->subject->full_name}</a>";
	        else
	            $subjectString = $evaluation->subject->full_name;

	        if ($user->isType("admin") || $user->id == $evaluation->evaluator_id)
	            $evaluatorString = "<a href='/profile/{$evaluation->evaluator_id}'>{$evaluation->evaluator->full_name}</a>";
	        elseif ($evaluation->evaluator)
	            $evaluatorString = $evaluation->evaluator->full_name;
			else
				$evaluatorString = "<i>Anonymous</i>";

			switch ($evaluation->status) {
				case "complete":
					$labelContext = "label-success";
					break;
				case "disabled":
				case "canceled by admin":
				case "canceled by faculty":
				case "canceled by resident":
				case "canceled by fellow":
				case "canceled by staff":
				case 'declined':
					$labelContext = "label-danger";
					break;
				case "pending":
					$labelContext = "label-warning";
					break;
				default:
					$labelContext = "label-default";
					break;
			}
			$statusLabel = "<span class='label {$labelContext}'>" . ucfirst($evaluation->status) . "</span>";

			$evaluationTrainingLevel = !empty($evaluation->training_level)
				? DisplayHelpers::renderTrainingLevel($evaluation->training_level)
				: DisplayHelpers::renderTrainingLevel($evaluation->subject->training_level);

	        $data = compact('evaluation', 'subjectString', 'evaluatorString',
				'statusLabel', 'evaluationTrainingLevel');
	        if ((($evaluation->subject_id == $user->id || $user->mentees->contains($evaluation->subject))
				&& in_array($evaluation->visibility, ["visible", "anonymous"]))
				|| $evaluation->evaluator_id == $user->id
				|| $user->watchedForms->pluck("form_id")->contains($evaluation->form_id)
				|| $user->isType("admin")
				|| $user->usesFeature('RESIDENT_EVALS') && in_array($evaluation->training_level, [
                    'intern',
                    'ca-1',
                    'ca-2',
                    'ca-3'
                ])
                || ($user->usesFeature('FACULTY_EVALS') && $evaluation->form->type == 'faculty')
            ) {

				if ($user->isType("admin") || $evaluation->evaluator_id == $user->id) {
					switch ($evaluation->evaluator->type) {
	                    // FIXME: These subjectTypes aren't correct
						case "faculty":
							$subjectType = "Resident/Fellow";
							$possibleSubjects = User::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("last_name")->get();
							$possibleForms = Form::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("title")->get();
							break;
						case "resident":
						case "fellow":
							$subjectType = "Faculty";
							$possibleSubjects = User::where("status", "active")->where("type", "faculty")->orderBy("last_name")->get();
							$possibleForms = Form::where("status", "active")->where("type", "faculty")->orderBy("title")->get();
							break;
						case "staff":
							$subjectType = "Resident/Fellow";
							$possibleSubjects = User::where("status", "active")->whereIn("type", ["resident", "fellow"])->orderBy("last_name")->get();
							$possibleForms = Form::where("status", "active")->where("type", "resident")->where("evaluator_type", "staff")->orderBy("title")->get();
							break;
					}
					$flaggedActions = config('constants.FLAGGED_ACTIONS');
					$data += compact("subjectType", "possibleSubjects", "possibleForms", "flaggedActions");
				}

				if ($evaluation->subject_id == $user->id && !$evaluation->seen_by_subject_at) {
					$evaluation->seen_by_subject_at = Carbon::now();
					$evaluation->save();
				}

				if ($evaluation->evaluator_id == $user->id && !$evaluation->seen_by_evaluator_at) {
					$evaluation->seen_by_evaluator_at = Carbon::now();
					$evaluation->save();
				}


	            return view("evaluations.evaluation", $data);
			} else
				throw new \Exception("Insufficient permissions to view the requested evaluation");
		} catch(\Exception $e) {
			Debugbar::info($e);
			return redirect('/dashboard')->with("error", "Insufficient permissions to view the requested evaluation");
		}
    }

    public function getEvaluation($id) {
        return (string)Evaluation::find($id);
    }

    public function saveEvaluation(Request $request, $id) {
        try {
			$user = Auth::user();
			$eval = Evaluation::findOrFail($id);

			if ($eval->status != "pending")
                throw new \Exception("Cannot complete a non-pending evaluation");
            elseif ($eval->evaluator_id != $user->id)
                throw new \Exception("Only the evaluator can complete an evaluation");

            if ($request->input("evaluation_id")) {
                $eval->status = "complete";
                $eval->complete_date = Carbon::now();
				$eval->seen_by_subject_at = NULL;
				if (!$eval->training_level)
                	$eval->training_level = $eval->subject->training_level;
            }
            $eval->complete_ip = $request->ip();

            $input = $request->all();
            foreach ($input as $question => $value) {
                if (strpos($question, "evaluation_id") === false && $question !== "_token") {
                    if (strpos($question, "weight"))
                        $weight = $value;
                    elseif ($value != "") {
						if (is_array($value)) {
							$responses = TextResponse::where('evaluation_id', $id)->where('question_id', $question)->get();
							foreach ($responses as $response) {
								if (!in_array($response->response, $value))
									$response->delete();
							}
							foreach ($value as $checkboxValue) {
								TextResponse::firstOrCreate(["evaluation_id" => $id, "question_id" => $question, "response" => $checkboxValue]);
							}
						} else {
							if (is_numeric($value)) {
								$response = Response::firstOrNew(["evaluation_id" => $id, "question_id" => $question]);
								$response->weight = $weight;
							} else{
								$response = TextResponse::firstOrNew(["evaluation_id" => $id, "question_id" => $question]);
							}

							$response->response = $value;
							$response->save();
						}
                    }
                }
            }
            $eval->save();

			if ($eval->status == 'complete' && $user->id != $eval->subject_id) {
				$subject = User::withoutGlobalScopes()->find($eval->subject_id);
				if (
					!empty($subject)
					&& $subject->notifications == 'yes'
					&& in_array($eval->form->type, [
						'resident',
						'fellow',
						'intern'
					])
					&& in_array($eval->visibility, [
						'visible',
						'anonymous'
					])
					&& filter_var($subject->email, FILTER_VALIDATE_EMAIL)
				) {
					$eval->sendCompleteNotification();
				}
			}
        } catch(\Exception $e) {
			return back()->with("error", $e->getMessage());
		}

		return redirect("dashboard");
    }

    public function userProfile($id) {
        $user = Auth::user();
        $profileUser = User::find($id);
        if (empty($profileUser))
            return back()->with("error", "That user doesn't exist or have a profile");
        if (!($user->isType("admin") || $user->mentees->contains($profileUser) || $user->id == $profileUser->id
				|| ($user->usesFeature('RESIDENT_EVALS') && $profileUser->isType('RESIDENT'))))
            return back()->with("error", "You are not allowed to see that user's profile");

        $today = Carbon::now();
        if ($today->month >= 7)
            $yearStart = Carbon::parse("July 1");
        else
            $yearStart = Carbon::parse("July 1 last year");

        if ($profileUser->isType("resident"))
            $evaluations = $profileUser->subjectEvaluations();
        else
            $evaluations = $profileUser->evaluatorEvaluations();

        $evals = $evaluations->whereIn("status", ["complete", "pending"])->get();

        $lastCompleted = $evals->where("status", "complete")->sortByDesc("complete_date")->first();
        if (!empty($lastCompleted))
            $lastCompleted = $lastCompleted->complete_date;
        else
            $lastCompleted = "-";

        $evals = $evals->filter(function($eval) use ($yearStart) {
            return $eval->evaluation_date_end >= $yearStart;
        });

        $requests = $evals->where("requested_by_id", $profileUser->id)->count();
        $totalRequests = $evals->count();
        $totalComplete = $evals->where("status", "complete")->count();

        $evalData = $evaluations->get([
            "id",
            "request_date",
            "complete_date",
            "status"
        ])->toArray();

        $data = compact("profileUser", "yearStart", "lastCompleted", "requests",
            "totalRequests", "totalComplete", "evalData");
        return view("dashboard.profile", $data);
    }

    public function calendar(Request $request) {
        return view("calendar");
    }
}
