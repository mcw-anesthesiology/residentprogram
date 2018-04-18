<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DateInterval;

use App\Helpers\CaseParser;
use App\Helpers\PairingFetcher;

use Auth;
use Log;
use User;

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
        $vaTraineeSupervisorFiles = !empty($request->vaTraineeSupervisorFiles)
            ? array_map($getFilePath, $request->vaTraineeSupervisorFiles)
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

        foreach ($vaTraineeSupervisorFiles as $file) {
			$results = CaseParser::parseFilename($file, CaseParser::VA_TRAINEE_SUPERVISOR_FILE_TYPE);
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
		$reportType = $request->input('reportType', null);
		$start = $request->input('startDate');
		$end = $request->input('endDate');

		$overlaps = array_values(PairingFetcher::getOverlaps(
			$userType,
			$subjectType,
			$start,
			$end,
			$reportType
		));

		foreach ($overlaps as &$overlap) {
			foreach ($overlap['pairings'] as &$pairing) {
				$pairing['procedures'] = array_values($pairing['procedures']);
			}
		}

		$minCases = $request->input('minCases');
		$minHours = $request->input('minHours');
		$minMinutes = $request->input('minMinutes');
		$maxPairs = $request->input('maxPairs');

		if (
			isset($minCases)
			&& isset($minHours)
			&& isset($minMinutes)
			&& isset($maxPairs)
		) {
			$minTime = new DateInterval("PT{$minHours}H{$minMinutes}M");

			$overlaps = PairingFetcher::filterOverlaps(
				$overlaps,
				$minCases,
				$minTime,
				$maxPairs
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

		$minCases = $request->input('minCases', 0);
		$minHours = $request->input('minHours', 0);
		$minMinutes = $request->input('minMinutes', 30);
		$maxPairings = $request->input('maxPairings', 99999);
		$minTime = new DateInterval("PT{$minHours}H{$minMinutes}M");

		$pairings = PairingFetcher::filterPairings(
			$pairings,
			$minCases,
			$minTime,
			$maxPairings
		);

		usort($pairings, PairingFetcher::getTimeSorter());

		return $pairings;
	}

	public function getUserPairings(Request $request, $userId) {
		$user = User::findOrFail($userId);
		$subjectType = $request->input('subjectType');
		$start = $request->input('startDate');
		$end = $request->input('endDate');

		$pairings = array_values(PairingFetcher::getPairings(
			$user,
			$subjectType,
			$start,
			$end
		));

		$minCases = $request->input('minCases', 0);
		$minHours = $request->input('minHours', 0);
		$minMinutes = $request->input('minMinutes', 30);
		$maxPairings = $request->input('maxPairings', 99999);
		$minTime = new DateInterval("PT{$minHours}H{$minMinutes}M");

		$pairings = PairingFetcher::filterPairings(
			$pairings,
			$minCases,
			$minTime,
			$maxPairings
		);

		usort($pairings, PairingFetcher::getTimeSorter());

		return $pairings;
	}

	public function sendPairingReports(Request $request) {
		$overlaps = $request->input('overlaps');
		$startDate = $request->input('startDate');
		$endDate = $request->input('endDate');
		$subjectType = $request->input('subjectType');
		$emailSubject = $request->input('emailSubject');
		$intro = $request->input('intro');
		$successLead = $request->input('successLead');
		$emptyMessage = $request->input('emptyMessage');
		$closing = $request->input('closing');

		$successes = 0;
		$errors = [];

		foreach ($overlaps as $overlap) {
			$user = $overlap['user'];
			$pairings = $overlap['pairings'];

			try {
				PairingFetcher::sendPairingReport(
					$user,
					$pairings,
					$startDate,
					$endDate,
					$subjectType,
					$emailSubject,
					$intro,
					$successLead,
					$emptyMessage,
					$closing
				);
				$successes++;

				// Mailtrap gets mad if you send emails too quickly
				if (config('app.env') != 'production') {
					sleep(1);
				}
			} catch (\Exception $e) {
				Log::error('Error sending report: ' . $e);
				$errors[] = $overlap;
			}
		}

		return [
			'successes' => $successes,
			'errors' => $errors
		];
	}
}
