<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\EgressParser;

class EgressPairingReportController extends Controller
{
    public function __construct() {
		$this->middleware([
			'auth',
			'shared',
			'type:admin'
		]);
	}

	public function getOverlaps(Request $request) {
		$orNotAnd = false;
		$roles = $request->input('userType') == 'resident'
			? [
				'resident' => EgressParser::RESIDENT_ROLE,
				'faculty' => EgressParser::FACULTY_ROLE
			]
			: null;

		return EgressParser::getSortedFilteredOverlaps(
			$request->file('egressFile')->path(),
			$request->input('userType'),
			$request->input('minCases'),
			$request->input('minHours'),
			$request->input('minMinutes'),
			$request->input('maxPairs'),
			$orNotAnd,
			$roles
		);
	}

	public function sendReports(Request $request) {
		$overlaps = $request->input('overlaps');

		return $overlaps;
	}
}
