<?php

namespace App\Helpers;

use Carbon\Carbon;

class DisplayHelpers {

	public static function renderTrainingLevel($trainingLevel) {
		return strpos($trainingLevel, 'ca-') !== false
			? strtoupper($trainingLevel)
			: ucfirst($trainingLevel);
	}

	public static function kebabCaseToWords($str) {
		return str_replace('-', ' ', ucfirst($str));
	}
}
