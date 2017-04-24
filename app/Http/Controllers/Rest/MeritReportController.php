<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReport;

class MeritReportController extends RestController
{

	protected $relationships = [
		"user"
	];

	protected $attributes = [
		'report',
		'period_start',
		'period_end'
	];

	protected $model = \App\MeritReport::class;

}
