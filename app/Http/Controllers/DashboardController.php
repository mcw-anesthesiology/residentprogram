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

	private static function applyDates($query, $request) {
		if ($request->has('startDate')) {
			$query->where('evaluation_date_end', '>=', $request->input('startDate'));
		}

		if ($request->has('endDate')) {
			$query->where('evaluation_date_start', '<=', $request->input('endDate'));
		}
	}

	public function subjectEvaluations(Request $request) {
		$query = Auth::user()->subjectEvaluations()->with('form:id,title,type', 'evaluator:id,first_name,last_name');
		self::applyDates($query, $request);

		return $query->get()->map($this->sanitize);
	}

	public function evaluatorEvaluations(Request $request) {
		$query = Auth::user()->evaluatorEvaluations()->with('form:id,title,type', 'subject:id,first_name,last_name');
		self::applyDates($query, $request);

		return $query->get()->map($this->sanitize);
	}
}
