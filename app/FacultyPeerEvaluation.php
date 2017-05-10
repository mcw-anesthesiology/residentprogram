<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

use Hashids;
use Log;
use Mail;

class FacultyPeerEvaluation extends Model
{
    protected $table = 'faculty_peer_evaluations';

	protected $casts = [
		'id' => 'integer',
		'form_id' => 'integer',
		'subject_id' => 'integer',
		'contents' => 'array'
	];

	protected $dates = [
		'evaluation_date_start',
		'evaluation_date_end',
		'created_at',
		'updated_at',
		'deleted_at'
	];

	protected $userHidden = [
		'evaluator_email',
		'hash',
		'hash_expires',
		'request_ip',
		'complete_ip',
		'created_at',
		'updated_at',
		'deleted_at'
	];

	public function getIdAttribute($id) {
		return Hashids::encode($id);
	}

	public function subject() {
		return $this->belongsTo('App\User', 'subject_id');
	}

	public function form() {
		return $this->belongsTo('App\FacultyPeerForm', 'form_id');
	}

	public function sendHashLink() {
		try{
			if($this->status != 'pending')
				throw new \Exception('Evaluation already complete');
			if(empty($this->hash))
				throw new \Exception('No hash');
			$email = $this->evaluator_email;
			$data = [
				'evaluationHash' => $this->hash,
				'hashExpires' => Carbon::parse($this->hash_expires)->toFormattedDateString(),
				'subjectLast' => $this->subject->last_name,
				'formTitle' => $this->form->title
			];
			Mail::send('emails.faculty360.hash-link', $data, function($message) use($email){
				$message->to($email);
				$message->from('notifications@residentprogram.com', 'Resident Program Notifications');
				$message->replyTo(config('app.admin_email'));
				$message->subject('Evaluation Completion Link');
			});
		}
		catch (\Exception $e){
			Log::error('Problem sending hash link: ' . $e);
			throw $e;
		}

		return true;
	}

	public function scopeByHash($query, $hash) {
		return $query->where('hash', $hash)
			->where('hash_expires', '>', Carbon::now())
			->where('status', 'pending'); // ?
	}

	public function hideFields() {
		$this->addHidden($this->userHidden);
	}
}
