<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
	use SoftDeletes;

    protected $table = "locations";

	protected $fillable = [
		"name"
	];

	protected $dates = [
		"created_at",
		"updated_at",
		"deleted_at"
	];

	public function cases(){
		return $this->hasMany("App\CaseLog");
	}
}
