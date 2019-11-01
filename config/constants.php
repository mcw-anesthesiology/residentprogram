<?php

return [

	'STAFF_PHOTO_ROUTE' => env('STAFF_PHOTO_ROUTE', null),

	'COMPLETE_EVAL_TEXT' => 'Submit completed evaluation',
	'SAVE_EVAL_TEXT' => 'Save progress, return later',

	'FLAGGED_ACTIONS' => [
		'date' => 'Change date',
		'form' => 'Change form',
		'subject' => 'Change subject',
		'response' => 'Change responses',
		'delete' => 'Delete evaluation'
	],

	'FEATURES' => [
		'CASE_LOG' => 'CASE_LOG',
		'RESIDENT_EVALS' => 'RESIDENT_EVALS',
		'FACULTY_EVALS' => 'FACULTY_EVALS',
		'FACULTY_MERIT' => 'FACULTY_MERIT',
		'RESIDENT_REPORTS' => 'RESIDENT_REPORTS'
	],

	'FEATURE_NAMES' => [
		'CASE_LOG' => 'Case Log',
		'RESIDENT_EVALS' => 'View ALL resident evaluations',
		'FACULTY_EVALS' => 'Anonymized faculty evaluations',
		'FACULTY_MERIT' => 'View faculty merit reports',
		'RESIDENT_REPORTS' => 'Run individual reports for all residents'
	],

	'MULTIPLE_CHOICE_QUESTION_TYPES' => [
		'radio',
		'radiononnumeric',
		'checkbox'
	],

	'EVALUATION_DATE_PERIODS' => [
		'block',
		'month',
		'quarter',
		'semester',
		'year'
	],

	'MERIT_REPORT_TYPES' => [
		'faculty_yearly' => 'Yearly faculty merit report'
	],

	'USER_SETTINGS' => [
		'defaultEvaluationRange' => [
			'currentQuarter',
			'currentSemester',
			'currentYear',
			'allTime'
		],
		'preferHashLinks' => [
			'yes',
			'no'
		]
	],

	'ROLES' => [
		'MANAGE_BEYOND_MILESTONES'
	],

	'RESIDENT_TRAINING_LEVELS' => [
		'intern',
		'ca-1',
		'ca-2',
		'ca-3'
	]
];
