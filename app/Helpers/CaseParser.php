<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use Carbon\Carbon;

use DateTimeImmutable;
use DateInterval;

use App\AnesthesiaCase;
use App\User;

use Log;
use Mail;

class CaseParser {

	// Report types
	const EGRESS_FILE_TYPE = 'FROEDTERT_EGRESS';
	const CHW_TRAINEE_FILE_TYPE = 'CHW_TRAINEE_REPORT';

	// Column indexes
	// FIXME: Froedtert egress likely to change
	const EGRESS_COLS = [
		'ID' => 0,
		'DATE' => 1,
		'PROCEDURE' => 2,
		'ANES_START' => 4,
		'ANES_STOP' => 5,
		'ANESTHESIA_STAFF' => 6
	];
	const CHW_TRAINEE_REPORT_COLS = [
		'ID' => 0,
		'DATE' => 1,
		'LOCATION' => 3,
		'PROCEDURE' => 4,
		'ANES_START' => 12,
		'ANES_END' => 13,
		'ANESTHESIOLOGIST' => [ 5, 6, 7 ],
		'RESIDENT' => [ 8, 9 ],
		'FELLOW' => [ 10, 11 ],
		'SURGEON' => 14
	];

	const FACULTY_ROLE = 'faculty';
	const TRAINEE_ROLE = 'trainee';
	const RESIDENT_ROLE = 'resident';
	const FELLOW_ROLE = 'fellow';

	const EGRESS_FACULTY_ROLE = 'Anesthesiologist';
	const EGRESS_RESIDENT_ROLE = 'Anesthesia Resident';
	const EGRESS_FELLOW_ROLE = 'Anesthesia Fellow';

	protected $EGRESS_ROLE_MAP = [
		self::EGRESS_FACULTY_ROLE => self::FACULTY_ROLE,
		self::EGRESS_RESIDENT_ROLE => self::RESIDENT_ROLE,
		self::EGRESS_FELLOW_ROLE => self::FELLOW_ROLE
	];

	protected $CHW_STAFF_COLS = array_merge(
		self::CHW_TRAINEE_REPORT_COLS['ANESTHESIOLOGIST'],
		self::CHW_TRAINEE_REPORT_COLS['RESIDENT'],
		self::CHW_TRAINEE_REPORT_COLS['FELLOW']
	);

	protected $CHW_ROLE_MAP = array_merge(
		array_fill_keys(
			self::CHW_TRAINEE_REPORT_COLS['ANESTHESIOLOGIST'],
			self::FACULTY_ROLE
		),
		array_fill_keys(
			self::CHW_TRAINEE_REPORT_COLS['RESIDENT'],
			self::RESIDENT_ROLE
		),
		array_fill_keys(
			self::CHW_TRAINEE_REPORT_COLS['FELLOW'],
			self::FELLOW_ROLE
		),
	);

	static function parseFilename($filename, $type = self::EGRESS_FILE_TYPE) {
		$fp = fopen($filename, 'r');
		return self::parseCsv($fp, $type);
	}

	static function parseCsv($file, $type = self::EGRESS_FILE_TYPE) {
		// FIXME: Don't just catch Exception everywhere

		$successful = 0;
		$unsuccessful = 0;

		$firstLine = true;

		$parse = null;
		switch ($type) {
			case self::EGRESS_FILE_TYPE:
				$parse = self::parseEgressCase;
				break;
			case self::CHW_TRAINEE_FILE_TYPE:
				$parse = self::parseTraineeProcedureCase;
				break;
		}

		if (empty($parse))
			throw new \InvalidArgumentException("$type is not a valid file type");

		while (($row = fgetcsv($file)) !== false) {
			if ($firstLine) {
				$firstLine = false;
				continue;
			}

			try {
				$parse($row);
				$successful++;

			} catch (\Exception $e) {
				Log::debug('Unable to parse case row: ' . $e);
				$unsuccessful++;
			}
		}

		return [
			'successful' => $successful,
			'unsuccessful' => $unsuccessful
		];
	}

