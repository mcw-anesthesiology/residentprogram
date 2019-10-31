<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class UserGroup {
	public function addUserToGroup(
		$rootValue,
		array $args,
	   	GraphQLContext $context,
		ResolveInfo $resolveInfo
	) {
		$group = \App\UserGroup::findOrFail($args['group_id']);

		$group->users()->attach($args['user_id']);

		return $group;
    }

	public function removeUserFromGroup(
		$rootValue,
		array $args,
		GraphQLContext $context,
	   	ResolveInfo $resolveInfo
	) {
		$group = \App\UserGroup::findOrFail($args['group_id']);

		$group->users()->detach($args['user_id']);

		return $group;
    }
}

