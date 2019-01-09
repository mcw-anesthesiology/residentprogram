<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;

class FormScenario extends Model
{
	protected $connection = 'beyond_milestones';
	protected $table = 'form_scenarios';
	protected $casts = [
		'id' => 'integer',
		'form_id' => 'integer',
		'scenario_id' => 'integer'
	];

	protected $fillable = [
		'form_id',
		'scenario_id'
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

	public function form() {
		return $this->belongsTo('App\Form');
	}
}
