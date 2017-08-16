<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Carbon\Carbon;

use App\User;

use Mail;
use App\Console\Commands\ExportActiveUsersToCsv;
use App\Console\Commands\ProcessScheduledRequests;
use App\Console\Commands\ChangeFacultyEvalDatesToAcademicYear;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
		\App\Console\Commands\ChangeFacultyEvalDatesToAcademicYear::class,
		\App\Console\Commands\ExportAlumniToCsv::class,
		\App\Console\Commands\ExportActiveUsersToCsv::class,
        \App\Console\Commands\FacultyReminders::class,
		\App\Console\Commands\ProcessScheduledRequests::class,
		\App\Console\Commands\ResidentReminders::class,
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
        // Daily faculty reminder emails
        $schedule->command('send:faculty-reminders daily')
			->daily()->at('08:00');

        // Weekly faculty reminder emails
        $schedule->command('send:faculty-reminders weekly')
			->weekly()->mondays()->at('08:00');

        // Biweekly faculty reminder emails
        $schedule->command('send:faculty-reminders biweekly')
			->weekly()->mondays()->at('08:00')->when(function(){
	            return (Carbon::now()->weekOfYear % 2);
	        });

		// Resident reminder emails a week before end of month
		$schedule->command('send:resident-reminders')
			->daily()->at('08:30')->when(function(){
				$now = Carbon::now();
				return (($now->daysInMonth - $now->day) == 7);
			});

		$schedule->command('advancements:run')->hourly();
		$schedule->command('process:scheduled-requests')->hourly();

		$schedule->command('release:faculty-evals')->daily();
    }
}
