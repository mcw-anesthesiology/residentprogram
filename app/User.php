<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

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

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

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
        return $this->belongsToMany("App\User", "mentorships", "mentee_id", "mentor_id");
    }

    public function mentees(){
        return $this->hasMany("App\User", "mentorships", "mentor_id", "mentee_id");
    }
}
