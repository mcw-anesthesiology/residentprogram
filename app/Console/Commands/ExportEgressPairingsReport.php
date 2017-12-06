<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Helpers\EgressParser;

class ExportEgressPairingsReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'export:egress
		{infile : Input egress file path}
		{outfile? : Destination file path (prints report if omitted)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export egress pairings report';

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

		$overlaps = EgressParser::parseFilename($egressFile);
		if (empty($overlaps)) {
			$this->error('No overlaps found');
		} else {
			$overlaps = EgressParser::sortOverlaps($overlaps);
			if (!empty($this->argument('outfile'))) {
				EgressParser::writeReport($overlaps, $this->argument('outfile'));
			} else {
				EgressParser::printReport($overlaps);
			}
		}
    }
}
