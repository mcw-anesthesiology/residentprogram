<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Carbon\Carbon;

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
		\App\Console\Commands\ReleaseFacultyEvals::class,
		\App\Console\Commands\Release360Evals::class,
		\App\Console\Commands\SendPairingReports::class,
		\App\Console\Commands\CancelInactiveUserRequests::class,
		\App\Console\Commands\CancelFellowResidentRequests::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
		$schedule->command('advancements:run')->hourly();
		$schedule->command('process:scheduled-requests')->hourly();

		$schedule->command('release:faculty-evals')->monthly();
		$schedule->command('release:360-evals')->monthly();
    }
}
