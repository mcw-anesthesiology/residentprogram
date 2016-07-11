<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;

class CaseLog extends Model
{
	protected $table = "case_logs";

    protected $fillable = [
		"user_id",
		"location_id",
		"case_date",
		"details_type",
		"comment"
	];

	protected $hidden = [
		"details_id"
	];

	public function location(){
		return $this->belongsTo("App\Location");
	}

	public function details(){
		return $this->morphTo();
	}
}
