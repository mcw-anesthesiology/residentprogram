<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use JsonSchema\SchemaStorage;
use JsonSchema\Validator;
use JsonSchema\Constraints\Factory;

use App\Helpers\QuestionnaireValidation;

use Log;

class CaseLogDetailsSchema extends Model
{
	use SoftDeletes;

	protected $table = "case_log_details_schemas";

	protected $fillable = [
		"details_type",
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
		return ($this->case_log_version == 2)
			? self::validateToSchema($details)
				&& QuestionnaireValidation::questionnaireIsValid($details)
			: self::verifyDetails($details, $this->schema);
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
		} catch (\Exception $e) {
			Log::error("Problem verifying Case Log details: " . $e);
		}

		return false;
	}

	public static function validateToSchema($input) {
		// Convert assoc arrays to objects
		$input = json_decode(json_encode($input));

		$schemaPrefix = 'https://www.residentprogram.com/schemas';
		$primarySchema = 'case-log-details';
		$additionalSchemas = [
			'questionnaire'
		];
		$schemas = array_merge([$primarySchema], $additionalSchemas);

		$schemaStorage = new SchemaStorage();
		foreach ($schemas as $schema) {
			$schemaStorage->addSchema(
				"{$schemaPrefix}/{$schema}.json",
				self::getSchemaContents($schema)
			);
		}

		$validator = new Validator(new Factory($schemaStorage));
		$validator->check($input, self::getSchemaContents($primarySchema));

		$valid = $validator->isValid();

		if (!$valid) {
			Log::debug('Schema invalid:');
			Log::debug($input);
			Log::debug($validator->getErrors());
		}

		return $valid;
	}

	public static function getSchemaContents($schema) {
		return json_decode(file_get_contents(resource_path(
			"assets/schemas/{$schema}.json"
		)));
	}
}
