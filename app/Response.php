<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $table = "responses";

    protected $fillable = ["evaluation_id", "question_id", "response", "weight"];

    public function evaluation(){
        return $this->belongsTo("App\Evaluation");
    }

    public function milestoneQuestion(){
        return $this->hasMany("App\MilestoneQuestion", "question_id", "question_id")->where("form_id", $this->evaluation->form);
    }

    // public function milestones(){
    //     $form = $this->evaluation->form_id;
    //     $question_id = $this->question_id;
    //     return $this->
    // }
}
