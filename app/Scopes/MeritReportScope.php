<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Auth;
use DB;

class MeritReportScope implements Scope {
	public function apply(Builder $builder, Model $model){
		$user = Auth::user();

		if (app()->runningInConsole() || $user->isType('admin') || $user->usesFeature('FACULTY_MERIT')) {
			return $builder;
		}

		return $builder->where('user_id', $user->id)
			->orWhereExists(function($query) {
				$query->select(DB::raw(1))
					->from('merit_administrators')
					->where('administrator_id', Auth::id())
					->whereRaw('administratee_id = merit_reports.user_id');
			});
	}
}
