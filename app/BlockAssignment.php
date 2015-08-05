<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockAssignment extends Model
{
    protected $table = "block_assignments";

    protected $fillable = ["block_id", "user_id", "location"];

    public function block(){
        return $this->belongsTo("App\Block");
    }

    public function user(){
        return $this->belongsTo("App\User");
    }
}
