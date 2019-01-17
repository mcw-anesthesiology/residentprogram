<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Evaluation;
use App\BeyondMilestones\ScenarioResponse;

use Auth;

class SetScenarioResponse
{
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
		$eval = Evaluation::findOrFail($args['evaluation_id']);
		if ($eval->status != 'pending' || $eval->evaluator_id !== Auth::id()) {
			throw new AuthorizationException;
		}

		return ScenarioResponse::updateOrCreate(
			[
				'scenario_id' => $args['scenario_id'],
				'evaluation_id' => $args['evaluation_id']
			],
			[
				'value' => $args['value']
			]
		);
    }
}
