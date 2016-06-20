<?php

namespace App\Http\Controllers\Rest;

class UserController extends RestController
{

	protected $relationships = [
		"subjectEvaluations",
		"evaluatorEvaluations",
		"requestedEvaluations",
		"mentees",
		"watchedForms"
	];

	protected $attributes = [
		"id",
		"username",
		"type",
		"status",
		"training_level",
		"first_name",
		"last_name",
		"email",
		"notifications",
		"reminder_frequency",
		"specific_type"
	];

	protected $model = \App\User::class;
}
