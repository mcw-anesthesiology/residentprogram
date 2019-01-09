<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScenarioResponse extends Model
{
	use SoftDeletes;

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

		// TODO: Add scope ?
	}

	public function scenario() {
		return $this->belongsTo('App\BeyondMilestones\Scenario');
	}

	public function evaluation() {
		return $this->belongsTo('App\Evaluation');
	}
}
