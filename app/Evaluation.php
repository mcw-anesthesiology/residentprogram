<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $table = "evaluations";

    protected $fillable = [
        "form_id",
        "evaluator_id",
        "subject_id",
        "requested_by_id",
        "status",
        "training_level",
        "request_date",
        "complete_date",
        "evaluation_date",
        "archive_date",
        "request_ip",
        "complete_ip"
    ];

    public function evaluator(){
        return $this->belongsTo("App\User", "evaluator_id");
    }

    public function subject(){
        return $this->belongsTo("App\User", "subject_id");
    }

    public function requestedBy(){
        return $this->belongsTo("App\User", "requested_by_id");
    }

    public function form(){
        return $this->belongsTo("App\Form");
    }

    public function responses(){
        return $this->hasMany("App\Response");
    }

    public function textResponses(){
        return $this->hasMany("App\TextResponse");
    }
}
