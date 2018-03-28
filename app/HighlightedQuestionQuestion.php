<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HighlightedQuestionQuestion extends Model
{
    protected $table = 'highlighted_questions_questions';

	protected $fillable = [
		'highlighted_question_id',
		'form_id',
		'question_id'
	];

	protected $dates = [
		'created_at',
		'updated_at'
	];

	public function highlightedQuestion() {
		return $this->belongsTo('App\HighlightedQuestion');
	}

	public function form() {
		return $this->belongsTo('App\Form');
	}

	public function evaluations() {
		return $this->hasMany('App\Evaluation', 'form_id', 'form_id');
	}

	public function responses() {
		// Not ideal way to declare a relationship but should work
		return $this->hasManyThrough(
			'App\Response',
			'App\Evaluation',
			'form_id',
			'evaluation_id',
			'form_id',
			'id'
		)->where('question_id', $this->question_id);
	}

	public function textResponses() {
		// Not ideal way to declare a relationship but should work
		return $this->hasManyThrough(
			'App\TextResponse',
			'App\Evaluation',
			'form_id',
			'evaluation_id',
			'form_id',
			'id'
		)->where('question_id', $this->question_id);
	}

	public function getResponsesFilter() {
		$questionId = $this->question_id;
		return function ($query) use ($questionId) {
			$query->where('question_id', $questionId);
		};
	}

	public function evaluationsWithResponses() {
		// For rest controller because I'm lazy
		$responsesFilter = $this->getResponsesFilter();
		return $this->evaluations()
			->whereHas('responses', $responsesFilter)
			->with(['responses' => $responsesFilter]);
	}

	public function evaluationsWithTextResponses() {
		// For rest controller because I'm lazy
		$responsesFilter = $this->getResponsesFilter();
		return $this->evaluations()
			->whereHas('textResponses', $responsesFilter)
			->with(['textResponses' => $responsesFilter]);
	}

	public function responsesWithEvaluations() {
		// For rest controller because I'm lazy
		return $this->responses()->with('evaluation');
	}

	public function textResponsesWithEvaluations() {
		// For rest controller because I'm lazy
		return $this->textResponses()->with('evaluation');
	}
}
