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
}
