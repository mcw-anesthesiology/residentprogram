<?php


use App\MeritReport;
use App\TextResponse;

getYearlyAverages();

function getYearlyAverages() {
	$OVERALL_ABILITIES_QUESTION = 'q23';
	$PUBLICATION_TYPES = [
		'Original Article',
		'Review Article',
		'Book / Text',
		'Book Chapter',
		'Editorial',
		'Case Report',
		'Letter to the Editor',
		'Abstract / Poster',
		'Anesthesia Toolbox',
		'MedEd'
	];

	$overallAbilitiesMappings = [
		'unacceptable' => 1,
		'needs-improvement' => 2,
		'meets-expectations' => 3,
		'exceeds-expectations' => 4,
		'outstanding' => 5,

		'poor' => 1,
		'moderately-poor' => 2,
		'good' => 3,
		'excellent' => 4
	];

	$startDate =  '2018-07-01';
	$endDate = '2019-06-30';

	$mrs = MeritReport::where('status', 'complete')
		->where('period_start', $startDate)
		->where('period_end', $endDate)
		->get();

	$percents = [];
	$overallAbilities = [];
	$newLectures = [];
	$repeatLectures = [];
	$otherDeptLectures = [];
	$studies = [];
	$grants = [];
	$editorialBoards = [];
	$nationalOrgs = [];
	$articleReviews = [];

	$groupedPublications = [];
	foreach ($PUBLICATION_TYPES as $pubType) {
		$groupedPublications[$pubType] = [];
	}

	foreach ($mrs as $mr) {
		$evals = $mr->user->evaluatorEvaluations->where('type', 'trainee')->whereIn('status', ['complete', 'pending']);
		$completed = $evals->where('status', 'complete');
		if (count($evals) > 0) {
			$percent = count($completed) / count($evals);
			$percents[] = $percent * 100;
		}

		$subjectEvals = $mr->user->subjectEvaluations()
			->where('evaluation_date_start', '<=', $startDate)
			->where('evaluation_date_end', '>=', $endDate)
			->get()->pluck('id');

		$textResponses = TextResponse::where('question_id', $OVERALL_ABILITIES_QUESTION)
			->whereIn('evaluation_id', $subjectEvals)->get();

		$subjectAbilities = [];
		foreach ($textResponses as $tr) {
			$v = $overallAbilitiesMappings[$tr->response];
			$subjectAbilities[] = $v;
		}

		$overallAbilitiesVal = collect($subjectAbilities)->avg();
		$overallAbilities[] = $overallAbilitiesVal;

		$lectures = $mr->lectures;

		// TODO: Consider multiple date entries
		if (!empty($lectures)) {
			$new = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (
					strpos($type, 'New') !== FALSE
					&& (
						strpos($type, 'resident') !== FALSE
						|| strpos($type, 'student') !== FALSE
					)
				) {
					return $carry + 1;
				}

				return $carry;
			}, 0);
			$repeat = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (
					strpos($type, 'Repeat') !== FALSE
					&& (
						strpos($type, 'resident') !== FALSE
						|| strpos($type, 'student') !== FALSE
					)
				) {
					return $carry + 1;
				}

				return $carry;
			}, 0);
			$otherDepts = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (strpos($type, 'another department') !== FALSE) {
					return $carry + 1;
				}

				return $carry;
			}, 0);
			$newLectures[] = $new;
			$repeatLectures[] = $repeat;
			$otherDeptLectures[] = $otherDepts;

			$studies[] = count($mr->studies);
			$grants[] = count($mr->grants);
			$editorialBoards[] = count($mr->editorialBoards);
			$nationalOrgs[] = count($mr->nationalBoards);

			$publications = collect($mr->publications);
			$grouped = $publications->groupBy('publicationType');
			foreach ($PUBLICATION_TYPES as $pubType) {
				if (!empty($grouped[$pubType])) {
					$groupedPublications[$pubType][] = count($grouped[$pubType]);
				} else {
					$groupedPublications[$pubType][] = 0;
				}
			}

			$reviewer = $mr->report['pages'][3]['items'][1]['items'][1];
			$articleReviews[] = empty($reviewer['checked']) ? 0 : count($reviewer['questions'][0]['items']);
		}
	}

	$percents = collect($percents);
	echo "Percentage of evaluations completed: (N: {$percents->count()})\n";
	echo "\tAverage: {$percents->avg()}%; (range: {$percents->min()} - {$percents->max()})\n";

	$overallAbilities = collect($overallAbilities);
	echo "Resident assessment of teaching: (N: {$overallAbilities->count()})\n";
	echo "\tAverage: {$overallAbilities->avg()}; (range: {$overallAbilities->min()} - {$overallAbilities->max()})\n";

	$newLectures = collect($newLectures);
	echo "New lectures (for those who gave any lectures): (N: {$newLectures->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$newLectures->avg()}; (range: {$newLectures->min()} - {$newLectures->max()})\n";

	$repeatLectures = collect($repeatLectures);
	echo "Repeat lectures (for those who gave any lectures): (N: {$repeatLectures->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$repeatLectures->avg()}; (range: {$repeatLectures->min()} - {$repeatLectures->max()})\n";

	$otherDeptLectures = collect($otherDeptLectures);
	echo "Lectures to other departments (for those who gave any lectures): (N: {$otherDeptLectures->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$otherDeptLectures->avg()}; (range: {$otherDeptLectures->min()} - {$otherDeptLectures->max()})\n";


	$studies = collect($studies);
	echo "Studies: (N: {$studies->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$studies->avg()}; (range: {$studies->min()} - {$studies->max()})\n";

	$grants = collect($grants);
	echo "Grants: (N: {$grants->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$grants->avg()}; (range: {$grants->min()} - {$grants->max()})\n";


	foreach ($groupedPublications as $publicationType => $publications) {
		$publications = collect($publications);
		echo "{$publicationType} publications (N: {$publications->filter('notEmpty')->count()})\n";
		echo "\tAverage: {$publications->avg()}; (range: {$publications->min()} - {$publications->max()})\n";
	}


	$nationalOrgs = collect($nationalOrgs);
	echo "National organizations: (N: {$nationalOrgs->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$nationalOrgs->avg()}; (range: {$nationalOrgs->min()} - {$nationalOrgs->max()})\n";

	$articleReviews = collect($articleReviews);
	echo "Article reviewers: (N: {$articleReviews->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$articleReviews->avg()}; (range: {$articleReviews->min()} - {$articleReviews->max()})\n";

	$editorialBoards = collect($editorialBoards);
	echo "Editorial boards: (N: {$editorialBoards->filter('notEmpty')->count()})\n";
	echo "\tAverage: {$editorialBoards->avg()}; (range: {$editorialBoards->min()} - {$editorialBoards->max()})\n";
}

function notEmpty($value, $key) {
	return !empty($value);
}
