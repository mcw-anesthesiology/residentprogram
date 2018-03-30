<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class HighlightedQuestionQuestionValueController extends RestController
{

	public function __construct() {
		$this->middleware([
			'auth',
			'type:admin',
			'site-feature:highlighted-questions'
		]);
	}

	protected $relationships = [
		'question'
	];

	protected $attributes = [
		'id',
		'highlighted_question_question_id',
		'value',
		'highlighted_value'
	];

	protected $model = \App\HighlightedQuestionQuestionValue::class;
}
