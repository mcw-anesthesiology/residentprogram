<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;

class Scenario extends Model
{
	protected $connection = 'beyond_milestones';
	protected $table = 'scenarios';
	protected $casts = [
		'id' => 'integer',
		'options' => 'array'
	];

	protected $fillable = [
		'scenario_type',
		'scenario_difficulty',
		'intro',
		'text',
		'options'
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

	public function responses() {
		return $this->hasMany('App\BeyondMilestones\ScenarioResponse');
	}

	public function forms() {
		return $this->belongsToMany('App\Form', 'form_scenarios');
	}
}
