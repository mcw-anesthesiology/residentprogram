<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model {
	protected $table = 'user_groups';

	protected $fillable = ['name'];

	public function users() {
		return $this->belongsToMany('App\User', 'user_user_groups');
	}
}
