<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Scopes\BeyondMilestones\ScenarioResponseScope;

class ScenarioResponse extends Model
{
	protected $connection = 'beyond_milestones';
	protected $table = 'scenario_responses';
	protected $casts = [
		'id' => 'integer',
		'value' => 'float'
	];

	protected $fillable = [
		'scenario_id',
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

		static::addGlobalScope(new ScenarioResponseScope);
	}

	public function scenario() {
		return $this->belongsTo('App\BeyondMilestones\Scenario');
	}

	public function evaluation() {
		return $this->belongsTo('App\Evaluation');
	}

	public function additionalResponses() {
		return $this->hasMany('App\BeyondMilestones\AdditionalResponse');
	}
}
