<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Carbon\Carbon;

use Auth;
use Log;

use App\FacultyPeerEvaluation;
use App\FacultyPeerForm;
use App\User;

use App\Helpers\DateHelpers;

class FacultyPeerEvaluationController extends RestController
{
	const ALLOWED_USER_TYPES = [
		'faculty',
		'staff'
	];

	public function __construct(){
		// Allow @mcw.edu email addresses to request,
		// disallow residents
		$this->middleware(function ($request, $next) {
			// TODO
			if (
				(
					$request->has('subject_id')
					&& User::ofType('faculty')
						->where('id', $request->input('subject_id'))
						->count() == 1
				) && (
					$request->has('form_id')
					&& FacultyPeerForm::where('status', 'active')
						->where('id', $request->input('form_id'))
						->count() == 1
				) && (
					(
						Auth::check()
						&& Auth::user()->isType(self::ALLOWED_USER_TYPES)
						&& Auth::id() != $request->input('subject_id')
					)
					|| (
						!Auth::check()
						&& $request->has('email')
						&& self::emailValid($request->input('email'))
					)
				)
			) {
				return $next($request);
			}



			if (
				!$request->has('subject_id')
				|| !$request->has('form_id')
				|| (
					!$request->has('email')
					&& !Auth::check()
				)
			)
				return response()->json([
					'status' => 'denied',
					'reason' => 'Missing required input'
				], 404);

			if (
				($request->has('email') && !self::emailValid($request->input('email')))
				|| (Auth::check() && !Auth::user()->isType(self::ALLOWED_USER_TYPES))
			)
				return response()->json([
					'status' => 'denied',
					'reason' => 'Requestor invalid'
				], 403);

			return response()->json([
				'status' => 'denied',
				'reason' => 'Unknown'
			], 400);

		})->only('store');

		$this->middleware(function ($request, $next) {
			if (!Auth::check() || Auth::user()->isType(self::ALLOWED_USER_TYPES))
				return $next($request);

			return $request->ajax()
				? response('Not allowed', 403)
				: redirect('dashboard')->with('error', 'You are not currently allowed to create a Faculty 360 evaluation');
		})->only(['save', 'submit']);

		$this->middleware('auth')->only('sendHash');
		$this->middleware('type:admin')->only('sendHash');
	}

	protected $relationships = [
		"subject",
		"form"
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
		"subject_id",
		"status",
		"evaluation_date_start",
		"evaluation_date_end"
	];

	protected $model = \App\FacultyPeerEvaluation::class;

	public function store(Request $request) {
		$hashExpires = Carbon::now()->addMonth(); // FIXME

		$form = FacultyPeerForm::findOrFail($request->input('form_id'));

		$eval = new FacultyPeerEvaluation();
		$eval->form_id = $request->input('form_id');
		$eval->subject_id = $request->input('subject_id');
		$eval->evaluator_email = Auth::check()
			? Auth::user()->email
			: $request->input('email');

		$dates = DateHelpers::getDateRangeFromPeriodType($form->evaluation_period_type);
		$eval->evaluation_date_start = $dates['startDate'];
		$eval->evaluation_date_end = $dates['endDate'];

		$eval->contents = $form->contents;
		$eval->hash = self::generateHash();
		$eval->hash_expires = $hashExpires;

		$eval->request_ip = $request->ip();

		$eval->status = 'pending';

		$eval->save();
		$eval = $eval->fresh();

		if (Auth::check()) {
			return $request->ajax()
				? [
					'status' => 'success',
					'hash' => $eval->hash
				]
				: redirect("/faculty360/evaluate/{$eval->hash}");
		} else {
			$eval->sendHashLink();
			return $request->ajax()
				? [
					'status' => 'success'
				]
				: back()->with('success', 'Please check your email for a link to complete the evaluation!');
		}

	}

	public function save(Request $request, $hash) {
		// FIXME: Make sure form wasn't manipulated
		$eval = FacultyPeerEvaluation::byHash($hash)->firstOrFail();
		$eval->contents = $request->input('contents');
		$eval->save();

		return $request->ajax()
			? [
				'status' => 'success'
			]
			: back()->with('success', 'Evaluation progress saved successfully');
	}

	public function submit(Request $request, $hash) {
		// FIXME: Make sure form wasn't maniuplated
		$eval = FacultyPeerEvaluation::byHash($hash)->firstOrFail();
		$eval->contents = $request->input('contents');
		$eval->status = 'complete';
		$eval->complete_ip = $request->ip();
		$eval->save();

		// TODO: Redirect to proper success page for non-logged-in users?
		return $request->ajax()
			? [
				'status' => 'success'
			]
			: back()->with('success', 'Evaluation completed successfully!');
	}

	public function sendHash(Request $request, $id){
		$eval = FacultyPeerEvaluation::findOrFail($id);
		$eval->sendHashLink();

		return [
			'status' => 'success'
		];
	}

	private static function emailValid($email) {
		$domain = '@mcw.edu';

		return (
			substr($email, -(strlen($domain)) === $domain)
			&& User::where('email', $email)
				->whereNotIn('type', self::ALLOWED_USER_TYPES)
				->count() == 0
		);
	}

	private static function generateHash() {
		do {
			$hash = str_random(40);
		} while (FacultyPeerEvaluation::where('hash', $hash)->count() > 0);

		return $hash;
	}
}
