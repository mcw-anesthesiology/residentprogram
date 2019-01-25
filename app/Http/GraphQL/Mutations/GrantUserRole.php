<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\User;
use App\Role;

class GrantUserRole
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $args The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
		$role = Role::where('role', $args['role'])->firstOrFail();
		$user = User::findOrFail($args['user_id']);

		$intermediateData = [];
		if (!empty($args['additional_permissions'])) {
			$intermediateData['additional_permissions'] = $args['additional_permissions'];
		}

		$user->roles()->attach($role->id, $intermediateData);

		return $user->fresh();
    }
}
