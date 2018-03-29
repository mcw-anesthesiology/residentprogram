<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Evaluation;
use App\HighlightedQuestion;

use DB;
use Log;

class HighlightedQuestionQuestionController extends RestController
{

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
