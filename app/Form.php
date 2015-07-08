<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    //
    protected $table = "forms";

    protected $fillable = [
        "title",
        "xml_path",
        "status"
    ];
}
