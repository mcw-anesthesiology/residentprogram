<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\MeritReport;

use Auth;

class MeritReportController extends RestController
{
	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->only('destroy');
		
		// Users can only submit reports for themselves
		$this->middleware(function ($request, $next) {
			if (Auth::id() === $request->input('user_id'))
				return $next($request);
				
			return response('Not allowed.', 403);
		})->only(['store', 'update']);
		
		// Don't allow editing complete/disabled reports
		$this->middleware(function ($request, $next) {
			try {
				$reportId = $request->route()->parameters()['id'];
				$meritReport = MeritReport::findOrFail($reportId);
				if ($meritReport->status == 'in-progress')
					return $next($request);
					
				throw new \Exception();
			} catch (\Exception $e) {
				// Nothing to do
			}

			return response('Not allowed.', 403);
		})->only('update');
	}

	protected $relationships = [
		'user',
		'form'
	];

	protected $attributes = [
		'id',
		'user_id',
		'form_id',
		'report',
		'period_start',
		'period_end',
		'status'
	];

	protected $model = \App\MeritReport::class;

}
