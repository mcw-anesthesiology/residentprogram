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
Route::patch("users/{id}/password", "Rest\UserController@password");
Route::patch("users/{id}/welcome", "Rest\UserController@welcome");
Route::resource("users", "Rest\UserController", ["only" => [
	"index", "store", "show", "update"
]]);
Route::resource("forms", "Rest\FormController", ["only" => [
	"index", "store", "show", "update"
]]);
Route::patch("evaluations/{id}/remind", "Rest\EvaluationController@remind");
Route::patch("evaluations/{id}/cancel", "Rest\EvaluationController@cancel");
Route::patch("evaluations/{id}/hash", "Rest\EvaluationController@sendHash");
Route::patch("evaluations/{id}/comment", "Rest\EvaluationController@saveComment");
Route::patch("evaluations/{id}/edit", "Rest\EvaluationController@userEdit");
Route::resource("evaluations", "Rest\EvaluationController", ["only" => [
	"index", "store", "show", "update"
]]);
Route::resource("watched_forms", "Rest\WatchedFormController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::resource("mentorships", "Rest\MentorshipController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::patch("milestones/{id}/levels", "Rest\MilestoneController@levels");
Route::resource("milestones", "Rest\MilestoneController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::resource("competencies", "Rest\CompetencyController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::patch("alumni/{id}/email", "Rest\AlumController@sendEmail");
Route::patch("alumni/email", "Rest\AlumController@sendManyEmails");
Route::patch("alumni/hash/{hash}", "Rest\AlumController@updateWithHash");
Route::patch("alumni/subscription/{hash}/", "Rest\AlumController@updateSubscription");
Route::post("alumni/import/users", "Rest\AlumController@importFromUsers");
Route::resource("alumni", "Rest\AlumController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::post("advancements/many", "Rest\AdvancementController@storeMany");
Route::resource("advancements", "Rest\AdvancementController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);
Route::resource("flagged_evaluations", "Rest\FlaggedEvaluationController", ["only" => [
	"index", "store", "show", "update", "destroy"
]]);


Route::get("/", function(){
	return redirect("dashboard");
});

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
Route::get("dashboard/faculty", "MainController@dashboardFaculty");

Route::get("evaluation/{id}", "MainController@evaluation");
Route::post("evaluation/{id}", "MainController@saveEvaluation");

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

Route::get("alum/{hash}", "MainController@alumni");
Route::get("alum/{hash}/subscription", "MainController@alumniSubscription");

Route::get("contact", "MainController@contact");
Route::post("contact", "MainController@saveContact");

Route::get("photos/{filename}", "FileController@getPhoto");
Route::get("graph/{filename}", "FileController@getGraph");

Route::get("manage/settings", "ManageController@settings");
Route::post("manage/settings", "ManageController@saveSettings");
Route::get("manage/evaluations", "ManageController@evaluations");
Route::get("manage/accounts", "ManageController@accounts");
Route::get("manage/accounts/advance", "ManageController@advanceAccounts");
Route::get("manage/forms", "ManageController@forms");
Route::get("manage/forms/add", "ManageController@formBuilder");
Route::get("manage/forms/{id}", "ManageController@viewForm");
Route::get("manage/milestones-competencies", "ManageController@milestonesCompetencies");
Route::get("manage/mentors", "ManageController@mentors");
Route::get("manage/block-assignments", "ManageController@blockAssignments");
Route::post("manage/block-assignments", "ManageController@saveBlockAssignments");
Route::post("manage/block-assignments/table", "ManageController@blockAssignmentsTable");
Route::post("manage/block-assignments/get", "ManageController@getBlockAssignments");
Route::get("manage/alumni", "ManageController@alumni");
Route::get("manage/alumni/import", "ManageController@importAlumni");
Route::get("manage/watched-forms", "ManageController@watchedForms");

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
