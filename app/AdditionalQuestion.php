<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdditionalQuestion extends Model
{
	use SoftDeletes;

	protected $connection = 'beyond_milestones';
	protected $table = 'additional_questions';
	protected $casts = [
		'id' => 'integer',
		'options' => 'array'
	];

	protected $fillable = [
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

	public function responses() {
		return $this->hasMany('App\BeyondMilestones\AdditionalResponse');
	}
}
