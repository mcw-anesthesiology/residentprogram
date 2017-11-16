<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Carbon\Carbon;
use Carbon\CarbonInterval;

use App\User;

use Log;

class EgressParser {

	// Row indexes
	const DATE = 0;
	const ANESTHESIA_STAFF = 6;

	const FACULTY_ROLE = 'Anesthesiologist';
	const RESIDENT_ROLE = 'Anesthesia Resident';
	const FELLOW_ROLE = 'Anesthesia Fellow';

	static function parseCsv($file) {
		// TODO: Decide if it'll be a file pointer or contents string
		// FIXME: Don't just catch Exception everywhere

		$cases = [];

		$firstLine = true;
		while (($row = fgetcsv($file)) !== false) {
			if ($firstLine) {
				$firstLine = false;
				continue;
			}

			try {
				$newCase = self::parseCase($row[self::DATE], $row[self::ANESTHESIA_STAFF]);
				if (!empty($newCase))
					$cases[] = $newCase;
			} catch (\Exception $e) {
				Log::debug('Unable to compute row: ' . $e);
			}
		}

		if (!empty($cases)) {
			$overlaps = self::computeOverlaps(self::getOverlappingCases($cases));
		}

		self::printReport($overlaps);
	}

	static function parseCase($procDate, $anesthesiaStaff) {
		$case = [
			'date' => $procDate
		];
		$name = null;
		$staff = [];

		try {
			foreach (explode("\n", $anesthesiaStaff) as $line) {
				if (empty($line))
					continue;

				if (strpos($line, '   ') !== 0) {
					$name = substr(trim($line), 0, -1); // Remove `:`
					$staff[$name] = [
						'name' => $name,
						'date' => $procDate
					];
				} elseif (!empty($name) && (strpos($line, '(assigned)') === false)) {
					try {
						[$role, $times] = array_map('trim', explode('from', $line));
						$staff[$name]['role'] = $role;

						[$start, $end] = array_map('trim', explode('to', $times));
						$staff[$name]['times']['start'] = $start;
						$staff[$name]['times']['end'] = $end;
					} catch (\Exception $e) {
						Log::debug('hm');
					}
				}
			}

			$case['staff'] = $staff;
			return $case;
		} catch (\Exception $e) {
			Log::debug("Couldn't parse anesthesia staff: {$e}\n\t{$anesthesiaStaff}");
		}
	}

	static function getOverlappingCases($cases) {
		$overlapsByFaculty = [];

		foreach ($cases as $case) {
			$typedStaff = collect($case['staff'])->groupBy('role')->toArray();
			if (!empty($typedStaff[self::FACULTY_ROLE])) {
				foreach ($typedStaff[self::FACULTY_ROLE] as $faculty) {
					try {
						$facultyUser = self::findUser($faculty);
						if (empty($overlapsByFaculty[$facultyUser->id]))
							$overlapsByFaculty[$facultyUser->id] = [
								'faculty' => $facultyUser,
								'pairings' => []
							];

						$pairings = $overlapsByFaculty[$facultyUser->id]['pairings'];

						if (!empty($typedStaff[self::RESIDENT_ROLE])) {
							foreach ($typedStaff[self::RESIDENT_ROLE] as $resident) {
								try {
									$residentUser = self::findUser($resident);
									if (empty($pairings[$residentUser->id]))
										$pairings[$residentUser->id] = [
											'resident' => $residentUser,
											'cases' => []
										];

									$pairings[$residentUser->id]['cases'][] = $case;
								} catch (ModelNotFoundException $e) {
									Log::debug('Resident not found for name ' . $resident['name']);
								}
							}
						}
					} catch (ModelNotFoundException $e) {
						Log::debug('Faculty not found for name ' . $faculty['name']);
					}
				}
			}
		}

		return $overlapsByFaculty;
	}

	static function computeOverlaps($overlappingCasesByFaculty) {
		foreach ($overlappingCasesByFaculty as $facultyId => $overlap) {
			foreach ($overlap['pairings'] as $pairing) {
				$pairing['numCases'] = count($pairings['cases']);
				$pairing['totalTime'] = array_reduce($pairings['cases'], function ($totalDuration, $case) {
					try {
						$start = self::parseDate($case['date'], $case['time']['start']);
						$end = self::parseDate($case['date'], $case['time']['end']);
						if ($start >= $end) {
							$end->addDay();
						}
						$caseDuration = $end->diff($start);

						$d1 = Carbon::now();
						$d2 = $d1->clone();
						$d2->add($totalDuration)->add($caseDuration);

						return $d2->diff($d1);
					} catch (\Exception $e) {
						Log::debug('Problem computing case duration: ' . $e);
					}
					return $totalDuration;
				}, CarbonInterval::create(0));
			}
		}

		return $overlappingCasesByFaculty;
	}

	static function printReport($overlaps) {
		foreach ($overlaps as $facultyOverlap) {
			$faculty = $facultyOverlap['faculty'];
			if (!empty($facultyOverlap['pairings'])) {
				echo $faculty->full_name . "\n";
				foreach ($facultyOverlap['pairings'] as $pairing) {
					$resident = $pairing['resident'];
					echo "\t" . $resident->full_name . "\n";
					echo "\t\tCases: " . $pairing['numCases'] . "\n";
					echo "\t\tTotal time: " . $pairing['totalTime'] . "\n";
				}
			}
		}
	}

	static function parseDate($date, $time) {
		[$month, $day, $year] = explode('/', $date);
		$year = (int)$year + 2000; // Assuming two-digit year is in 2000s
		$month = (int)$month;
		$day = (int)$day;
		$hours = substr($time, 0, 2);
		$minutes = substr($time, 2, 2);

		return Carbon::create($year, $month, $day, $hour, $minute);
	}

	static function findUser($staff) {
		$name = $staff['name'];
		$role = $staff['role'];

		$userType = null;
		$userTrainingLevel = null;

		switch ($role) {
			case self::FELLOW_ROLE:
				$userTrainingLevel = 'fellow';
			case self::RESIDENT_ROLE:
				$userType = 'resident';
				break;
			case self::FACULTY_ROLE:
				$userType = 'faculty';
				break;
		}

		[$last, $rest] = array_map('trim', explode(',', $name));
		[$first] = array_map('trim', explode(' ', $rest));

		$user = null;
		$query = User::whereRaw('last_name LIKE ?', ["%{$last}%"]);

		if (!empty($userType))
			$query = $query->where('type', $userType);

		if (!empty($userTrainingLevel))
			$query = $query->where('training_level', $userTrainingLevel);

		$results = $query->get();
		if (count($results) !== 1) {
			$query = $query->whereRaw('first_name LIKE ?', ["%{$first}%"]);
			$results = $query->get();
		}

		if (count($results) === 1)
			return $results[0];


		throw new ModelNotFoundException();
	}
}
