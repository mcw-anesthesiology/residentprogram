<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\FormScope;

use Storage;
use Log;

use \DOMDocument;

class Form extends Model
{
	// protected static function boot(){
	// 	parent::boot();
	//
	// 	static::addGlobalScope(new FormScope());
	// }

	protected $table = "forms";

	protected $casts = [
		"id" => "integer"
	];

	protected $fillable = [
		"title",
		"status",
		"visibility",
		"evaluation_period_type"
	];

	protected $hidden = [
		'contents'
	];

	protected $userHidden = [ // Fields hidden to non-admins
		"xml_path",
		"status",
		"created_at",
		"updated_at"
	];

	protected $appends = [
		'contents'
	];

	public function getContentsAttribute() {
		$formContents = [];
		try {
			$MULTIPLE_CHOICE_QUESTION_TYPES = config('constants.MULTIPLE_CHOICE_QUESTION_TYPES');

			$formXml = Storage::get($this->xml_path);
			$formDom = new DOMDocument('1.0', 'utf-8');
			$formDom->preserveWhiteSpace = false;
			$formDom->loadXML($formXml);
			$formContents['title'] = $formDom->getElementsByTagName('title')->item(0)->textContent;
			$formContents['formType'] = $this->type;
			$formContents['items'] = [];
			$root = $formDom->firstChild;
			foreach($root->childNodes as $childNode){
				if(in_array($childNode->nodeName, ['question', 'instruction'])){
					$item = [];
					$item['type'] = $childNode->nodeName;

					if($item['type'] == 'question'){
						$item['id'] = $childNode->getAttribute('name');
						// Remove `q` from beginning of id
						$item['questionId'] = $item['id'];
						$item['questionIdNum'] = intval(substr($item['id'], 1));
						$item['questionType'] = $childNode->getAttribute('type');
						$item['weight'] = intval($childNode->getAttribute('weight'));
						$item['text'] = $childNode->getElementsByTagName('text')->item(0)->textContent;
						$item['required'] = $childNode->hasAttribute('required');
						$item['milestones'] = $this->milestoneQuestions->where('question_id', $item['id'])->pluck('milestone_id');
						// Only get one competency currently
						$item['competencies'] = $this->competencyQuestions->where('question_id', $item['id'])->pluck('competency_id');


						if(in_array($item['questionType'], $MULTIPLE_CHOICE_QUESTION_TYPES)){
							$item['options'] = [];
							foreach($childNode->getElementsByTagName('option') as $optionNode){
								$option = [];

								$option['text'] = $optionNode->textContent;
								$option['value'] = $optionNode->getAttribute('value');
								$option['description'] = $optionNode->getAttribute('description');

								$item['options'][] = $option;
							}
						}
					}
					elseif($item['type'] == 'instruction'){
						$item['text'] = $childNode->textContent;
					}

					$formContents['items'][] = $item;
				}
			}
		} catch (\Exception $e) {
			Log::error($e);
		}

		return $formContents;
	}

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

		return $this;
	}
}
