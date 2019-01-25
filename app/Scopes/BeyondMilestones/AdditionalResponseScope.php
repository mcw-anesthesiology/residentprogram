<?php

namespace App\Scopes\BeyondMilestones;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use App\User;
use App\Evaluation;

use Auth;
use DB;
use Log;

class AdditionalResponseScope implements Scope {
	public function apply(Builder $builder, Model $model) {
		if (
			app()->runningInConsole()
			|| (Auth::check() && Auth::user()->isType('admin'))
		) {
			return $builder;
		}

		return $builder->whereExists(function ($query) {
			$db = DB::connection()->getDatabaseName();

			$query->select(DB::raw(1))
				->from("{$db}.evaluations")
				->whereRaw("{$db}.evaluations.id = evaluation_id")
				->where('evaluator_id', Auth::id());
		});
	}
}


