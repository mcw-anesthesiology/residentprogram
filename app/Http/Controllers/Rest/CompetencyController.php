<?php

namespace App\Http\Controllers\Rest;

class CompetencyController extends RestController
{

	protected $relationships = [
		"competencies_questions",
		"levels",
		"forms"
	];

	protected $attributes = [
		"id",
		"title",
		"description"
	];

	protected $model = \App\Competency::class;
}
