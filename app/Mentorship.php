<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mentorship extends Model
{
    //
    protected $table = "mentorships";

    protected $fillable = ["mentor_id", "mentee_id", "status"];
}
