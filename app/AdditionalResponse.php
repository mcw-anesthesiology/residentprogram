<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Scopes\BeyondMilestones\AdditionalResponseScope;

class AdditionalResponse extends Model
{
	protected $connection = 'beyond_milestones';
	protected $table = 'additional_responses';
	protected $casts = [
		'id' => 'integer',
		'value' => 'integer'
	];

	protected $fillable = [
		'question_id',
		'evaluation_id',
		'text',
		'value'
	];

	protected $dates = [
		'created_at',
		'updated_at',
		'deleted_at'
	];

	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new AdditionalResponseScope);
	}

	public function question() {
		return $this->belongsTo('App\BeyondMilestones\AdditionalQuestion');
	}

	public function scenarioResponse() {
		return $this->belongsTo('App\BeyondMilestones\ScenarioResponse');
	}
}
