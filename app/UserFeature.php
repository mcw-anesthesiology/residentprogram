<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserFeature extends Model
{
    protected $table = "user_features";

	protected $fillable = [
		"feature",
		"user_id",
		"user_type",
		"user_training_level",
		"user_secondary_training_level"
	];

	public function user(){
		return $this->belongsTo("App\User");
	}
}
