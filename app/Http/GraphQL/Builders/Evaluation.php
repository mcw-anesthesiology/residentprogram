<?php

namespace App\Http\GraphQL\Builders;

class Evaluation {
	public function subjectFilter($builder, $subjectFilter) {
		return $builder->whereHas('subject', function($query) use ($subjectFilter) {
			foreach ($subjectFilter as $key => $val) {
				$query->where($key, $val);
			}

			return $query;
		});
	}
}

