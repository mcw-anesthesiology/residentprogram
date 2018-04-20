<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use DB;
use Log;

class CustomReport extends Model
{
    use SoftDeletes;

	protected $table = 'custom_reports';

	protected $fillable = [
		'title',
		'structure'
	];

	protected $casts = [
		'id' => 'integer',
		'structure' => 'array'
	];

	public function responses($startDate, $endDate, $subjectIds = null) {
		return $this->run('responses', $startDate, $endDate, $subjectIds);
	}

	public function textResponses($startDate, $endDate, $subjectIds = null) {
		return $this->run('text_responses', $startDate, $endDate, $subjectIds);
	}

	public function run($responseTable, $startDate, $endDate, $subjectIds = null) {

		$query = DB::table($responseTable)
            ->join('evaluations', 'evaluations.id', '=', "{$responseTable}.evaluation_id")
            ->join('forms', 'forms.id', '=', 'evaluations.form_id')
            ->join('users as subjects', 'subjects.id', '=', 'evaluations.subject_id')
            ->where('evaluations.status', 'complete')
            ->where('evaluations.evaluation_date_end', '>=', $startDate)
            ->where('evaluations.evaluation_date_start', '<=', $endDate);

		if (!empty($subjectIds)) {
			$query->whereIn('evaluations.subject_id', $subjectIds);
		}

		$structure = $this->structure;

        Log::debug($structure);

        $query->where(function ($query) use ($responseTable, $structure) {
            foreach ($structure['forms_questions'] as $form => $questions) {
                $query->orWhere(function ($query) use ($responseTable, $form, $questions) {
                    $query->where('forms.id', $form)
                        ->whereIn("{$responseTable}.question_id", $questions);
                });
            }
        });

        $query->orderBy("{$responseTable}.id");

        $query->select(
			'question_id',
			'form_id',
			'evaluation_id',
			'subject_id',
			'response'
		);

		return $query->get();
	}
}
