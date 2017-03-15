<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use App\User;

use Auth;
use Log;

class EvaluationScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if(Auth::check() && !$user->isType("admin"))
			return $builder->where("evaluator_id", $user->id)
				->orWhere(function($query) use ($user){
					$query->where("subject_id", $user->id)->notHidden();
				})->orWhere(function($query) use ($user){
					$query->where("status", "complete")
						->whereIn("subject_id", $user->mentees->pluck("id"))
						->notHidden();
				})->orWhere(function($query) use ($user){
					$query->whereIn("form_id", $user->watchedForms->pluck("form_id"));
				})->orWhere(function($query) use ($user){
					if($user->usesFeature('RESIDENT_EVALS')){
						$query->whereIn('training_level', [
							'intern',
							'ca-1',
							'ca-2',
							'ca-3'
						]);
					}
				})->orWhere(function($query) use ($user){
					if($user->usesFeature('FACULTY_EVALS')){
						$query->whereHas('subject', function($subjectQuery){
							$subjectQuery->where('type', 'faculty');
						})->whereHas('form', function($formQuery) use ($user){
							$formQuery->where('type', 'faculty');
						})->where('subject_id', '!=', $user->id);
					}
				});

		return $builder;
	}
}
