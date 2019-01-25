<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\User;

class UserGroups
{
	const ORDER = [
		'resident',
		'fellow',
		'faculty',
		'app',
		'staff',
		'external',
		'admin'
	];
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
		$users = User::orderBy('type', 'asc')->orderBy('last_name', 'asc');

		$userGroups = $users->get()->groupBy('specific_type')->map(function ($users, $type) {
			return [
				'type' => $type,
				'users' => $users
			];
		})->all();



		usort($userGroups, function($a, $b) {
			$aIndex = array_search($a['type'], self::ORDER);
			$bIndex = array_search($b['type'], self::ORDER);

			if ($aIndex === false) {
				return 1;
			}

			if ($bIndex === false) {
				return -1;
			}

			return $aIndex - $bIndex;
		});

		return $userGroups;
    }
}
