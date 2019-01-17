<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\BeyondMilestones\ProfessionalismQuestion;

class RandomProfessionalismQuestions
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
		$items = fisherYatesShuffle(ProfessionalismQuestion::all(), $args['id']);
		return $items->slice(0, $args['count'])->values();
    }
}

// https://stackoverflow.com/questions/6557805/randomize-a-php-array-with-a-seed
function fisherYatesShuffle($items, $seed) {
    @mt_srand($seed);
    for ($i = count($items) - 1; $i > 0; $i--) {
        $j = @mt_rand(0, $i);
        $tmp = $items[$i];
        $items[$i] = $items[$j];
        $items[$j] = $tmp;
    }

	return $items;
}

