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

	public function administrators() {
		return $this->belongsToMany('App\User', 'program_administrators', 'program_id', 'user_id');
	}

	// Similar logic also in app/Scopes/EvluationScope.php
	public function evaluationInProgram($evaluation) {
		if ($evaluation->form->type == $this->type) {
			if (!empty($this->training_level)) {
				return $this->training_level == 'resident'
					? in_array($evaluation->training_level, [
						'intern',
						'ca-1',
						'ca-2',
						'ca-3'
					])
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
