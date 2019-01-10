<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Nuwave\Lighthouse\Exceptions\AuthorizationException;

use App\Evaluation;
use App\BeyondMilestones\ProfessionalismResponse;

use Auth;

class SetProfessionalismResponse
{
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
		$eval = Evaluation::findOrFail($args['evaluation_id']);
		if ($eval->status != 'pending' || $eval->evaluator_id !== Auth::id()) {
			throw new AuthorizationException;
		}

		return ProfessionalismResponse::updateOrCreate(
			[
				'question_id' => $args['question_id'],
				'evaluation_id' => $args['evaluation_id']
			],
			[
				'value' => $args['value']
			]
		);
    }
}
