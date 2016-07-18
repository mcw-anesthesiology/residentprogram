<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Auth;

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
		"location"
	];

	protected $attributes = [
		"case_date",
		"details_type",
		"comment"
	];


	protected $model = \App\CaseLog::class;

	public function store(Request $request){
		$user = Auth::user();
		$input = $request->all();

		$detailsSchema = CaseLogDetailsSchema::withTrashed()
			->where("details_type", $input["details_type"])
			->where("version", $input["version"])->first();

		if(!$detailsSchema->verify($input["details"]))
			throw new \DomainException("Details does not match schema");

		$input["user_id"] = $user->id;
		CaseLog::create($input);

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
