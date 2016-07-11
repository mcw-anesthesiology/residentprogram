<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnesthesiaAnalgesiaType extends Model
{
    protected $table = "anesthesia_analgesia_types";

	protected $fillable = [
		"type",
		"name"
	];
}
