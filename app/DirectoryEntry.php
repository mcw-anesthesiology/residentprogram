<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DirectoryEntry extends Model
{
	use SoftDeletes;

	protected $table = "directory";

	protected $dates = ["created_at", "updated_at", "deleted_at"];

	protected $fillable = [
		"first_name",
		"last_name",
		"pager"
	];

	protected $hidden = ["created_at", "updated_at", "deleted_at"];
}
