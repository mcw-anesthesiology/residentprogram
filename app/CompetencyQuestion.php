<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompetencyQuestion extends Model
{
    //
    protected $table = "competencies_questions";

    protected $fillable = [
        "form_id",
        "question_id",
        "competency_id"
    ];
}
