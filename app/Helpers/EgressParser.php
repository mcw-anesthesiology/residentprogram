<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Carbon\Carbon;

use DateTimeImmutable;
use DateInterval;

use App\User;

use Log;
use Mail;

class EgressParser {

	// Report types
	const EGRESS_FILE_TYPE = 'egress';
	const CHW_TRAINEE_FILE_TYPE = 'chw';

	// Column indexes
	const EGRESS_COLS = [
		'DATE' => 0,
		'ANESTHESIA_STAFF' => 6
	];
	const CHW_TRAINEE_REPORT_COLS = [
		'DATE' => 1,
		'ANES_START' => 12,
		'ANES_END' => 13,
		'ANESTHESIOLOGIST' => [ 5, 6, 7 ],
		'RESIDENT' => [ 8, 9 ],
		'FELLOW' => [ 10, 11 ]
	];

	const FACULTY_ROLE = 'faculty';
	const RESIDENT_ROLE = 'resident';
	const FELLOW_ROLE = 'fellow';

	const EGRESS_FACULTY_ROLE = 'Anesthesiologist';
	const EGRESS_RESIDENT_ROLE = 'Anesthesia Resident';
	const EGRESS_FELLOW_ROLE = 'Anesthesia Fellow';

	static function parseFilename($filename, $roles = null, $type = 'egress') {
		$fp = fopen($filename, 'r');
		return self::parseCsv($fp, $roles, $type);
	}

	static function parseCsv($file, $roles = null, $type = 'egress') {
		// FIXME: Don't just catch Exception everywhere

		$cases = [];

		$firstLine = true;
		while (($row = fgetcsv($file)) !== false) {
			if ($firstLine) {
				$firstLine = false;
				continue;
			}

			try {
				switch ($type) {
					case self::EGRESS_FILE_TYPE:
						$newCase = self::parseEgressCase($row);
						break;
					case self::CHW_TRAINEE_FILE_TYPE:
						$newCase = self::parseTraineeProcedureCase($row);
						break;
					default:
						$newCase = null;
						break;
				}

				if (!empty($newCase))
					$cases[] = $newCase;
			} catch (\Exception $e) {
				Log::debug('Unable to compute row: ' . $e);
			}
		}

		if (!empty($cases)) {
			return self::computeOverlaps(self::getOverlappingCases($cases, $roles));
		}

		return [];
	}

