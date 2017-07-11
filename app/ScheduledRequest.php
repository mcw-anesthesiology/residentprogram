<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Evaluation;

use Log;

class ScheduledRequest extends Model
{
	use SoftDeletes;

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
		'request_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'created_at',
		'updated_at',
		'deleted_at'
	];

	protected $fillable = [
		'form_id',
		'evaluator_id',
		'subject_id',
		'requested_by_id',
		'scheduled_date',
		'request_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'schedule_ip',
		'request_type',
		'request_note'
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
		$scheduledRequest->save();

		return $scheduledRequest;
	}

	public function makeRequest() {
		$request = Evaluation::request($this->toArray());
		$this->delete();
	}
}
