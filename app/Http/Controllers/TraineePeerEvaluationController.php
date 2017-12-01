<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Form;

class TraineePeerEvaluationController extends Controller {
    public function __construct() {
		$this->middleware('site-feature:trainee360');
		$this->middleware('auth');
		$this->middleware('shared');
		$this->middleware('type:admin')->only('manage');

		$this->middleware(function ($request, $next) {
			$user = Auth::user();

			if (!$request->has('subject_id'))
				throw new \DomainException('Please specify a subject');

			if (!$request->has('evaluator_id'))
				throw new \DomainException('Please specify an evaluator');

			if (!$user->isType('admin') && !$user->isType('trainee'))
				throw new \DomainException('Sorry, you are not currently allowed to make that kind of request');

			if ($request->input('subject_id') == $request->input('evaluator_id'))
				throw new \DomainException('Sorry, self evaluations are not allowed at this time');

			if (
				!$user->isType('admin')
				&& $user->id != $request->input('subject_id')
				&& $user->id != $request->input('evaluator_id')
			) {
				throw new \DomainException('Sorry, you must be either the evaluator or the subject when making a request');
			}

			return $next($request);
		});
	}

	public function request() {
		$traineeQuery = User::ofType('resident')->active();

		if (Auth::check())
			$traineeQuery = $traineeQuery->where('id', '!=', Auth::id());

		$trainees = $traineeQuery->get();

		$forms = Form::where('formType', 'trainee360')
			->where('status', 'active')->get();

		$data = compact('trainees', 'forms');

		return view('trainee360.request', $data);
	}

	public function createRequest(Request $request) {
		$user = Auth::user();

		$form = Form::findOrFail($request->input('form_id'));
		$subject = User::findOrFail($request->input('subject_id'));
		$evaluator = User::findOrFail($request->input('evaluator_id'));

		$data = array_merge($request->all(), [
			'requested_by_id' => $user->id,
			'status' => 'pending',
			'training_level' => $subject->training_level,
			''
		]);


		$evaluation = Evaluation::create([

		]);
	}
}
