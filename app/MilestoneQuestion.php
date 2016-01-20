<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MilestoneQuestion extends Model
{
    //
    protected $table = "milestones_questions";

    protected $casts = [
        "id" => "integer",
        "form_id" => "integer",
        "milestone_id" => "integer"
    ];

    protected $fillable = ["form_id", "question_id", "milestone_id"];

    public function form(){
        return $this->belongsTo("App\Form");
    }

    public function milestones(){
        return $this->belongsTo("App\Milestone");
    }
}
