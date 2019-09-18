<?php

namespace App\Http\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\BeyondMilestones\Scenario;
use App\BeyondMilestones\ScenarioResponse;

use App\Helpers\Math;

use Auth;

class BeyondMilestonesResponseSummaries {

	public function resolveTrainingLevelResponseSummaries(
		$scenario,
		array $args,
		GraphQLContext $context,
	   	ResolveInfo $resolveInfo
	) {
		$responses = $scenario->responses()->withoutGlobalScopes()
			->with('evaluation')->get();
		$responses = $responses->filter(function ($sr) {
			return $sr->evaluation->status == 'complete';
		});

		$trainingLevelResponses = $responses->groupBy(function ($item, $key) {
			return $item->evaluation->training_level;
		});

		$summaries = [];

		foreach ($trainingLevelResponses as $trainingLevel => $responses) {
			$summaries[] = [
				'trainingLevel' => $trainingLevel,
				'summary' => self::createSummary($responses)
			];
		}

		return $summaries;
	}

	public function resolveMyResponseSummary(
		$scenario,
		array $args,
		GraphQLContext $context,
	   	ResolveInfo $resolveInfo
	) {
		$responses = self::filterMyResponses(
			$scenario->responses()->with('evaluation')->get()
		);

		return self::createSummary($responses);
	}

	private static function filterMyResponses($responses) {
		return $responses->filter(function ($sr) {
			return $sr->evaluation->subject_id == Auth::id()
				&& $sr->evaluation->status == 'complete';
		});
	}

	private static function createSummary($responses) {
		$responseValues = $responses->pluck('value')->toArray();

		$num = count($responseValues);

		return [
			'average' => $num > 0 ? Math::mean($responseValues) : null,
			'num' => $num,
			'stdDev' => $num > 1 ? Math::sd($responseValues) : null
		];
	}
}
