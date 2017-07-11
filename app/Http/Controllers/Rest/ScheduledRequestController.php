<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

class ScheduledRequestController extends RestController
{
    public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin');
	}

	protected $relationships = [
		'form',
		'evaluator',
		'subject',
		'requestor'
	];

	protected $attributes = [
		'id',
		'form_id',
		'evaluator_id',
		'subject_id',
		'requested_by_id',
		'scheduled_date',
		'request_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'request_ip',
		'request_type',
		'send_hash',
		'hash_expires_in',
		'force_notification',
		'request_note'
	];

	protected $model = \App\ScheduledRequest::class;
}