	static function parseFroedtertEgressCase($row) {
		$logId = $row[self::EGRESS_COLS['ID']];
		$procDate = self::parseDate($row[self::EGRESS_COLS['DATE']]);
		$procedure = $row[self::EGRESS_COLS['PROCEDURE']];
		$anesStart = self::parseDateTime($procDate, $row[self::EGRESS_COLS['ANES_START']]);
		$anesStop = self::parseDateTime($procDate, $row[self::EGRESS_COLS['ANES_STOP']]);
		$anesthesiaStaff = $row[self::EGRESS_COLS['ANESTHESIA_STAFF']];

		$staff = [];

		foreach (explode("\n", $anesthesiaStaff) as $line) {
			if (empty($line))
				continue;

			if (strpos($line, '   ') !== 0) {
				$name = substr(trim($line), 0, -1); // Remove `:`
				$staff[$name] = [];
			} elseif (!empty($name) && (strpos($line, '(assigned)') === false)) {
				try {
					[$role, $times] = array_map('trim', explode('from', $line));
					[$start, $end] = array_map('trim', explode('to', $times));

					$staff[$name]['role'] = self::$EGRESS_ROLE_MAP[$role];
					$staff[$name]['times'] = [
						'start' => self::parseDateTime($procDate, $start),
						'end' => self::parseDateTime($procDate, $end)
					];
				} catch (\Exception $e) {
					Log::debug('Failed to parse froedtert egress staff row: ' . $e);
				}
			}
		}

		$caseUsers = [];

		foreach ($staff as $name => $caseInfo) {
			try {
				$userId = self::findUserId($name, $caseInfo['role']);
				if (!empty($userId))
					$caseUsers[$userId] = $caseInfo['times'];
			} catch (ModelNotFoundException $e) {
				$role = $caseInfo['role'];
				Log::debug("User not found (Name: $name, role: $role)");
			}
		}


		if (!empty($caseUsers)) {
			$anesthesiaCase = AnesthesiaCase::updateOrCreate(
				[
					'report_type' => self::EGRESS_FILE_TYPE,
					'report_case_id' => $logId
				],
				[
					'procedure_date' => $procDate,
					'start_time' => $anesStart,
					'stop_time' => $anesStop,
					'procedure_desc' => $procedure
				]
			);

			foreach ($caseUsers as $userId => $times) {
				$anesthesiaCase->users()->attach($userId, [
					'start_time' => $times['start'],
					'stop_time' => $times['end']
				]);
			}
		}

		return $anesthesiaCase->fresh();
	}

	static function parseCHWTraineeProcedureCase($row) {
		$logId = $row[self::CHW_TRAINEE_REPORT_COLS['ID']];
		$procDate = self::parseDate($row[self::CHW_TRAINEE_REPORT_COLS['DATE']]);
		$procedure = $row[self::CHW_TRAINEE_REPORT_COLS['PROCEDURE']];
		$location = $row[self::CHW_TRAINEE_REPORT_COLS['LOCATION']];
		$surgeon = $row[self::CHW_TRAINEE_REPORT_COLS['SURGEON']];
		$startTime = Carbon::parse(
			$row[self::CHW_TRAINEE_REPORT_COLS['ANES_START']]
		);
		$endTime = Carbon::parse(
			$row[self::CHW_TRAINEE_REPORT_COLS['ANES_END']]
		);

		$caseUsers = [];

		foreach (self::$CHW_STAFF_COLS as $col) {
			try {
				$userId = self::findUserId($row[$col], self::$CHW_ROLE_MAP[$col]);
				if (!empty($userId))
					$caseUsers[] = $userId;
			} catch (ModelNotFoundException $e) {
				$role = self::$CHW_ROLE_MAP[$col];
				Log::debug("User not found (Name: $name, role: $role)");
			}
		}

		if (!empty($caseUsers)) {
			$anesthesiaCase = AnesthesiaCase::updateOrCreate(
				[
					'report_type' => self::CHW_TRAINEE_FILE_TYPE,
					'report_case_id' => $logId
				],
				[
					'procedure_date' => $procDate,
					'start_time' => $startTime,
					'stop_time' => $endTime,
					'procedure_desc' => $procedure,
					'location' => $location,
					'surgeon_name' => $surgeon
				]
			);

			$anesthesiaCase->users()->attach($caseUsers, [
				'start_time' => $startTime,
				'stop_time' => $endTime
			]);
		}
	}

	static function parseDate($date) {
		[$month, $day, $year] = explode('/', $date);
		$year = (int)$year + 2000; // Assuming two-digit year is in 2000s
		$month = (int)$month;
		$day = (int)$day;

		return Carbon::create($year, $month, $day);
	}

	static function parseDateTime($date, $time) {
		if (strpos($time, ' ') !== false) {
			[$date, $time] = array_map('trim', explode(' ', $time));
		}

		$date = self::parseDate($date);

		$hour = substr($time, 0, 2);
		$minute = substr($time, 2, 2);

		return $date->setTime($hour, $minute);
	}

	static function findUserId($name, $role) {
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
			$results = $query->get(['id'])->pluck('id');
		}

		if (count($results) === 1)
			return $results[0];


		throw new ModelNotFoundException();
	}
}
