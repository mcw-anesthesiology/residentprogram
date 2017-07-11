<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use Log;

use App\Advancement;

class RunAdvancements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'advancements:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Runs pending advancements past their scheduled time';

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
        $advancements = Advancement::where("complete", false)
			->where("run_at", "<=", Carbon::now())->get();

		$errors = [];
		foreach ($advancements as $advancement) {
			try {
				$advancement->run();
			} catch(\Exception $e) {
				Log::error($e);
				$errors[] = $advancement->id;
			}
		}
    }
}
