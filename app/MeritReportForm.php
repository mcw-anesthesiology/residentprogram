<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeritReportForm extends Model
{
    protected $table = 'merit_reports_forms';
	
	protected $fillable = [
		'name',
		'version',
		'form'
	];
	
	protected $casts = [
		'id' => 'integer',
		'version' => 'integer',
		'form' => 'array'
	];
	
	protected $dates = [
		'created_at',
		'updated_at'
	];
}
