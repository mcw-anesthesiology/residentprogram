<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Scopes\ProgramScope;

class Program extends Model
{
	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new ProgramScope);
	}

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

	public const RESIDENT_TRAINING_LEVELS = [
		'intern',
		'ca-1',
		'ca-2',
		'ca-3'
	];

	public function administrators() {
		return $this->belongsToMany('App\User', 'program_administrators', 'program_id', 'user_id');
	}

	public function evaluations() {
		$type = $this->type;
		$query = Evaluation::complete()->with([
			'subject',
			'evaluator',
			'form'
		])->whereHas('form', function ($formQuery) use ($type) {
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

		return $query;
	}

	public function getEvaluationsAttribute() {
		return $this->evaluations()->get();
	}

	// Similar logic also in app/Scopes/EvluationScope.php
	// also in ReportController@trainee
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

	// Very similar logic also in ReportsController@trainee
	public function traineeInProgramQuery($query) {
		if ($this->type == 'fellow') {
			$type = 'resident';
			$trainingLevel = 'fellow';
		} else {
			$type = $this->type;
			$trainingLevel = $this->training_level;
		}

		$query->where('type', $type);

		if (!empty($trainingLevel)) {
			if ($this->training_level === 'resident') {
				$query->whereIn('training_level', self::RESIDENT_TRAINING_LEVELS);
			} else {
				$query->where('training_level', $trainingLevel);
			}
		}

		if (!empty($this->secondary_training_level)) {
			$query->where('secondary_training_level', $this->secondary_training_level);
		}

		return $query;
	}

	public function trainees() {
		return User::active()->where(function ($query) use ($program) { $program->traineeInProgramQuery($query); });
	}

	public function getTraineesAttribute() {
		return $this->trainees()->get();
	}

	public function traineeInProgram($trainee) {
		if ($trainee->type == $this->type) {
			if (!empty($this->training_level)) {
				if ($this->training_level == 'resident') {
					if (!in_array($trainee->training_level, self::RESIDENT_TRAINING_LEVEL)) {
						return false;
					}
				} else {
					if ($trainee->training_level != $this->training_level)
						return false;
				}
			}

			if (
				!empty($this->secondary_training_level)
			   	&& $trainee->secondary_training_level != $this->secondary_training_level
		   	)
				return false;

			return true;
		}

		return false;
	}
}
