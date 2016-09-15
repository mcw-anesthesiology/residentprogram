<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;

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
		$threshold = Setting::get("facultyEvalThreshold");
		$hiddenEvals = Evaluation::where("status", "complete")
			->where("visibility", "under faculty threshold")
			->orderBy("id", "desc")->orderBy("complete_date", "desc")
			->get()->groupBy("form_id");

		foreach($hiddenEvals as $formId => $hiddenFormEvals){
			if($hiddenFormEvals->count() >= $threshold){
				$evalsToUnhide = $hiddenFormEvals->splice($hiddenFormEvals->count()%$threshold);
				$evalsToUnhide->each(function($evalToUnhide) use ($numEvalsUnhidden){
					$evalToUnhide->visibility = null;
					$evalToUnhide->save();
					$numEvalsUnhidden++;
				});
			}
		}

		$timeThreshold = Carbon::parse(Setting::get("facultyEvalTimeThreshold"));
		$numEvalsUnhidden += Evaluation::where("status", "complete")
			->where("visibility", "under faculty threshold")
			->where("complete_date", "<", $timeThreshold)->update([
				"visibility" => null
			]);

		$this->info($numEvalsUnhidden . " evaluations released");
    }
}
