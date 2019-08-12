<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Closure;

use App\Program;


class ProgramController extends RestController
{

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->except(['evaluations', 'index']);
		$this->middleware(function ($request, Closure $next) {
			$id = $request->route()->parameters()['id'];

			// Will fail if scope hides from user
			Program::findOrFail($id);

			return $next($request);
		})->only(['evaluations']);
	}

	protected $relationships = [
		'administrators'
	];

	protected $attributes = [
		'id',
		'name',
		'type',
		'training_level',
		'secondary_training_level'
	];

	protected $model = \App\Program::class;

	public function addAdministrator($id, $userId) {
		$program = Program::findOrFail($id);
		$program->administrators()->attach($userId);
	}

	public function removeAdministrator($id, $userId) {
		$program = Program::findOrFail($id);
		$program->administrators()->detach($userId);
	}

	public function evaluations(Request $request, $id) {
		$program = Program::findOrFail($id);
		$userFields = 'id,first_name,last_name,type,training_level,secondary_training_level,status';
		$query = $program->evaluations()
			->with("subject:{$userFields}", "evaluator:{$userFields}");

		if ($request->has('start')) {
			$query->where('evaluation_date_end', '>=', $request->input('start'));
		}

		if ($request->has('end')) {
			$query->where('evaluation_date_start', '<=', $request->input('end'));
		}

		return $query->get()->map(function ($evaluation) {
			$evaluation->hideFields();

			return $evaluation;
		});
	}
}
