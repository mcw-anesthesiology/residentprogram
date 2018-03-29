<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HighlightedQuestionQuestionValue extends Model
{
    protected $table = 'highlighted_questions_questions_values';

	protected $fillable = [
		'highlighted_question_question_id',
		'value',
		'highlighted_value'
	];

	protected $dates = [
		'created_at'
	];

	public function question() {
		return $this->belongsTo('App\HighlightedQuestionQuestion');
	}
}
