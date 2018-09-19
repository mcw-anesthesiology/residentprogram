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
		$this->middleware('type:admin')->except(['evaluations']);
		$this->middleware(function ($request, Closure $next) {
			$user = Auth::user();
			$id = $request->route()->parameters()['id'];

			if (!empty($user) && (
				$user->isType('admin')
				|| $user->administratedPrograms()->get(['id'])->contains($id)
			)) {
				return $next($request);
			}

			abort(403);
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

	public function evaluations($id) {
		$program = Program::findOrFail($id);

		return $program->evaluations;
	}
}
