<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class HighlightedQuestionQuestionController extends RestController
{

	public function __construct() {
		$this->middleware([
			'auth',
			'type:admin',
			'site-feature:highlighted-questions'
		]);
	}

	protected $relationships = [
		'values'
	];

	protected $attributes = [
		'id',
		'form_id',
		'question_id'
	];

	protected $model = \App\HighlightedQuestionQuestion::class;
}
