<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReport;

class MeritReportFormController extends RestController
{
	public function __construct() {
		$this->middleware('auth');
		$this->middleware('site-feature:faculty_merit');
		$this->middleware('type:admin')->only([
			'store',
			'update',
			'destroy'
		]);
	}

	protected $attributes = [
		'id',
		'name',
		'version',
		'form'
	];

	protected $model = \App\MeritReportForm::class;

}
