<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Log;

class CaseLogDetailsSchema extends Model
{
	use SoftDeletes;

	protected $table = "case_log_details_schemas";

	protected $fillable = [
		"details_type",
		"version",
		"schema"
	];

	protected $casts = [
		"id" => "integer",
		"version", "integer",
		"schema" => "array"
	];

	public function verify($details){
		return $this->verifyDetails($details, $this->schema);
	}

	public static function verifyDetails($details, $schema){
		try {
			foreach($schema as $sectionIndex => $section){
				foreach($section["subsections"] as $subsectionIndex => $subsection){
					foreach($subsection["inputs"] as $inputIndex => $input){
						if($input["type"] == "checkbox"){
							$inputValue = $details[$sectionIndex]["subsections"][$subsectionIndex]["inputs"][$inputIndex]["value"];
							if(in_array($inputValue, ["0", "1"]))
								$schema[$sectionIndex]["subsections"][$subsectionIndex]["inputs"][$inputIndex]["value"] = $inputValue;
						}
					}
				}
			}

			return json_encode($details) == json_encode($schema);
		} catch(\Exception $e){
			Log::error("Problem verifying Case Log details: " . $e);
			return false;
		}
	}
}
