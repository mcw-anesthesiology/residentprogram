<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DateInterval;

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

	public function getOverlaps(Request $request) {
		$userType = $request->input('userType');
		$subjectType = $request->input('subjectType');
		$start = $request->input('startDate');
		$end = $request->input('endDate');

		$overlaps = array_values(PairingFetcher::getOverlaps(
			$userType,
			$subjectType,
			$start,
			$end
		));

		foreach ($overlaps as &$overlap) {
			foreach ($overlap['pairings'] as &$pairing) {
				$pairing['procedures'] = array_values($pairing['procedures']);
			}
		}

		$minCases = $request->input('minCases');
		$minHours = $request->input('minHours');
		$minMinutes = $request->input('minMinutes');
		$maxPairings = $request->input('maxPairings');

		if (
			!empty($minCases)
			&& !empty($minHours)
			&& !empty($minMinutes)
			&& !empty($maxPairings)
		) {
			$minTime = new DateInterval("PT{$minHours}H{$minMinutes}M");

			$overlaps = PairingFetcher::filterOverlaps(
				$overlaps,
				$minCases,
				$minTime,
				$maxPairings
			);
		}

		$overlaps = PairingFetcher::sortOverlaps(
			$overlaps,
			PairingFetcher::getNameSorter('user'),
			PairingFetcher::getTimeSorter()
		);

		return $overlaps;
	}

	public function getPairings(Request $request) {
		$user = Auth::user();

		$subjectType = $request->input('subjectType');
		$start = $request->input('startDate');
		$end = $request->input('endDate');

		$pairings = array_values(PairingFetcher::getPairings(
			$user,
			$subjectType,
			$start,
			$end
		));

		$minCases = $request->input('minCases');
		$minHours = $request->input('minHours');
		$minMinutes = $request->input('minMinutes');
		$maxPairings = $request->input('maxPairings');
		$minTime = new DateInterval("PT{$minHours}H{$minMinutes}M");

		$pairings = PairingFetcher::filterPairings(
			$pairings,
			$minCases,
			$minTime,
			$maxPairings
		);

		$pairings = usort($pairings, PairingFetcher::getTimeSorter());

		return $pairings;
	}
}
