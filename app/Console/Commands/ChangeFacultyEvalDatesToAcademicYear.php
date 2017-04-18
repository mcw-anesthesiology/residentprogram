<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;

class ChangeFacultyEvalDatesToAcademicYear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:faculty-eval-dates-to-year';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Changes the evaluation dates for faculty evaluations to the academic year of the evaluation';

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
        $evaluations = Evaluation::ofType('faculty')->get();
		
		$successful = 0;
		$unsuccessful = 0;
		
		$that = $this;
		
		$evaluations->each(function($eval) use ($that, &$successful, &$unsuccessful) {
			$startYear = ($eval->evaluation_date_start->month >= 7)
				? $eval->evaluation_date_start->year
				: ($eval->evaluation_date_start->year - 1);
			$endYear = $startYear + 1;
				
			$oldStart = $eval->evaluation_date_start;
			$oldEnd = $eval->evaluation_date_end;
			
			$eval->evaluation_date_start = "{$startYear}-07-01";
			$eval->evaluation_date_end = "{$endYear}-06-30";
			
			$same = $oldStart == $eval->evaluation_date_start && $oldEnd == $eval->evaluation_date_end;
			$between = $oldStart >= $eval->evaluation_date_start && $oldEnd <= $eval->evaluation_date_end;
			
			if ($same) {
				// Do nothing
			} elseif ($between) {
				// $that->info("Start: {$oldStart} -> {$eval->evaluation_date_start}");
				// $that->info("End: {$oldEnd} -> {$eval->evaluation_date_end}");
				// $that->line("\n\n");
				$successful += 1;
				
				$eval->save();
			} else {
				$that->error("Start: {$oldStart} -> {$eval->evaluation_date_start}");
				$that->error("End: {$oldEnd} -> {$eval->evaluation_date_end}");
				$that->line("\n\n");
				
				$unsuccessful += 1;
			}
		});
		
		if ($successful > 0)
			$this->info("{$successful} successful");
		
		if ($unsuccessful > 0)
			$this->error("{$unsuccessful} unsuccessful");
    }
}
