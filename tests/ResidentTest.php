<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ResidentTest extends TestCase
{
	use DatabaseMigrations;

    public function setUp(){
        parent::setUp();

        $this->user = factory(App\User::class, "resident")->create();
		$this->faculty = factory(App\User::class, "faculty")->create();
		$this->form = factory(App\Form::class, "resident")->create();
    }

    public function testDashboard(){
        $this->actingAs($this->user)
            ->visit("/")
            ->see("Account type: Resident")
            ->see("You have no pending evaluations");
    }

	public function testRequest(){
		$firstOfMonth = Carbon\Carbon::parse("first day of this month");
		$this->actingAs($this->user)
			->visit("/request")
			->see("Request evaluation")
			->type($this->faculty->id, "evaluator_id")
			->type($this->form->id, "form_id")
			->type($firstOfMonth->format("Y-m-d"), "evaluation_date")
			->press("Request Evaluation")
			->seePageIs("/dashboard")
			->seeInDatabase("evaluations", [
				"subject_id" => $this->user->id,
				"evaluator_id" => $this->faculty->id,
				"form_id" => $this->form->id
			]);
	}
}
