<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Evaluation;

class CancelInactiveUserRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'requests:cancel-inactive-subject';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancels pending requests for inactive subjects';

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
		$userInactive = function ($query) {
			return $query->where('status', 'inactive');
		};

		$num = Evaluation::where('status', 'pending')
			->where(function ($query) use ($userInactive) {
				$query->whereHas('subject', $userInactive)
					->orWhereHas('evaluator', $userInactive);
			})->update([
				'status' => 'expired'
			]);

		$this->info("Evaluations canceled: {$num}");
    }
}
