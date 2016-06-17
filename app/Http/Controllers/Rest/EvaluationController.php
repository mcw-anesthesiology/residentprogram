<?php

namespace App\Http\Controllers\Rest;

class EvaluationController extends RestController
{

	protected $relationships = [
		"evaluator",
		"subject",
		"requestor",
		"form",
		"responses",
		"textResponses",
		"flag"
	];

	protected $attributes = [
		"id",
		"form_id",
		"evaluator_id",
		"subject_id",
		"requested_by_id",
		"status",
		"training_level",
		"request_date",
		"complete_date",
		"evaluation_date"
	];

	protected $model = "App\Evaluation";
}
