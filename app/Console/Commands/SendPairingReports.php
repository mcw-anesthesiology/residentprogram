<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use DateInterval;
use DateTimeImmutable;

use App\Helpers\EgressParser;

use Log;
use Mail;

class SendPairingReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:pairing-reports
		{infile : Input egress file path}
		{--period-display=the past month : String describing the period, displayed in emails}
		{--no-resident : Do not send to residents}
		{--no-faculty : Do not send to faculty}
		{--faculty-subject=Resident pairing report : Subject for email to faculty}
		{--resident-subject=Faculty pairing report : Subject for email to residents}
		{--min-cases=0 : Minimum number of cases}
		{--min-hours=0 : Minimum number of hours together (combined with minutes)}
		{--min-minutes=30 : Minimum number of minutes together (combined with hours)}
		{--max-pairs=999 : Maximum number of pairs per person to send in report}
		{--or : Require <min-cases> OR <min-hours and min-minutes> (requires both by default)}
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

		$periodDisplay = $this->option('period-display');
		$noFaculty = $this->option('no-faculty');
		$noResident = $this->option('no-resident');
		$facultySubject = $this->option('faculty-subject');
		$residentSubject = $this->option('resident-subject');
		$minCases = $this->option('min-cases');
		$minHours = $this->option('min-hours');
		$minMinutes = $this->option('min-minutes');
		$maxPairs = $this->option('max-pairs');
		$orNotAnd = $this->option('or');
		$dry = $this->option('dry');


		if (!$noFaculty) {
			$overlapsByFaculty = EgressParser::parseFilename($egressFile);
			if (empty($overlapsByFaculty)) {
				$this->error('Unable to find overlaps by faculty');
			} else {
				$overlapsByFaculty = EgressParser::sort(
					$overlapsByFaculty,
					EgressParser::getNameSorter('faculty'),
					function($a, $b) {
						$date = new DateTimeImmutable();
						$aDate = $date->add($a['totalTime']);
						$bDate = $date->add($b['totalTime']);

						if ($aDate == $bDate)
							return 0;

						return ($aDate > $bDate) ? -1 : 1;
					}
				);

				$minHoursInterval = new DateInterval("PT{$minHours}H{$minMinutes}M");
				$d = new DateTimeImmutable();
				$minDate = $d->add($minHoursInterval);

				$facultyEmailsSent = 0;

				foreach ($overlapsByFaculty as $facultyOverlap) {
					try {
						$faculty = $facultyOverlap['faculty'];
						$pairings = array_slice(array_filter(
							$facultyOverlap['pairings'],
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

						$requestUrl = url('/request?' . join('&', array_map(
							function ($pairing) {
								return "subject={$pairing['resident']->id}";
							},
							$pairings
						)));

						$data = compact(
							'faculty',
							'pairings',
							'periodDisplay',
							'requestUrl'
						);

						if ($dry) {
							$this->info(
								"Would have sent report to {$faculty->full_name} with "
								. count($pairings) . ' pairings'
							);
						} else {
							Mail::send(
								'emails.pairing-report.faculty',
								$data,
								function ($message) use ($faculty, $facultySubject) {
									$message->to($faculty->email)
										->from('admin@residentprogram.com', 'Resident Program')
										->replyTo(config('app.admin_email'))
										->subject($facultySubject);
								}
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

				$this->info($facultyEmailsSent . ' faculty reports sent');
			}
		}

		if (!$noResident) {
			$roles = [
				'resident' => EgressParser::RESIDENT_ROLE,
				'faculty' => EgressParser::FACULTY_ROLE
			];
			$overlapsByResident = EgressParser::parseFilename($egressFile, $roles);
			if (empty($overlapsByResident)) {
				$this->error('Unable to find overlaps by resident');
			} else {
				$overlapsByResident = EgressParser::sort(
					$overlapsByResident,
					EgressParser::getNameSorter('resident'),
					function($a, $b) {
						$date = new DateTimeImmutable();
						$aDate = $date->add($a['totalTime']);
						$bDate = $date->add($b['totalTime']);

						if ($aDate == $bDate)
							return 0;

						return ($aDate > $bDate) ? -1 : 1;
					}
				);

				$minHoursInterval = new DateInterval("PT{$minHours}H");
				$d = new DateTimeImmutable();
				$minDate = $d->add($minHoursInterval);

				$residentEmailsSent = 0;

				foreach ($overlapsByResident as $residentOverlap) {
					try {
						$resident = $residentOverlap['resident'];
						$pairings = array_slice(array_filter(
							$residentOverlap['pairings'],
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

						$requestUrl = url('/request?' . join('&', array_map(
							function ($pairing) {
								return "evaluator={$pairing['faculty']->id}";
							},
							$pairings
						)));

						$data = compact(
							'resident',
							'pairings',
							'periodDisplay',
							'requestUrl'
						);

						if ($dry) {
							$this->info(
								"Would have sent report to {$resident->full_name} with "
								. count($pairings) . ' pairings'
							);
						} else {
							Mail::send(
								'emails.pairing-report.resident',
								$data,
								function ($message) use ($resident, $residentSubject) {
									$message->to($resident->email)
										->from('admin@residentprogram.com', 'Resident Program')
										->replyTo(config('app.admin_email'))
										->subject($residentSubject);
								}
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

				$this->info($residentEmailsSent . ' resident reports sent');
			}
		}
    }
}
