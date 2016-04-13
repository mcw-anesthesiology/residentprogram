<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alum extends Model
{
    protected $table = "alumni";

    protected $fillable = [
        "last_name",
        "first_name",
        "email",
        "address",
        "address_2",
        "city",
        "state",
        "zip",
        "country",
        "employer",
        "graduation_date",
        "notes"
    ];

    protected $casts = [
        "id" => "integer"
    ];

    protected $dates = [
        "graduation_date"
    ];

    public function sendEmail($text){
        // TODO
    }
}
