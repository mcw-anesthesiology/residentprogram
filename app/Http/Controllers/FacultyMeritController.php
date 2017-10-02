<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FacultyMeritController extends Controller {

    public function __construct() {
		$this->middleware([
			'auth',
			'shared',
			'site-feature:faculty_merit'
		]);

		$this->middleware('type:admin')->only('manage');
	}

	public function merit() {

        $meritReportTypes = config('constants.MERIT_REPORT_TYPES');
		$meritReportTypeForms = Setting::get('reportTypeForms');

		$data = compact('meritReportTypes', 'meritReportTypeForms');

        return view('merit-report.merit-reports', $data);
    }

	public function manage() {
		return view('manage.merit');
	}
}
