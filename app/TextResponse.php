<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TextResponse extends Model
{
    protected $table = "text_responses";

    protected $casts = [
        "id" => "integer",
        "evaluation_id" => "integer",
        "response" => "string"
    ];

    protected $fillable = ["evaluation_id", "question_id", "response"];

    public function evaluation(){
        return $this->belongsTo("App\Evaluation");
    }
}
