<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $admin = App\User::create([
            "username" => "jmischka",
            "type" => "admin",
            "status" => "active",
            "first_name" => "Jacob",
            "last_name" => "Mischka",
            "email" => "jmischka@mcw.edu",
            "password" => bcrypt("noodles")
        ]);
        $residents = factory("App\User", 10)->create();
        $faculty = factory("App\User", "faculty", 10)->create();
        $mentorships = factory("App\Mentorship", 20)->create();
        $forms = factory("App\Form", 5)->create();
        $pending = factory("App\Evaluation", 100)->create();
        $complete = factory("App\Evaluation", "complete", 100)->create();
        $blocks = factory("App\Block", 10)->create();
        $blockAssignments = factory("App\BlockAssignment", 50)->create();

        Model::reguard();
    }
}
