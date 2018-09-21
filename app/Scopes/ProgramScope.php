<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;
use Log;

class ProgramScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if (!empty($user) && !$user->isType("admin")) {
			return $builder->whereHas('administrators', function($adminQuery) use ($user) {
				return $adminQuery->where('users.id', $user->id);
			});
		}

		return $builder;
	}
}
