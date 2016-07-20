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

	public function caseLogs(){
		return $this->hasMany("App\CaseLog", "details_schema_id");
	}

	public function verify($details){
		return $this->verifyDetails($details, $this->schema);
	}

	public static function verifyDetails($details, $schema){
		try {
			$names = [];
			foreach($schema as $section){
				foreach($section["subsections"] as $subsection){
					$names[] = $subsection["name"];
				}
			}

			foreach($details as $name => $values){
				if(!in_array($name, $names))
					throw new \DomainException();
			}

			return true;
		} catch(\DomainException $e){
			return false;
		} catch(\Exception $e){
			Log::error("Problem verifying Case Log details: " . $e);
			return false;
		}
	}
}
