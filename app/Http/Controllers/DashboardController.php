<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Evaluation;

use Auth;

class DashboardController extends Controller
{
	public function __construct() {
		$this->middleware('auth');

		$this->sanitize = function ($evaluation) {
			return $evaluation->hideFields();
		};
	}

	public function subjectEvaluations() {
		return Auth::user()->subjectEvaluations()->with('form:id,title', 'evaluator:id,first_name,last_name')->get()->map($this->sanitize);
	}

	public function evaluatorEvaluations() {
		return Auth::user()->evaluatorEvaluations()->with('form:id,title', 'subject:id,first_name,last_name')->get()->map($this->sanitize);
	}
}
