<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\MeritReport;
use App\User;

use App\Helpers\QuestionnaireValidation;

use Auth;
use Log;

class MeritReportController extends RestController {
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
        'status',
        'notes'
    ];

    protected $model = \App\MeritReport::class;

    public function __construct() {
        $this->middleware('auth');
		$this->middleware('site-feature:faculty_merit');
        $this->middleware('type:admin')->only('destroy');
        $this->middleware('shared')->only('printView');

        // Only allow admins and FACULTY_MERIT users to show all by user
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            if ($user->isType('admin') || $user->usesFeature('FACULTY_MERIT')) {
                return $next($request);
            }

            return response('Not allowed.', 403);
        })->only('byUser');

        // Users can only create submissions for themselves
        $this->middleware(function ($request, $next) {
            if (Auth::id() == $request->input('user_id')) {
                return $next($request);
            }

            return response('Not allowed.', 403);
        })->only('store');

        $this->middleware(function ($request, $next) {
            if ($request->input('status') == 'complete' && $request->has('report')) {
                if (self::reportIsValid($request->input('report'))) {
                    return $next($request);
                }
                return response('Report not valid.', 400);
            }

            return $next($request);
        })->only(['store', 'update']);

        // Allow users and admins to edit reports
        $this->middleware(function ($request, $next) {
            try {
                $reportId = $request->route()->parameters()['merit'];
                $report = MeritReport::findOrFail($reportId);

                if ((
                        Auth::id() == $report->user_id
                        && Auth::id() == $request->input('user_id')
                        && in_array($report->status, [
                            'pending',
                            'open for editing'
                        ])
                    ) || (
                        Auth::user()->isType('admin')
                    )
                ) {
                    return $next($request);
                }
            } catch (ModelNotFoundException $e) {
                return response('Not found.', 404);
            }

            return response('Not allowed.', 403);
        })->only('update');

        $this->middleware(function ($request, $next) {
            try {
                $user = Auth::user();
                $reportId = $request->route()->parameters()['id'];
                $report = MeritReport::findOrFail($reportId);

                if ($user->isType('admin')
                    || $user->usesFeature('FACULTY_EVALS')
                    || Auth::id() == $report->user_id
                ) {
                    return $next($request);
                }
            } catch (ModelNotFoundException $e) {
                return resopnse('Not found.', 404);
            }

            return response('Not allowed.', 403);
        })->only('printView');
    }

    public function byUser(Request $request) {
        $datedMerits = function ($query) use ($request) {
            if ($request->has('startDate')) {
                $query = $query->where('period_end', '>=', $request->input('startDate'));
            }
            if ($request->has('endDate')) {
                $query = $query->where('period_start', '<=', $request->input('endDate'));
            }

            return $query;
        };

        return User::whereHas('meritReports', $datedMerits)
            ->with(['meritReports' => $datedMerits, 'meritReports.form'])
            ->orderBy('last_name', 'asc')->get();
    }

    public function store(Request $request) {
        $merit = MeritReport::create($request->all());

        return $request->ajax()
            ? $merit
            : back();
    }

    public function update(Request $request, $id) {
        $report = MeritReport::findOrFail($id);

        $oldStatus = $report->status;
		$oldReport = $report->report;

        $user = Auth::user();
        if ($user->isType('admin')) {
            $report->notes = $request->input('notes');
            $report->save();
        }

        $report->update($request->all());
        $report->fresh();

		if ($report->status != $oldStatus) {
			$report->revisions()->create([
	            'merit_report_id' => $id,
	            'changed_by' => Auth::id(),
	            'old_status' => $oldStatus,
	            'old_report' => $oldReport,
				'new_status' => $report->status,
				'new_report' => $report->report
	        ]);
		}

        return $request->ajax()
            ? 'success'
            : back();
    }

    public function printView(Request $request, $id) {
        $report = MeritReport::with('user', 'form')->findOrFail($id);
        $data = compact('report');

        return view('merit-report.print-view', $data);
    }

    protected static function reportIsValid($form) {
        if (empty($form['pages'])) {
            return false;
        }

        foreach ($form['pages'] as $page) {
            if (!self::sectionIsValid($page)) {
                return false;
            }
        }

        return true;
    }

    protected static function sectionIsValid($section) {
        if (!key_exists('items', $section) || empty($section['items'])) {
            return true;
        }

        foreach ($section['items'] as $item) {
            switch ($item['type']) {
                case 'section':
                    if (!self::sectionIsValid($item)) {
                        return false;
                    }
                    break;
                case 'item':
                    if (!self::itemIsValid($item)) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    protected static function itemIsValid($item) {
        if (empty($item['checked']) || !key_exists('questions', $item) || empty($item['questions'])) {
            return true;
        }

        foreach ($item['questions'] as $question) {
            if (!QuestionnaireValidation::questionIsValid($question)) {
                return false;
            }
        }

        return true;
    }
}
