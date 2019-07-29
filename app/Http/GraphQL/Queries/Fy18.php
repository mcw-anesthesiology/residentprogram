<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use DB;

class Fy18
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
		return DB::connection('provider_info')->table('fy18_comp')->get();
    }

    public function resolveClinicalFte($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
		$rootValue = (array)$rootValue;
		$fhFte = empty($rootValue['FH FTE Used']) ? 0 : $rootValue['FH FTE Used'];
		$vaFte = empty($rootValue['VA FTE']) ? 0 : $rootValue['VA FTE'];

		return $fhFte + $vaFte;
    }
}
