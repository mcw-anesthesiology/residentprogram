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
// Route::post("manage/accounts", "ManageController@accounts");
Route::get("manage/forms", "ManageController@forms");
// Route::post("manage/forms", "ManageController@forms");
Route::get("manage/miletones-competencies", "ManageController@miletonesCompetencies");
// Route::post("manage/miletones-competencies", "ManageController@miletonesCompetencies");
Route::get("manage/mentors", "ManageController@mentors");
// Route::post("manage/mentors", "ManageController@mentors");


// Route::controllers([
// 	"auth" => "Auth\AuthController",
// 	"password" => "Auth\PasswordController"
// ]);
