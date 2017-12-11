<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use DateTimeImmutable;

use App\Helpers\EgressParser;

use Log;

class SendPairingReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:pairing-reports
		{infile : Input egress file path}
		{--period-display="the past month" : String describing the period, displayed in emails}
		{--min-cases=2 : Minimum number of cases}
		{--min-hours=4 : Minimum number of hours together}
		{--max-pairs=3 : Maximum number of pairs per person to send in report}
		{--or : Require <min-cases> OR <min-hours> (requires both by default)}
		{--dry : Do not send anything, log instead}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send pairing reports to faculty and residents';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $egressFile = $this->argument('infile');

		$minCases = $this->option('min-cases');
		$minHours = $this->option('min-hours');
		$maxPairs = $this->option('max-pairs');
		$orNotAnd = $this->option('or');
		$dry = $this->option('dry');


		$overlapsByFaculty = EgressParser::parseFilename($egressFile);
		if (empty($overlapsByFaculty)) {
			$this->error('Unable to find overlaps by faculty');
		} else {
			EgressParser::writeReport($overlapsByFaculty, '/tmp/unsorted.txt');
			$overlapsByFaculty = EgressParser::sort(
				$overlapsByFaculty,
				EgressParser::getNameSorter('faculty'),
				function($a, $b) {
					$date = new DateTimeImmutable();
					$aDate = $date->add($a['totalTime']);
					$bDate = $date->add($b['totalTime']);

					if ($aDate < $date)
						Log::debug('????? ' . serialize($a['totalTime']));
					Log::debug($a['resident']->full_name . ': ' . $aDate->format('c'));
					Log::debug($b['resident']->full_name . ': ' . $bDate->format('c'));
					Log::debug(($aDate < $bDate) ? -1 : 1);
					Log::debug("\n\n");

					if ($aDate == $bDate)
						return 0;

					return ($aDate < $bDate) ? -1 : 1;
				}
			);
			EgressParser::writeReport($overlapsByFaculty, '/tmp/sorted.txt');
		}

		// $roles = [
		// 	'resident' => EgressParser::RESIDENT_ROLE,
		// 	'faculty' => EgressParser::FACULTY_ROLE
		// ];
		// $overlapsByResident = EgressParser::parseFilename($egressFile, $roles);
		// if (empty($overlapsByResident)) {
		// 	$this->error('Unable to find overlaps by resident');
		// } else {
        //
		// 	$overlapsByResident = EgressParser::sortOverlaps(
		// 		$overlapsByResident,
		// 		array_keys($roles)
		// 	);
		// }
    }
}
