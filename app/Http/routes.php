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

Route::get("dashboard", "MainController@dashboard");
Route::get("dashboard/evaluations", "MainController@evaluations");
Route::post("dashboard/evaluations", "MainController@evaluations");

Route::post("evaluation/cancel", "MainController@cancelEvaluation");
Route::get("evaluation/{id}", "MainController@evaluation");
Route::post("evaluation/{id}", "MainController@saveEvaluation");

Route::get("request", "MainController@request");
Route::post("request", "MainController@createRequest");
Route::post("request/get-block", "MainController@requestBlock");

Route::get("manage/evaluations", "ManageController@evaluations");
// Route::post("manage/evaluations", "ManageController@evaluations");
Route::get("manage/evaluations/get", "ManageController@getEvaluations");
Route::post("manage/evaluations/{id}", "ManageController@editEvaluation");
Route::get("manage/accounts", "ManageController@accounts");
Route::get("manage/accounts/get/{type}", "ManageController@getAccounts");
Route::post("manage/accounts/{action}", "ManageController@account");
// Route::post("manage/accounts", "ManageController@accounts");
Route::get("manage/forms", "ManageController@forms");
Route::get("manage/forms/get", "ManageController@getForms");
Route::get("manage/forms/add", "ManageController@formBuilder");
Route::post("manage/forms/add", "ManageController@addForm");
Route::get("manage/forms/{id}", "ManageController@viewForm");
Route::post("manage/forms/{id}", "ManageController@editForm");
Route::get("manage/milestones-competencies", "ManageController@milestonesCompetencies");
Route::get("manage/milestones/get", "ManageController@getMilestones");
Route::post("manage/milestones/{action}", "ManageController@milestone");
Route::get("manage/competencies/get", "ManageController@getCompetencies");
Route::post("manage/competencies/{action}", "ManageController@competency");
// Route::post("manage/milestones-competencies", "ManageController@milestonesCompetencies");
Route::get("manage/mentors", "ManageController@mentors");
// Route::post("manage/mentors", "ManageController@mentors");
Route::get("manage/mentors/get", "ManageController@getMentors");
Route::post("manage/mentors/{action}", "ManageController@mentor");


// Route::controllers([
// 	"auth" => "Auth\AuthController",
// 	"password" => "Auth\PasswordController"
// ]);
