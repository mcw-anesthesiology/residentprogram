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

Route::get("dashboard", "MainController@dashboard");
Route::get("dashboard/evaluations", "MainController@evaluations");
Route::post("dashboard/evaluations", "MainController@evaluations");

Route::get("evaluation/{id}", "MainController@evaluation");

Route::get("request", "MainController@request");
Route::post("request", "MainController@createRequest");
Route::post("request/get-block", "MainController@requestBlock");
