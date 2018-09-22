<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Scopes\CaseLogScope;

use DB;

class CaseLog extends Model
{

	use SoftDeletes;

	protected static function boot(){
		parent::boot();

		static::addGlobalScope(new CaseLogScope());
	}

	protected $table = "case_logs";

	protected $fillable = [
		"user_id",
		"location_id",
		"case_date",
		"comment",
		"details_schema_id",
		"details"
	];

	protected $casts = [
		"id" => "integer",
		"details" => "array"
	];

	public function location(){
		return $this->belongsTo("App\Location");
	}

	public function user(){
		return $this->belongsTo("App\User");
	}

	public function detailsSchema(){
		return $this->belongsTo("App\CaseLogDetailsSchema", "details_schema_id");
	}
}
