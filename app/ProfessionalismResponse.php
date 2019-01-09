<?php

namespace App\BeyondMilestones;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProfessionalismResponse extends Model
{
	use SoftDeletes;

	protected $connection = 'beyond_milestones';
	protected $table = 'professionalism_responses';
	protected $casts = [
		'id' => 'integer',
		'value' => 'boolean'
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

	public function question() {
		return $this->belongsTo('App\BeyondMilestones\ProfessionalismQuestion');
	}

	public function evaluation() {
		return $this->belongsTo('App\Evaluation');
	}
}
