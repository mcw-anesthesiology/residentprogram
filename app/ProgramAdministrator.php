<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProgramAdministrator extends Model
{
	protected $table = 'program_administrators';

	protected $fillable = [
		'user_id',
		'type',
		'training_level',
		'secondary_training_level'
	];

	public function user() {
		return $this->belongsTo('App\User');
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
