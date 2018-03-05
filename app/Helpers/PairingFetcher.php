<?php

namespace App\Helpers;

use DateInterval;
use DateTimeImmutable;

use Carbon\Carbon;

use DB;
use Log;
use Mail;

class PairingFetcher {

	const CHUNK_SIZE = 10000;

	static function getTypes($type) {
		$types = [];
		switch ($type) {
			case 'trainee':
				return [
					'type' => 'resident'
				];
			case 'resident':
				return [
					'type' => 'resident',
					'training_level' => ['ca-1', 'ca-2', 'ca-3']
				];
			case 'fellow':
				return [
					'type' => 'resident',
					'training_level' => 'fellow'
				];
			case 'faculty':
				return [
					'type' => 'faculty'
				];
			default:
				throw new \InvalidArgumentException("$type is not a valid type");
				break;
		}
	}

	static function applyQuery($query, $key, $value) {
		if (empty($value))
			return $query;

		if (is_array($value))
			return $query->whereIn($key, $value);

		return $query->where($key, '=', $value);
	}

	static function getOverlaps($userType, $subjectType, $start, $end) {
		$overlaps = [];

		$userTypes = self::getTypes($userType);
		$subjectTypes = self::getTypes($subjectType);

		$query = DB::table('user_anesthesia_cases as partner_cases')
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
				'users as partners',
				'partner_cases.user_id',
				'=',
				'partners.id'
			)
			->join(
				'users',
				'user_cases.user_id',
				'=',
				'users.id'
			)
			->where('anesthesia_cases.start_time', '<=', $end)
			->where('anesthesia_cases.stop_time', '>=', $start);

		if (!empty($userTypes)) {
			if (array_key_exists('type', $userTypes))
				$query = self::applyQuery($query, 'users.type', $userTypes['type']);
			if (array_key_exists('training_level', $userTypes))
				$query = self::applyQuery($query, 'users.training_level', $userTypes['training_level']);
		}

		if (!empty($subjectTypes)) {
			if (array_key_exists('type', $subjectTypes))
				$query = self::applyQuery($query, 'partners.type', $subjectTypes['type']);
			if (array_key_exists('training_level', $subjectTypes))
				$query = self::applyQuery($query, 'partners.training_level', $subjectTypes['training_level']);
		}

		$query = $query->orderBy('partner_cases.id')
			->orderBy('user_cases.id')
			->select(
				'users.id as user_id',
				'users.last_name as user_last_name',
				'users.first_name as user_first_name',
				'users.type as user_type',
				'users.training_level as user_training_level',
				'users.secondary_training_level as user_secondary_training_level',
				'user_cases.id as user_user_case_id',
				'user_cases.user_id as user_id',
				'user_cases.anesthesia_case_id as user_case_id',
				'user_cases.start_time as user_case_start_time',
				'user_cases.stop_time as user_case_stop_time',
				'partner_cases.id as partner_user_case_id',
				'partner_cases.user_id as partner_id',
				'partners.first_name as partner_first_name',
				'partners.last_name as partner_last_name',
				'partners.type as partner_type',
				'partners.training_level as partner_training_level',
				'partners.secondary_training_level as partner_secondary_training_level',
				'partner_cases.anesthesia_case_id as partner_case_id',
				'partner_cases.start_time as partner_case_start_time',
				'partner_cases.stop_time as partner_case_stop_time',
				'anesthesia_cases.id as case_id',
				'anesthesia_cases.procedure_date as procedure_date',
				'anesthesia_cases.start_time as procedure_start_time',
				'anesthesia_cases.stop_time as procedure_stop_time',
				'anesthesia_cases.procedure_desc as procedure_desc',
				'anesthesia_cases.location as procedure_location',
				'anesthesia_cases.surgeon_name as procedure_surgeon_name'
			);

		$query->chunk(self::CHUNK_SIZE, function ($results) use (&$overlaps) {

			foreach ($results as $result) {
				if (!array_key_exists($result->user_id, $overlaps)) {
					$overlaps[$result->user_id] = [
						'user' => [
							'id' => $result->user_id,
							'full_name' => "{$result->user_last_name}, {$result->user_first_name}",
							'type' => $result->user_type,
							'training_level' => $result->user_training_level,
							'secondary_training_level' => $result->user_secondary_training_level
						],
						'pairings' => []
					];
				}

				self::addPairing($overlaps[$result->user_id]['pairings'], $result);
			}
		});

