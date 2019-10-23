<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;
use App\Helpers\DateHelpers;

use Carbon\Carbon;

use Setting;

class ReleaseFacultyEvals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'release:faculty-evals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Releases faculty evaluations to their subjects';

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
		$numEvalsUnhidden = 0;

		$currentQuarter = DateHelpers::getDateRangeFromPeriodType('quarter');
		$endOfPrevQuarter = $currentQuarter['startDate']->subDay()->endOfDay();


		$hiddenEvals = Evaluation::where("status", "complete")
			->where("visibility", "under faculty hold")
			->where('complete_date', '<=', $endOfPrevQuarter)
			->get();

		$hiddenEvals->each(function($evalToUnhide) use (&$numEvalsUnhidden){
			$evalToUnhide->visibility = null;
			$evalToUnhide->save();
			$numEvalsUnhidden++;
		});

		$this->info($numEvalsUnhidden . " evaluations released");
    }
}
