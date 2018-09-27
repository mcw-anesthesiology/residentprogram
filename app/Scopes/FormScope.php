<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class FormScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if (!empty($user) && !$user->isType("admin")) {
			$userTypes = [
				$user->type,
				$user->specificType
			];

			// Gross intern360 workaround
			if ($user->isType('trainee')) {
				$userTypes[] = 'ca-1';
			}

			return $builder->where(function($query) use ($user, $userTypes) {
				return $query->whereIn('type', $userTypes)
					->orWhereIn('evaluator_type', $userTypes);
			});
		}

		return $builder;
	}
}
