<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;


class AnesthesiaAnalgesiaTypeController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		"name"
	];

	protected $model = \App\AnesthesiaAnalgesiaType::class;

}
