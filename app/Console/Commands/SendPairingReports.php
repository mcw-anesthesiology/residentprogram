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

		$result = EgressParser::sendPairingReports(
			$this->argument('infile'),
			$this->options()
		);

		if (!empty($result['errors'])) {
			foreach ($result['errors'] as $error) {
				$this->error($error);
			}
		}

		if (!empty($result['info'])) {
			foreach ($result['info'] as $info) {
				$this->info($info);
			}
		}
    }
}
