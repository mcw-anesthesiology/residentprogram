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

    protected $dates = ["created_at", "updated_at", "request_date", "complete_date", "evaluation_date", "archive_date"];


	public function getVisibilityAttribute(){
        return empty($this->attributes["visibility"]) ? $this->form->visibility : $this->attributes["visibility"];
	}

    public function evaluator(){
        return $this->belongsTo("App\User", "evaluator_id");
    }

    public function subject(){
        return $this->belongsTo("App\User", "subject_id");
    }

    public function requestor(){
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

	public function flag(){
		return $this->hasOne("App\FlaggedEvaluation");
	}

    public function scopeNotHidden($query){
        return $query->ofVisibility(["visible", "anonymous"]);
    }

    public function scopeOfVisibility($query, $visibilities){
        if(!is_array($visibilities))
            $visibilities = [$visibilities];
        return $query->where(function($query) use ($visibilities){
            $query->whereIn("visibility", $visibilities)->orWhere(function($query) use ($visibilities){
                $query->whereNull("visibility")->whereHas("form", function($query) use ($visibilities){
                    $query->whereIn("visibility", $visibilities);
                });
            });
        });
    }
}
