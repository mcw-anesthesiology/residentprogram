<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Carbon\Carbon;

use Auth;
use Log;

use App\Evaluation;
use App\Form;
use App\User;

class EvaluationController extends RestController
{

	public function __construct() {
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			'index',
			'show',
			'cancel',
			'sendHash',
			'saveComment',
			'userEdit',
			'decline'
		]]);

		$this->middleware(function ($request, $next) {
			try {
				$user = Auth::user();
				if ($user->isType('admin'))
					return $next($request);

				$eval = Evaluation::findOrFail($request->route()->parameters()["id"]);
				if ($eval->requested_by_id == $user->id)
					return $next($request);

				throw new \Exception();

			} catch(\Exception $e) {
				if ($request->ajax())
					return response('Unauthorized.', 403);
				else
					return back()->with("error", "You are not authorized to modify that evaluation");
			}
		})->only('cancel');

		$this->middleware(function ($request, $next) {
			try {
				if (!$request->has('reason'))
					return $request->ajax()
						? response('Please specify a reason.', 400)
						: back()->with('error', 'Please specify a reason for declining');

				$user = Auth::user();
				$eval = Evaluation::findOrFail($request->route()->parameters()['id']);
				if (
					$eval->status == 'pending'
					&& $eval->evaluator_id == $user->id
				)
					return $next($request);

				throw new \Exception();
			} catch (\Exception $e) {
				return $request->ajax()
					? response('Unauthorized.', 403)
					: back()->with('error', 'You are not authorized to decline that evaluation');
			}
		})->only('decline');

		$this->middleware(function ($request, $next) {
			try {
				$user = Auth::user();
				$eval = Evaluation::findOrFail($request->route()->parameters()['id']);

				if (
					$user->id == $eval->evaluator_id
					&& in_array($eval->status, ['pending', 'complete'])
				)
					return $next($request);

				throw new \Exception();
			} catch (\Exception $e) {
				return $request->ajax()
					? response('Unable to edit comment.', 400)
					: back()->with('error', 'Unable to edit comment');
			}
		})->only('saveComment');

		$this->middleware("evaluation.user-edit", ["only" => [
			"userEdit"
		]]);
		// $this->middleware("create.evaluation", ["only" => [
		// 	"store"
		// ]]);
	}

	protected $relationships = [
		"evaluator",
		"subject",
		"requestor",
		"form",
		"responses",
		"textResponses",
		"flag"
	];

	protected $relationshipAttributes = [
		"form" => [
			"type",
			"evaluator_type"
		]
	];

	protected $attributes = [
		"id",
		"form_id",
		"evaluator_id",
		"subject_id",
		"requested_by_id",
		"status",
		"training_level",
		"evaluation_date_start",
		"evaluation_date_end",
		'request_note'
	];

	protected $model = \App\Evaluation::class;

	public function update(Request $request, $id) {
		$eval = Evaluation::findOrFail($id);
        if ($request->has("action")) {
            switch($request->input("action")) {
                case "disable":
                    $eval->status = "disabled";
                    break;
                case "enable":
                    if ($eval->complete_date)
                        $eval->status = "complete";
                    else
                        $eval->status = "pending";
                    break;
                case "cancel":
                    $eval->status = "canceled by admin";
                    break;
                case "visibility":
                    if ($request->input("visibility") == "reset")
                        $eval->visibility = null;
                    else
                        $eval->visibility = $request->input("visibility");
                    $eval->save();
                    return $eval->visibility;
                    break;
                default:
                    return "false";
                    break;
            }
            $eval->save();
            return $eval->status;
        }
	}

	public function remind(Request $request, $id) {
		$eval = Evaluation::find($id);
		if (!$eval->sendNotification(true))
			throw new \Exception("Failed to send reminder");

		if ($request->ajax())
			return "success";
		else
			return back();
	}

	public function cancel(Request $request, $id) {
		$user = Auth::user();
		$eval = Evaluation::findOrFail($id);

		if ($user->isType("admin"))
			$userRole = "admin";
		elseif ($user->id == $eval->subject_id)
			$userRole = "subject";
		elseif ($user->id == $eval->evaluator_id)
			$userRole = "evaluator";
		else
			$userRole = $user->specific_type;

		$eval->status = "canceled by " . $userRole;
		$eval->save();

		return $request->ajax()
			? 'success'
			: back();
	}

	public function decline(Request $request, $id) {
		$eval = Evaluation::findOrFail($id);
		$eval->status = 'declined';
		$eval->comment = $request->input('reason');
		$eval->save();

		return $request->ajax()
			? 'success'
			: back();
	}

	public function sendHash(Request $request, $id) {
		$evaluation = Evaluation::findOrFail($id);
        if ($request->has("action")) {
            switch($request->input("action")) {
                case "void":
                    $evaluation->completion_hash = null;
                    $evaluation->hash_expires = null;
                    $evaluation->save();
                    break;
                case "resend":
                    $evaluation->sendHashLink();
                    break;
                case "new":
                    $evaluation->completion_hash = str_random(40);
                    $hashExpiresIn = $request->input("hash_expires_in", 30);
                    $evaluation->hash_expires = $hashExpiresIn == "never" ? "9999-12-31" : Carbon::now()->addDays($hashExpiresIn);
                    $evaluation->save();
                    $evaluation->sendHashLink();
                    break;
            }
        }

		if ($request->ajax())
			return "success";
		else
			return back();
	}

	public function saveComment(Request $request, $id) {
		$eval = Evaluation::findOrFail($id);
		$eval->comment = $request->input("comment");
		$eval->save();

		if ($request->ajax())
			return "success";
		return
			back();
	}

	public function userEdit(Request $request, $id) {
		$user = Auth::user();
		$eval = Evaluation::findOrFail($id);

		$userEditableFields = [
			"subject_id",
			"form_id"
		];
		$adminEditableFields = [
			"evaluator_id",
			"subject_id",
			"form_id"
		];

		$input = [];
		if ($user->isType("admin"))
			$input = array_filter($request->only($adminEditableFields));
		else
			$input = array_filter($request->only($userEditableFields));

		if (!empty($input["evaluator_id"])) {
			$evaluator = User::findOrFail($input["evaluator_id"]);
			if ($evaluator->type != $eval->evaluator->type)
				throw new \Exception("Evaluator is not correct account type");
		}
		if (!empty($input["subject_id"])) {
			$subject = User::findOrFail($input["subject_id"]);
			if ($subject->type != $eval->subject->type)
				throw new \Exception("Subject is not correct account type");
		}
		if (!empty($input["form_id"])) {
			$form = Form::findOrFail($input["form_id"]);
			if ($form->type != $eval->form->type)
				throw new \Exception("Form is not correct type");
			if ($eval->responses->count() > 0 || $eval->textResponses->count() > 0)
				throw new \Exception("Evaluation has saved responses");
		}

		$eval->update($input);


		if ($request->ajax())
			return "success";
		else
			return back();
	}
}
