<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\CaseLogDetailsSchema;

class CaseLogDetailsSchemaController extends RestController
{

	protected $attributes = [
		"id",
		"details_type",
		"version"
	];

	protected $model = \App\CaseLogDetailsSchema::class;

	public function store(Request $request){
		$input = $request->all();
		$input["schema"] = json_decode($input["schema"]);
		CaseLogDetailsSchema::create($input);
		if($request->ajax())
			return "success";
		else
			return back();
	}

}
