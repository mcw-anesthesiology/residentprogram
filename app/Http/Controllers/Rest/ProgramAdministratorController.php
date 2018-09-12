<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class ProgramAdministratorController extends RestController
{

	public function __construct() {
		$this->middleware([
			'auth',
			'type:admin'
		]);
	}

	protected $relationships = [
		'user'
	];

	protected $attributes = [
		'id',
		'user_id',
		'type',
		'training_level',
		'secondary_training_level'
	];

	protected $model = \App\ProgramAdministrator::class;
}
