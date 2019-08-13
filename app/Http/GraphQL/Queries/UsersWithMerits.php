<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\User;

class UsersWithMerits
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
		if (empty($args)) {
			return User::with('meritReports')->whereHas('meritReports')->get();
		} else {
			$orderBy = null;
			if (!empty($args['orderBy'])) {
				$orderBy = $args['orderBy'];
				unset($args['orderBy']);
			}

			$meritFilter = function($query) use ($args) {
				if (!empty($args['before'])) {
					$query->where('period_start', '<=', $args['before']);
					unset($args['before']);
				}

				if (!empty($args['after'])) {
					$query->where('period_end', '>=', $args['after']);
					unset($args['after']);
				}

				$query->where($args);
			};

			$query = User::with(['meritReports' => $meritFilter])->whereHas('meritReports', $meritFilter);

			if (!empty($orderBy)) {
				foreach ($orderBy as $orderObj) {
					$query->orderBy($orderObj['field'], $orderObj['order']);
				}
			}

			return $query->get();
		}
    }
}
