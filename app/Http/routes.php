<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get("/", "MainController@dashboard");

Route::get("login", "Auth\AuthController@getLogin");
Route::post("login", "Auth\AuthController@postLogin");
Route::get("logout", "Auth\AuthController@getLogout");

Route::get("password/email", "Auth\PasswordController@getEmail");
Route::post("password/email", "Auth\PasswordController@postEmail");
Route::get("password/reset/{token}", "Auth\PasswordController@getReset");
Route::post("password/reset", "Auth\PasswordController@postReset");

Route::get("dashboard", "MainController@dashboard");
Route::get("dashboard/evaluations", "MainController@evaluations");
Route::post("dashboard/evaluations", "MainController@evaluations");
Route::get("dashboard/faculty", "MainController@dashboardFaculty");
Route::get("dashboard/faculty/evaluations", "MainController@facultyEvaluations");
Route::post("dashboard/faculty/evaluations", "MainController@facultyEvaluations");

Route::post("evaluation/cancel", "MainController@cancelEvaluation");
Route::get("evaluation/{id}", "MainController@evaluation");
Route::post("evaluation/{id}", "MainController@saveEvaluation");

Route::get("request/faculty", "MainController@request");
Route::post("request/faculty", "MainController@createRequest");
Route::get("request", "MainController@request");
Route::post("request", "MainController@createRequest");

Route::get("user", "MainController@user");
Route::post("user", "MainController@saveUser");
Route::post("user/reminders", "MainController@saveUserReminders");
Route::post("user/notifications", "MainController@saveUserNotifications");

Route::get("contact", "MainController@contact");
Route::post("contact", "MainController@saveContact");

Route::get("photos/{filename}", "FileController@getPhoto");
Route::get("graph/{filename}", "FileController@getGraph");

Route::get("manage/settings", "ManageController@settings");
Route::post("manage/settings", "ManageController@saveSettings");
Route::get("manage/evaluations", "ManageController@evaluations");
Route::post("manage/evaluations", "ManageController@archive");
Route::get("manage/evaluations/get", "ManageController@getEvaluations");
Route::post("manage/evaluations/{id}", "ManageController@editEvaluation");
Route::get("manage/accounts", "ManageController@accounts");
Route::get("manage/accounts/get/{type}", "ManageController@getAccounts");
Route::post("manage/accounts/{action}", "ManageController@account");
Route::get("manage/forms", "ManageController@forms");
Route::get("manage/forms/get/{type}", "ManageController@getForms");
Route::get("manage/forms/add", "ManageController@formBuilder");
Route::post("manage/forms/add", "ManageController@addForm");
Route::get("manage/forms/{id}", "ManageController@viewForm");
Route::post("manage/forms/{id}", "ManageController@editForm");
Route::get("manage/milestones-competencies", "ManageController@milestonesCompetencies");
Route::get("manage/milestones/get", "ManageController@getMilestones");
Route::post("manage/milestones/{action}", "ManageController@milestone");
Route::get("manage/competencies/get", "ManageController@getCompetencies");
Route::post("manage/competencies/{action}", "ManageController@competency");
Route::get("manage/mentors", "ManageController@mentors");
Route::get("manage/mentors/get", "ManageController@getMentors");
Route::post("manage/mentors/{action}", "ManageController@mentor");
Route::get("manage/block-assignments", "ManageController@blockAssignments");
Route::post("manage/block-assignments", "ManageController@saveBlockAssignments");
Route::post("manage/block-assignments/table", "ManageController@blockAssignmentsTable");
Route::post("manage/block-assignments/get", "ManageController@getBlockAssignments");

Route::post("report/aggregate", "ReportController@aggregate");
Route::post("report/specific", "ReportController@specific");
Route::post("report/faculty", "ReportController@facultyReport");
Route::post("report/export", "ReportController@getTSV");
Route::post("report/pdf", "ReportController@getPDF");
Route::get("report/needs-eval", "ReportController@needsEvaluations");
Route::get("report/needs-eval/get", "ReportController@getNeedsEvaluationsJSON");
Route::get("report/needs-eval/tsv", "ReportController@getNeedsEvaluationsTSV");
Route::get("report/milestones-competencies-forms", "ReportController@milestonesCompetenciesForms");
Route::get("report/milestones-competencies-forms/export/{type}", "ReportController@exportMilestonesCompetenciesForms");
Route::get("report/milestones-competencies-forms/{type}", "ReportController@getMilestonesCompetenciesForms");
Route::get("report/{type}", "ReportController@stats");
Route::post("report/{type}", "ReportController@getStats");
