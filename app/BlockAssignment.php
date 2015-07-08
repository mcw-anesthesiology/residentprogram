<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockAssignment extends Model
{
    protected $table = "block_assignments";

    protected $fillable = [
        "block_id",
        "user_id",
        "location"
    ];
}
