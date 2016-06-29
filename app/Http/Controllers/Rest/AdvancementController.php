<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class AdvancementController extends RestController
{

	protected $relationships = [
		"user"
	];

	protected $attributes = [
		"id",
		"user_id",
		"advanced_field",
		"advanced_value",
		"run_at",
		"complete"
	];

	protected $model = \App\Advancement::class;

}
