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
			"index", "store", "show", 'update', 'destroy'
		]]);
		$this->middleware('site-feature:case_log');
		$this->middleware("case-log.has-access");

		$this->middleware(function ($request, $next) {
			$user = Auth::user();
			if ($user->isType('admin'))
				return $next($request);

			$caseLogId = $request->route()->parameters()['case_log'];
			$caseLog = CaseLog::findOrFail($caseLogId);
			if ($user->id == $caseLog->user_id)
				return $next($request);

			return response('Not allowed.', 403);
		})->only(['update', 'destroy']);
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

	public function update(Request $request, $id) {
		$user = Auth::user();
		$input = $request->all();

		$detailsSchema = CaseLogDetailsSchema::withTrashed()
			->find($input["details_schema_id"]);

		if(!$detailsSchema->verify($input["details"]))
			throw new \DomainException("Details does not match schema");

		$caseLog = CaseLog::where('id', $id)
			->where('user_id', $user->id)
			->firstOrFail();

		$caseLog->update($input);

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function byUser() {
		return User::with('caseLogs')->has('caseLogs')->all();
	}
}
