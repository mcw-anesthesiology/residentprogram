<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $table = "forms";

    protected $fillable = ["title", "xml_path", "status"];

    public function evaluations(){
        return $this->hasMany("App\Evaluation");
    }

    public function milestones(){
        return $this->belongsToMany("App\Milestone", "milestones_questions");
    }

    public function competencies(){
        return $this->belongsToMany("App\Competency", "competencies_questions");
    }
}