	static function parseEgressCase($row) {
		$procDate = $row[self::EGRESS_COLS['DATE']];
		$anesthesiaStaff = $row[self::EGRESS_COLS['ANESTHESIA_STAFF']];
		$name = null;
		$staff = [];

		$roleMap = [
			self::EGRESS_FACULTY_ROLE => self::FACULTY_ROLE,
			self::EGRESS_RESIDENT_ROLE => self::RESIDENT_ROLE,
			self::EGRESS_FELLOW_ROLE => self::FELLOW_ROLE
		];

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
						[$start, $end] = array_map('trim', explode('to', $times));

						$staff[$name]['role'] = array_key_exists($role, $roleMap)
							? $roleMap[$role]
							: null;
						$staff[$name]['times'] = [
							'start' => self::parseDate($procDate, $start),
							'end' => self::parseDate($procDate, $end)
						];
					} catch (\Exception $e) {
						Log::debug('Failed to parse ');
					}
				}
			}

			return [
				'date' => $procDate,
				'staff' => $staff
			];
		} catch (\Exception $e) {
			Log::debug("Couldn't parse anesthesia staff: {$e}\n\t{$anesthesiaStaff}");
		}
	}

	static function parseTraineeProcedureCase($row) {
		$procDate = $row[self::CHW_TRAINEE_REPORT_COLS['DATE']];
		$staff = [];

		$staffCols = array_merge(
			self::CHW_TRAINEE_REPORT_COLS['ANESTHESIOLOGIST'],
			self::CHW_TRAINEE_REPORT_COLS['RESIDENT'],
			self::CHW_TRAINEE_REPORT_COLS['FELLOW']
		);

		$roleMap = [];
		foreach (self::CHW_TRAINEE_REPORT_COLS['ANESTHESIOLOGIST'] as $facCol) {
			$roleMap[$facCol] = self::FACULTY_ROLE;
		}
		foreach (self::CHW_TRAINEE_REPORT_COLS['RESIDENT'] as $resCol) {
			$roleMap[$resCol] = self::RESIDENT_ROLE;
		}
		foreach (self::CHW_TRAINEE_REPORT_COLS['FELLOW'] as $fellowCol) {
			$roleMap[$fellowCol] = self::FELLOW_ROLE;
		}

		$start = Carbon::parse(
			$row[self::CHW_TRAINEE_REPORT_COLS['ANES_START']]
		);
		$end = Carbon::parse(
			$row[self::CHW_TRAINEE_REPORT_COLS['ANES_END']]
		);

		foreach ($staffCols as $col) {
			try {
				$name = $row[$col];
				if (empty($name))
					continue;

				$staff[$name] = [
					'name' => $name,
					'date' => $procDate,
					'role' => array_key_exists($col, $roleMap)
						? $roleMap[$col]
						: null,
					'times' => [
						'start' => $start,
						'end' => $end
					]
				];
			} catch (\Exception $e) {
				Log::debug("Couldn't parse trainee procedure case for col {$col}: ${e}");
			}
		}

		return [
			'date' => $procDate,
			'staff' => $staff
		];
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

	static function computeCaseOverlapTime($staff1, $staff2) {
		return self::computeOverlapTime(
			$staff1['times']['start'],
			$staff1['times']['end'],
			$staff2['times']['start'],
			$staff2['times']['end']
		);
	}

	static function computeOverlapTime(
		$firstStart,
		$firstEnd,
		$secondStart,
		$secondEnd
	) {
		if ($firstStart > $firstEnd)
			$firstEnd->addDay();

		if ($secondStart > $secondEnd)
			$secondEnd->addDay();

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
		$query = User::where('status', 'active')
			->whereRaw('last_name LIKE ?', ["%{$last}%"]);

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

	static function sendPairingReport(
		$user,
		$pairings,
		$userType,
		$subjectType,
		$emailSubject,
		$periodDisplay,
		$reportDates = null,
		$intro = null,
		$successLead = null,
		$emptyMessage = null,
		$closing = null
	) {
		$filterType = ($subjectType == 'faculty')
			? 'evaluator'
			: 'subject';

		$requestUrl = url('/request?' . join('&', array_map(
			function ($pairing) use ($filterType, $subjectType) {
				return "{$filterType}={$pairing[$subjectType]['id']}";
			},
			$pairings
		)));

		$evaluationDateParams = '';

		if (!empty($reportDates)) {
			$evaluationDateParams = "&startDate={$reportDates[0]}&endDate={$reportDates[1]}";
			$requestUrl .= $evaluationDateParams;
		}

		foreach ($pairings as &$pairing) {
			if (!($pairing['totalTime'] instanceof DateInterval)) {
				$pairing['totalTime'] = self::arrayToDateInterval(
					$pairing['totalTime']
				);
			}
		}

		$data = compact(
			'user',
			'pairings',
			'periodDisplay',
			'requestUrl',
			'evaluationDateParams',

			'intro',
			'successLead',
			'emptyMessage',
			'closing'
		);

		Mail::send(
			"emails.pairing-report.{$userType}",
			$data,
			function ($message) use ($user, $emailSubject) {
				$message->to($user['email'])
					->from('admin@residentprogram.com', 'Resident Program')
					->replyTo(config('app.admin_email'))
					->subject($emailSubject);
			}
		);
	}

	static function filterOverlapsPairings(
		$overlaps,
		$minCases,
		$minHours,
		$minMinutes,
		$maxPairs,
		$orNotAnd
	) {
		$minHoursInterval = new DateInterval("PT{$minHours}H{$minMinutes}M");
		$d = new DateTimeImmutable();
		$minDate = $d->add($minHoursInterval);

		foreach ($overlaps as &$overlap) {
			$overlap['pairings'] = array_slice(array_filter(
				$overlap['pairings'],
				function ($pairing) use ($minCases, $d, $minDate, $orNotAnd) {
					return (
						($orNotAnd && (
							$pairing['numCases'] >= $minCases
							|| $d->add($pairing['totalTime']) >= $minDate
						))
						|| (!$orNotAnd && (
							$pairing['numCases'] >= $minCases
							&& $d->add($pairing['totalTime']) >= $minDate
						))
					);
				}
			), 0, $maxPairs);
		}

		return $overlaps;
	}

	static function getSortedFilteredOverlaps(
		$egressFiles,
		$chwTraineeFiles,
		$userType,
		$minCases,
		$minHours,
		$minMinutes,
		$maxPairs,
		$orNotAnd = false,
		$roles = null
	) {
		if (empty($egressFiles) && empty($chwTraineeFiles))
			throw new \DomainException('Must specify at least one report file');

		if (empty($egressFiles)) {
			$egressFiles = [];
		} else if (!is_array($egressFiles)) {
			$egressFiles = [$egressFiles];
		}


		if (empty($chwTraineeFiles)) {
			$chwTraineeFiles = [];
		} else if (!is_array($chwTraineeFiles)) {
			$chwTraineeFiles = [$chwTraineeFiles];
		}

		$egressFilesOverlaps = array_map(function ($egressFile) use ($roles) {
			return EgressParser::parseFilename($egressFile, $roles);
		}, $egressFiles);
		$chwTraineeFilesOverlaps = array_map(function ($chwTraineeFile) use ($roles) {
			return EgressParser::parseFilename(
				$chwTraineeFile,
				$roles,
				EgressParser::CHW_TRAINEE_FILE_TYPE
			);
		}, $chwTraineeFiles);

		Log::debug($egressFilesOverlaps);
		Log::debug($chwTraineeFilesOverlaps);

		$overlaps = array_merge_recursive(
			[],
			...$egressFilesOverlaps,
			...$chwTraineeFilesOverlaps
		);
		Log::debug($overlaps);
		$overlaps = EgressParser::sort(
			$overlaps,
			EgressParser::getNameSorter($userType),
			function ($a, $b) {
				$date = new DateTimeImmutable();
				$aDate = $date->add($a['totalTime']);
				$bDate = $date->add($b['totalTime']);

				if ($aDate == $bDate)
					return 0;

				return ($aDate > $bDate) ? -1 : 1;
			}
		);
		return EgressParser::filterOverlapsPairings(
			$overlaps,
			$minCases,
			$minHours,
			$minMinutes,
			$maxPairs,
			$orNotAnd
		);
	}

	static function sendPairingReports($egressFiles, $options) {
		if (!is_array($egressFiles))
			$egressFiles = [$egressFiles];

		$noFaculty = !empty($options['no-faculty']);
		$noResident = !empty($options['no-resident']);
		$periodDisplay = $options['period-display'];
		$facultySubject = $options['faculty-subject'];
		$residentSubject = $options['resident-subject'];
		$minCases = $options['min-cases'];
		$minHours = $options['min-hours'];
		$minMinutes = $options['min-minutes'];
		$maxPairs = $options['max-pairs'];
		$orNotAnd = !empty($options['or']);
		$dry = !empty($options['dry']);

		$info = [];
		$errors = [];

		if (!$noFaculty) {
			try {
				$overlapsByFaculty = self::getSortedFilteredOverlaps(
					$egressFiles,
					null,
					'faculty',
					$minCases,
					$minHours,
					$minMinutes,
					$maxPairs,
					$orNotAnd
				);
			} catch (\Exception $e) {
				Log::debug($e);
			}

			if (empty($overlapsByFaculty)) {
				$errors[] = 'Unable to find overlaps by faculty';
			} else {
				$facultyEmailsSent = 0;

				foreach ($overlapsByFaculty as $facultyOverlap) {
					try {
						$faculty = (array)$facultyOverlap['faculty'];
						$pairings = (array)$facultyOverlap['pairings'];

						if ($dry) {
							$info[] = "Would have sent report to "
								. "{$faculty->full_name} with "
								. count($pairings) . ' pairings';
						} else {
							self::sendPairingReport(
								$faculty,
								$pairings,
								'faculty',
								'resident',
								$facultySubject,
								$periodDisplay,
								null,
								null,
								null,
								null,
								null
							);

							// Mailtrap gets mad if you send emails too quickly
							if (config('app.env') != 'production') {
								sleep(1);
							}
						}

						$facultyEmailsSent++;
					} catch (\Exception $e) {
						Log::debug('Failed sending pairing report: ' . $e);
					}
				}

				$info[] = $facultyEmailsSent . ' faculty reports sent';
			}
		}

		if (!$noResident) {
			$roles = [
				'resident' => EgressParser::RESIDENT_ROLE,
				'faculty' => EgressParser::FACULTY_ROLE
			];
			try {
				$overlapsByResident = array_merge_recursive(
					...array_map(function ($egressFile) use ($minCases, $minHours, $minMinutes, $maxPairs, $orNotAnd) {
						return self::getSortedFilteredOverlaps(
							$egressFile,
							null,
							'resident',
							$minCases,
							$minHours,
							$minMinutes,
							$maxPairs,
							$orNotAnd
						);
					}, $egressFiles)
				);
			} catch (\Exception $e) {
				Log::debug($e);
			}

			if (empty($overlapsByResident)) {
				$errors[] = 'Unable to find overlaps by resident';
			} else {
				$residentEmailsSent = 0;

				foreach ($overlapsByResident as $residentOverlap) {
					try {
						$resident = (array)$residentOverlap['resident'];
						$pairings = (array)$residentOverlap['pairings'];

						if ($dry) {
							$info[] = 'Would have sent report to '
								. "{$resident->full_name} with "
								. count($pairings) . ' pairings';
						} else {
							self::sendPairingReport(
								$resident,
								$pairings,
								'resident',
								'faculty',
								$residentSubject,
								$periodDisplay,
								null,
								null,
								null,
								null,
								null
							);

							// Mailtrap gets mad if you send emails too quickly
							if (config('app.env') != 'production') {
								sleep(1);
							}
						}

						$residentEmailsSent++;
					} catch (\Exception $e) {
						Log::debug('Failed sending pairing report to resident: ' . $e);
					}
				}

				$info[] = $residentEmailsSent . ' resident reports sent';
			}
		}

		$result = [];
		if (!empty($info))
			$result['info'] = $info;
		if (!empty($errors))
			$result['errors'] = $errors;

		return $result;
	}

	static function arrayToDateInterval($arr) {
		$di = new DateInterval('PT0S');
		foreach ($arr as $key => $val) {
			$di->$key = $val;
		}
		$dt = new DateTimeImmutable();

		return $dt->diff($dt->add($di));
	}
}
