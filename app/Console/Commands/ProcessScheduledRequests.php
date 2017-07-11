<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use App\ScheduledRequest;

class ProcessScheduledRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:scheduled-requests';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates requests for scheduled requests past their time';

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
        $scheduledRequests = ScheduledRequest::where(
			'request_date', '<=', Carbon::now()
		)->get();

		$errors = [];
		foreach ($scheduledRequests as $scheduledRequest) {
			try {
				$scheduledRequest->makeRequest();
			} catch (\Exception $e) {
				Log::error($e);
				$errors[] = $scheduledRequest->id;
			}
		}
    }
}
