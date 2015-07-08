<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competency extends Model
{
    //
    protected $table = "competencies";

    protected $fillable = [
        "title",
        "description"
    ];
}
