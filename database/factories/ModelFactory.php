<?php

use App\Block;
use App\User;

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
        "type" => "resident",
        "status" => "active",
        "training_level" => "ca-1",
        "first_name" => $faker->firstName,
        "last_name" => $faker->lastName,
        'email' => $faker->email,
        'password' => str_random(10),
        'remember_token' => str_random(10)
    ];
});

$factory->defineAs(App\User::class, "faculty", function($faker) use ($factory){
    $user = $factory->raw(App\User::class);

    return array_merge($user, ["type" => "faculty"]);
});

$factory->define(App\Form::class, function($faker){
    return [
        "title" => $faker->word,
        "xml_path" => str_random(10),
        "status" => "active"
    ];
});

$factory->define(App\Evaluation::class, function($faker){
    $forms = Form::all()->lists("id");
    $users = User::all()->lists("id");
    return [
        "form_id" => $faker->randomElement($forms),
        "evaluator_id" => $faker->randomElement($users),
        "subject_id" => $faker->randomElement($users),
        "requested_by_id" => $faker->randomElement($users),
        "status" => "pending",
        "request_date" => $faker->date,
        "request_ip" => str_random(10)
    ];
});

$factory->defineAs(App\Evaluation::class, "complete", function($faker) use ($factory){
    $evaluation = $factory->raw(App\Evaluation::class);
    $trainingLevels = User::all()->lists("training_level");
    return array_merge($evaluation, [
        "status" => "complete",
        "training_level" => $faker->randomElement($trainingLevels),
        "complete_date" => $faker->date,
        "evaluation_date" => $faker->date,
        "complete_ip" => str_random(10)
    ]);
});


$factory->define(App\Milestone::class, function($faker){
    return [
        "title" => $faker->words,
        "description" => $faker->text
    ];
});

$factory->define(App\Competency::class, function($faker){
    return [
        "title" => $faker->words,
        "description" => $faker->text
    ];
});

$factory->define(App\MilestoneQuestion::class, function($faker){
    $forms = Form::all()->lists("id");
    $milestones = Milesone::all()->lists("id");
    return [
        "form_id" => $faker->randomElement($forms),
        "question_id" => str_random(3),
        "milestone_id" => $faker->randomElement($milestones)
    ];
});

$factory->define(App\CompetencyQuestion::class, function($faker){
    $forms = Form::all()->lists("id");
    $competencies = Competency::all()->lists("id");
    return [
        "form_id" => $faker->randomElement($forms),
        "question_id" => str_random(3),
        "milestone_id" => $faker->randomElement($competencies)
    ];
});

$factory->define(App\Mentorship::class, function($faker){
    $users = User::all()->lists("id");
    return [
        "mentor_id" => $faker->randomElement($users),
        "mentee_id" => $faker->randomElement($users),
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
        "block_id" => Block::all()->random()->id,
        "user_id" => User::all()->random()->id,
        "location" => $faker->word
    ];
});
