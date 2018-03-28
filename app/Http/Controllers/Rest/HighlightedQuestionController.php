<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Evaluation;
use App\HighlightedQuestion;

use DB;
use Log;

class HighlightedQuestionController extends RestController
{

	protected $relationships = [
		'questions'
	];

	protected $attributes = [
		'id',
		'highlight_name'
	];

	protected $model = \App\HighlightedQuestion::class;
	public function responsesForUser(Request $request, $userId) {
		$startDate = $request->input('startDate');
		$endDate = $request->input('endDate');

		// Pretty copied from App\HighlightedQuestion
		return DB::table('highlighted_questions')
			->join(
				'highlighted_questions_questions',
				'highlighted_questions_questions.highlighted_question_id',
				'=',
				'highlighted_question_id'
			)
			->join(
				'evaluations',
				'evaluations.form_id',
				'=',
				'highlighted_questions_questions.form_id'
			)
			->leftJoin('responses', function ($join) {
				$join->on(
					'responses.evaluation_id',
					'=',
					'evaluations.id'
				)->on(
					'responses.question_id',
					'=',
					'highlighted_questions_questions.question_id'
				);
			})
			->leftJoin('text_responses', function ($join) {
				$join->on(
					'text_responses.evaluation_id',
					'=',
					'evaluations.id'
				)->on(
					'text_responses.question_id',
					'=',
					'highlighted_questions_questions.question_id'
				);
			})
			->leftJoin('highlighted_questions_questions_values', function ($join) {
				$join->on(
					'highlighted_questions_questions_values.highlighted_question_question_id',
					'=',
					'highlighted_questions_questions.id'
				)->on(function ($join) {
					$join->on(
						'highlighted_questions_questions_values.value',
						'=',
						'responses.response'
					)->orOn(
						'highlighted_questions_questions_values.value',
						'=',
						'text_responses.response'
					);
				});
			})
			->where(function ($query) {
				$query->whereNotNull('responses.response')
					->orWhereNotNull('text_responses.response');
			})
			->where('evaluations.subject_id', $userId)
			->where('evaluations.evaluation_date_end', '>=', $startDate)
			->where('evaluations.evaluation_date_start', '<=', $endDate)
			->orderBy('evaluations.id')
			->select(
				'highlighted_questions.id as hq_id',
				'highlighted_questions.highlight_name as highlight_name',
				'highlighted_questions_questions.id as hqq_id',
				'evaluations.id as evaluation_id',
				'responses.response as response',
				'text_responses.response as text_response',
				'highlighted_questions_questions_values.highlighted_value as highlighted_value'
			)
			->get()
			->groupBy('hq_id')
			->values();
	}
}
