<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use App\User;

use Log;
use Mail;
use Setting;

class ResidentReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:resident-reminders {user?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send monthly reminders to residents to request evaluations and complete faculty evaluations';

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
		$requirements = Setting::get('monthlyResidentRequirements');

		$residents = User::where('type', 'resident')->where('status', 'active')
			->whereIn('training_level', ['ca-1', 'ca-2', 'ca-3'])
			->with(
				'subjectEvaluations',
				'evaluatorEvaluations',
				'evaluatorEvaluations.form',
				'evaluatorEvaluations.subject'
			)->get();

		if (!empty($this->argument('user'))) {
			$userId = $this->argument('user');
			$residents = $residents->filter(function($resident) use ($userId) {
				return $resident->id == $userId;
			});

			if (count($residents) == 0) {
				throw new \DomainException("There is no active resident with id {$userId}");
			}
		}

		$notNeeded = [];
		$success = [];
		$fail = [];

		$progress = $this->output->createProgressBar(count($residents));

		foreach ($residents as $resident) {
			try {
				$monthRequests = $resident->subjectEvaluations
					->where('requested_by_id', $resident->id)
					->where('request_date', '>=', Carbon::now()->firstOfMonth())
					->count();

				$monthFacultyEvals = $resident->evaluatorEvaluations
					->filter(function($eval) {
						return $eval->form->type == 'faculty'
							&& $eval->subject->type == 'faculty'
							&& $eval->status == 'complete'
							&& $eval->complete_date >= Carbon::now()->firstOfMonth();
					})->count();

				if ($monthRequests < $requirements['evaluationRequests']
						|| $monthFacultyEvals < $requirements['facultyEvaluations']) {

					$requestsNeeded = $requirements['evaluationRequests'] - $monthRequests;
					$facultyEvalsNeeded = $requirements['facultyEvaluations'] - $monthFacultyEvals;

					$data = compact(
						'requirements',
						'resident',
						'monthRequests',
						'monthFacultyEvals',
						'requestsNeeded',
						'facultyEvalsNeeded'
					);

					Mail::send('emails.reminders.resident', $data, function($message) use ($resident) {
						$message->from('reminders@residentprogram.com', 'ResidentProgram Reminders')
							->to($resident->email)
							->replyTo(config('app.admin_email'))
							->subject('Your monthly reminder');
					});

					$success[] = $resident;

					if (config('app.env') != 'production')
						sleep(1);
				} else {
					$notNeeded[] = $resident;
				}
			} catch (\Exception $e) {
				$fail[] = $resident;
				Log::error($e);
			}

			$progress->advance();
		}

		$progress->finish();

		$numNotNeeded = count($notNeeded);
		$numSuccessful = count($success);
		$numFailed = count($fail);

		$this->info("\n\nDone!\n");

		$this->info("Successful:\t\t{$numSuccessful}");

		if ($numNotNeeded > 0)
			$this->info("Not needed:\t\t{$numNotNeeded}");

		if ($numFailed > 0)
			$this->error("Failed:\t\t{$numFailed}");
    }
}
