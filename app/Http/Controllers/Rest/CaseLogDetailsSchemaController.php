<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use JsonSchema\RefResolver;
use JsonSchema\Uri\UriRetriever;
use JsonSchema\Uri\UriResolver;
use JsonSchema\Validator;

use App\CaseLogDetailsSchema;

class CaseLogDetailsSchemaController extends RestController
{

	public function __construct() {
		$this->middleware([
			'auth',
			'type:admin',
			'site-feature:case_log'
		]);
	}

	protected $attributes = [
		"id",
		"details_type",
		"version"
	];

	protected $model = \App\CaseLogDetailsSchema::class;

	public function store(Request $request){
		$input = $request->all();
		$input["schema"] = json_decode($input["schema"]);

		$oldSchema = CaseLogDetailsSchema::where('details_type', $input['details_type'])
			->orderBy('version', 'desc')->firstOrFail();
		$newVersion = $oldSchema->version + 1;


		$schemaPath = resource_path("assets/schemas/case-log-details.json");
		$refResolver = new RefResolver(new UriRetriever(), new UriResolver());
		$schema = $refResolver->resolve("file://" . realpath($schemaPath));
		$validator = new Validator();
		$validator->check($input["schema"], $schema);
		if(!$validator->isValid())
			throw new \Exception("Details do not match schema");

		$schema = new CaseLogDetailsSchema($input);
		$schema->case_log_version = 2;
		$schema->version = $newVersion;
		$schema->save();
		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function destroyByType(Request $request, $type){
		CaseLogDetailsSchema::where("details_type", $type)->delete();

		if($request->ajax())
			return "success";
		else
			return back();
	}

}
