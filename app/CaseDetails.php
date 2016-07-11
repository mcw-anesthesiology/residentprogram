<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CaseDetails extends Model
{
    protected $table = "case_details";

	protected $fillable = [
		"case_id"
	];

	protected $hidden = [
		"created_at",
		"updated_at"
	];

	public function case(){
		return $this->morphOne("App\CaseLog", "case_logs");
	}
}
