<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\MeritReport;
use App\User;

use Auth;
use Log;

class MeritReportController extends RestController
{
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

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->only('destroy');

		// Only allow admins and FACULTY_EVALS users to show all by user
		$this->middleware(function ($request, $next) {
			$user = Auth::user();
			if ($user->isType('admin') || $user->usesFeature('FACULTY_EVALS'))
				return $next($request);

			return response('Not allowed.', 403);
		})->only('byUser');

		// Users can only create submissions for themselves
		$this->middleware(function ($request, $next) {
			if (Auth::id() == $request->input('user_id'))
				return $next($request);

			return response('Not allowed.', 403);
		})->only('store');

		// Allow users and admins to edit reports
		$this->middleware(function ($request, $next) {
			try {
				$reportId = $request->route()->parameters()['merit'];
				$report = MeritReport::findOrFail($reportId);

				if (
					(
						Auth::id() == $report->user_id
						&& Auth::id() == $request->input('user_id')
						&& in_array($report->status, [
							'pending',
							'open for editing'
						])
					) || (
						Auth::user()->isType('admin')
					)
				)
					return $next($request);

			} catch (ModelNotFoundException $e) {
				return response('Not found.', 404);
			}

			return response('Not allowed.', 403);
		})->only('update');
	}

	public function byUser() {
		return User::whereHas('meritReports', function ($query) {
			return $query->whereIn('status', ['complete', 'open for editing']);
		})->with('meritReports', 'meritReports.form')->get();
	}

	public function update(Request $request, $id) {
		$report = MeritReport::findOrFail($id);

		$revision = [
			'merit_report_id' => $id,
			'changed_by' => Auth::id(),
			'old_status' => $report->status,
			'old_report' => $report->report,
		];

		$report->update($request->all());
		$report->fresh();

		$revision['new_status'] = $report->status;
		$revision['new_report'] = $report->report;

		$report->revisions()->create($revision);

		return $request->ajax()
			? 'success'
			: back();
	}
}
