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
}
