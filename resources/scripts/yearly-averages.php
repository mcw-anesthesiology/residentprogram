<?php


use App\MeritReport;
use App\TextResponse;

$startDate =  '2018-07-01';
$endDate = '2019-06-30';


getYearlyAverages($startDate, $endDate);

function getYearlyAverages($startDate, $endDate) {
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

	$mrs = MeritReport::where('status', 'complete')
		->where('period_start', $startDate)
		->where('period_end', $endDate)
		->get();

	$percents = [];
	$overallAbilities = [];
	$newLectures = [];
	$repeatLectures = [];
	$otherDeptLectures = [];
	$externalLectures = [];
	$newCourses = [];
	$simVolunteers = [];
	$msaCourses = [];
	$studies = [];
	$grants = [];
	$editorialBoards = [];
	$nationalOrgs = [];
	$articleReviews = [];
	$grantReviews = [];

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
			try {
				$v = $overallAbilitiesMappings[$tr->response];
				$subjectAbilities[] = $v;
			} catch (\Exception $e) {
				Log::debug($e);
			}
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
						|| strpos($type, 'Medical Student') !== FALSE
					)
				) {
					return $carry + countLectures($item);
				}

				return $carry;
			}, 0);
			$repeat = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (
					strpos($type, 'Repeat') !== FALSE
					&& (
						strpos($type, 'resident') !== FALSE
						|| strpos($type, 'Medical Student') !== FALSE
					)
				) {
					return $carry + countLectures($item);
				}

				return $carry;
			}, 0);
			$otherDepts = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (strpos($type, 'another department') !== FALSE) {
					return $carry + countLectures($item);
				}

				return $carry;
			}, 0);
			$external = array_reduce($lectures, function ($carry, $item) {
				$type = $item['lectureType'];
				if (
					strpos($type, 'Visiting Professor') !== FALSE
					|| strpos($type, 'WSA Invited Lecture') !== FALSE
					|| strpos($type, 'Other National / International') !== FALSE
				) {
					return $carry + countLectures($item);
				}

				return $carry;
			}, 0);

			$educationSection = $mr->report['pages'][1]['items'][0];
			$residentFellowSection = $educationSection['items'][2];

			$createdNewCourse = !empty($residentFellowSection['items'][3]['checked']);
			$simSessionVolunteer = !empty($residentFellowSection['items'][12]['checked']);

			$msaItem = $educationSection['items'][3]['items'][3];
			$msa = !empty($msaItem['checked'])
				? count($msaItem['questions'][0]['items'])
				: 0;



			$newLectures[] = $new;
			$repeatLectures[] = $repeat;
			$otherDeptLectures[] = $otherDepts;
			$externalLectures[] = $external;

			$studies[] = count($mr->studies);
			$grants[] = count($mr->grants);
			$editorialBoards[] = count($mr->editorialBoards);
			$nationalOrgs[] = count($mr->nationalBoards);

			$newCourses[] = $createdNewCourse;
			$simVolunteers[] = $simSessionVolunteer;
			$msaCourses[] = $msa;

			$publications = collect($mr->publications);
			$grouped = $publications->groupBy('publicationType');
			foreach ($PUBLICATION_TYPES as $pubType) {
				if (!empty($grouped[$pubType])) {
					$groupedPublications[$pubType][] = count($grouped[$pubType]);
				} else {
					$groupedPublications[$pubType][] = 0;
				}
			}

			$scholarlyServiceSection = $mr->report['pages'][3]['items'][1];
			$reviewer = $scholarlyServiceSection['items'][1];
			$articleReviews[] = empty($reviewer['checked']) ? 0 : count($reviewer['questions'][0]['items']);

			$adHocGrantItem = $scholarlyServiceSection['items'][2];
			$grantReviews[] = empty($adHocGrantItem['checked']) ? 0 : count($adHocGrantItem['questions'][0]['items']);
		}
	}

	echo "{$startDate} -- {$endDate}:\n";
	echoStats($percents, 'Percentage of trainee evaluations completed', false);
	echoStats($overallAbilities, 'Resident assessment of teaching', false);
	echoStats($newLectures, 'New lectures (for those who gave any lectures)');
	echoStats($repeatLectures, 'Repeat lectures (for those who gave any lectures)');

	echoStats($newCourses, 'Created new course for residents / fellows');
	echoStats($simVolunteers, 'Volunteered for a simulation session');

	echoStats($msaCourses, 'MSA courses taught');

	echoStats($otherDeptLectures, 'Lectures to other departments (for those who gave any lectures)');
	echoStats($externalLectures, 'External (visiting professor / (inter)national socieity) (for those who gave any lectures)');


	echoStats($studies, "Studies");
	echoStats($grants, "Grants");


	foreach ($groupedPublications as $publicationType => $publications) {
		echoStats($publications, $publicationType);
	}

	echoStats($nationalOrgs, "National organizations");
	echoStats($articleReviews, "Article reviewers");
	echoStats($editorialBoards, "Editorial boards");

	echoStats($articleReviews, 'Article reviews, peer reviewed journal');
	echoStats($grantReviews, 'Grant reviews (non NIH)');
}

function echoStats($arr, $title, $filterEmpty = true) {
	$arr = collect($arr);
	$count = $filterEmpty ? $arr->filter('notEmpty')->count() : $arr->count();

	echo "\t{$title}: (Number of people: {$count})\n";
	echo "\t\tAverage: {$arr->avg()}; (range: {$arr->min()} - {$arr->max()})\n";
}

function notEmpty($value, $key) {
	return !empty($value);
}

function countLectures($item) {
	return count(explode(';', $item['date']));
}
