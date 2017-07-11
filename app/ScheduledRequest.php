<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduledRequest extends Model
{
    protected $table = 'scheduled_requests';

	protected $casts = [
		'id' => 'integer',
		'form_id' => 'integer',
		'evaluator_id' => 'integer',
		'subject_id' => 'integer',
		'scheduled_by_id' => 'integer'
	];

	protected $dates = [
		'scheduled_date',
		'scheduled_for_date',
		'evaluation_date_start',
		'evaluation_date_end'
	];

	protected $fillable = [
		'form_id',
		'evaluator_id',
		'subject_id',
		'requested_by_id',
		'scheduled_date',
		'scheduled_for_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'schedule_ip',
		'request_type'
	];

	public function evaluator() {
		return $this->belongsTo('App\User', 'evaluator_id');
	}

	public function subject() {
		return $this->belongsTo('App\User', 'subject_id');
	}

	public function requestor() {
		return $this->belongsTo('App\User', 'requested_by_id');
	}

	public function form() {
		return $this->belongsTo('App\Form');
	}

	public static function schedule($values) {
		$scheduledRequest = new ScheduledRequest($values);

		return $scheduledRequest;
	}

	public function makeRequest() {
		$request = App\Evaluation::request($this->toArray());
	}
}
