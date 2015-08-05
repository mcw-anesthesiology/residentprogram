<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competency extends Model
{
    protected $table = "competencies";

    protected $fillable = ["title", "description"];

    public function forms(){
        return $this->belongsToMany("App\Form", "competencies_questions");
    }
}
