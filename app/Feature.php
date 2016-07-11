<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $table = "features";

	protected $fillable = [
		"name"
	];

	public function users(){
		return $this->belongsToMany("App\User", "user_features");
	}
}
