<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;
use App\Helpers\DateHelpers;

class Release360Evals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'release:360-evals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Releases 360 evaluations to their subjects';

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

		$currentSemester = DateHelpers::getDateRangeFromPeriodType('semester');
		$endOfPrevSemester = $currentSemester['startDate']->subDay()->endOfDay();


		$hiddenEvals = Evaluation::where("status", "complete")
			->where("visibility", "under 360 threshold")
			->where('complete_date', '<=', $endOfPrevSemester)
			->get();

		$hiddenEvals->each(function($evalToUnhide) use (&$numEvalsUnhidden){
			$evalToUnhide->visibility = null;
			$evalToUnhide->save();
			$numEvalsUnhidden++;
		});

		$this->info($numEvalsUnhidden . " evaluations released");
    }
}
