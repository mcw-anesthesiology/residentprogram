<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class MentorshipScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if (!empty($user) && !$user->isType("admin")) {
			return $builder->where('mentor_id', $user->id)->orWhere('mentee_id', $user->id);
		}

		return $builder;
	}
}
