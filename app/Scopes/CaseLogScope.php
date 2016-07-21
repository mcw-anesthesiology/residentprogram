<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class CaseLogScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if(!empty($user) && !$user->isType("admin"))
			return $builder->where("user_id", $user->id)
				->orWhereIn("user_id", $user->mentees->pluck("id"));

		return $builder;
	}
}
