<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    protected $table = "milestones";

    protected $casts = [
        "id" => "integer"
    ];

    protected $fillable = ["title", "description"];

    public function forms(){
        return $this->belongsToMany("App\Form", "milestones_questions");
    }

    public function milestonesQuestions(){
        return $this->hasMany("App\MilestonesQuestions");
    }
}
