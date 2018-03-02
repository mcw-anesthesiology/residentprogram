<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateHelpers {

	public static function getDateRangeFromPeriodType($periodType) {
		switch ($periodType) {
			case 'year':
				$startDate = Carbon::now()->startOfMonth();
				while ($startDate->month != 7)
					$startDate->subMonth();
				$endDate = Carbon::parse($startDate)->addMonths(11)->endOfMonth();
				break;

			case 'semester':
				$startDate = Carbon::now()->startOfMonth();
				while (!in_array($startDate->month, [1, 7]))
					$startDate->subMonth();
				$endDate = Carbon::parse($startDate)->addMonths(5)->endOfMonth();
				break;

			case 'quarter':
				$startDate = Carbon::now()->startOfMonth();
				while (!in_array($startDate->month, [1, 4, 7, 10]))
					$startDate->subMonth();
				$endDate = Carbon::parse($startDate)->addMonths(3)->endOfMonth();
				break;

			case 'month':
				$startDate = Carbon::now()->startOfMonth();
				$endDate = Carbon::now()->endOfMonth();
				break;
		}

		return [
			'startDate' => $startDate,
			'endDate' => $endDate
		];
	}

	public static function arrayToDateInterval($arr) {
		$di = new DateInterval('PT0S');
		foreach ($arr as $key => $val) {
			$di->$key = $val;
		}
		$dt = new DateTimeImmutable();

		return $dt->diff($dt->add($di));
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

		return self::isDateIntervalPositive($diff)
			? $diff
			: new DateInterval('PT0S');
	}

	static function isDateIntervalPositive($di) {
		$d = new DateTimeImmutable();
		return ($d->add($diff) > $d);
	}

	static function addDateIntervals($di1, $di2) {
		$d = new DateTimeImmutable();
		return $d->diff($d->add($di1)->add($di2));
	}
}
