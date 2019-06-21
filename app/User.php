<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use App\UserSetting;

use Auth;
use DB;
use Log;
use Mail;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
	use Authenticatable, Authorizable, CanResetPassword, Notifiable;

	protected $connection = 'mysql';
	protected $table = 'users';

	protected $fillable = [
		'username',
		'training_level',
		'secondary_training_level',
		'first_name',
		'last_name',
		'email',
		'status',
		'notifications',
		'reminder_frequency'
	];

	protected $casts = [
		'id' => 'integer'
	];

	protected $hidden = [
		'password',
		'remember_token',
		'updated_at'
	];

	protected $userHidden = [ // Fields hidden to non-admins
		"username",
		"email",
		"notifications",
		"reminder_frequency",
		"remind_only_if_pending"
	];

	protected $appends = ["full_name", "specific_type", "display_type", "profile_link"];

	public function getFullNameAttribute() {
		return $this->last_name . ", " . $this->first_name;
	}

	public function getProfileLinkAttribute() {
		return "<a href=\"/profile/{$this->id}\">{$this->full_name}</a>";
	}

	public function getPhotoPathAttribute($photoPath) {
		if (empty($photoPath)) {
			$photoPath = '/img/avatar.png';
		}

		if ($photoPath[0] != '/') {
			$photoPath = '/' . $photoPath;
		}

		return $photoPath;
	}

	public function isType($types) {
		if (!is_array($types))
			$types = [$types];
		foreach ($types as $type) {
			// Allow to query for 'trainee' even though they're currently all residents
			// In the future, plan to change resident -> trainee
			if ($type == "trainee")
				$type = "resident";

			// Specifically not a fellow
			if ($type == 'RESIDENT' && $this->type == 'resident' && in_array($this->training_level, [
				'intern',
				'ca-1',
				'ca-2',
				'ca-3'
			]))
				return true;

			if ($this->type == $type || $this->type == "resident" && $this->training_level == $type)
				return true;
		}
		return false;
	}

	public function getSpecificTypeAttribute() {
		// TODO: Do the same for interns?
		if ($this->type == "resident" && $this->training_level == "fellow")
			return "fellow";

		return $this->type;
	}

	public function getDisplayTypeAttribute() {
		switch ($this->type) {
		case 'resident':
			switch ($this->training_level) {
			case 'fellow':
				if (!empty($this->secondary_training_level)) {
					return "{$this->secondary_training_level} Fellow";
				}
				return "Fellow";
			case 'intern':
				return 'Intern';
			default:
				return strtoupper($this->training_level);
			}
		default:
			return ucfirst($this->type);
		}
	}

	public function evaluatorEvaluations() {
		return $this->hasMany("App\Evaluation", "evaluator_id");
	}

	public function subjectEvaluations() {
		return $this->hasMany("App\Evaluation", "subject_id");
	}

	public function requestedEvaluations() {
		return $this->hasMany("App\Evaluation", "requested_by_id");
	}

	public function blockAssignments() {
		return $this->hasMany("App\BlockAssignment");
	}

	public function mentors() {
		return $this->belongsToMany("App\User", "mentorships", "mentee_id", "mentor_id")
			->where("mentorships.status", "active");
	}

	public function mentees() {
		return $this->belongsToMany("App\User", "mentorships", "mentor_id", "mentee_id")
			->where("mentorships.status", "active");
	}

	public function watchedForms() {
		return $this->hasMany("App\WatchedForm");
	}

	public function formsBeingWatched() {
		return $this->belongsToMany("App\Form", "watched_forms");
	}

	public function userFeatures() {
		return $this->hasMany("App\UserFeature");
	}

	public function userSettings() {
		return $this->hasMany('App\UserSetting');
	}

	public function administratedPrograms() {
		return $this->belongsToMany('App\Program', 'program_administrators', 'user_id', 'program_id');
	}

	public function roles() {
		return $this->belongsToMany('App\Role', 'user_roles')->withPivot('additional_permissions');
	}

	public function hasRole($role) {
		try {
			return $this->roles()->where('role', $role)->count() > 0;
		} catch (\Exception $e) {
			Log::debug('Error in User::hasRole' . $e);
		}

		return false;
	}

	public function administratesEvaluation($evaluation) {
		return $this->administratedPrograms->contains(function ($program) use ($evaluation) {
			return $program->evaluationInProgram($evaluation);
		});
	}

	public function saveSetting($name, $value) {
		$setting = UserSetting::firstOrNew([
			'user_id' => $this->id,
			'name' => $name
		]);

		$setting->value = $value;

		return $setting->save();
	}

	private function getWhereNullOrEmpty($col) {
		return function ($query) use ($col) {
			$query->whereNull($col)
				->orWhere($col, '');
		};
	}

	public function deepFeatures() {
		return DB::table("users")
			->join("user_features", function($join) {
				$join->on(function ($join) {
					$join->on("users.type", "=", "user_features.user_type")
						->where($this->getWhereNullOrEmpty("user_features.user_id"))
						->where($this->getWhereNullOrEmpty("user_features.user_training_level"))
						->where($this->getWhereNullOrEmpty("user_features.user_secondary_training_level"));
				})->orOn(function ($join) {
					$join->on("users.type", "=", "user_features.user_type")
						->on("users.training_level", "=", "user_features.user_training_level")
						->where($this->getWhereNullOrEmpty("user_features.user_id"))
						->where($this->getWhereNullOrEmpty("user_features.user_secondary_training_level"));
				})->orOn(function ($join) {
					$join->on("users.type", "=", "user_features.user_type")
						->on("users.training_level", "=", "user_features.user_training_level")
						->on("users.secondary_training_level", "=", "user_features.user_secondary_training_level")
						->where($this->getWhereNullOrEmpty("user_features.user_id"));
				});
			})
			->where("users.id", $this->id)
			->pluck("feature");
	}

	public function usesFeature($feature, $deep = true) {
		if ($deep) {
			return $this->deepFeatures()->contains($feature);
		}

		return $this->userFeatures->pluck('feature')->contains($feature);
	}

	public function caseLogs() {
		return $this->hasMany("App\CaseLog");
	}

	public function meritReports() {
		return $this->hasMany('App\MeritReport');
	}

	public function meritAdministrators() {
		return $this->belongsToMany('App\User', 'merit_administrators', 'administratee_id', 'administrator_id');
	}

	public function meritAdministratees() {
		return $this->belongsToMany('App\User', 'merit_administrators', 'administrator_id', 'administratee_id');
	}

	public function anesthesiaCases() {
		return $this->belongsToMany(
			'App\AnesthesiaCase',
			'user_anesthesia_cases',
			'user_id',
			'anesthesia_case_id'
		)->withPivot('start_time', 'stop_time');
	}

	public function anesthesiaCasesBetween($start, $stop) {
		return $this->anesthesiaCases()
			->wherePivot('start_time', '<=', $stop)
			->wherePivot('stop_time', '>=', $start);
	}

	public function scopeFormerResidents($query) {
		return $query->where('type', 'resident')->where('status', '!=', 'active');
	}

	public function scopeOfType($query, $type) {
		if (is_array($type))
			return $query->whereIn('type', $type);
		else
			return $query->where('type', $type);
	}

	public function scopeActive($query) {
		return $query->where('status', 'active');
	}

	public function resetPassword() {
		if ($this->type == 'external')
			throw new \Exception('Cannot do that for external users');

		$password = str_random(12);
		$this->password = bcrypt($password);
		try{
			$data = [
				"password" => $password,
				"lastName" => $this->last_name
			];
			$email = $this->email;
			$this->save();
			Mail::send("emails.manual-password-reset", $data, function($message) use ($email) {
				$message->from("admin@residentprogram.com", "ResidentProgram");
				$message->to($email);
				$message->replyTo(config("app.admin_email"));
				$message->subject("Password reset");
			});
			return true;
		} catch(\Exception $e) {
			Log::error("Problem resetting password: ".$e);
		}
		return false;
	}

	public function sendNewAccountEmail($password = null) {
		if ($this->type == 'external')
			throw new \Exception('Cannot do that for external users');

		$data = [
			"firstName" => $this->first_name,
			"lastName" => $this->last_name,
			"email" => $this->email,
			"username" => $this->username,
			"userType" => $this->specific_type,
			"password" => $password
		];
		$email = $this->email;

		try {
			Mail::send("emails.new-account", $data, function($message) use ($email) {
				$message->from("accounts@residentprogram.com", "Resident Program Accounts");
				$message->to($email);
				$message->replyTo(config("app.admin_email"));
				$message->subject("Welcome to Resident Program");
			});
			return true;
		} catch(\Exception $e) {
			Log::error("Problem sending email: ".$e);
		}

		return false;
	}

	public function sendPasswordResetNotification($token) {
		if ($this->type == 'external')
			throw new \Exception('Cannot do that for external users');

		$data = [
			'title' => in_array($this->type, ['faculty', 'resident'])
				? 'Dr.'
				: $this->first_name,
			'last_name' => $this->last_name,
			'token' => $token
		];
		$email = $this->email;

		Mail::send('auth.emails.password', $data, function ($message) use ($email) {
			$message->from('accounts@residentprogram.com', 'Resident Program');
			$message->to($email);
			$message->replyTo(config('app.admin_email'));
			$message->subject('Password reset request');
		});
	}

	public function hideFields() {
		$this->addHidden($this->userHidden);

		if (Auth::check() && Auth::id() != $this->id)
			$this->addHidden('created_at');

		return $this;
	}

	public function archive() {
		// Used to free up their username and email in case they're becoming
		// a different user type

		$this->status = 'inactive';
		$this->username = $this->username . '~';
		$this->email = $this->email . '~';
		return $this->save();
	}
}
