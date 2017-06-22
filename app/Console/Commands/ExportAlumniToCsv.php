<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;

use File;
use Storage;

use App\Alum;

class ExportAlumniToCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'export:alumni';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export alumni to CSV';

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


		$alumni = Alum::all()->toArray();
		$date = Carbon::now()->toDateTimeString();
		$alumniPath = 'app/alumni';
		$path = "{$alumniPath}/{$date}.csv";
		$storagePath = storage_path($path);

		if (!File::exists(storage_path($alumniPath)))
			File::makeDirectory(storage_path($alumniPath));

		$csv = fopen($storagePath, 'w');

		fputcsv($csv, array_keys($alumni[0]));

		foreach ($alumni as $alum) {
			fputcsv($csv, array_values($alum));
		}

		fclose($csv);
    }
}
