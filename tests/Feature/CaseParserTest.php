<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Helpers\CaseParser;

class CaseParserTest extends TestCase
{
	use RefreshDatabase;

	const DATE_FORMAT = 'Y/m/d';
	const TIME_FORMAT = 'Hi';


	public function testFroedtertEgressReport() {

		// TODO
		// $faker = \Faker\Factory::create();
		// $this->users = User::all()->toArray();
		//
		// $rows = [
		// ];
	}


	private function makeRow($faker) {
		$times = $this->makeStartEndTimes($faker);

		return [
			$faker->date(self::DATE_FORMAT),
			$faker->uuid,
			$faker->word,
			$times[0],
			$times[1],
			''
		];
	}

	private function makeAnesthesiaStaff($faker) {

	}

	private function makeStaffLine($faker) {
		$user = $faker->randomElement($this->users);
		return "$user->full_name, $user->type
	";
	}

	private function getUserType($user) {
		switch ($user->type) {
		case 'faculty':
			return 'Anesthesiologist';
		case 'resident':
			if ($user->training_level == 'fellow')
				return 'Anesthesia Fellow';
			return 'Anesthesia Resident';
		}
	}

	private function makeStartEndTimes($faker) {
		$times = [
			$faker->time(self::TIME_FORMAT),
			$faker->time(self::TIME_FORMAT)
		];
		asort($times);

		return $times;
	}
}
