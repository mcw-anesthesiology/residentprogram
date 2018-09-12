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

	public function evaluationInProgram($evaluation) {
		if ($evaluation->form->type == $this->type) {
			if (
				!empty($this->training_level)
				&& $this->training_level != $evaluation->training_level
			)
				return false;

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
