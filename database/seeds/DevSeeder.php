<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$this->call([
			UsersSeeder::class,
			FormsSeeder::class
		]);
    }
}
