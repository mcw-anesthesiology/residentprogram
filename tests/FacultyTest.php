<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

class FacultyTest extends TestCase
{
    public function setUp(){
        parent::setUp();

		$this->artisan("migrate");
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

	public function tearDown(){
		$this->artisan("migrate:reset");

		parent::tearDown();
	}

    public function testDashboard(){
        $this->actingAs($this->user)
            ->visit("/")
            ->see("Resident Evaluation System")
            ->see("Account type: Faculty");
    }

    public function testRequest(){
        $firstOfMonth = Carbon::parse("first day of this month")->toDateString();
        $this->actingAs($this->user)
			->visit("/request")
			->see("Create resident evaluation")
			->call("POST", "/request", [
				"subject_id" => $this->resident->id,
				"form_id" => $this->form->id,
				"evaluation_date" => $firstOfMonth,
				"_token" => csrf_token()
			]);

		$this->seeInDatabase("evaluations", [
			"subject_id" => $this->resident->id,
			"evaluator_id" => $this->user->id,
			"form_id" => $this->form->id,
			"requested_by_id" => $this->user->id,
			"evaluation_date" => $firstOfMonth
		]);
    }

    public function testSave(){
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

    public function testSubmit(){
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

    public function testChangePassword(){
        $oldPassword = "oldPassword";
        $this->user->password = bcrypt($oldPassword);
        $this->user->save();

        $newPassword = "newPassword";

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
        $newFrequency = "daily";
        $this->actingAs($this->user)
            ->visit("/user")
            ->see("Reminders")
            ->select("daily", "frequency")
            ->press("Update Reminder Preferences");

        $this->user = $this->user->fresh();
        $this->assertEquals($this->user->reminder_frequency, "daily");
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

    public function testViewFacultyEval(){
        $eval = factory(App\Evaluation::class, "complete")->create([
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

        $evals = [
            $eval,
            factory(App\Evaluation::class, "complete", Setting::get("facultyEvalThreshold"))->create([
                "form_id" => $this->facultyForm->id,
                "subject_id" => $this->user->id,
                "evaluator_id" => $this->resident->id,
                "requested_by_id" => $this->resident->id
            ])
        ];

        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/evaluation/" . $eval->id)
            ->seePageIs("/evaluation/" . $eval->id)
            ->see("View Evaluation")
            ->dontSee($this->resident->last_name);
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
            ->post("dashboard/evaluations", [
                "_token" => csrf_token(),
                "type" => "mentor",
                "mentee_id" => $this->resident->id
            ])
            ->see($eval->id)
            ->see($otherFaculty->full_name)
            ->dontSee($this->resident->full_name)
            ->see($eval->form->title);
    }
}
