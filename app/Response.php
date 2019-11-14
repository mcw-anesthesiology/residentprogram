<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;
use Log;

class Response extends Model
{
	protected $table = "responses";

	protected $casts = [
		"id" => "integer",
		"evaluation_id" => "integer",
		"response" => "integer",
		"weight" => "integer"
	];

	protected $fillable = ["evaluation_id", "question_id", "response", "weight"];

	private $hashids = false;

	public function getEvaluationIdAttribute($evalId){
		if ($this->hashids)
			return Hashids::encode($evalId);

		return $evalId;
	}

	public function evaluation(){
		return $this->belongsTo("App\Evaluation");
	}

	public function getFormIdAttribute() {
		if ($this->hashids) {
			$this->hashids = false;
			$evaluation = Evaluation::find($this->evaluation_id);
			$this->hashids = true;

			return $evaluation->form_id;
		} else {
			return $this->evaluation->form_id;
		}
	}

	public function milestoneQuestions(){
		return $this->hasMany("App\MilestoneQuestion", "question_id", "question_id")->where("form_id", $this->form_id);
	}

	public function competencyQuestions(){
		return $this->hasMany("App\CompetencyQuestion", "question_id", "question_id")->where("form_id", $this->form_id);
	}

	public function hashEvaluationId(){
		$this->hashids = true;
	}
}
