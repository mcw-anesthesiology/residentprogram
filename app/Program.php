<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
	protected $table = 'programs';

	protected $fillable = [
		'name',
		'type',
		'training_level',
		'secondary_training_level'
	];
	// protected $appends = [
	// 	'evaluations'
	// ];

	const RESIDENT_TRAINING_LEVELS = [
		'intern',
		'ca-1',
		'ca-2',
		'ca-3'
	];

	public function administrators() {
		return $this->belongsToMany('App\User', 'program_administrators', 'program_id', 'user_id');
	}

	public function getEvaluationsAttribute() {
		$type = $this->type;
		$query = Evaluation::complete()->whereHas('form', function ($formQuery) use ($type) {
			return $formQuery->where('type', $type);
		});

		if (!empty($this->training_level)) {
			if ($this->training_level == 'resident') {
				$query = $query->whereIn('training_level', self::RESIDENT_TRAINING_LEVELS);
			} else {
				$query = $query->where('training_level', $this->training_level);
			}
		}

		if (!empty($this->secondary_training_level)) {
			$stl = $this->secondary_training_level;
			$query = $query->whereHas('subject', function ($subjectQuery) use ($stl) {
				return $subjectQuery->where('secondary_training_level', $stl);
			});
		}

		return $query->get();
	}

	// Similar logic also in app/Scopes/EvluationScope.php
	public function evaluationInProgram($evaluation) {
		if ($evaluation->form->type == $this->type) {
			if (!empty($this->training_level)) {
				return $this->training_level == 'resident'
					? in_array($evaluation->training_level, self::RESIDENT_TRAINING_LEVELS)
					: $this->training_level == $evaluation->training_level;
			}

			if (
				!empty($this->secondary_training_level)
				&& $this->secondary_training_level != $evaluation->subject->secondary_training_level
			)
				return false;

			return true;
		}

		return false;
	}
}
