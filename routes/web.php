<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the 'web' middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout');
Route::post('/auth', 'Auth\LoginController@externalLogin');

Route::get('/', function(){
	return redirect('dashboard');
});
Route::get('home', function(){
	return redirect('dashboard');
});
Route::get('help', 'MainController@help');
Route::get('about', function() {
	return view('about');
});

Route::get('dashboard', 'MainController@dashboard');
Route::get('dashboard/old', 'MainController@oldDashboard');
Route::get('dashboard/faculty', 'MainController@dashboardFaculty');

Route::get('evaluation/{id}', 'MainController@evaluation');
Route::post('evaluation/{id}', 'MainController@saveEvaluation');

Route::get('evaluate/{hash}', 'MainController@evaluationByHashLink');
Route::post('evaluate/{hash}', 'MainController@saveEvaluationByHashLink');

Route::get('request/external', 'ExternalEvaluationController@route');
Route::get('request/{requestType?}', 'MainController@request');
Route::post('request/{requestType?}', 'MainController@createRequest');

Route::get('profile/{id}', 'MainController@userProfile');
Route::get('profile/evaluations/{id}/{type?}', 'MainController@profileEvaluations');

Route::get('directory', 'MainController@pagerDirectory');

Route::get('calendar', 'MainController@calendar');

Route::post('emails', 'EmailController@send');
Route::post('emails/reminders', 'EmailController@reminders');

Route::get('photos/{filename}', 'FileController@getPhoto');
Route::get('graph/{filename}', 'FileController@getGraph');
Route::get('schemas/{schema}', 'FileController@getSchema');

Route::get('manage/settings', 'ManageController@settings');
Route::post('manage/settings', 'ManageController@saveSettings');
Route::get('manage/evaluations', 'ManageController@evaluations');
Route::get('manage/accounts', 'ManageController@accounts');
Route::get('manage/accounts/advance', 'ManageController@advanceAccounts');
Route::get('manage/forms', 'ManageController@forms');
Route::get('manage/forms/add', 'ManageController@formBuilder');
Route::post('manage/forms/edit', 'ManageController@copyAndEditForm');
Route::get('manage/forms/{id}', 'ManageController@viewForm');
Route::get('manage/milestones-competencies', 'ManageController@milestonesCompetencies');
Route::get('manage/mentors', 'ManageController@mentors');
Route::get('manage/news-items', 'ManageController@newsItems');
Route::get('manage/block-assignments', 'ManageController@blockAssignments');
Route::post('manage/block-assignments', 'ManageController@saveBlockAssignments');
Route::post('manage/block-assignments/table', 'ManageController@blockAssignmentsTable');
Route::post('manage/block-assignments/get', 'ManageController@getBlockAssignments');
Route::get('manage/watched-forms', 'ManageController@watchedForms');
Route::get('manage/user-features', 'ManageController@userFeatures');
Route::get('manage/programs', 'ManageController@programs');
Route::get('manage/highlighted-questions', 'ManageController@highlightedQuestions');
Route::get('manage/scheduled-requests', 'ManageController@scheduledRequests');
Route::get('manage/beyond-milestones', 'ManageController@beyondMilestones');
Route::get('manage/users', 'ManageController@users');

Route::get('reports', 'ReportController@reports');
Route::post('reports/egress-pairings/overlaps', 'EgressPairingReportController@getOverlaps');
Route::post('reports/egress-pairings/send-reports', 'EgressPairingReportController@sendReports');

Route::post('reports/case-overlaps/add-cases', 'AnesthesiaCaseController@addCases');
Route::post('reports/case-overlaps/overlaps', 'AnesthesiaCaseController@getOverlaps');
Route::post('reports/case-overlaps/pairings', 'AnesthesiaCaseController@getPairings');
Route::post('reports/case-overlaps/pairings/{userId}', 'AnesthesiaCaseController@getUserPairings');
Route::post('reports/case-overlaps/send-reports', 'AnesthesiaCaseController@sendPairingReports');

Route::get('report/trainee', 'ReportController@traineeReport');
Route::post('report/trainee', 'ReportController@trainee');
Route::get('report/form', 'ReportController@formReportPage');
Route::post('report/form', 'ReportController@formReport');
Route::post('report/export', 'ReportController@getTSV');
Route::post('report/pdf', 'ReportController@getPDF');
Route::get('report/beyond-milestones', 'ReportController@beyondMilestones');

Route::post('report/needs/evaluations', 'ReportController@needsEvaluations');
Route::post('report/pending-requests', 'ReportController@pendingRequests');

Route::get('report/stats/{type}', 'ReportController@stats');
Route::post('report/stats/{evaluationType}/{userType}', 'ReportController@getStats');

Route::get('contact', 'ContactController@contact');
Route::post('contact', 'ContactController@saveContact');

Route::get('user', 'UserController@user');
Route::post('user', 'UserController@saveUser');
Route::patch('user/reminders', 'UserController@saveUserReminders');
Route::patch('user/notifications', 'UserController@saveUserNotifications');

Route::get('merit', function() {
	return redirect('/questionnaires');
});
Route::get('questionnaires', 'FacultyMeritController@merit');
Route::get('manage/questionnaires', 'FacultyMeritController@manage');

// TODO: Change url?
Route::get('faculty360', 'FacultyPeerEvaluationController@request');
Route::post('faculty360', 'FacultyPeerEvaluationController@createEvaluation');
Route::get('faculty360/view/{id}', 'FacultyPeerEvaluationController@view');
Route::get('faculty360/evaluate/{hash}', 'FacultyPeerEvaluationController@evaluate');
Route::get('manage/faculty360', 'FacultyPeerEvaluationController@manage');

Route::get('case-log', 'CaseLogController@caseLog');
Route::get('manage/case-logs', 'CaseLogController@manage');

Route::get('alum/{hash}', 'AlumniController@alumni');
Route::get('manage/alumni', 'AlumniController@manage');

Route::get('case-overlaps', function () {
	return view('case-overlaps');
})->middleware('auth', 'shared');
