<?php

namespace App\Helpers;

class Math {
	public static function mean($array) {
		return array_sum($array) / count($array);
	}


    public static function sd_square($x, $mean) {
	// Function to calculate square of value - mean
		return pow($x - $mean,2);
	}


	public static function sd($array) {
	// Function to calculate standard deviation (uses sd_square)

		// square root of sum of squares devided by N-1
		return sqrt(
			array_sum(
				array_map(
					'self::sd_square',
					$array,
					array_fill(
						0,
						count($array),
						self::mean($array)
					)
				)
			)
		   	/ (count($array) - 1)
	   	);
	}

}
