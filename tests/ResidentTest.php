<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

class ResidentTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

		$this->user = factory(App\User::class, "resident")->create();
		$this->faculty = factory(App\User::class, "faculty")->create();
		$this->form = factory(App\Form::class, "resident")->create();
        $this->facultyForm = factory(App\Form::class, "faculty")->create();
		$this->milestone = factory(App\Milestone::class)->create();
		$this->competency = factory(App\Competency::class)->create();
		$this->milestoneQuestions = [
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"milestone_id" => $this->milestone->id
			]),
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"milestone_id" => $this->milestone->id
			])
		];
		$this->competencyQuestions = [
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"competency_id" => $this->competency->id
			]),
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"competency_id" => $this->competency->id
			])
		];
    }

    public function testDashboard(){
        $this->actingAs($this->user)
            ->visit("/")
            ->see("Resident Evaluation System")
            ->see("Account type: Resident");
    }

	public function testRequest(){
		$firstOfMonth = Carbon::parse("first day of this month")->toDateString();
		$this->actingAs($this->user)
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
		$eval = factory(App\Evaluation::class)->create([
			"form_id" => $this->form->id,
			"evaluator_id" => $this->faculty->id,
			"subject_id" => $this->user->id,
			"requested_by_id" => $this->user->id
		]);

		$this->actingAs($this->user)
			->visit("/evaluation/" . $eval->id)
			->see("View Evaluation")
			->see($eval->id)
			->see("Pending")
			->see("Resident Evaluation Form");
	}

	public function testViewComplete(){
		$eval = factory(App\Evaluation::class, "complete")->create([
			"form_id" => $this->form->id,
			"evaluator_id" => $this->faculty->id,
			"subject_id" => $this->user->id,
			"requested_by_id" => $this->user->id
		]);

		$this->actingAs($this->user)
			->visit("/evaluation/" . $eval->id)
			->see("View Evaluation")
			->see($eval->id)
			->see("Complete")
			->see("Resident Evaluation Form");
	}

	public function testReport(){
		$eval = factory(App\Evaluation::class, "complete")->create([
			"form_id" => $this->form->id,
			"evaluator_id" => $this->faculty->id,
			"subject_id" => $this->user->id,
			"requested_by_id" => $this->user->id
		]);
		$responses = [
			factory(App\Response::class)->create([
				"evaluation_id" => $eval->id,
				"question_id" => "q1"
			]),
			factory(App\Response::class)->create([
				"evaluation_id" => $eval->id,
				"question_id" => "q2"
			])
		];
		$textResponse = factory(App\TextResponse::class)->create([
			"evaluation_id" => $eval->id,
			"question_id" => "q3"
		]);

		$startDate = Carbon::now()->subMonths(3);
		$endDate = Carbon::now();
		$this->actingAs($this->user)
            ->visit("/dashboard")
			->call("POST", "/report/specific", [
				"_token" => csrf_token(),
				"resident" => $this->user->id,
				"startDate1" => $startDate,
				"endDate1" => $endDate,
				"trainingLevel" => "all",
				"graphs" => "all"
			]);
	}

    public function testRequestFacultyEval(){
        $firstOfMonth = Carbon::parse("first day of this month")->toDateString();
        $this->actingAs($this->user)
            ->visit("/request/faculty")
            ->see("Create faculty evaluation");

        $this->actingAs($this->user)
            ->call("POST", "/request/faculty", [
                "subject_id" => $this->faculty->id,
                "form_id" => $this->facultyForm->id,
                "evaluation_date" => $firstOfMonth,
                "_token" => csrf_token()
            ]);

        $this->seeInDatabase("evaluations", [
            "subject_id" => $this->faculty->id,
            "evaluator_id" => $this->user->id,
            "requested_by_id" => $this->user->id,
            "form_id" => $this->facultyForm->id,
            "status" => "pending",
            "evaluation_date" => $firstOfMonth
        ]);
    }

    public function testSaveFacultyEval(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->facultyForm->id,
            "evaluator_id" => $this->user->id,
            "subject_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->see("Complete evaluation")
            ->see($eval->id)
            ->see("Pending")
            ->see("Faculty Evaluation Form")
            ->select("good", "q1")
            ->type("Have none.", "q3")
            ->press("Save evaluation");

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "pending"
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q1",
            "response" => "good"
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q3",
            "response" => "Have none."
        ]);
    }

    public function testSubmitFacultyEval(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->facultyForm->id,
            "evaluator_id" => $this->user->id,
            "subject_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->see("Complete evaluation")
            ->see($eval->id)
            ->see("Pending")
            ->see("Faculty Evaluation Form")
            ->select("good", "q1")
            ->select("yes", "q2")
            ->type("Have none.", "q3")
            ->press("Complete evaluation");

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "complete"
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q1",
            "response" => "good"
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q2",
            "response" => "yes"
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q3",
            "response" => "Have none."
        ]);
    }
}
