<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\CustomReport;

use Log;

class CustomReportController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		'id',
		'title',
		'structure'
	];

	protected $model = \App\CustomReport::class;

	public function runReport(Request $request, $id) {
		$startDate = $request->input('startDate');
		$endDate = $request->input('endDate');
		$subjectIds = $request->input('subjectIds');
		$customReport = CustomReport::findOrFail($id);


        $responses = $customReport->responses($startDate, $endDate, $subjectIds);
		$textResponses = $customReport->textResponses($startDate, $endDate, $subjectIds);

		$allResponses = $responses->merge($textResponses);

		$customReport = $customReport->toArray();

		$customReport['subjects'] = $responses->pluck('subject_id')
			->unique()->values()->all();

		$customReport['results'] = $customReport['structure'];
		foreach ($customReport['results']['sections'] as &$section) {
			foreach ($section['questions'] as &$question) {
				if (!empty($question['options'])) {
					foreach ($question['options'] as &$option) {
						$optionResponses = [];

						foreach ($option['sources'] as $source) {
							$sourceResponses = $allResponses
								->where('form_id', $source['form'])
								->where('question_id', $source['question'])
								->where('response', $source['value'])
								->groupBy('subject_id');

							foreach ($sourceResponses as $subject => $subjectResponses) {
								if (empty($optionResponses[$subject]))
									$optionResponses[$subject] = 0;

								$optionResponses[$subject] += count($subjectResponses);
							}
						}

						$option['responses'] = $optionResponses;
					}
				} else if (!empty($question['sources'])) {
					$questionResponses = [];

					foreach ($question['sources'] as $source) {
						$sourceResponses = $allResponses
							->where('form_id', $source['form'])
							->where('question_id', $source['question'])
							->groupBy('subject_id');

						foreach ($sourceResponses as $subject => $subjectResponses) {
							if (empty($questionResponses[$subject]))
								$questionResponses[$subject] = [];

							foreach ($subjectResponses as $subjectResponse) {
								$questionResponses[$subject][] = $subjectResponse;
							}
						}

						$question['responses'] = $questionResponses;
					}
				}
			}
		}

		return $customReport;
    }
}
