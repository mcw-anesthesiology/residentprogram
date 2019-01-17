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
	protected $connection = 'mysql';
	protected $table = 'evaluations';

	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new EvaluationScope);
	}

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
		'complete_ip',
		'hash_expires',
		'request_note'
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

	protected $appends = ['url', 'type'];

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
		if ($this->hashids)
			return Hashids::encode($id);

		return $id;
	}

	public function getViewableIdAttribute() {
		if ($this->isAnonymousToUser())
			return Hashids::encode($this->id);

		return $this->id;
	}

	public function getEvaluatorIdAttribute($evaluatorId) {
		if (
			$this->visibility == 'visible'
			|| (
				Auth::check()
				&& (
					Auth::user()->isType('admin')
					|| Auth::id() == $evaluatorId
					|| (
						!empty($this->requested_by_id)
						&& Auth::id() == $this->requested_by_id
					)
				)
			)
			|| (
				!Auth::check()
				&& (
					app()->runningInConsole()
					|| app()->runningUnitTests()
				)
			)
			|| $this->showAll
		) {
			return $evaluatorId;
		}

		return null;
	}

	public function getRequestedByIdAttribute($requestedById) {
		if (
			$this->visibility == 'visible'
			|| (
				Auth::check()
				&& (
					Auth::user()->isType('admin')
					|| Auth::id() == $requestedById
					|| (
						!empty($this->evaluator_id)
						&& Auth::id() == $this->evaluator_id
					)
				)
			)
			|| (
				!Auth::check()
				&& (
					app()->runningInConsole()
					|| app()->runningUnitTests()
				)
			)
			|| $this->showAll
		) {
			return $requestedById;
		}

		return null;
	}

	public function getVisibilityAttribute($visibility) {
		if (!empty($visibility))
			return $visibility;

		if (empty($this->form) || empty($this->form->visibility))
			$this->load('form');


		if (!empty($this->form))
			return $this->form->visibility;

		return 'hidden';
	}

	public function getCommentAttribute($comment) {
		if ($this->userFullDisclosure(Auth::user()))
			return $comment;

		return null;
	}

	public function getTypeAttribute() {
		if (!$this->form_id) {
			return null;
		}

		try {
			if (empty($this->form) || !is_object($this->form) || empty($this->form->evaluator_type) || empty($this->form->type))
				$this->load('form');

			if ($this->form->evaluator_type == 'self')
				return 'self';

			switch ($this->form->type) {
			case 'faculty':
				return 'faculty';
			case 'resident':
				return 'trainee';
			case 'fellow':
				return 'fellow';
			case 'intern':
				return 'intern';
			case 'app':
				return 'app';
			}
		} catch (\Exception $e) {
			Log::error('Failed getting type attribute', ['exception' => $e]);
		}

		return null;
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

	public function scenarioResponses() {
		return $this->hasMany('App\BeyondMilestiones\ScenarioResponse');
	}

	public function isAnonymousToUser() {
		return (
			(
				empty($this->visibility)
				|| $this->visibility != 'visible'
			)
			&& !(
				Auth::user()->isType('admin')
				|| Auth::id() === $this->evaluator_id
			)
		);
	}

	public function userFullDisclosure($user) {
		if (empty($user))
			return false;

		return (
			$user->isType('admin')
			|| $user->id == $this->evaluator_id
			|| (
				$this->status == 'complete'
				&& !$this->isAnonymousToUser()
			   	&& $user->administratesEvaluation($this)
			)
		);
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

	public function scopeTrainee($query) {
		return $query->whereHas('form', function ($q) {
			return $q->whereIn('type', ['resident', 'fellow']);
		});
	}

	public function scopeBetween($query, $startDate = null, $endDate = null) {
		if (!empty($startDate)) {
			$query->where('evaluation_date_end', '>=', $startDate);
		}

		if (!empty($endDate)) {
			$query->where('evaluation_date_start', '<=', $endDate);
		}

		return $query;
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

	public function sendCompleteNotification() {
		try {
			if (!in_array($this->visibility, [
				'visible',
				'anonymous'
			])) {
				throw new \Exception('Evaluation hidden, cannot notify');
			}

			if (!in_array($this->form->type, [
				'resident',
				'fellow',
				'intern'
			])) {
				throw new \Exception('Only trainee evaluations are currently supported');
			}

			$this->showAll = true;

			$email = $this->subject->email;

			$data = [
				'evaluation' => $this
			];

			Mail::send('emails.complete-notification', $data, function ($message) use ($email) {
				$message->to($email);
				$message->from('notifications@residentprogram.com', 'Resident Program Notifications');
				$message->replyTo(config('app.admin_email'));
				$message->subject("You've just been evaluated!");
			});

			$this->showAll = false;
			return true;
		} catch (\Exception $e) {
			Log::error('Problem sending complete notification: ' . $e);
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
			return $this;
		}

		if ($this->isAnonymousToUser()) {
			$this->hashids = true;
			foreach($this->responses as $eval) {
				$eval->hashEvaluationId();
			}
			foreach($this->textResponses as $eval) {
				$eval->hashEvaluationId();
			}
			$this->evaluator = null;
			$this->requestor = null;
		}

		if ($this->isAnonymousToUser()) {
			$this->addHidden([
				'request_date',
				'complete_date',
				'evaluator_id',
				'requested_by_id'
			]);
		}

		if (!Auth::check() || $user->id != $this->subject_id) {
			$this->addHidden('seen_by_subject_at');
		}

		if (!Auth::check() || $user->id != $this->evaluator_id) {
			$this->addHidden('seen_by_evaluator_at');
		}

		if ($this->status != 'complete') {
			$this->addHidden(['responses', 'textResponses']);
		}

		return $this;
	}

	public function scopeComplete($query) {
		return $query->where('status', 'complete');
	}

	public function scopeEnabled($query) {
		return $query->where('status', '!=', 'disabled')
			->where('status', 'not like', 'canceled%');
	}

	public function getContentsAttribute() {
		// TODO

		$formContents = $this->form->contents;

		return $formContents;
	}
}
