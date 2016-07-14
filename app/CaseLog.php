<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\CaseLogScope;

use DB;

class CaseLog extends Model
{
	protected static function boot(){
		parent::boot();

		static::addGlobalScope(new CaseLogScope);
	}

	protected $table = "case_logs";

    protected $fillable = [
		"user_id",
		"location_id",
		"case_date",
		"comment",
		"details_type",
		"details"
	];

	protected $casts = [
		"id" => "integer",
		"details" => "array"
	];

	public function location(){
		return $this->belongsTo("App\Location");
	}
}
