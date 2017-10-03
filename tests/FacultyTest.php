<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Faker\Factory as Faker;

use Illuminate\Support\Facades\Artisan;

class FacultyTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

		$this->admin = factory(App\User::class, "admin")->create();
		$this->user = factory(App\User::class, "faculty")->create();
		$this->resident = factory(App\User::class, "resident")->create();
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
            ->see("Account type: Faculty");
    }

    public function testRequest(){
        $faker = Faker::create();
        $evaluationDateStart = $faker->date();
        $evaluationDateEnd = Carbon::parse($evaluationDateStart)->addMonth();
        $this->actingAs($this->user)
			->visit("/request")
			->see("Create trainee evaluation")
			->post("/request", [
				"subject_id" => $this->resident->id,
				"form_id" => $this->form->id,
				"evaluation_date" => [
                    'startDate' => $evaluationDateStart,
                    'endDate' => $evaluationDateEnd
                ],
				"_token" => csrf_token()
			]);

		$this->seeInDatabase("evaluations", [
			"subject_id" => $this->resident->id,
			"evaluator_id" => $this->user->id,
			"form_id" => $this->form->id,
			"requested_by_id" => $this->user->id,
			"evaluation_date_start" => $evaluationDateStart,
            "evaluation_date_end" => $evaluationDateEnd
		]);
    }

    public function testSaveEvaluation(){
        $eval = factory(App\Evaluation::class)->create([
			"form_id" => $this->form->id,
			"evaluator_id" => $this->user->id,
			"subject_id" => $this->resident->id,
			"requested_by_id" => $this->user->id
		]);

		$this->actingAs($this->user)
			->visit("/evaluation/" . $eval->id)
			->see("Complete Evaluation")
			->see($eval->id)
			->see("Pending")
			->see("Resident Evaluation Form")
            ->select(4, "q1")
            ->type("Good job.", "q3")
            ->press("Save evaluation");

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "pending"
        ]);

        $this->seeInDatabase("responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q1",
            "response" => 4
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q3",
            "response" => "Good job."
        ]);
    }

    public function testSubmitEvaluation(){
        $eval = factory(App\Evaluation::class)->create([
			"form_id" => $this->form->id,
			"evaluator_id" => $this->user->id,
			"subject_id" => $this->resident->id,
			"requested_by_id" => $this->user->id
		]);

		$this->actingAs($this->user)
			->visit("/evaluation/" . $eval->id)
			->see("Complete Evaluation")
			->see($eval->id)
			->see("Pending")
			->see("Resident Evaluation Form")
            ->select(4, "q1")
            ->select(2, "q2")
            ->type("Good job.", "q3")
            ->press("Complete evaluation");

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "complete"
        ]);

        $this->seeInDatabase("responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q1",
            "response" => 4
        ]);

        $this->seeInDatabase("responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q2",
            "response" => 2
        ]);

        $this->seeInDatabase("text_responses", [
            "evaluation_id" => $eval->id,
            "question_id" => "q3",
            "response" => "Good job."
        ]);
    }

    public function testEditEvaluationForm(){
        $newResident = factory(App\User::class, "resident")->create();
        $newForm = factory(App\Form::class, "resident")->create();
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->user->id,
            "requested_by_id" => $this->user->id
        ]);

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->select($newResident->id, "subject_id")
            ->select($newForm->id, "form_id")
            ->press("Save changes")
            ->seeInDatabase("evaluations", [
                "id" => $eval->id,
                "subject_id" => $newResident->id,
                "form_id" => $newForm->id
            ]);
    }

    public function testCommentEvaluation(){
        $faker = Faker::create();
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->user->id,
            "requested_by_id" => $this->user->id
        ]);
        $comment = $faker->text;

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->post("/evaluations/" . $eval->id . "/comment", [
                "_method" => "PATCH",
                "comment" => $comment
            ])
            ->seeInDatabase("evaluations", [
                "id" => $eval->id,
                "comment" => $comment
            ]);
    }

    public function testFlagEvaluation(){
        $faker = Faker::create();
        $flag = [
            "requested_action" => "subject",
            "reason" => $faker->text
        ];
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->user->id,
            "requested_by_id" => $this->user->id
        ]);

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->select($flag["requested_action"], "requested_action")
            ->type($flag["reason"], "reason")
            ->press("Flag evaluation")
            ->seeInDatabase("flagged_evaluations", array_merge($flag, [
                "evaluation_id" => $eval->id
            ]));
    }

    public function testViewFacultyEval(){
		$admin = factory(App\User::class, "admin")->create();
        $eval = factory(App\Evaluation::class, "faculty-complete")->create([
            "form_id" => $this->facultyForm->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->resident->id,
            "requested_by_id" => $this->resident->id
        ]);

		$this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/evaluation/" . $eval->id)
            ->seePageIs("/dashboard")
            ->see("Error")
            ->see("Insufficient permissions to view the requested evaluation");

		$hashedId = Hashids::encode($eval->id);

        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/evaluation/" . $hashedId)
            ->seePageIs("/dashboard")
            ->see("Error")
            ->see("Insufficient permissions to view the requested evaluation");

		$newEvals = factory(App\Evaluation::class, "faculty-complete", (integer)Setting::get("facultyEvalThreshold"))->create([
            "form_id" => $this->facultyForm->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->resident->id,
            "requested_by_id" => $this->resident->id
        ]);

		$this->actingAs($this->admin);

		Artisan::call("release:faculty-evals");

        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/evaluation/" . $hashedId)
            ->seePageIs("/evaluation/" . $hashedId)
            ->see("View Evaluation")
            ->dontSee($this->resident->last_name . ", " . $this->resident->first_name);

		$this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/evaluation/" . Hashids::encode($newEvals[2]->id))
            ->seePageIs("/dashboard")
            ->see("Error")
            ->see("Insufficient permissions to view the requested evaluation");
    }

    public function testViewMenteeEvals(){
        $otherFaculty = factory(App\User::class, "faculty")->create();

        $eval = factory(App\Evaluation::class, "complete")->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $otherFaculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $mentorship = factory(App\Mentorship::class)->create([
            "mentor_id" => $this->user->id,
            "mentee_id" => $this->resident->id
        ]);

        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->see($this->resident->full_name);

        $this->actingAs($this->user)
            ->get("/evaluations", [
                "_token" => csrf_token(),
                "subject_id" => $this->resident->id
            ])
            ->seeJson([
				"evaluator_id" => $otherFaculty->id,
				"form_id" => $eval->form->id
			]);
    }
}
