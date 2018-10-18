<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('setting', 'SettingController', ['only' => [
	'index', 'show', 'update', 'destroy'
]]);

Route::get('me', 'Rest\UserController@user');
Route::patch('users/{id}/password', 'Rest\UserController@password');
Route::patch('users/{id}/welcome', 'Rest\UserController@welcome');
Route::post('users/settings', 'Rest\UserController@settings');
Route::resource('users', 'Rest\UserController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::resource('forms', 'Rest\FormController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::post('evaluations/{id}/acknowledge', 'Rest\EvaluationController@acknowledge');
Route::get('evaluations/{id}/contents', 'Rest\EvaluationController@contents');
Route::patch('evaluations/{id}/remind', 'Rest\EvaluationController@remind');
Route::patch('evaluations/{id}/cancel', 'Rest\EvaluationController@cancel');
Route::patch('evaluations/{id}/hash', 'Rest\EvaluationController@sendHash');
Route::patch('evaluations/{id}/comment', 'Rest\EvaluationController@saveComment');
Route::patch('evaluations/{id}/edit', 'Rest\EvaluationController@userEdit');
Route::patch('evaluations/{id}/decline', 'Rest\EvaluationController@decline');
Route::resource('evaluations', 'Rest\EvaluationController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::resource('watched_forms', 'Rest\WatchedFormController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::get('mentorships/mentees', 'Rest\MentorshipController@mentees');
Route::get('mentorships/mentors', 'Rest\MentorshipController@mentors');
Route::get('mentorships/evaluations', 'Rest\MentorshipController@menteeEvaluations');
Route::resource('mentorships', 'Rest\MentorshipController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::patch('milestones/{id}/levels', 'Rest\MilestoneController@levels');
Route::patch('milestones/order', 'Rest\MilestoneController@saveOrder');
Route::resource('milestones', 'Rest\MilestoneController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::patch('competencies/order', 'Rest\CompetencyController@saveOrder');
Route::resource('competencies', 'Rest\CompetencyController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::post('alumni/email', 'Rest\AlumController@sendEmails');
Route::get('alumni/hash/{hash}', 'Rest\AlumController@getByHash');
Route::patch('alumni/hash/{hash}', 'Rest\AlumController@updateWithHash');
Route::patch('alumni/subscription/{hash}/', 'Rest\AlumController@updateSubscription');
Route::post('alumni/import/users', 'Rest\AlumController@importFromUsers');
Route::resource('alumni', 'Rest\AlumController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::post('advancements/many', 'Rest\AdvancementController@storeMany');
Route::resource('advancements', 'Rest\AdvancementController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::resource('flagged_evaluations', 'Rest\FlaggedEvaluationController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::get('directory_entries/csv', 'Rest\DirectoryController@csv');
Route::resource('directory_entries', 'Rest\DirectoryController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::resource('user_features', 'Rest\UserFeatureController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::resource('locations', 'Rest\LocationController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::get('case_logs/by-user', 'Rest\CaseLogController@byUser');
Route::resource('case_logs', 'Rest\CaseLogController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::delete('case_log_details_schemas/{type}', 'Rest\CaseLogDetailsSchemaController@destroyByType')
	->where('type', '[A-Za-z_]+');
Route::resource('case_log_details_schemas', 'Rest\CaseLogDetailsSchemaController', ['only' => [
	'index', 'store', 'show'
]]);

Route::get('merits/by-user', 'Rest\MeritReportController@byUser');
Route::post('merits/export', 'Rest\MeritReportController@export');
Route::resource('merits', 'Rest\MeritReportController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::Get('merit-forms/view/{id}', 'Rest\MeritReportFormController@view');
Route::resource('merit-forms', 'Rest\MeritReportFormController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::get('faculty360/forms/{id}/view', 'Rest\FacultyPeerFormController@view');
Route::resource('faculty360/forms', 'Rest\FacultyPeerFormController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);

Route::patch('faculty360/evaluations/{hash}/save', 'Rest\FacultyPeerEvaluationController@save');
Route::patch('faculty360/evaluations/{hash}/submit', 'Rest\FacultyPeerEvaluationController@submit');
Route::get('faculty360/evaluations/{hash}/send-new', 'Rest\FacultyPeerEvaluationController@sendHash');
Route::resource('faculty360/evaluations', 'Rest\FacultyPeerEvaluationController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::resource('scheduled-requests', 'Rest\ScheduledRequestController', ['only' => [
	'index', 'show', 'destroy'
]]);

Route::get('news-items/unseen', 'Rest\NewsItemController@unseen');
Route::patch('news-items/{id}/dismiss', 'Rest\NewsItemController@dismiss');
Route::patch('news-items/{id}/temporarily-dismiss', 'Rest\NewsItemController@temporarilyDismiss');
Route::resource('news-items', 'Rest\NewsItemController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);

Route::post(
	'highlighted-questions/user/{userId}',
	'Rest\HighlightedQuestionController@responsesForUser'
);
Route::resource('highlighted-questions', 'Rest\HighlightedQuestionController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);
Route::resource('highlighted-questions-questions', 'Rest\HighlightedQuestionQuestionController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);
Route::resource('highlighted-questions-values', 'Rest\HighlightedQuestionQuestionValueController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);

Route::post('custom-reports/{id}/run', 'Rest\CustomReportController@runReport');
Route::resource('custom-reports', 'Rest\CustomReportController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);

Route::resource('blocks', 'Rest\BlockController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);

Route::get('programs/{id}/evaluations', 'Rest\ProgramController@evaluations');
Route::post('programs/{id}/administrators/{userId}', 'Rest\ProgramController@addAdministrator');
Route::delete('programs/{id}/administrators/{userId}', 'Rest\ProgramController@removeAdministrator');
Route::resource('programs', 'Rest\ProgramController', ['only' => [
	'index', 'store', 'create', 'show', 'update', 'destroy'
]]);


Route::resource('api/evaluations', 'EvaluationsController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);

Route::get('api/dashboard/subject', 'DashboardController@subjectEvaluations');
Route::get('api/dashboard/evaluator', 'DashboardController@evaluatorEvaluations');

Route::resource('api/external-evaluations', 'ExternalEvaluationController', ['only' => [
	'index', 'store', 'show'
]]);
