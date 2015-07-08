<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TextResponse extends Model
{
    //
    protected $table = "text_responses";

    protected $fillable = [
        "evaluation_id",
        "question_id",
        "response"
    ];
}
