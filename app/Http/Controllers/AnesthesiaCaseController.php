<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\CaseParser;
use App\Helpers\PairingFetcher;

use Auth;
use Log;

class AnesthesiaCaseController extends Controller {
    public function __construct() {
		$this->middleware([
			'auth',
			'shared'
		]);

		$this->middleware('type:admin')->except([
			'getPairings'
		]);
	}

	public function addCases(Request $request) {
		$getFilePath = function ($file) {
			return $file->path();
		};

		$egressFiles = !empty($request->egressFiles)
			? array_map($getFilePath, $request->egressFiles)
			: [];
		$chwTraineeFiles = !empty($request->chwTraineeFiles)
			? array_map($getFilePath, $request->chwTraineeFiles)
			: [];

		$successful = 0;
		$unsuccessful = 0;

		foreach ($egressFiles as $file) {
			$results = CaseParser::parseFilename($file, CaseParser::EGRESS_FILE_TYPE);
			$successful += $results['successful'];
			$unsuccessful += $results['unsuccessful'];
		}

		foreach ($chwTraineeFiles as $file) {
			$results = CaseParser::parseFilename($file, CaseParser::CHW_TRAINEE_FILE_TYPE);
			$successful += $results['successful'];
			$unsuccessful += $results['unsuccessful'];
		}

		return [
			'successful' => $successful,
			'unsuccessful' => $unsuccessful
		];
	}

	public function getPairings(Request $request) {
		$user = Auth::user();

		$start = $request->input('startDate');
		$end = $request->input('endDate');
		$subjectType = $request->input('subjectType');

		return PairingFetcher::getPairings($user, $subjectType, $start, $end);
	}
}
