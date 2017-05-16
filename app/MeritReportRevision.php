<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeritReportRevision extends Model
{
    protected $table = 'merit_report_revisions';

	protected $casts = [
		'id' => 'integer',
		'merit_report_id' => 'integer',
		'changed_by' => 'integer',

		'old_report' => 'array',
		'new_report' => 'array'
	];

	protected $dates = [
		'created_at',
		'updated_at'
	];

	protected $fillable = [
		'merit_report_id',
		'changed_by',
		'old_status',
		'new_status',
		'old_report',
		'new_report'
	];

	public function report() {
		return $this->belongsTo('App\MeritReport', 'id', 'merit_report_id');
	}

	public function changer() {
		return $this->belongsTo('App\User', 'id', 'changed_by');
	}
}
