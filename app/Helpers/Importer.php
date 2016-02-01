<?php

namespace App\Helpers;

use App\DirectoryEntry;

class Importer {
	static function importPagerDirectory($filename){
		DirectoryEntry::truncate();
		$file = fopen($filename, "r");

		while(($row = fgetcsv($file)) !== false){
            $entry = new DirectoryEntry();
			$entry->first_name = $row[0];
			$entry->last_name = $row[1];
			$entry->pager = $row[2];
			$entry->save();
        }
		fclose($file);
    }
}
