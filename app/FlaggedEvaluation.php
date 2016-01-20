<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FlaggedEvaluation extends Model
{
    protected $table = "flagged_evaluations";

	protected $fillable = [
		"evaluation_id",
		"requested_action",
		"reason"
	];

    protected $casts = [
        "id" => "integer",
        "evaluation_id" => "integer"
    ];

	protected $dates = ["created_at", "updated_at"];

	public function evaluation(){
		return $this->belongsTo("App\Evaluation");
	}
}
