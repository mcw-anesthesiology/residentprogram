<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\EvaluationScope;

use Carbon\Carbon;

use Auth;
use Debugbar;
use Hashids;
use Log;
use Mail;

class Evaluation extends Model
{
	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new EvaluationScope);
	}

	protected $table = 'evaluations';

	protected $casts = [
		'id' => 'integer',
		'form_id' => 'integer',
		'evaluator_id' => 'integer',
		'subject_id' => 'integer',
		'requested_by_id' => 'integer'
	];

	protected $fillable = [
		'form_id',
		'evaluator_id',
		'subject_id',
		'requested_by_id',
		'status',
		'training_level',
		'request_date',
		'complete_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'archive_date',
		'request_ip',
		'complete_ip'
	];

	protected $dates = [
		'request_date',
		'complete_date',
		'evaluation_date_start',
		'evaluation_date_end',
		'archive_date',
		'hash_expires'
	];

	protected $hidden = [
		'created_at',
		'updated_at',
		'original_id'
	];

	protected $userHidden = [ // Fields hidden to non-admins
		'archive_date',
		'request_ip',
		'complete_ip',
		'comment',
		'completion_hash',
		'hash_expires',
		'flag'
	];

	protected $appends = ['url'];

	private $showAll = false;
	private $hashids = false;

	public static function request($values) {
		$eval = new Evaluation($values);

		$eval->training_level = $eval->subject->training_level;
		$eval->status = 'pending';

		// Hide faculty evals from their subjects by default
		if ($values['request_type'] == 'faculty')
			$eval->visibility = 'under faculty threshold';

		if ($values['send_hash']) {
			$eval->completion_hash = str_random(40);
			$hashExpiresIn = $values['hash_expires_in'];
			$eval->hash_expires = $hashExpiresIn == 'never' ? '9999-12-31' : Carbon::now()->addDays($hashExpiresIn);
		}

		$eval->save();

		if ($values['send_hash'])
			$eval->sendHashLink();

		if (Auth::id() != $values['evaluator_id']) {
			$evaluatorUser = User::withoutGlobalScopes()->find($values['evaluator_id']);
			if (
				!empty($evaluatorUser)
				&& ($values['force_notification'] || $evaluatorUser->notifications == 'yes')
				&& filter_var($evaluatorUser->email, FILTER_VALIDATE_EMAIL)
			) {
				$eval->sendNotification();
			}
		}

		return $eval;
	}

	public function getIdAttribute($id) {
		if($this->hashids)
			return Hashids::encode($id);

		return $id;
	}

	public function getViewableIdAttribute() {
		if($this->isAnonymousToUser())
			return Hashids::encode($this->id);

		return $this->id;
	}

	public function getEvaluatorIdAttribute($evaluatorId) {
		if(Auth::check() && !Auth::user()->isType('admin')
				&& $this->visibility == 'anonymous'
				&& !(Auth::user()->usesFeature('RESIDENT_EVALS')
					&& in_array($this->training_level, [
						'intern',
						'ca-1',
						'ca-2',
						'ca-3'
					]))
				&& Auth::user()->id != $evaluatorId
				&& !$this->showAll)
			return null;

		return $evaluatorId;
	}

	public function getRequestedByIdAttribute($requestedById) {
		if(Auth::check() && !Auth::user()->isType('admin')
				&& $this->visibility == 'anonymous'
				&& !(Auth::user()->usesFeature('RESIDENT_EVALS')
					&& in_array($this->training_level, [
						'intern',
						'ca-1',
						'ca-2',
						'ca-3'
					]))
				&& Auth::user()->id != $requestedById
				&& $this->showAll)
			return null;

		return $requestedById;
	}

	public function getVisibilityAttribute($visibility) {
		if(empty($this->form))
			$this->load('form');
		if(empty($this->form))
			return $visibility;
		return empty($visibility) ? $this->form->visibility : $visibility;
	}

	public function getUrlAttribute() {
		return "<a href='/evaluation/{$this->id}'>{$this->id}</a>";
	}

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

	public function responses() {
		return $this->hasMany('App\Response');
	}

	public function textResponses() {
		return $this->hasMany('App\TextResponse');
	}

	public function flag() {
		return $this->hasOne('App\FlaggedEvaluation');
	}

	public function isAnonymousToUser() {
		return (Auth::check() && !Auth::user()->isType('admin')
				&& in_array($this->visibility, ['anonymous', 'under faculty threshold'])
				&& !(Auth::user()->usesFeature('RESIDENT_EVALS')
					&& in_array($this->training_level, [
						'intern',
						'ca-1',
						'ca-2',
						'ca-3'
					]))
				&& Auth::user()->id != $this->requested_by_id
				&& Auth::user()->id != $this->evaluator_id);
	}

	public function scopeNotHidden($query) {
		return $query->ofVisibility(['visible', 'anonymous']);
	}

	public function scopeOfVisibility($query, $visibilities) {
		if(!is_array($visibilities))
			$visibilities = [$visibilities];
		return $query->where(function($query) use ($visibilities) {
			$query->whereIn('visibility', $visibilities)->orWhere(function($query) use ($visibilities) {
				$query->whereNull('visibility')->whereHas('form', function($query) use ($visibilities) {
					$query->whereIn('visibility', $visibilities);
				});
			});
		});
	}

	public function scopeOfType($query, $type) {
		return $query->whereHas('form', function($innerQuery) use ($type) {
			$innerQuery->where('type', $type);
		});
	}

	public function sendNotification($reminder = false) {
		try {
			$this->showAll = true;

			$email = $this->evaluator->email;

			$data = [
				'evaluation' => $this
			];

			if($reminder) {
				$emailView = 'emails.evaluation-reminder';
				$emailSubject = 'Evaluation Reminder';
			}
			else{
				$emailView = 'emails.notification';
				$emailSubject = 'Evaluation Request Notification';
			}

			Mail::send($emailView, $data, function($message) use($email, $emailSubject) {
				$message->to($email);
				$message->from('notifications@residentprogram.com', 'Resident Program Notifications');
				$message->replyTo(config('app.admin_email'));
				$message->subject($emailSubject);
			});

			$this->showAll = false;

			return true;
		} catch (\Exception $e) {
			Log::error('Problem sending notification: ' . $e);
		}

		$this->showAll = false;
		return false;
	}

	public function sendHashLink() {
		try {
			if($this->status != 'pending')
				throw new \Exception('Evaluation already complete');
			if(empty($this->completion_hash))
				throw new \Exception('No hash');
			$email = $this->evaluator->email;
			$data = [
				'evaluationHash' => $this->completion_hash,
				'hashExpires' => $this->hash_expires,
				'evaluatorName' => $this->evaluator->full_name,
				'subjectLast' => $this->subject->last_name,
				'formTitle' => $this->form->title
			];
			Mail::send('emails.hash-link', $data, function($message) use($email) {
				$message->to($email);
				$message->from('notifications@residentprogram.com', 'Resident Program Notifications');
				$message->replyTo(config('app.admin_email'));
				$message->subject('Evaluation Completion Link');
			});
		} catch (\Exception $e) {
			Log::error('Problem sending hash link: ' . $e);
			throw $e;
		}

		return true;
	}

	public function withoutUserHidden($func) {
		$this->showAll = true;
		$func();
		$this->showAll = false;
	}

	public function hideFields() {
		$user = Auth::user();
		$this->addHidden($this->userHidden);

		if(Auth::user()->usesFeature('RESIDENT_EVALS')
				&& in_array($this->training_level, [
					'intern',
					'ca-1',
					'ca-2',
					'ca-3'
				])) {
			return;
		}

		if($this->isAnonymousToUser()) {
			$this->hashids = true;
			foreach($this->responses as $eval) {
				$eval->hashEvaluationId();
			}
			foreach($this->textResponses as $eval) {
				$eval->hashEvaluationId();
			}
		}

		if($this->isAnonymousToUser() && $this->form->type == 'faculty')
			$this->addHidden([
				'request_date',
				'complete_date'
			]);

		if(!Auth::check() || $user->id != $this->subject_id)
			$this->addHidden('seen_by_subject_at');
		if(!Auth::check() || $user->id != $this->evaluator_id)
			$this->addHidden('seen_by_evaluator_at');

		if($this->status != 'complete')
			$this->addHidden(['responses', 'textResponses']);

		return $this;
	}
}