		return $overlaps;
	}

	static function getPairings($user, $subjectType, $start, $end) {
		$pairings = [];

		$query = DB::table('user_anesthesia_cases as partner_cases')
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
				'users as partners',
				'partner_cases.user_id',
				'=',
				'partners.id'
			)
			->where('user_cases.user_id', $user->id)
			->where('user_cases.start_time', '<=', $end)
			->where('user_cases.stop_time', '>=', $start)
			->where('partner_cases.start_time', '<=', $end)
			->where('partner_cases.stop_time', '>=', $start);

		$subjectTypes = self::getTypes($subjectType);
		if (!empty($subjectTypes)) {
			if (array_key_exists('type', $subjectTypes))
				$query = self::applyQuery($query, 'partners.type', $subjectTypes['type']);
			if (array_key_exists('training_level', $subjectTypes))
				$query = self::applyQuery($query, 'partners.training_level', $subjectTypes['training_level']);
		}

		$query->orderBy('partner_cases.user_id')
			->orderBy('partner_cases.id')
			->select(
				'user_cases.id as user_user_case_id',
				'user_cases.user_id as user_id',
				'user_cases.anesthesia_case_id as user_case_id',
				'user_cases.start_time as user_case_start_time',
				'user_cases.stop_time as user_case_stop_time',
				'partner_cases.id as partner_user_case_id',
				'partner_cases.user_id as partner_id',
				'partners.first_name as partner_first_name',
				'partners.last_name as partner_last_name',
				'partners.type as partner_type',
				'partners.training_level as partner_training_level',
				'partners.secondary_training_level as partner_secondary_training_level',
				'partner_cases.anesthesia_case_id as partner_case_id',
				'partner_cases.start_time as partner_case_start_time',
				'partner_cases.stop_time as partner_case_stop_time',
				'anesthesia_cases.id as case_id',
				'anesthesia_cases.procedure_date as procedure_date',
				'anesthesia_cases.start_time as procedure_start_time',
				'anesthesia_cases.stop_time as procedure_stop_time',
				'anesthesia_cases.procedure_desc as procedure_desc',
				'anesthesia_cases.location as procedure_location',
				'anesthesia_cases.surgeon_name as procedure_surgeon_name'
			)
			->chunk(self::CHUNK_SIZE, function ($results) use (&$pairings) {
				foreach ($results as $result) {
					self::addPairing($pairings, $result);
				}
			});


		return $pairings;
	}

	static function addPairing(&$pairings, $result) {
		if (!array_key_exists($result->partner_id, $pairings)) {
			$pairings[$result->partner_id] = [
				'partner' => [
					'id' => $result->partner_id,
					'full_name' => "{$result->partner_last_name}, {$result->partner_first_name}",
					'type' => $result->partner_type,
					'training_level' => $result->partner_training_level,
					'secondary_training_level' => $result->partner_secondary_training_level
				],
				'numCases' => 0,
				'totalTime' => new DateInterval('PT0S'),
				'procedures' => []
			];
		}

		if (!array_key_exists(
			$result->case_id,
			$pairings[$result->partner_id]['procedures']
		)) {
			$overlapTime = DateHelpers::computeOverlapTime(
				Carbon::parse($result->user_case_start_time),
				Carbon::parse($result->user_case_stop_time),
				Carbon::parse($result->partner_case_start_time),
				Carbon::parse($result->partner_case_stop_time)
			);

			if (DateHelpers::isDateIntervalPositive($overlapTime)) {
				$pairings[$result->partner_id]['numCases']++;
				$pairings[$result->partner_id]['totalTime'] = DateHelpers::addDateIntervals(
					$pairings[$result->partner_id]['totalTime'],
					$overlapTime
				);
				$pairings[$result->partner_id]['procedures'][$result->case_id] = [
					'date' => $result->procedure_date,
					'start_time' => $result->procedure_start_time,
					'stop_time' => $result->procedure_stop_time,
					'procedure_desc' => $result->procedure_desc,
					'location' => $result->procedure_location,
					'surgeon_name' => $result->procedure_surgeon_name
				];
			}
		}
	}

	static function sortOverlaps(
		$overlaps,
		$userSorter,
		$partnerSorter
	) {

		$sortPairings = function ($overlap) use ($partnerSorter) {
			$pairings = &$overlap['pairings'];
			usort($pairings, $partnerSorter);

			return $overlap;
		};

		$overlaps = array_map($sortPairings, $overlaps);

		usort($overlaps, $userSorter);

		return $overlaps;
	}

	public static function getNameSorter($key) {
		return function ($a, $b) use ($key) {
			$aName = $a[$key]['full_name'];
			$bName = $b[$key]['full_name'];

			if ($aName == $bName)
				return 0;

			return ($aName < $bName) ? -1 : 1;
		};
	}

	public static function getTimeSorter() {
		return function ($a, $b) {
			$date = new DateTimeImmutable();
			$aDate = $date->add($a['totalTime']);
			$bDate = $date->add($b['totalTime']);

			if ($aDate == $bDate)
				return 0;

			return ($aDate > $bDate) ? -1 : 1;
		};
	}

	static function filterOverlaps(
		$overlaps,
		$minCases,
		$minTime,
		$maxPairings,
		$orNotAnd = false
	) {
		foreach ($overlaps as &$overlap) {
			$overlap['pairings'] = filterPairings(
				$overlap['pairings'],
				$minCases,
				$minTime,
				$maxPairings,
				$orNotAnd
			);
		}

		return array_filter($overlaps, function ($overlap) {
			return count($overlap['pairings']) > 0;
		});
	}

	static function filterPairings(
		$pairings,
		$minCases,
		$minTime,
		$maxPairings,
		$orNotAnd = false
	) {
		$d = new DateTimeImmutable();
		$minDate = $d->add($minTime);

		$filter = $orNotAnd
			? function ($pairing) use ($minCases, $d, $minDate) {
				return (
					$pairing['numCases'] >= $minCases
					|| $d->add($pairing['totalTime']) >= $minDate
				);
			}
			: function ($pairing) use ($minCases, $d, $minDate, $orNotAnd) {
				return (
					$pairing['numCases'] >= $minCases
					&& $d->add($pairing['totalTime']) >= $minDate
				);
			};

		return array_slice(array_filter(
			$pairings,
			$filter
		), 0, $maxPairings);
	}

}
