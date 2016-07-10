<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\DirectoryEntry;

class DirectoryController extends RestController
{
	public function __construct(){
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			"index", "show"
		]]);
	}

	protected $attributes = [
		"id",
		"first_name",
		"last_name",
		"pager"
	];

	protected $model = \App\DirectoryEntry::class;

	public function csv(Request $request){
		$directory = $this->index($request);

		$csv = "";
		foreach($directory as $entry){
			// dd($entry);
			// dd($entry->toArray());
			// dd(array_only($entry->toArray(), ["first_name", "last_name", "pager"]));
            $csv .= implode(",", array_only($entry->toArray(), ["first_name", "last_name", "pager"])) . "\n";
        }

        $response = response($csv)->header("Content-Type", "text/csv");
		if($request->has("download"))
			$response->header("Content-Disposition", "attachment; filename='ipage.csv'");
		return $response;
	}
}
