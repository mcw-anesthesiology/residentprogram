<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Evaluation;
use App\Response;

use App\Helpers\Math;

class ResponseSummary
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
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		$query = Evaluation::where([
			'form_id' => $args['formId'],
			'subject_id' => $args['subjectId'],
			'status' => 'complete'
		]);

		if (!empty($args['after'])) {
			$query->where('evaluation_date_end', '>=', $args['after']);
		}

		if (!empty($args['before'])) {
			$query->where('evaluation_date_start', '<=', $args['before']);
		}

		$evaluations = $query->get();

		$evaluationIds = $evaluations->pluck('id');
		$responses = Response::where('question_id', $args['questionId'])->whereIn('evaluation_id', $evaluationIds)->get();

		return [
			'evaluations' => $evaluations,
			'responses' => $responses,
			'values' => $responses->pluck('response')->toArray()
		];
    }

	public function resolveAverage($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		return Math::mean($rootValue['values']);
	}

	public function resolveStdDev($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		return Math::sd($rootValue['values']);
	}

	public function resolveNum($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		return count($rootValue['responses']);
	}
}
