<?php

return [
	'evaluations' => env('FEATURE_EVALS', true),
	'trainee_evaluations' => env('FEATURE_TRAINEE_EVALS', true),
	'faculty_evaluations' => env('FEATURE_FACULTY_EVALS', true),
	'app_evaluations' => env('FEATURE_APP_EVALS', true),
	'intern360_evaluations' => env('FEATURE_INTERN360_EVALS', true),
	'external_evaluations' => env('FEATURE_EXTERNAL_EVALS', true),

	'faculty_merit' => env('FEATURE_FACULTY_MERIT', true),
	'case_log' => env('FEATURE_CASE_LOG', true),
	'faculty360' => env('FEATURE_FACULTY360', true),
	'alumni' => env('FEATURE_ALUMNI', true),

	'external_links' => env('FEATURE_EXTERNAL_LINKS', true),
	'news' => env('FEATURE_NEWS', true),
	'highlighted-questions' => env('FEATURE_HIGHLIGHTED_QUESTIONS', true),
	'beyond-milestones' => env('FEATURE_BEYOND_MILESTONES', false)
];
