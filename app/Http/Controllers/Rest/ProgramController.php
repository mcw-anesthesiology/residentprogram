<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class ProgramController extends RestController
{

	public function __construct() {
		$this->middleware([
			'auth',
			'type:admin'
		]);
	}

	protected $relationships = [
		'administrators'
	];

	protected $attributes = [
		'id',
		'name',
		'type',
		'training_level',
		'secondary_training_level'
	];

	protected $model = \App\Program::class;
}
