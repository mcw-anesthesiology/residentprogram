<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;

class HighlightedQuestion extends Model
{
    protected $table = 'highlighted_questions';

	protected $fillable = [
		'highlight_name'
	];

	protected $dates = [
		'created_at',
		'updated_at'
	];

	public function questions() {
		return $this->hasMany('App\HighlightedQuestionQuestion');
	}

	public function responses() {
		return $this->responsesInner()->get();
	}

	public function responsesBySubject($id) {
		return $this->responsesInner()
			->where('evaluations.subject_id', $id)
			->get();
	}

	private function responsesInner() {
		return DB::table('highlighted_questions_questions')
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
			->where(
				'highlighted_questions_questions.highlighted_question_id',
				'=',
				$this->id
			)
			->where(function ($query) {
				$query->whereNotNull('responses.response')
					->orWhereNotNull('text_responses.response');
			})
			->orderBy('evaluations.id')
			->select(
				'highlighted_questions_questions.id as hqq_id',
				'evaluations.id as evaluation_id',
				'responses.response as response',
				'text_responses.response as text_response',
				'highlighted_questions_questions_values.highlighted_value as highlighted_value'
			);
	}
}
