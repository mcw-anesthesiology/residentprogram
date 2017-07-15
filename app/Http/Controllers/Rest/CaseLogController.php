<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Auth;
use Log;

use App\CaseLog;
use App\CaseLogDetailsSchema;

class CaseLogController extends RestController
{

	public function __construct(){
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			"index", "store", "show"
		]]);
		$this->middleware("case-log.has-access");
	}

	protected $relationships = [
		"user",
		"location",
		"detailsSchema"
	];

	protected $attributes = [
		"case_date",
		"details_schema_id",
		"comment"
	];


	protected $model = \App\CaseLog::class;

	public function store(Request $request){
		$user = Auth::user();
		$input = $request->all();

		$detailsSchema = CaseLogDetailsSchema::withTrashed()
			->find($input["details_schema_id"]);

		if(!$detailsSchema->verify($input["details"]))
			throw new \DomainException("Details does not match schema");

		$input["user_id"] = $user->id;
		CaseLog::create($input);

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function byUser() {
		return User::with('caseLogs')->has('caseLogs')->all();
	}
}
