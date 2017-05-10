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

Route::patch('users/{id}/password', 'Rest\UserController@password');
Route::patch('users/{id}/welcome', 'Rest\UserController@welcome');
Route::resource('users', 'Rest\UserController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::resource('forms', 'Rest\FormController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::patch('evaluations/{id}/remind', 'Rest\EvaluationController@remind');
Route::patch('evaluations/{id}/cancel', 'Rest\EvaluationController@cancel');
Route::patch('evaluations/{id}/hash', 'Rest\EvaluationController@sendHash');
Route::patch('evaluations/{id}/comment', 'Rest\EvaluationController@saveComment');
Route::patch('evaluations/{id}/edit', 'Rest\EvaluationController@userEdit');
Route::resource('evaluations', 'Rest\EvaluationController', ['only' => [
	'index', 'store', 'show', 'update'
]]);
Route::resource('watched_forms', 'Rest\WatchedFormController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
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

Route::patch('alumni/{id}/email', 'Rest\AlumController@sendEmail');
Route::patch('alumni/email', 'Rest\AlumController@sendManyEmails');
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
Route::resource('case_logs', 'Rest\CaseLogController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
Route::delete('case_log_details_schemas/{type}', 'Rest\CaseLogDetailsSchemaController@destroyByType')
	->where('type', '[A-Za-z_]+');
Route::resource('case_log_details_schemas', 'Rest\CaseLogDetailsSchemaController', ['only' => [
	'index', 'store', 'show'
]]);

Route::get('faculty360/forms/{id}/view', 'Rest\FacultyPeerFormController@view');
Route::resource('faculty360/forms', 'Rest\FacultyPeerFormController', ['only' => [
	'index', 'store', 'create', 'show', 'destroy'
]]);

Route::patch('faculty360/evaluations/{hash}/save', 'Rest\FacultyPeerEvaluationController@save');
Route::patch('faculty360/evaluations/{hash}/submit', 'Rest\FacultyPeerEvaluationController@submit');
Route::get('faculty360/evaluations/{hash}/send-new', 'Rest\FacultyPeerEvaluationController@sendHash');
Route::resource('faculty360/evaluations', 'Rest\FacultyPeerEvaluationController', ['only' => [
	'index', 'store', 'show', 'update', 'destroy'
]]);
