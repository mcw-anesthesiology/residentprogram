<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockAssignment extends Model
{
    protected $table = "block_assignments";

    protected $casts = [
        "id" => "integer",
        "block_id" => "integer",
        "user_id" => "integer"
    ];

    protected $fillable = ["block_id", "user_id", "location"];

    public function block(){
        return $this->belongsTo("App\Block");
    }

    public function user(){
        return $this->belongsTo("App\User");
    }
}
