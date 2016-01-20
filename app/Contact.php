<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = "contact";

    protected $casts = [
        "id" => "integer",
        "user_id" => "integer"
    ];

    protected $fillable = ["user_id", "subject", "body"];

    protected $hidden = [];
}
