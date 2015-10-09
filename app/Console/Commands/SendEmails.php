<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\User;
use Mail;
use Log;

class SendEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emails:send {frequency}';

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
        $frequency = $this->argument("frequency");
        $data = compact("frequency");
        $users = User::where("type", "faculty")->where("status", "active")->where("reminder_frequency", $frequency)->with("evaluatorEvaluations")->get();
        foreach($users as $emailUser){
            try{
                $numPending = $emailUser->evaluatorEvaluations->where("status", "pending")->count();
				if($emailUser->remind_only_if_pending && $emailUser->remind_only_if_pending == "yes" && $numPending == 0){
					continue;
				}
                $data["numPending"] = $numPending;
                Mail::send("emails.reminder", $data, function($message) use ($emailUser){
                    $message->from("reminders@residentprogram.com", "ResidentProgram Reminders");
                    $message->to($emailUser->email);
                    // $message->replyTo(env("ADMIN_EMAIL"));
                    $message->subject("Evaluation Reminder");
                });
            }
            catch(\Exception $e){
                Log::error($e);
            }
        }
    }
}
