<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeritReport extends Model
{
    protected $table = 'merit_reports';
	
	protected $casts = [
		'id' => 'integer',
		'user_id' => 'integer',
		'report' => 'array'
	];
	
	protected $fillable = [
		'user_id',
		'period_start',
		'period_end',
		'report'
	];
	
	protected $dates = [
		'period_start',
		'period_end',
		'created_at',
		'updated_at'
	];
	
	public function user() {
		return $this->belongsTo('App\User');
	}
}
