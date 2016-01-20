<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $table = "blocks";

    protected $casts = [
        "id" => "integer",
        "block_number" => "integer"
    ];

    protected $fillable = ["year", "block_number", "block_name", "start_date", "end_date"];

    public function assignments(){
        return $this->hasMany("App\BlockAssignment");
    }
}
