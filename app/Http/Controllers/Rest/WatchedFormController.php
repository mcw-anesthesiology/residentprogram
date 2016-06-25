<?php

namespace App\Http\Controllers\Rest;

class WatchedFormController extends RestController
{

	protected $relationships = [
		"form",
		"user"
	];

	protected $attributes = [
		"form_id",
		"user_id"
	];

	protected $model = \App\WatchedForm::class;
}
