<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Faker\Factory as Faker;

class ContactTest extends TestCase {

	use DatabaseTransactions;

	public function setUp() {
		parent::setUp();

		$this->user = factory(App\User::class, 'resident')->create();
	}

	public function testContact(){
		$faker = Faker::create();
		$subject = $faker->words(5, true);
		$body = $faker->text;
		Mail::shouldReceive('send')
			->once()
			->andReturnUsing(function($view, $params) use ($body){
				$this->assertEquals($view, 'emails.contact');
				$this->assertEquals($params['body'], $body);
				$this->assertEquals($params['email'], $this->user->email);
				$this->assertEquals($params['lastName'], $this->user->last_name);
				$this->assertEquals($params['firstName'], $this->user->first_name);
			});

		$this->actingAs($this->user)
			->visit('/contact')
			->type($subject, 'subject')
			->type($body, 'body')
			->press('Submit')
			->see('Thank you! Your message has been sent and I will get back to you shortly')
			->seeInDatabase('contact', [
				'user_id' => $this->user->id,
				'subject' => $subject,
				'body' => $body
			]);
	}
}
