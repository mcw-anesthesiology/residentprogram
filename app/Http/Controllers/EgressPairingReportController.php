<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\EgressParser;

use Log;

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

		$getFilePath = function ($file) {
			return $file->path();
		};

		$egressFiles = !empty($request->egressFiles)
			? array_map($getFilePath, $request->egressFiles)
			: [];
		$chwTraineeFiles = !empty($request->chwTraineeFiles)
			? array_map($getFilePath, $request->chwTraineeFiles)
			: [];

		return EgressParser::getSortedFilteredOverlaps(
			$egressFiles,
			$chwTraineeFiles,
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
        $userType = $request->input('userType');
        $subjectType = $request->input('subjectType');
        $emailSubject = $request->input('emailSubject');
        $periodDisplay = $request->input('periodDisplay');
		$reportDates = $request->input('reportDates');
		$intro = $request->input('intro');
		$successLead = $request->input('successLead');
		$emptyMessage = $request->input('emptyMessage');
		$closing = $request->input('closing');

        $successes = 0;
        $errors = [];

        foreach ($overlaps as $overlap) {
            $user = $overlap[$userType];
            $pairings = $overlap['pairings'];
            try {
                EgressParser::sendPairingReport(
                    $user,
                    $pairings,
                    $userType,
                    $subjectType,
                    $emailSubject,
                    $periodDisplay,
					$reportDates,
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
                Log::Debug('Error sending report: ' . $e);
                $errors[] = $overlap;
            }
        }

		$response = [
            'successful' => $successes
        ];
        if (!empty($errors))
            $response['errors'] = $errors;

        return $response;
	}
}
