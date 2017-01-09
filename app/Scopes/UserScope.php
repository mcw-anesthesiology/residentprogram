<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class UserScope implements Scope {
	// TODO: Upgrade to laravel 5.3 before applying
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if(Auth::check() && !$user->isType("admin"))
			return $builder->where("id", $user->id)
				->orWhereIn("id", $user->mentees->pluck("id"));

		return $builder;
	}
}
