<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CaseLogDetailsSchema extends Model
{
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
			foreach($schema as $sectionTitle => $section){
				foreach($section as $subsectionTitle => $subsection){
					foreach($subsection as $index => $item){
						if($item["type"] == "checkbox"){
							$itemValue = $details[$sectionTitle][$subsectionTitle][$index]["value"];
							if(in_array($itemValue, ["0", "1"]))
							$schema[$sectionTitle][$subsectionTitle][$index]["value"] = $itemValue;
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
