<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Auth;

use App\CaseLog;

class CaseLogController extends RestController
{

	public function __construct(){
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			"index", "create", "show"
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

	public function create(Request $request){
		$user = Auth::user();
		$input = $request->all();

		$input["user_id"] = $user->id;
		CaseLog::create($input);

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
