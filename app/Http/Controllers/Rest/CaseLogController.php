<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\CaseLog;

class CaseLogController extends RestController
{

	protected $relationships = [
		"user",
		"location"
	];

	protected $attributes = [
		"case_date",
		"details_type",
		"comment"
	];


	protected $model = \App\CaseLog::class;
	
}
