<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlockadeSite extends Model
{
    protected $table = "blockade_sites";

	protected $fillable = [
		"type",
		"name"
	];
}
