<?php

use App\Block;
use App\User;
use App\Form;
use App\Evaluation;

use anlutro\LaravelSettings\Facade as Setting;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function ($faker) {
    return [
        'username' => $faker->userName,
        "status" => "active",
        "first_name" => $faker->firstName,
        "last_name" => $faker->lastName,
        'email' => $faker->email,
        'password' => str_random(10),
        'remember_token' => str_random(10)
    ];
});

$factory->defineAs(App\User::class, "resident", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);
    $resident = [
        "type" => "resident",
        "training_level" => "ca-1"
    ];
    return array_merge($user, $resident);
});

$factory->defineAs(App\User::class, "fellow", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);
    $fellow = [
        "type" => "resident",
        "training_level" => "fellow"
    ];
    return array_merge($user, $fellow);
});

$factory->defineAs(App\User::class, "faculty", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);
    $faculty = [
        "type" => "faculty",
        "notifications" => "yes",
        "reminder_frequency" => "daily",
        "remind_only_if_pending" => "no"
    ];
    return array_merge($user, $faculty);
});

$factory->defineAs(App\User::class, "staff", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);
    $staff = [
        "type" => "staff",
    ];
    return array_merge($user, $staff);
});

$factory->defineAs(App\User::class, "admin", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);
    $admin = [
        "type" => "admin"
    ];
    return array_merge($user, $admin);
});

$factory->define(App\Form::class, function($faker){
    return [
        "title" => $faker->word,
        "status" => "active"
    ];
});

$factory->defineAs(App\Form::class, "resident", function($faker) use ($factory){
    $form = $factory->raw(App\Form::class);
    $resident = [
        "xml_path" => "tests/resident_form.xml",
        "type" => "resident",
        "evaluator_type" => "faculty",
        "visibility" => "visible"
    ];
    return array_merge($form, $resident);
});

$factory->defineAs(App\Form::class, "fellow", function($faker) use ($factory){
    $form = $factory->raw(App\Form::class);
    $fellow = [
        "xml_path" => "tests/fellow_form.xml",
        "type" => "fellow",
        "evaluator_type" => "faculty",
        "visibility" => "visible"
    ];
    return array_merge($form, $fellow);
});

$factory->defineAs(App\Form::class, "staff", function($faker) use ($factory){
    $form = $factory->raw(App\Form::class);
    $staff = [
        "xml_path" => "tests/staff_form.xml",
        "type" => "resident",
        "evaluator_type" => "staff",
        "visibility" => "hidden"
    ];
    return array_merge($form, $staff);
});

$factory->defineAs(App\Form::class, "faculty", function($faker) use ($factory){
    $form = $factory->raw(App\Form::class);
    $faculty = [
        "xml_path" => "tests/faculty_form.xml",
        "type" => "faculty",
        "evaluator_type" => "resident",
        "visibility" => "anonymous"
    ];
    return array_merge($form, $faculty);
});

$factory->define(App\Evaluation::class, function($faker){
    return [
        // "form_id" => $overrides["form_id"],
        // "evaluator_id" => $overrides["evaluator_id"],
        // "subject_id" => $overrides["evaluator_id"],
        // "requested_by_id" => $overrides["requested_by_id"],
        "status" => "pending",
        "request_date" => $faker->date,
        "evaluation_date" => $faker->date,
        "request_ip" => str_random(10)
    ];
});

$factory->defineAs(App\Evaluation::class, "complete", function($faker) use ($factory){
    $evaluation = $factory->raw(App\Evaluation::class);
    $trainingLevel = "ca-1";
    return array_merge($evaluation, [
        "status" => "complete",
        "training_level" => $trainingLevel,
        "complete_date" => $faker->date,
        "complete_ip" => str_random(10)
    ]);
});

$factory->define(App\Response::class, function($faker){
    return [
        // "evaluation_id" => $overrides["evaluation_id"],
        // "question_id" => $overrides["question_id"],
        "response" => $faker->randomDigit,
        "weight" => 100
    ];
});

$factory->define(App\TextResponse::class, function($faker){
    return [
        // "evaluation_id" => $overrides["evaluation_id"],
        // "question_id" => $overrides["question_id"],
        "response" => $faker->text
    ];
});

$factory->define(App\FlaggedEvaluation::class, function($faker){
    return [
        // "evaluation_id" => $overrides["evaluation_id"],
        "requested_action" => array_rand(Setting::get("flaggedActions")),
        "reason" => $faker->word
    ];
});

$factory->define(App\Milestone::class, function($faker){
    return [
        "title" => $faker->word,
        "description" => $faker->text,
        "type" => "resident"
    ];
});

$factory->define(App\Competency::class, function($faker){
    return [
        "title" => $faker->word,
        "description" => $faker->text
    ];
});

$factory->define(App\MilestoneQuestion::class, function($faker){
    return [
        // "form_id" => $overrides["form_id"],
        // "question_id" => $overrides["question_id"],
        // "milestone_id" => $overrides["milestone_id"]
    ];
});

$factory->define(App\CompetencyQuestion::class, function($faker){
    return [
        // "form_id" => $overrides["form_id"],
        // "question_id" => $overrides["question_id"],
        // "competency_id" => $overrides["competency_id"]
    ];
});

$factory->define(App\Mentorship::class, function($faker){
    return [
        // "mentor_id" => $overrides["mentor_id"],
        // "mentee_id" => $overrides["mentee_id"],
        "status" => "active"
    ];
});

$factory->define(App\Block::class, function($faker){
    return [
        "year" => "2014-2015",
        "block_number" => $faker->randomDigit,
        "block_name" => $faker->word,
        "start_date" => $faker->date,
        "end_date" => $faker->date
    ];
});

$factory->define(App\BlockAssignment::class, function($faker){
    return [
        // "block_id" => $overrides["block_id"],
        // "user_id" => $overrides["user_id"],
        "location" => $faker->word
    ];
});
