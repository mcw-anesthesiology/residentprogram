<?php

namespace App\Helpers;

use App\User;

class Importer {
	static function importPagerDirectory($filename){
        $users = User::where("status", "active")->get();
		$file = fopen($filename, "r");
        $csv = fgetcsv($file);
        $userNames = [];
        foreach($users as $user){
            $userNames[$user->id] = preg_replace("/\W/", "", strtolower($user->last_name.substr($user->first_name, 0, 1)));
        }

        $matches = 0;
		while(($row = fgetcsv($file)) !== false){
            $rowName = preg_replace("/\W/", "", strtolower($row[1].substr($row[0], 0, 1)));
            if(in_array($rowName, $userNames)){
                $user = $users->find(array_search($rowName, $userNames));
                $user->pager = preg_replace("/[^\d]/", "", $row[2]);
                $user->save();
				$matches++;
                echo $user->full_name, "\n";
            }
        }
		fclose($file);
		echo "\nMatches: " . $matches;
    }
}
