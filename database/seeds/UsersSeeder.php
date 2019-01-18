<?php

use Illuminate\Database\Seeder;

use App\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		User::create([
			'username' => 'admin',
			'type' => 'admin',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'Admin',
			'email' => 'admin@example.com',
			'password' => bcrypt('test')
		]);

		User::create([
			'username' => 'faculty',
			'type' => 'faculty',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'Faculty',
			'email' => 'faculty@example.com',
			'password' => bcrypt('test')
		]);

		factory(User::class, 'faculty', 2)->create([
			'password' => bcrypt('test')
		]);

		User::create([
			'username' => 'resident',
			'type' => 'resident',
			'training_level' => 'ca-1',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'Resident',
			'email' => 'resident@example.com',
			'password' => bcrypt('test')
		]);

		factory(User::class, 'resident', 2)->create([
			'password' => bcrypt('test')
		]);

		User::create([
			'username' => 'fellow',
			'type' => 'resident',
			'training_level' => 'fellow',
			'secondary_training_level' => 'Pediatric',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'Fellow',
			'email' => 'Fellow@example.com',
			'password' => bcrypt('test')
		]);

		User::create([
			'username' => 'staff',
			'type' => 'staff',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'Staff',
			'email' => 'staff@example.com',
			'password' => bcrypt('test')
		]);

		User::create([
			'username' => 'app',
			'type' => 'staff',
			'status' => 'active',
			'first_name' => 'Sample',
			'last_name' => 'APP',
			'email' => 'app@example.com',
			'password' => bcrypt('test')
		]);
    }
}
