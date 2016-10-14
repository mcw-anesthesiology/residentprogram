<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $table = "forms";

    protected $casts = [
        "id" => "integer"
    ];

    protected $fillable = [
        "title",
        "status",
        "visibility"
    ];

	protected $hidden = [];

	protected $userHidden = [ // Fields hidden to non-admins
		"xml_path",
		"status",
		"created_at",
		"updated_at"
	];

    public function evaluations(){
        return $this->hasMany("App\Evaluation");
    }

    public function milestones(){
        return $this->belongsToMany("App\Milestone", "milestones_questions");
    }

	public function milestoneQuestions(){
		return $this->hasMany('App\MilestoneQuestion');
	}

    public function competencies(){
        return $this->belongsToMany("App\Competency", "competencies_questions");
    }

	public function competencyQuestions(){
		return $this->hasMany('App\CompetencyQuestion');
	}

    public function watchedForms(){
        return $this->hasMany("App\WatchedForm");
    }

	public function watchers(){
		return $this->belongsToMany("App\User", "watched_forms");
	}

	public function hideFields(){
		$this->addHidden($this->userHidden);
	}
}
