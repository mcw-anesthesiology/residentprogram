<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory as Faker;

use App\User;

class UserTest extends BrowserKitTestCase
{
    use DatabaseTransactions;

    public function setUp() {
		parent::setUp();

		$this->user = factory(App\User::class, 'faculty')->create();
		$this->user->password = bcrypt('original');
		$this->user->reminder_frequency = 'daily';
		$this->user->remind_only_if_pending = 'no';
		$this->user->notifications = 'yes';
		$this->user->save();
	}

	public function testChangeReminders(){
		$newFrequency = "weekly";

		$this->actingAs($this->user)
			->visit("/user")
			->post('/user/reminders', [
				'_method' => 'PATCH',
				'reminder_frequency' => $newFrequency
			]);

		$this->user = $this->user->fresh();
		$this->assertEquals($this->user->reminder_frequency, $newFrequency);
	}

	public function testChangeNotifications(){
		$newNotifications = "yes";
		$this->actingAs($this->user)
			->visit("/user")
			->post('/user/notifications', [
				'_method' => 'PATCH',
				'notifications' => $newNotifications
			]);

		$this->user = $this->user->fresh();
		$this->assertEquals($this->user->notifications, $newNotifications);
	}

	public function testChangeDefaultEvalRange() {
		$this->changeSetting('defaultEvaluationRange', 'currentYear');
	}

	private function changeSetting($name, $value) {
		$this->actingAs($this->user)
			->post('/users/settings', [
				$name => $value
			])->seeJson([
				$name => true
			]);

		$this->seeInDatabase('user_settings', [
			'user_id' => $this->user->id,
			'name' => $name,
			'value' => $value
		]);
	}
}
