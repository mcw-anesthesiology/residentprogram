<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Helpers\DateHelpers;

use App\Scopes\MeritReportScope;

class MeritReport extends Model
{
	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new MeritReportScope);
	}

    protected $table = 'merit_reports';

	protected $casts = [
		'id' => 'integer',
		'user_id' => 'integer',
		'form_id' => 'integer',
		'report' => 'array'
	];

	protected $fillable = [
		'user_id',
		'form_id',
		'period_start',
		'period_end',
		'report',
		'status'
	];

	protected $dates = [
		'period_start',
		'period_end',
		'created_at',
		'updated_at'
	];

	public function getReportAttribute($report) {
		if (empty($report)) {
			$report = $this->form->form;
		}

		return json_decode($report);
	}

	public function user() {
		return $this->belongsTo('App\User');
	}

	public function form() {
		return $this->belongsTo('App\MeritReportForm', 'form_id');
	}

	public function revisions() {
		return $this->hasMany('App\MeritReportRevision', 'merit_report_id');
	}

	public static function getCurrentYear() {
		return DateHelpers::getDateRangeFromPeriodType('year');
	}
}
