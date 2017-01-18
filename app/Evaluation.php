<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\EvaluationScope;

use Auth;
use Debugbar;
use Hashids;
use Log;
use Mail;

class Evaluation extends Model
{
	protected static function boot(){
		parent::boot();

		static::addGlobalScope(new EvaluationScope);
	}

    protected $table = "evaluations";

    protected $casts = [
        "id" => "integer",
        "form_id" => "integer",
        "evaluator_id" => "integer",
        "subject_id" => "integer",
        "requested_by_id" => "integer"
    ];

    protected $fillable = [
        "form_id",
        "evaluator_id",
        "subject_id",
        "requested_by_id",
        "status",
        "training_level",
        "request_date",
        "complete_date",
        "evaluation_date",
        "archive_date",
        "request_ip",
        "complete_ip"
    ];

    protected $dates = [
		"request_date",
		"complete_date",
		"evaluation_date",
		"archive_date",
		"hash_expires"
	];

	protected $hidden = [
		"created_at",
		"updated_at",
		"original_id"
	];

	protected $userHidden = [ // Fields hidden to non-admins
		"archive_date",
		"request_ip",
		"complete_ip",
		"comment",
		"completion_hash",
		"hash_expires",
		"flag"
	];

    protected $appends = ["url"];

	private $hashids = false;

	public function getIdAttribute($id){
		if($this->hashids)
			return Hashids::encode($id);

		return $id;
	}

	public function getViewableIdAttribute(){
		if($this->isAnonymousToUser())
			return Hashids::encode($this->id);

		return $this->id;
	}

	public function getEvaluatorIdAttribute($evaluatorId){
		if(Auth::check() && !Auth::user()->isType("admin")
				&& $this->visibility == "anonymous"
				&& Auth::user()->id != $evaluatorId)
			return null;

		return $evaluatorId;
	}

	public function getRequestedByIdAttribute($requestedById){
		if(Auth::check() && !Auth::user()->isType("admin")
				&& $this->visibility == "anonymous"
				&& Auth::user()->id != $requestedById)
			return null;

		return $requestedById;
	}

	public function getVisibilityAttribute($visibility){
		if(empty($this->form))
			$this->load('form');
		if(empty($this->form))
			return $visibility;
        return empty($visibility) ? $this->form->visibility : $visibility;
	}

    public function getUrlAttribute(){
        return "<a href='/evaluation/{$this->id}'>{$this->id}</a>";
    }

    public function evaluator(){
        return $this->belongsTo("App\User", "evaluator_id");
    }

    public function subject(){
        return $this->belongsTo("App\User", "subject_id");
    }

    public function requestor(){
        return $this->belongsTo("App\User", "requested_by_id");
    }

    public function form(){
        return $this->belongsTo("App\Form");
    }

    public function responses(){
		return $this->hasMany("App\Response");
    }

    public function textResponses(){
        return $this->hasMany("App\TextResponse");
    }

	public function flag(){
		return $this->hasOne("App\FlaggedEvaluation");
	}

	public function isAnonymousToUser(){
		return (Auth::check() && !Auth::user()->isType("admin")
				&& $this->visibility == "anonymous"
				&& Auth::user()->id != $this->requested_by_id
				&& Auth::user()->id != $this->evaluator_id);
	}

    public function scopeNotHidden($query){
        return $query->ofVisibility(["visible", "anonymous"]);
    }

    public function scopeOfVisibility($query, $visibilities){
        if(!is_array($visibilities))
            $visibilities = [$visibilities];
        return $query->where(function($query) use ($visibilities){
            $query->whereIn("visibility", $visibilities)->orWhere(function($query) use ($visibilities){
                $query->whereNull("visibility")->whereHas("form", function($query) use ($visibilities){
                    $query->whereIn("visibility", $visibilities);
                });
            });
        });
    }

    public function sendNotification($reminder = false){
        try{
            $email = $this->evaluator->email;
            $data = [
				'evaluation' => $this
            ];

            if($reminder){
                $emailView = "emails.evaluation-reminder";
                $emailSubject = "Evaluation Reminder";
            }
            else{
                $emailView = "emails.notification";
                $emailSubject = "Evaluation Request Notification";
            }

            Mail::send($emailView, $data, function($message) use($email, $emailSubject){
                $message->to($email);
                $message->from("notifications@residentprogram.com", "Resident Program Notifications");
                $message->replyTo(config("app.admin_email"));
                $message->subject($emailSubject);
            });
            return true;
        }
        catch (\Exception $e){
            Log::error("Problem sending notification: ".$e);
        }
        return false;
    }

    public function sendHashLink(){
        try{
            if($this->status != "pending")
                throw new \Exception("Evaluation already complete");
            if(empty($this->completion_hash))
                throw new \Exception("No hash");
            $email = $this->evaluator->email;
            $data = [
                "evaluationHash" => $this->completion_hash,
                "hashExpires" => $this->hash_expires,
                "evaluatorName" => $this->evaluator->full_name,
                "subjectLast" => $this->subject->last_name,
                "formTitle" => $this->form->title
            ];
            Mail::send("emails.hash-link", $data, function($message) use($email){
                $message->to($email);
                $message->from("notifications@residentprogram.com", "Resident Program Notifications");
                $message->replyTo(config("app.admin_email"));
                $message->subject("Evaluation Completion Link");
            });
        }
        catch (\Exception $e){
            Log::error("Problem sending hash link: " . $e);
			throw $e;
        }

		return true;
    }

	public function hideFields(){
		$this->addHidden($this->userHidden);

		if($this->isAnonymousToUser()){
			$this->hashids = true;
			foreach($this->responses as $eval){
				$eval->hashEvaluationId();
			}
			foreach($this->textResponses as $eval){
				$eval->hashEvaluationId();
			}
		}

		if($this->isAnonymousToUser() && $this->form->type == 'faculty')
			$this->addHidden([
				'evaluation_date',
				'request_date',
				'complete_date'
			]);

		$user = Auth::user();
		if(!Auth::check() || $user->id != $this->subject_id)
			$this->addHidden('seen_by_subject_at');
		if(!Auth::check() || $user->id != $this->evaluator_id)
			$this->addHidden('seen_by_evaluator_at');

		if($this->status != "complete")
			$this->addHidden(["responses", "textResponses"]);
	}
}
