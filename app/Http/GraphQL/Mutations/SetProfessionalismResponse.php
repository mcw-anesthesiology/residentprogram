<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Nuwave\Lighthouse\Exceptions\AuthorizationException;

use App\BeyondMilestones\ProfessionalismResponse;

class SetProfessionalismResponse
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
		$eval = Evaluation::findOrFail($args['evaluation_id']);
		if ($eval->status != 'pending')
			throw new AuthorizationException;

		return ProfessionalismResponse::firstOrCreate(
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
