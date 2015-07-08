<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    //
    protected $table = "blocks";

    protected $fillable = [
        "year",
        "block_number",
        "block_name",
        "start_date",
        "end_date"    
    ];
}
