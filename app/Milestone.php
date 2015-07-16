<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    protected $table = "milestones";

    protected $fillable = ["title", "description"];

    public function forms(){
        return $this->belongsToMany("App\Form", "milestones_questions");
    }
}
