<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class UserScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if (Auth::check() && !$user->isType("admin")) {
			$builder = $builder->where("id", $user->id)
				->orWhereIn("id", $user->mentees->pluck("id"));

			foreach ($user->administratedPrograms as $program) {
				$builder->orWhere(function ($query) use ($program) { $program->traineeInProgramQuery($query); });
			}
		}

		return $builder;
	}
}
