<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected $table = 'user_settings';

	protected $fillable = [
		'user_id',
		'name',
		'value'
	];

	protected $casts = [
		'id' => 'integer',
		'user_id' => 'integer'
	];

	public function user() {
		return $this->belongsTo('App\User', 'user_id');
	}
}
