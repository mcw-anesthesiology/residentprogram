<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReport;

class MeritReportController extends RestController
{

	protected $relationships = [
		'user',
		'form'
	];

	protected $attributes = [
		'id',
		'report',
		'period_start',
		'period_end'
	];

	protected $model = \App\MeritReport::class;

}
