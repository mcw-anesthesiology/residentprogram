<?php

namespace App\Helpers;

use DB;
use Log;
use Mail;

class PairingFetcher {

	static function getPairings($user, $subjectType, $start, $end) {
		$results = DB::table('user_anesthesia_cases as partner_cases')
			->join(
				'anesthesia_cases',
				'anesthesia_cases.id',
				'=',
				'partner_cases.anesthesia_case_id'
			)
			->join(
				'user_anesthesia_cases as user_cases',
				'user_cases.anesthesia_case_id',
				'=',
				'anesthesia_cases.id'
			)
			->join(
				'users',
				'partner_cases.user_id',
				'=',
				'users.id'
			)
			->where('user_cases.user_id', $user->id)
			->where('users.type', $subjectType)
			->where('user_cases.start_time', '<=', $end)
			->where('user_cases.stop_time', '>=', $start)
			->where('partner_cases.start_time', '<=', $end)
			->where('partner_cases.stop_time', '>=', $start)
			->orderBy('partner_cases.user_id')
			->orderBy('partner_cases.id')
			->select(
				'user_cases.id as user_user_case_id',
				'user_cases.user_id as user_id',
				'user_cases.anesthesia_case_id as user_case_id',
				'user_cases.start_time as user_case_start_time',
				'user_cases.stop_time as user_case_stop_time',
				'partner_cases.id as partner_user_case_id',
				'partner_cases.user_id as partner_id',
				'partner_cases.anesthesia_case_id as partner_case_id',
				'partner_cases.start_time as partner_case_start_time',
				'partner_cases.stop_time as partner_case_stop_time'
			)
			->get();


		// $overlaps = [];
		// foreach ($cases as $case) {
		// 	foreach ($case->users as $partner) {
		// 		if (!array_key_exists($partner->id, $overlaps)) {
		// 			$overlaps[$partner->id] = [
		// 				$partner => $partner,
		// 				'numCases' => 0,
		// 				'totalTime' => new DateInterval('PT0S')
		// 			];
		// 		}
		//
		// 		$overlapTime = DateHelpers::computeOverlapTime(
		// 			$case->user_case->start_time,
		// 			$case->user_case->stop_time,
		// 			$case->partner_case->start_time,
		// 			$case->partner_case->stop_time
		// 		);
		//
		// 		if (DateHelpers::isDateIntervalPositive($overlapTime)) {
		// 			$overlap = &$overlaps[$partner->id];
		// 			$overlap['numCases']++;
		// 			$overlap['totalTime'] = DateHelpers::addDateIntervals(
		// 				$overlap['totalTime'],
		// 				$overlapTime
		// 			);
		// 		}
		// 	}
		// }
		//
		//
		// return $overlaps;
	}

}
