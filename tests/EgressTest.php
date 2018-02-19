<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use App\Helpers\EgressParser;

class EgressTest extends TestCase {

	const INTERVAL_FORMAT = '%h hours %m minutes';

    function testSimpleCase() {
		$anesthStaff = <<<EOD
Faculty, Sample, MD:
   Anesthesiologist from 0014 to 1108
Resident, Sample, MD:
   Anesthesia Resident from 0612 to 1443
EOD;

		$procDate = '04/20/17';
		$row = [
			EgressParser::EGRESS_COLS['DATE'] => $procDate,
			EgressParser::EGRESS_COLS['ANESTHESIA_STAFF'] => $anesthStaff
		];
		$case = EgressParser::parseEgressCase($row);

		$this->assertEquals($case, [
			'date' => $procDate,
			'staff' => [
				'Faculty, Sample, MD' => [
					'name' => 'Faculty, Sample, MD',
					'role' => 'faculty',
					'date' => $procDate,
					'times' => [
						'start' => Carbon::create(2017, 4, 20, 0, 14),
						'end' => Carbon::create(2017, 4, 20, 11, 8)
					]
				],
				'Resident, Sample, MD' => [
					'name' => 'Resident, Sample, MD',
					'role' => 'resident',
					'date' => $procDate,
					'times' => [
						'start' => Carbon::create(2017, 4, 20, 6, 12),
						'end' => Carbon::create(2017, 4, 20, 14, 43)
					]
				]
			]
		]);

		// Overlap: 0612 to 1108

		$this->assertEquals(
			EgressParser::computeCaseOverlapTime(
				$case['staff']['Faculty, Sample, MD'],
				$case['staff']['Resident, Sample, MD']
			)->format(self::INTERVAL_FORMAT),
			(new DateInterval('PT4H56M'))->format(self::INTERVAL_FORMAT)
		);
	}

	function testWrappingCase() {
		$anesthStaff = <<<EOD
Resident, Sample, MD:
   Anesthesia Resident from 05/30/17 2004 to 05/31/17 0433
Faculty, Sample, MD:
   Anesthesiologist from 05/30/17 1244 to 05/30/17 2319
EOD;

		// Overlap: 05/30/17 2004 to 05/30/17 2319

		$procDate = '04/20/17';
		$row = [
			EgressParser::EGRESS_COLS['DATE'] => $procDate,
			EgressParser::EGRESS_COLS['ANESTHESIA_STAFF'] => $anesthStaff
		];
		$case = EgressParser::parseEgressCase($row);

		$this->assertEquals(
			EgressParser::computeCaseOverlapTime(
				$case['staff']['Faculty, Sample, MD'],
				$case['staff']['Resident, Sample, MD']
			)->format(self::INTERVAL_FORMAT),
			(new DateInterval('PT3H15M'))->format(self::INTERVAL_FORMAT)
		);
	}

	function testJsonDecodeDateInterval() {
		$faker = new Faker\Generator();
		$faker->addProvider(new Faker\Provider\DateTime($faker));
		$d1 = $faker->dateTime();
		$d2 = $faker->dateTime();

		$di = $d1->diff($d2, true);
		$decodedDi = EgressParser::arrayToDateInterval(
			json_decode(json_encode($di))
		);

		$d = new DateTimeImmutable();
		$this->assertEquals(
			$d->add($di),
			$d->add($decodedDi)
		);
	}
}
