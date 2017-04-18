<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MilestoneLevel extends Model
{
	protected $table = "milestone_levels";

	protected $casts = [
		"id" => "integer",
		"milestone_id" => "integer",
		"level_number" => "integer"
	];

	protected $fillable = ["milestone_id", "level_number"];

	public function milestone(){
		return $this->belongsTo("App\Milestone");
	}
}
