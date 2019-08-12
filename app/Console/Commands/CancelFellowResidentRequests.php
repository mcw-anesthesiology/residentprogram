<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;

class CancelFellowResidentRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'requests:cancel-fellow-resident';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancels pending resident requests for now-fellow subjects';

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
    public function handle() {
		$num = Evaluation::where('status', 'pending')
			->where('training_level', '!=', 'fellow')
			->whereHas('subject', function ($query) {
				return $query->where('training_level', 'fellow');
			})->update([
				'status' => 'expired'
			]);

		$this->info("Evaluations canceled: {$num}");
    }
}
