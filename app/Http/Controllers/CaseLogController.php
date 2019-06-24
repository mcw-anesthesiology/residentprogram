<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;

use App\CaseLogDetailsSchema;
use App\Location;

class CaseLogController extends Controller {
    public function __construct() {
		$this->middleware([
			'auth',
			'shared',
			'site-feature:case_log',
			'active'
		]);

		$this->middleware('case-log.has-access')->only('caseLog');
		$this->middleware('type:admin')->only('manage');
	}

	public function caseLog(Request $request) {
		$user = Auth::user();
		$title = "RAAPS"; // FIXME
		$detailsType = "raaps"; // FIXME
		$locations = Location::all();
		$canLog = false;

		// TODO: Only show when canLog
		$detailsSchema = CaseLogDetailsSchema::where("details_type", $detailsType)
			->orderBy("version", "desc")->first();
		if ($user->isType("resident")) {
			$canLog = true;

		}

		$data = compact("locations", "canLog", "detailsSchema", "title");

		return view("case-log.case-log", $data);
	}

	public function manage(Request $request){
		$schemas = CaseLogDetailsSchema::all()->groupBy("details_type")
			->transform(function($typeSchemas){
				return $typeSchemas->sortByDesc('version')->values()
					->map(function($schema) {
						// Add JSON version of schema as form
						$schema['form'] = json_encode($schema['schema'], JSON_PRETTY_PRINT);
						return $schema;
					})->toArray();
			});
		$newVersions = $schemas->map(function($schemas){
			return collect($schemas)->max("version") + 1;
		});

		$data = compact("schemas", "newVersions");

		return view("manage.case-log", $data);
	}
}
