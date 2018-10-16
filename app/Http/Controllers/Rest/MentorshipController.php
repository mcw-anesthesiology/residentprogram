<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Mentorship;

use Auth;
use Log;

class MentorshipController extends RestController
{

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->except([
			'index',
			'show',
			'mentees',
			'mentors',
			'menteeEvaluations'
		]);
	}

	protected $relationships = [
		"mentor",
		"mentee"
	];

	protected $attributes = [
		"id",
		"mentor_id",
		"mentee_id",
		"status"
	];

	protected $model = \App\Mentorship::class;

	public function mentees() {
		return Auth::user()->mentees->map(function ($m) {
			$m->hideFields();

			return $m;
		});
	}

	public function mentors() {
		return Auth::user()->mentors->map(function ($m) {
			$m->hideFields();

			return $m;
		});
	}

	public function menteeEvaluations(Request $request) {
		$user = Auth::user();

		$menteeQuery = $user->mentees();

		if ($request->has('menteeId')) {
			$menteeQuery->where('mentee_id', $request->input('menteeId'));
		}

		return $menteeQuery->with([
			'subjectEvaluations' => function ($query) use ($request) {
				$query->between($request->input('startDate'), $request->input('endDate'));
			},
			'subjectEvaluations.subject:id,first_name,last_name',
			'subjectEvaluations.evaluator:id,first_name,last_name',
			'subjectEvaluations.form:id,title'
		])->get()->mapWithKeys(function ($mentee) {
			return [$mentee->id => $mentee->subjectEvaluations->map(function ($e) {
				$e->hideFields();

				return $e;
			})];
		});
	}
}
