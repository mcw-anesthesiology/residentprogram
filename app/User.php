<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use Log;
use Mail;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["username", "training_level", "first_name", "last_name", "email", "photo_path"];

    protected $casts = [
        "id" => "integer"
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'full_name', 'specific_type', 'profile_link'];

	protected $appends = ["full_name", "specific_type", "profile_link"];

	public function getFullNameAttribute(){
		return $this->last_name . ", " . $this->first_name;
	}

    public function getProfileLinkAttribute(){
        return "<a href=\"/profile/{$this->id}\">{$this->full_name}</a>";
    }

	public function isType($types){
		if(!is_array($types))
			$types = [$types];
		foreach($types as $type){
			if($this->type == $type || $this->type == "resident" && $this->training_level == $type)
				return true;
		}
		return false;
	}

	public function getSpecificTypeAttribute(){
		if($this->type == "resident" && $this->training_level == "fellow")
			return "fellow";

		return $this->type;
	}

    public function evaluatorEvaluations(){
        return $this->hasMany("App\Evaluation", "evaluator_id");
    }

    public function subjectEvaluations(){
        return $this->hasMany("App\Evaluation", "subject_id");
    }

    public function requestedEvaluations(){
        return $this->hasMany("App\Evaluation", "requested_by_id");
    }

    public function blockAssignments(){
        return $this->hasMany("App\BlockAssignment");
    }

    public function mentors(){
        return $this->belongsToMany("App\User", "mentorships", "mentee_id", "mentor_id")->where("mentorships.status", "active");
    }

    public function mentees(){
        return $this->belongsToMany("App\User", "mentorships", "mentor_id", "mentee_id")->where("mentorships.status", "active");
    }

    public function resetPassword(){
        $password = str_random(12);
        $this->password = bcrypt($password);
        try{
            $data = [
                "password" => $password,
                "lastName" => $this->last_name
            ];
            $email = $this->email;
            $this->save();
            Mail::send("emails.manual-password-reset", $data, function($message) use ($email){
                $message->from("admin@residentprogram.com", "ResidentProgram");
                $message->to($email);
                $message->replyTo(config("app.admin_email"));
                $message->subject("Password reset");
            });
            return true;
        } catch(\Exception $e){
            Log::error("Problem resetting password: ".$e);
        }
        return false;
    }

    public function sendNewAccountEmail($password = null){
        $data = [
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "username" => $this->username,
            "userType" => $this->specific_type,
            "password" => $password
        ];
        $email = $this->email;
        try{
            Mail::send("emails.new-account", $data, function($message) use ($email){
                $message->from("admin@residentprogram.com", "ResidentProgram");
                $message->to($email);
                $message->replyTo(config("app.admin_email"));
                $message->subject("Welcome!");
            });
            return true;
        }
        catch(\Exception $e){
            Log::error("Problem sending email: ".$e);
        }
        return false;
    }
}
