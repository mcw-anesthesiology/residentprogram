<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hashids;

class TextResponse extends Model
{
	protected $table = "text_responses";

	protected $casts = [
		"id" => "integer",
		"evaluation_id" => "integer",
		"response" => "string"
	];

	protected $fillable = ["evaluation_id", "question_id", "response"];

	private $hashids = false;

	public function getEvaluationIdAttribute($evalId){
		if($this->hashids)
			return Hashids::encode($evalId);

		return $evalId;
	}

	public function evaluation(){
		return $this->belongsTo("App\Evaluation");
	}

	public function hashEvaluationId(){
		$this->hashids = true;
	}
}
