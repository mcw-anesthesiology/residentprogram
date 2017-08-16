<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use File;
use Storage;

use App\User;

class ExportActiveUsersToCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'export:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        $users = User::active()->get()->toArray();
		$date = Carbon::now()->toDateTimeString();

		$userPath = 'app/users';
		$path = "{$userPath}/{$date}.csv";
		$storagePath = storage_path($path);

		if (!File::exists(storage_path($userPath)))
			File::makeDirectory(storage_path($userPath));

		$csv = fopen($storagePath, 'w');

		fputcsv($csv, array_keys($users[0]));

		foreach ($users as $user) {
			fputcsv($csv, array_values($user));
		}

		fclose($csv);
    }
}
