<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\MentorshipScope;

class Mentorship extends Model {

	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new MentorshipScope());
	}

	protected $table = "mentorships";

	protected $casts = [
		"id" => "integer",
		"mentor_id" => "integer",
		"mentee_id" => "integer"
	];

	protected $fillable = ["mentor_id", "mentee_id", "status"];

	public function mentor(){
		return $this->belongsTo("App\User", "mentor_id");
	}

	public function mentee(){
		return $this->belongsTo("App\User", "mentee_id");
	}
}
