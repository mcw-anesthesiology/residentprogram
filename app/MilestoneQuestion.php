<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MilestoneQuestion extends Model
{
    //
    protected $table = "milestones_questions";

    protected $fillable = [
        "form_id",
        "question_id",
        "milestone_id"
    ];
}
