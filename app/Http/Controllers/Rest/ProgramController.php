<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Closure;

use App\Program;

use Auth;


class ProgramController extends RestController
{

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->except(['evaluations', 'index']);
		$this->middleware(function ($request, Closure $next) {
			$user = Auth::user();
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
		$query = $program->evaluations();

		if ($request->has('start')) {
			$query->where('evaluation_date_end', '>=', $request->input('start'));
		}

		if ($request->has('end')) {
			$query->where('evaluation_date_start', '<=', $request->input('end'));
		}

		return $query->get();
	}
}