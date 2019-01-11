<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scenario extends Model
{
	use SoftDeletes;

	protected $connection = 'beyond_milestones';
	protected $table = 'scenarios';
	protected $casts = [
		'id' => 'integer',
		'options' => 'array'
	];

	protected $fillable = [
		'scenario_type',
		'scenario_difficulty',
		'title',
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

	public function getOptionsAttribute($options) {
		$options = json_decode($options);

		return empty($options) ? [] : $options;
	}

	public function responses() {
		return $this->hasMany('App\BeyondMilestones\ScenarioResponse');
	}

	public function forms() {
		return $this->belongsToMany('App\Form', 'beyond_milestones.form_scenarios');
	}
}
