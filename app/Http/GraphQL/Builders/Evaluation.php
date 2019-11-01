<?php

namespace App\Http\GraphQL\Builders;

class Evaluation {
	public function subjectFilter($builder, $subjectFilter) {
		return $builder->whereHas('subject', function($query) use ($subjectFilter) {
			foreach ($subjectFilter as $key => $val) {
				if ($key == 'training_level' && $val == 'RESIDENT') {
					$query->whereIn($key, config('constants.RESIDENT_TRAINING_LEVELS'));
				} else {
					$query->where($key, $val);
				}
			}

			return $query;
		});
	}
}

