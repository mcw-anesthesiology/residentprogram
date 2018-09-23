<?php

use Illuminate\Database\Seeder;

use App\Helpers\CaseParser;

use App\AnesthesiaCase;
use App\User;

class AnesthesiaCaseSeeder extends Seeder
{
	const NUM_CASES = 50;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$faker = \Faker\Factory::create();

		$faculty = User::active()->where('type', 'faculty')->get()->toArray();
		$trainees = User::active()->where('type', 'resident')->get()->toArray();

		factory(AnesthesiaCase::class, self::NUM_CASES)->create()->each(function ($case) use ($faker, $faculty, $trainees) {
			$users = [
				$faker->randomElement($faculty),
				$faker->randomElement($trainees)
			];

			Log::debug($users);

			foreach ($users as $user) {
				$times = [
					$faker->dateTimeBetween($case->start_time, $case->stop_time),
					$faker->dateTimeBetween($case->start_time, $case->stop_time)
				];
				asort($times);

				$case->users()->attach($user['id'], [
					'start_time' => $times[0],
					'stop_time' => $times[1]
				]);
			}
		});
    }
}
