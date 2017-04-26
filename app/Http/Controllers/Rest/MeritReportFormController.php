<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReport;

class MeritReportFormController extends RestController
{

	protected $attributes = [
		'id',
		'name',
		'version',
		'form'
	];

	protected $model = \App\MeritReportForm::class;

}
