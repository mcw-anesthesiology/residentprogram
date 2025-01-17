<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompetencyQuestion extends Model
{
	//
	protected $table = "competencies_questions";

	protected $casts = [
		"id" => "integer",
		"form_id" => "integer",
		"competency_id" => "integer"
	];

	protected $fillable = ["form_id", "question_id", "competency_id"];

	public function form(){
		return $this->belongsTo("App\Form");
	}

	public function competency(){
		return $this->belongsTo("App\Competency");
	}
}
