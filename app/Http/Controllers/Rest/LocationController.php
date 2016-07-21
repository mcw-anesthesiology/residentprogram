<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;


class LocationController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		"name"
	];

	protected $model = \App\Location::class;

}
