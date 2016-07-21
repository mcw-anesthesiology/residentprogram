<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;

class EvaluationScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		// TODO: Run this to hide faculty evals
		// $threshold = Setting::get("facultyEvalThreshold");
		// $faculty = User::where("type", "faculty")->get();
		// $faculty->each(function($fac) use ($threshold){
		// 	$evaluations = $fac->subjectEvaluations()->notHidden()
		//     	->where("status", "complete")->orderBy("id", "desc")
		//     	->orderBy("id", "desc")->get();
		// 	$evaluations->splice($evaluations->count()%$threshold);
		// 	$evaluations->each(function($eval){
		// 		$eval->visibility = "under faculty threshold";
		// 	});
		// });


		if(!empty($user) && !$user->isType("admin"))
			return $builder->where("evaluator_id", $user->id)
				->orWhere(function($query) use ($user){
					$query->where("subject_id", $user->id)->notHidden();
				})->orWhere(function($query) use ($user){
					$query->where("status", "complete")
						->whereIn("subject_id", $user->mentees->pluck("id"))
						->notHidden();
				})->orWhere(function($query) use ($user){
					$query->whereIn("form_id", $user->watchedForms->pluck("form_id"));
				});

		return $builder;
	}
}
