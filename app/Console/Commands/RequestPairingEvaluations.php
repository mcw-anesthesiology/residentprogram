<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use App\Evaluation;
use App\ScheduledRequest;
use App\User;
use App\Helpers\EgressParser;

class RequestPairingEvaluations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'request:pairing-evals
		{infile : Input egress file path}
		{--min-cases=2 : Minimum number of cases}
		{--min-hours=4 : Minimum number of hours together}
		{--or : Require <min-cases> OR <min-hours> (requires both by default)}
		{--dry : Do not make any requests, merely print them}
		{--schedule= : Date to schedule the requests to be sent (default: immediately)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create requests based on pairings from egress report';

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
		// Currently requires a user to exist with `admin` username
		$requestor = User::where('username', 'admin')->firstOrFail();
		$egressFile = $this->argument('infile');

		$minCases = $this->option('min-cases');
		$minHours = $this->option('min-hours');
		$orNotAnd = $this->option('or');
		$dry = $this->option('dry');
		$schedule = $this->option('schedule');

		$overlaps = EgressParser::parseFilename($egressFile);
		if (empty($overlaps)) {
			$this->error('No overlaps found');
		} else {
			$overlaps = EgressParser::sortOverlaps($overlaps);

			foreach ($overlaps as $facultyOverlap) {
				$faculty = $facultyOverlap['faculty'];
				if (!empty($facultyOverlap['pairings'])) {
					foreach ($facultyOverlap['pairings'] as $pairing) {
						$resident = $pairing['resident'];
						$hoursTogether = 2; // FIXME

						if (
							(
								$orNotAnd && (
									$pairing['numCases'] >= $minCases
									|| $hoursTogether >= $minHours
								)
							)
							|| (
								!$orNotAnd && (
									$pairing['numCases'] >= $minCases
									&& $hoursTogether >= $minHours
								)
							)
						) {
							try {
								if ($dry) {
									echo "{$faculty->full_name} and {$resident->full_name}";
								} else {
									$values = [
										'form_id' => null, // FIXME
										'evaluator_id' => $faculty->id,
										'subject_id' => $resident->id,
										'requested_by_id' => $requestor->id,
										'request_date' => Carbon::now(),
										'evaluation_date_start' => $startDate,
										'evaluation_date_end' => $endDate,
										'request_ip' => '0.0.0.0',
										'request_type' => 'resident',
										'request_note' => 'This evaluation was automatically requested based on your time scheduled together with this resident.',
									];

									if (!empty($schedule)) {
										$values['request_date'] = $schedule;
										$values['scheduled_date'] = Carbon::now();

										ScheduledRequest::schedule($values);
									} else {
										Evaluation::request($values);
									}
								}
							} catch (\Exception $e) {
								Log::debug('[Pairing Evaluation] Failed creating request: ' . $e);
							}
						}
					}
				}
			}
		}
    }
}
