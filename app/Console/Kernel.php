<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Carbon\Carbon;

use App\User;

use Mail;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\SendReminders::class,
		\App\Console\Commands\RunAdvancements::class,
		\App\Console\Commands\ReleaseFacultyEvals::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // daily reminder emails
        $schedule->command("reminders:send daily")->daily()->at("08:00");

        // weekly reminder emails
        $schedule->command("reminders:send weekly")->weekly()->mondays()->at("08:00");

        // biweekly reminder emails
        $schedule->command("reminders:send biweekly")->weekly()->mondays()->at("08:00")->when(function(){
            return (Carbon::now()->weekOfYear % 2);
        });

		// Run advancements hourly
		$schedule->command("advancements:run")->hourly();

		$schedule->command("release:faculty-evals")->daily();
    }
}
