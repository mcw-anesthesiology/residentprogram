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

		$detailsSchema = [
			"Anesthesia / Analgesia Type" => [
				[
					["name" => "Epidural", "type" => "checkbox"],
					["name" => "Spinal", "type" => "checkbox"],
					["name" => "CSE", "type" => "checkbox"],
					["name" => "PVB", "type" => "checkbox"]
				],
				"Peripheral" => [
					["name" => "Continuous", "type" => "checkbox"],
					["name" => "Single-shot", "type" => "checkbox"]
				]
			],
			"Blockade Site" => [
				"Neuraxial" => [
					["name" => "Caudal", "type" => "checkbox"],
					["name" => "Cervical", "type" => "checkbox"],
					["name" => "Lumbar", "type" => "checkbox"],
					["name" => "T 1-7", "type" => "checkbox"],
					["name" => "T 8-12", "type" => "checkbox"]
				],
				"Peripheral" => [
					["name" => "Ankle", "type" => "checkbox"],
					["name" => "Axillary", "type" => "checkbox"],
					["name" => "Femoral", "type" => "checkbox"],
					["name" => "Infraclavicular", "type" => "checkbox"],
					["name" => "Interscalene", "type" => "checkbox"],
					["name" => "Lumbar Plexus", "type" => "checkbox"],
					["name" => "Other--per nerve block sit", "type" => "checkbox"],
					["name" => "Paravertebral", "type" => "checkbox"],
					["name" => "Popliteal", "type" => "checkbox"],
					["name" => "Retrobulbar", "type" => "checkbox"],
					["name" => "Saphenous", "type" => "checkbox"],
					["name" => "Sciatic", "type" => "checkbox"],
					["name" => "Supraclavicular", "type" => "checkbox"]
				]
			]
		];

		if(!CaseLog::verifyDetails($input["details"], $detailsSchema));
			throw new \DomainException("Details does not match schema");

		$input["user_id"] = $user->id;
		CaseLog::create($input);

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
