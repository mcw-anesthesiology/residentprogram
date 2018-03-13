<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Evaluation;
use App\HighlightedQuestion;

use Log;

class HighlightedQuestionController extends RestController
{

	protected $relationships = [
		'form',
		'evaluations',
		'responses',
		'textResponses'
	];

	protected $attributes = [
		'id',
		'highlight_name',
		'form_id',
		'question_id'
	];

	protected $model = \App\HighlightedQuestion::class;

	public function evaluationsWithResponsesForUser(Request $request, $userId) {
		return HighlightedQuestion::all()
			->each(function($hq) use ($userId) {
				$hq->load([
					'evaluationsWithResponses' => function ($query) use ($userId) {
						Log::debug($query->toSql());
						$query->where('subject_id', $userId);
					}
				]);
			});
	}

	public function responsesForUser(Request $request, $userId) {
		return HighlightedQuestion::all()
			->map(function($hq) use ($userId) {
				$responses = $hq->evaluationsWithResponses()
					->where('subject_id', $userId)
					->get()
					->map(function ($e) {
						return $e->responses->get(0);
					});

				$response = $hq->jsonSerialize();
				unset($response['evaluations_with_responses']);
				$response['responses'] = $responses->toArray();

				return $response;
			});
	}
}
