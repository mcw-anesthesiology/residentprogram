<?php

namespace App\Http\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Auth;
use App\Evaluation;
use App\TextResponse;

class SaveEvaluation
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
		$eval = Evaluation::findOrFail($args['id']);

		// TODO:
		// 1. Check to make sure response value is valid
		// 2. Decide whether omitted questions should be cleared
		// 3. Decide what happens when completion unsuccessful

		if ($eval->evaluator_id != Auth::id()) {
			throw new \DomainException('You are not allowed to modify this evaluation');
		}

		if (!empty($args['responses'])) {
			foreach ($args['responses'] as $responseInput) {
				$questionId = $responseInput['questionId'];
				$value = $responseInput['value'];

				if (is_numeric($responseInput['value'])) {
					$eval->responses()->updateOrCreate([
						'question_id' => $questionId
					], [
						'response' => $value
					]);
				} else {
					$values = is_array($value)
						? $value
						: [$value];

					TextResponse::where([
						'evaluation_id' => $eval->id,
						'question_id' => $questionId
					])->delete();

					$eval->textResponses()->createMany(array_map(function ($value) use ($questionId) {
						return [
							'question_id' => $questionId,
							'response' => $value
						];
					}, $values));
				}
			}

			$eval->load('responses', 'textResponses');
		}

		if (!empty($args['complete'])) {
			if ($eval->isComplete()) {
				$eval->status = 'complete';
				$eval->save();
			}
		}

		return $eval;
    }
}
