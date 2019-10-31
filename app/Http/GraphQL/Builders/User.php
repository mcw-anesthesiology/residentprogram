<?php

namespace App\Http\GraphQL\Builders;

class User {
	public function inGroups($builder, $groupIds) {
		return $builder->whereHas('groups', function($query) use ($groupIds) {
			return $query->whereIn('user_groups.id', $groupIds);
		});
	}
}

