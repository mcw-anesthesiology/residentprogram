<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Nuwave\Lighthouse\Exceptions\AuthorizationException;

use App\ScenarioResponse;
use App\BeyondMilestones\AdditionalResponse;

use Auth;

class SetAdditionalResponse
{
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
		$scenarioResponse = ScenarioResponse::findOrFail($args['scenario_response_id']);
		if ($scenarioResponse->evaluation->status != 'pending' || $scenarioResponse->evaluation !== Auth::id()) {
			throw new AuthorizationException;
		}

		return AdditionalResponse::updateOrCreate(
			[
				'question_id' => $args['question_id'],
				'scenario_response_id' => $args['scenario_response_id']
			],
			[
				'value' => $args['value']
			]
		);
    }
}
