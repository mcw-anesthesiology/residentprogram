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
        'status',
        'notes'
    ];

    protected $model = \App\MeritReport::class;

    public function __construct()
    {
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

    public function byUser(Request $request)
    {
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

    public function store(Request $request)
    {
        $merit = MeritReport::create($request->all());

        return $request->ajax()
            ? $merit
            : back();
    }

    public function update(Request $request, $id)
    {
        $report = MeritReport::findOrFail($id);

        $revision = [
            'merit_report_id' => $id,
            'changed_by' => Auth::id(),
            'old_status' => $report->status,
            'old_report' => $report->report,
        ];

        $user = Auth::user();
        if ($user->isType('admin')) {
            $report->notes = $request->input('notes');
            $report->save();
        }

        $report->update($request->all());
        $report->fresh();

        $revision['new_status'] = $report->status;
        $revision['new_report'] = $report->report;

        $report->revisions()->create($revision);

        return $request->ajax()
            ? 'success'
            : back();
    }

    public function printView(Request $request, $id)
    {
        $report = MeritReport::with('user')->findOrFail($id);
        $data = compact('report');

        return view('merit-report.print-view', $data);
    }

    protected static function reportIsValid($form)
    {
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

    protected static function sectionIsValid($section)
    {
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

    protected static function itemIsValid($item)
    {
        if (empty($item['checked']) || !key_exists('questions', $item) || empty($item['questions'])) {
            return true;
        }

        foreach ($item['questions'] as $question) {
            if (!self::questionIsValid($question)) {
                return false;
            }
        }

        return true;
    }

    protected static function questionIsValid($question)
    {
        if ($question['type'] != 'list' && empty($question['required'])) {
            return true;
        }

        switch ($question['type']) {
            case 'text':
                if (empty($question['value'])) {
                    return false;
                }
                break;
            case 'number':
                if (!key_exists('value', $question)) {
                    return false;
                }
                if (!empty($question['min']) && $question['value'] < $question['min']) {
                    return false;
                }
                if (!empty($question['max']) && $question['value'] > $question['max']) {
                    return false;
                }
                break;
            case 'checkbox':
            case 'radio':
                $optionChecked = false;
                foreach ($question['options'] as $option) {
                    if (!empty($option['checked'])) {
                        $optionChecked = true;
                    }
                }
                if (!$optionChecked) {
                    return false;
                }
                break;
            case 'list':
                return self::listQuestionIsValid($question);
        }

        return true;
    }

    protected static function listQuestionIsValid($list)
    {
        if (!key_exists('items', $list) || empty($list['items'])) {
            return false;
        }

        foreach ($list['items'] as $listItem) {
            if (key_exists('itemProps', $list)) {
                foreach ($list['itemProps'] as $key => $value) {
                    if ($listItem[$key] != $value) {
                        return false;
                    }
                }
            }

            if (!self::listItemIsValid($listItem)) {
                return false;
            }
        }

        return true;
    }

    protected static function listItemIsValid($listItem)
    {
        switch ($listItem['type']) {
            case 'text':
                if (empty($listItem['text'])) {
                    return false;
                }
                break;
            case 'publication':
                if (empty($listItem['title']) || empty($listItem['role'])) {
                    return false;
                }
                break;
            case 'committee':
                if (empty($listItem['name']) || empty($listItem['role'])) {
                    return false;
                }
                break;
            case 'study':
                if (empty($listItem['title'])
                    || empty($listItem['role'])
                    || empty($listItem['yearInitiated'])
                    || empty($listItem['approvalNumber'])
                    || empty($listItem['progress'])
                ) {
                    return false;
                }
                break;
            case 'grant':
            case 'grantOther':
                if (empty($listItem['agency'])
                    || empty($listItem['project'])
                    || !key_exists('amount', $listItem)
                ) {
                    return false;
                }
                break;
            case 'certification':
                if (empty($listItem['board']) || empty($listItem['specialty'])) {
                    return false;
                }
                break;
            case 'editorialBoard':
                if (empty($listItem['journal']) || empty($listItem['role'])) {
                    return false;
                }
                break;
            case 'review':
                if (empty($listItem['work']) || empty($listItem['reviews'])) {
                    return false;
                }
                break;
            case 'lecture':
            case 'audienceLecture':
                if (empty($listItem['title']) || empty($listItem['date']) || empty($listItem['audience'])) {
                    return false;
                }
                break;
            case 'mentorship':
            case 'subjectMentorship':
                if (empty($listItem['mentee']) || empty($listItem['subject'])) {
                    return false;
                }
                break;
        }

        return true;
    }
}
