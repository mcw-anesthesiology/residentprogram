<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\CaseParser;

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

		$cases = $user->anesthesiaCasesBetween($start, $end)->as('user_case')
			->with([
				'users' => function ($query) use ($user, $start, $end, $subjectType) {
					return $query->as('partner_case')
						->wherePivot('start_time', '<=', $stop)
						->wherePivot('stop_time', '>=', $start)
						->where('type', $subjectType)
						->where('id', '!=', $user->id);
				}
			]);

		$overlaps = [];
		foreach ($cases as $case) {
			foreach ($case->users as $partner) {
				if (!array_key_exists($partner->id, $overlaps)) {
					$overlaps[$partner->id] = [
						$partner => $partner,
						'numCases' => 0,
						'totalTime' => new DateInterval('PT0S')
					];
				}

				$overlap = &$overlaps[$partner->id];
				// TODO
			}
		}
	}
}
