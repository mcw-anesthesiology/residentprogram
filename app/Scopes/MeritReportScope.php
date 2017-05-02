<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class MeritReportScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if(!empty($user) && !$user->isType('admin') && !$user->usesFeature('FACULTY_EVALS'))
			return $builder->where('user_id', $user->id);

		return $builder;
	}
}
