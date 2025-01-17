<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\User;
use Mail;
use Log;

class FacultyReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:faculty-reminders {frequency}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends reminder emails to faculty.';

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
        $frequency = $this->argument('frequency');
        $data = compact('frequency');
        $users = User::where('type', 'faculty')->where('status', 'active')
			->where('reminder_frequency', $frequency)
			->with(
				'evaluatorEvaluations',
				'evaluatorEvaluations.form',
				'evaluatorEvaluations.subject'
			)->get();

        foreach($users as $emailUser){
            try {
				$pendingEvals = $emailUser->evaluatorEvaluations->where('status', 'pending');

				$preferHashLinks = $emailUser->getSetting('preferHashLinks');
				if (!empty($preferHashLinks) && $preferHashLinks == 'yes') {
					foreach ($pendingEvals as &$eval) {
						if (!$eval->has_valid_hash_link) {
							$eval->createHashLink();
						}
					}
				}

				$pendingEvals = [
					'resident' => $pendingEvals->filter(function($eval){
						return $eval->form->type == 'resident';
					}),
					'fellow' => $pendingEvals->filter(function($eval){
						return $eval->form->type == 'fellow';
					}),
					'total' => $pendingEvals
				];

				$numPending = $pendingEvals['total']->count();
				// Not sure why this is required, but it seemed to have been
				// empty but not zero at least once?
				if (empty($numPending))
					$numPending = 0;

				if($emailUser->remind_only_if_pending
						&& $emailUser->remind_only_if_pending == 'yes'
						&& $numPending == 0)
					continue;

				$data = compact('frequency', 'pendingEvals', 'emailUser',
					'numPending');

                Mail::send('emails.reminders.faculty', $data, function($message) use ($emailUser){
                    $message->from('reminders@residentprogram.com', 'ResidentProgram Reminders');
                    $message->to($emailUser->email);
                    $message->replyTo(config('app.admin_email'));
                    $message->subject('Evaluation Reminder');
                });

				if(config('app.env') != 'production')
					sleep(1);
            }
            catch(\Exception $e){
                Log::error($e);
            }
        }
    }
}
