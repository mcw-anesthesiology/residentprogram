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
Route::resource("users", "UserController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);

Route::get("/", "MainController@dashboard");

Route::get("login", "Auth\AuthController@getLogin");
Route::post("login", "Auth\AuthController@postLogin");
Route::get("logout", "Auth\AuthController@getLogout");
Route::get("home", function(){
	return redirect("dashboard");
});

Route::get("password/email", "Auth\PasswordController@getEmail");
Route::post("password/email", "Auth\PasswordController@postEmail");
Route::get("password/reset/{token}", "Auth\PasswordController@getReset");
Route::post("password/reset", "Auth\PasswordController@postReset");

Route::get("dashboard", "MainController@dashboard");
Route::post("dashboard/evaluations/flagged", "MainController@flaggedEvaluations");
Route::post("dashboard/evaluations/staff/{limit?}", "MainController@staffEvaluations");
Route::post("dashboard/evaluations/self/{limit?}", "MainController@selfEvaluations");
Route::post("dashboard/evaluations/evaluator/{limit?}", "MainController@evaluatorEvaluations");
Route::get("dashboard/evaluations/{limit?}", "MainController@evaluations");
Route::post("dashboard/evaluations/{limit?}", "MainController@evaluations");
Route::get("dashboard/faculty", "MainController@dashboardFaculty");
Route::get("dashboard/faculty/evaluations/{limit?}", "MainController@facultyEvaluations");
Route::post("dashboard/faculty/evaluations/{limit?}", "MainController@facultyEvaluations");

Route::post("evaluation/cancel", "MainController@cancelEvaluation");
Route::post("evaluation/flag/remove", "MainController@removeFlag");
Route::get("evaluation/{id}", "MainController@evaluation");
Route::post("evaluation/{id}", "MainController@saveEvaluation");
Route::post("evaluation/{id}/comment", "MainController@evaluationComment");
Route::post("evaluation/{id}/edit", "MainController@editEvaluation");
Route::post("evaluation/{id}/flag", "MainController@flagEvaluation");
Route::post("evaluation/{id}/hash", "MainController@evaluationHash");
Route::get("evaluation/{id}/get", "MainController@getEvaluation");

Route::get("evaluate/{hash}", "MainController@evaluationByHashLink");
Route::post("evaluate/{hash}", "MainController@saveEvaluationByHashLink");

Route::get("request/{type?}", "MainController@request");
Route::post("request/{type?}", "MainController@createRequest");

Route::get("profile/{id}", "MainController@userProfile");
Route::get("profile/evaluations/{id}/{type?}", "MainController@profileEvaluations");

Route::get("user", "MainController@user");
Route::post("user", "MainController@saveUser");
Route::post("user/reminders", "MainController@saveUserReminders");
Route::post("user/notifications", "MainController@saveUserNotifications");

Route::get("directory", "MainController@pagerDirectory");
Route::get("directory/get", "MainController@getPagerDirectory");
Route::get("directory/csv", "MainController@getPagerCSV");
Route::post("directory/edit", "ManageController@editPagerDirectoryEntry");
Route::post("directory/delete", "ManageController@deletePagerDirectoryEntry");

Route::get("contact", "MainController@contact");
Route::post("contact", "MainController@saveContact");

Route::get("photos/{filename}", "FileController@getPhoto");
Route::get("graph/{filename}", "FileController@getGraph");

Route::get("manage/settings", "ManageController@settings");
Route::post("manage/settings", "ManageController@saveSettings");
Route::get("manage/evaluations", "ManageController@evaluations");
Route::post("manage/evaluations", "ManageController@archive");
Route::get("manage/evaluations/get/{limit?}", "ManageController@getEvaluations");
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
Route::get("manage/milestone/{id}/{field?}", "ManageController@getMilestone");
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
Route::get("manage/watched-forms", "ManageController@watchedForms");
Route::post("manage/watched-forms", "ManageController@saveWatchedForm");
Route::get("manage/watched-forms/get", "ManageController@getWatchedForms");

Route::post("report/aggregate", "ReportController@aggregate");
Route::post("report/specific", "ReportController@specific");
Route::post("report/form", "ReportController@formReport");
Route::post("report/export", "ReportController@getTSV");
Route::post("report/pdf", "ReportController@getPDF");
Route::get("report/needs-eval", "ReportController@needsEvaluations");
Route::post("report/needs-eval/get", "ReportController@getNeedsEvaluations");
Route::post("report/needs-eval/send-reminder", "ReportController@sendNeedsEvaluationReminder");
Route::post("report/needs-eval/send-all-reminders", "ReportController@sendAllNeedsEvaluationReminders");
Route::post("report/needs-eval/competencies/get", "ReportController@getNeedsCompetenciesJSON");
Route::post("report/needs-eval/competencies/tsv", "ReportController@getNeedsCompetenciesTSV");
Route::post("report/needs-eval/milestones/get", "ReportController@getNeedsMilestonesJSON");
Route::post("report/needs-eval/milestones/tsv", "ReportController@getNeedsMilestonesTSV");
Route::get("report/number-evals", "ReportController@numberOfEvaluations");
Route::post("report/number-evals", "ReportController@getNumberOfEvaluations");
Route::get("report/milestones-competencies-forms", "ReportController@milestonesCompetenciesForms");
Route::get("report/milestones-competencies-forms/export/{type}", "ReportController@exportMilestonesCompetenciesForms");
Route::get("report/milestones-competencies-forms/{type}", "ReportController@getMilestonesCompetenciesForms");
Route::get("report/stats/{type}", "ReportController@stats");
Route::post("report/stats/{type}", "ReportController@getStats");
