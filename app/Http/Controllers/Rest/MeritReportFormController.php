<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReportForm;

use Log;

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
		$this->middleware('shared')->only([
			'view'
		]);
	}

	protected $attributes = [
		'id',
		'name',
		'version',
		'form'
	];

	protected $model = \App\MeritReportForm::class;

	function view($id) {
		$form = MeritReportForm::findOrFail($id);
		$data = compact('form');

		return view('merit-report.view-form', $data);
	}
}
