<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Artisan;

class ResidentTest extends TestCase
{

	public static function setUpBeforeClass(){
		parent::setUpBeforeClass();

		Artisan::exec("migrate:refresh");
	}

    public function setUp(){
        parent::setUp();

		// $this->artisan("migrate");
		$this->user = factory(App\User::class, "resident")->create();
		$this->faculty = factory(App\User::class, "faculty")->create();
		$this->form = factory(App\Form::class, "resident")->create();
    }

	public function tearDown(){
		// $this->artisan("migrate:reset");
	}

    public function testDashboard(){
        $this->actingAs($this->user)
            ->visit("/")
            ->see("Account type: Resident")
            ->see("You have no pending evaluations");
    }

	public function testRequest(){
		$firstOfMonth = Carbon\Carbon::parse("first day of this month")->toDateString();
		$response = $this->actingAs($this->user)
			->visit("/request")
			->see("Request resident evaluation")
			->call("POST", "/request", [
				"evaluator_id" => $this->faculty->id,
				"form_id" => $this->form->id,
				"evaluation_date" => $firstOfMonth,
				"_token" => csrf_token()
			]);
		$this->seeInDatabase("evaluations", [
			"subject_id" => $this->user->id,
			"evaluator_id" => $this->faculty->id,
			"form_id" => $this->form->id,
			"requested_by_id" => $this->user->id,
			"evaluation_date" => $firstOfMonth
		]);
	}

	public function testView(){

	}
}
