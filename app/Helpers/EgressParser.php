<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Carbon\Carbon;

use DateTimeImmutable;
use DateInterval;

use App\User;

use Log;

class EgressParser {

	// Column indexes
	const DATE = 0;
	const ANESTHESIA_STAFF = 6;

	const FACULTY_ROLE = 'Anesthesiologist';
	const RESIDENT_ROLE = 'Anesthesia Resident';
	const FELLOW_ROLE = 'Anesthesia Fellow';

	static function parseFilename($filename, $roles = null) {
		$fp = fopen($filename, 'r');
		return self::parseCsv($fp, $roles);
	}

	static function parseCsv($file, $roles = null) {
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
			return self::computeOverlaps(self::getOverlappingCases($cases, $roles));
		}
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
						Log::debug('Failed to parse ');
					}
				}
			}

			$case['staff'] = $staff;
			return $case;
		} catch (\Exception $e) {
			Log::debug("Couldn't parse anesthesia staff: {$e}\n\t{$anesthesiaStaff}");
		}
	}

	static function getOverlappingCases($cases, $roles = null) {
		if (empty($roles))
			$roles = [
				'faculty' => self::FACULTY_ROLE,
				'resident' => self::RESIDENT_ROLE
			];
		elseif (count($roles) != 2)
			throw new \DomainException("Must specify two roles");

		$overlaps = [];

		$roleNames = array_keys($roles);
		$roleTypes = array_values($roles);

		foreach ($cases as $case) {
			$typedStaff = collect($case['staff'])->groupBy('role')->toArray();
			if (!empty($typedStaff[$roleTypes[0]])) {
				foreach ($typedStaff[$roleTypes[0]] as $faculty) {
					try {
						$facultyUser = self::findUser($faculty);
						if (empty($overlaps[$facultyUser->id]))
							$overlaps[$facultyUser->id] = [
								$roleNames[0] => $facultyUser,
								'case' => $faculty,
								'pairings' => []
							];

						$pairings = &$overlaps[$facultyUser->id]['pairings'];

						if (!empty($typedStaff[$roleTypes[1]])) {
							foreach ($typedStaff[$roleTypes[1]] as $resident) {
								try {
									$residentUser = self::findUser($resident);
									if (empty($pairings[$residentUser->id]))
										$pairings[$residentUser->id] = [
											$roleNames[1] => $residentUser,
											'cases' => []
										];

									$case = $resident;
									try {
										$case['timeTogether'] = self::computeCaseOverlapTime(
											$faculty['date'],
											$faculty,
											$resident
										);

										if (self::intervalIsNegative(
											$case['timeTogether']
										)) {
											Log::debug("\n\n" . json_encode([
												'date' => $faculty['date'],
												'faculty' => $faculty,
												'resident' => $resident,
											], JSON_PRETTY_PRINT) . "\n\n");
										}

									} catch (\Exception $e) {
										Log::debug("Failed to compute time together for {$faculty['name']} and {$resident['name']}: " . $e);
									}

									$pairings[$residentUser->id]['cases'][] = $case;
								} catch (ModelNotFoundException $e) {
									Log::debug(ucfirst($roleNames[1]) . ' not found for name ' . $resident['name']);
								}
							}
						}
					} catch (ModelNotFoundException $e) {
						Log::debug(ucfirst($roleNames[0]) . ' not found for name ' . $faculty['name']);
					}
				}
			}
		}

		return $overlaps;
	}

	static function intervalIsNegative($interval) {
		$date = new DateTimeImmutable();
		$iDate = $date->add($interval);

		return $iDate < $date;
	}

	static function computeOverlaps($overlappingCasesByFaculty) {
		foreach ($overlappingCasesByFaculty as &$overlap) {
			foreach ($overlap['pairings'] as &$pairing) {
				$pairing['numCases'] = count($pairing['cases']);
				$pairing['totalTime'] = array_reduce($pairing['cases'], function ($totalDuration, $case) {
					try {
						$caseDuration = $case['timeTogether'];

						if (!empty($caseDuration)) {
							$d = new DateTimeImmutable();
							return $d->diff(
								$d->add($totalDuration)
									->add($caseDuration)
							);
						}
					} catch (\Exception $e) {
						Log::debug('Problem computing case duration: ' . $e);
					}

					return $totalDuration;
				}, new DateInterval('PT0S'));
			}
		}

		return $overlappingCasesByFaculty;
	}

	static function computeCaseOverlapTime($date, $staff1, $staff2) {
		return self::computeOverlapTime(
			$date,
			$staff1['times']['start'],
			$staff1['times']['end'],
			$staff2['times']['start'],
			$staff2['times']['end']
		);
	}

	static function computeOverlapTime(
		$date,
		$firstStart,
		$firstEnd,
		$secondStart,
		$secondEnd
	) {
		$firstStart = self::parseDate($date, $firstStart);
		$firstEnd = self::parseDate($date, $firstEnd);

		if ($firstStart > $firstEnd)
			$firstEnd->addDay();

		$secondStart = self::parseDate($date, $secondStart);
		$secondEnd = self::parseDate($date, $secondEnd);

		if ($secondStart > $secondEnd)
			$secondStart->addDay();

		$start = max($firstStart, $secondStart);
		$end = min($firstEnd, $secondEnd);

		$diff = $start->diff($end);

		$d = new DateTimeImmutable();

		return ($d->add($diff) > $d)
			? $diff
			: new DateInterval('PT0S');
	}

	static function sortOverlaps(
		$overlaps,
		$keys = ['faculty', 'resident'],
		$sorterGetter = null
	) {
		if (count($keys) != 2)
			throw new \DomainException("Must specify two keys");
		if (empty($sorterGetter))
			$sorterGetter = 'self::getNameSorter';


		$sortByFaculty = call_user_func($sorterGetter, $keys[0]);
		$sortByResident = call_user_func($sorterGetter, $keys[1]);

		return self::sort($overlaps, $sortByFaculty, $sortByResident);
	}

	static function sort(
		$overlaps,
		$topSorter,
		$nestedSorter
	) {
		$sortFacultyOverlaps = function ($facultyOverlaps) use ($nestedSorter) {
			$pairings = &$facultyOverlaps['pairings'];
			usort($pairings, $nestedSorter);

			return $facultyOverlaps;
		};

		$sortedFacultyOverlaps = array_map($sortFacultyOverlaps, $overlaps);

		usort($sortedFacultyOverlaps, $topSorter);

		return $sortedFacultyOverlaps;
	}

	public static function getNameSorter($key) {
		return function ($a, $b) use ($key) {
			$aName = $a[$key]->full_name;
			$bName = $b[$key]->full_name;

			if ($aName == $bName)
				return 0;

			return ($aName < $bName) ? -1 : 1;
		};
	}

	static function getValueSorter($key) {
		return function ($a, $b) use ($key) {
			$aVal = $a[$key];
			$bVal = $b[$key];

			if ($aVal == $bVal)
				return 0;

			return ($aVal < $bVal) ? -1 : 1;
		};
	}

	static function printReport($overlaps, $roles = ['faculty', 'resident']) {
		foreach ($overlaps as $facultyOverlap) {
			$faculty = $facultyOverlap[$roles[0]];
			if (!empty($facultyOverlap['pairings'])) {
				echo $faculty->full_name . "\n";
				foreach ($facultyOverlap['pairings'] as $pairing) {
					$resident = $pairing[$roles[1]];
					echo "\t" . $resident->full_name . "\n";
					echo "\t\tCases: " . $pairing['numCases'] . "\n";
					echo "\t\tTotal time: " . $pairing['totalTime']->format('%a days, %h hours, %i minutes') . "\n";
				}
			}
		}
	}

	static function writeReport($overlaps, $outfile, $roles = ['faculty', 'resident']) {
		$outfp = fopen($outfile, 'w');
		foreach ($overlaps as $facultyOverlap) {
			$faculty = $facultyOverlap[$roles[0]];
			if (!empty($facultyOverlap['pairings'])) {
				fwrite($outfp, $faculty->full_name . "\n");
				foreach ($facultyOverlap['pairings'] as $pairing) {
					$resident = $pairing[$roles[1]];
					fwrite($outfp, "\t" . $resident->full_name . "\n");
					fwrite($outfp, "\t\tCases: " . $pairing['numCases'] . "\n");
					fwrite($outfp, "\t\tTotal time: " . $pairing['totalTime']->format('%a days, %h hours, %i minutes') . "\n");
				}
			}
		}

		fclose($outfp);
	}

	static function parseDate($date, $time) {
		if (strpos($time, ' ') !== false) {
			[$date, $time] = array_map('trim', explode(' ', $time));
		}

		[$month, $day, $year] = explode('/', $date);
		$year = (int)$year + 2000; // Assuming two-digit year is in 2000s
		$month = (int)$month;
		$day = (int)$day;
		$hour = substr($time, 0, 2);
		$minute = substr($time, 2, 2);

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
