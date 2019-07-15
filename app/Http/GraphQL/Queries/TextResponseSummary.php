<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Evaluation;
use App\TextResponse;

class TextResponseSummary
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

		$responses = TextResponse::where('question_id', $args['questionId'])->whereIn('evaluation_id', $evaluationIds)->get();

		return [
			'evaluations' => $evaluations,
			'responses' => $responses,
			'values' => $responses->pluck('response')->toArray()
		];
    }

	public function resolveSubject($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		return $this->resolve(
			$rootValue,
			array_merge($args, [
				'subjectId' => $rootValue['id']
			]),
			$context,
			$resolveInfo
		);
	}

    public function resolveNum($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		return count($rootValue['values']);
    }

    public function resolveWithNumericValues($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		$map = [];
		foreach ($args['mappings'] as $mapping) {
			$map[$mapping['text']] = $mapping['value'];
		}

		$values = array_map(function ($textValue) use ($map) {
			return $map[$textValue];
		}, $rootValue['values']);

		return [
			'evaluations' => $rootValue['evaluations'],
			'responses' => [],
			'values' => $values
		];
	}

    public function resolveWithValue($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) {
		$responses = $rootValue['responses']->filter(
			function ($response) use ($args) {
				return $response->response == $args['value'];

			}
		);

		$num = count($responses);
		$totalNum = count($rootValue['responses']);
		$percent = $totalNum > 0 ? $num / $totalNum : 0;

		return [
			'value' => $args['value'],
			'responses' => $responses,
			'num' => $num,
			'percent' => $percent
		];
    }
}
