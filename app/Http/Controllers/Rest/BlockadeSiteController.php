<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;


class BlockadeSiteController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		"name"
	];

	protected $model = \App\BlockadeSite::class;

}
