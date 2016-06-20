<?php

namespace App\Http\Controllers\Rest;

class FormController extends RestController
{

	protected $relationships = [
		"evaluations",
		"milestones",
		"competencies",
		"watchedForms"
	];

	protected $attributes = [
		"id",
		"type",
		"evaluator_type",
		"visibility"
	];

	protected $model = \App\Form::class;
}
