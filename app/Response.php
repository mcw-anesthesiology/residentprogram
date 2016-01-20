<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

    public function evaluation(){
        return $this->belongsTo("App\Evaluation");
    }

    public function milestoneQuestions(){
        return $this->hasMany("App\MilestoneQuestion", "question_id", "question_id")->where("form_id", $this->evaluation->form_id);
    }

    // public function milestones(){
    //     // return $this->MilestoneQuestions->milestone
    // }
}
