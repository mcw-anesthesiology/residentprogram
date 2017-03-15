<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\UserFeature;

class UserFeatureController extends RestController
{

	protected $relationships = [
		"user"
	];

	protected $attributes = [
		"feature",
		"user_id",
		"user_type",
		"user_training_level",
		"user_secondary_training_level"
	];

	protected $model = \App\UserFeature::class;

}
