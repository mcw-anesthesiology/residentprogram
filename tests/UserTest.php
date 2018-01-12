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

	public function testChangePassword(){
		$faker = Faker::create();
		$oldPassword = $faker->password();
		$this->user->password = bcrypt($oldPassword);
		$this->user->save();

		$newPassword = $faker->password();

		$this->actingAs($this->user)
			->visit("/user")
			->see("Update Password")
			->type($oldPassword, "old_password")
			->type($newPassword, "new_password")
			->type($newPassword, "new_password_confirm")
			->press("Update Password");

		$this->user = $this->user->fresh();

		$this->assertTrue(password_verify($newPassword, $this->user->password));
	}

	public function testChangeReminders(){
		$newFrequency = "weekly";

		$this->actingAs($this->user)
			->visit("/user")
			->see("Reminders")
			->select($newFrequency, "frequency")
			->press("Update Reminder Preferences");

		$this->user = $this->user->fresh();
		$this->assertEquals($this->user->reminder_frequency, $newFrequency);
	}

	public function testChangeNotifications(){
		$newNotifications = "yes";
		$this->actingAs($this->user)
			->visit("/user")
			->see("Notifications")
			->select($newNotifications, "notifications")
			->press("Update Notification Preferences");

		$this->user = $this->user->fresh();
		$this->assertEquals($this->user->notifications, "yes");
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
