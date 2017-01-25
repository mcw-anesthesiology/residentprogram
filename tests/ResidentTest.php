<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Illuminate\Support\Facades\Artisan;

class ResidentTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

		$this->admin = factory(App\User::class, "admin")->create();
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
        $lastOfMonth = Carbon::parse("last day of this month")->toDateString();
		$this->actingAs($this->user)
			->visit("/request")
			->see("Request trainee evaluation")
			->call("POST", "/request", [
				"evaluator_id" => $this->faculty->id,
				"form_id" => $this->form->id,
				"evaluation_date" => [
					"startDate" => $firstOfMonth,
					"endDate" => $lastOfMonth
				],
			]);

		$this->seeInDatabase("evaluations", [
			"subject_id" => $this->user->id,
			"evaluator_id" => $this->faculty->id,
			"form_id" => $this->form->id,
			"requested_by_id" => $this->user->id,
			"evaluation_date_start" => $firstOfMonth,
            "evaluation_date_end" => $lastOfMonth
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
        $lastOfMonth = Carbon::parse("last day of this month")->toDateString();
        $this->actingAs($this->user)
            ->visit("/request/faculty")
            ->see("Create faculty evaluation");

        $this->actingAs($this->user)
            ->call("POST", "/request/faculty", [
                "subject_id" => $this->faculty->id,
                "form_id" => $this->facultyForm->id,
                "evaluation_date" => [
					"startDate" => $firstOfMonth,
					"endDate" => $lastOfMonth
				],
                "_token" => csrf_token()
            ]);

        $this->seeInDatabase("evaluations", [
            "subject_id" => $this->faculty->id,
            "evaluator_id" => $this->user->id,
            "requested_by_id" => $this->user->id,
            "form_id" => $this->facultyForm->id,
            "status" => "pending",
			"visibility" => "under faculty threshold",
            "evaluation_date_start" => $firstOfMonth,
            "evaluation_date_end" => $lastOfMonth,
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
            "requested_by_id" => $this->user->id,
			"visibility" => "under faculty threshold"
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

		$this->actingAs($this->faculty)
			->visit("/evaluations")
			->seeJson([]);

		$evals = factory(App\Evaluation::class, 3)->create([
            "form_id" => $this->facultyForm->id,
            "evaluator_id" => $this->user->id,
            "subject_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id,
			"visibility" => "under faculty threshold"
        ]);

		for($i = 0; $i < 3; $i++){
			$this->actingAs($this->user)
	            ->visit("/evaluation/" . $evals[$i]->id)
	            ->see("Complete evaluation")
	            ->see($evals[$i]->id)
	            ->see("Pending")
	            ->see("Faculty Evaluation Form")
	            ->select("good", "q1")
	            ->select("yes", "q2")
	            ->type("Have none.", "q3")
	            ->press("Complete evaluation");
		}

		$this->actingAs($this->admin);

		Artisan::call("release:faculty-evals");

		$this->actingAs($this->faculty)
			->visit("/evaluations")
			->seeJson(["id" => Hashids::encode($eval->id)])
			->seeJson(["id" => Hashids::encode($evals[0]->id)])
			->seeJson(["id" => Hashids::encode($evals[1]->id)])
			->dontSeeJson(["id" => Hashids::encode($evals[2]->id)]);
    }

    public function testProfileEvaluations(){
        $evals = factory(App\Evaluation::class, "complete", 2)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);
        $anotherEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);
        $anonymousEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->faculty->id,
            "visibility" => "anonymous"
        ]);
        $hiddenEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id,
            "visibility" => "hidden"
        ]);

        $this->actingAs($this->user)
            ->get("/evaluations", [
				"with" => [
					"evaluator" => ["full_name"],
					"form" => ["title"]
				],
				"subject_id" => $this->user->id
			])
			->seeJson(["id" => $evals[0]->id])
			->seeJson(["id" => $evals[1]->id])
			->seeJson(["id" => $anotherEval->id])
			->dontSeeJson(["id" => $anonymousEval->id])
			->seeJson(["id" => Hashids::encode($anonymousEval->id), "evaluator_id" => null]);
    }

    public function testFacultyProfile(){
        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->visit("/profile/".$this->faculty->id)
            ->seePageIs("/dashboard");
    }

    public function testFacultyProfileEvaluations(){
        $evals = factory(App\Evaluation::class, "complete", 2)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);
        $anotherEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->user->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);

        $this->actingAs($this->user)
            ->get("/evaluations", [
				"with" => [
					"evaluator" => ["full_name"],
					"form" => ["title"]
				],
				"evaluator_id"
			])
            ->seeJson(["id" => $evals[0]->id])
			->seeJson(["id" => $evals[1]->id])
			->seeJson(["id" => $anotherEval->id]);
    }

    public function testPagerDirectory(){
        $directory = factory(App\DirectoryEntry::class, 3)->create()->sortBy("last_name");
        $this->actingAs($this->user)
            ->visit("/directory")
            ->assertResponseOk();
        $this->get("/directory_entries/")
            ->seeJson([
				"id" => $directory[0]->id,
				"first_name" => $directory[0]->first_name,
                "last_name" => $directory[0]->last_name,
                "pager" => $directory[0]->pager
            ])
			->seeJson([
				"id" => $directory[1]->id,
                "first_name" => $directory[1]->first_name,
                "last_name" => $directory[1]->last_name,
                "pager" => $directory[1]->pager
            ])
			->seeJson([
				"id" => $directory[2]->id,
	            "first_name" => $directory[2]->first_name,
	            "last_name" => $directory[2]->last_name,
	            "pager" => $directory[2]->pager
            ]);
    }

    public function testPagerDirectoryCSV(){
        $directory = factory(App\DirectoryEntry::class, 3)->create()->sortBy("last_name");
        $csv = "";
        foreach($directory->sortByDesc("id") as $entry){
            $csv .= $entry->first_name . ","
                . $entry->last_name . ","
                . $entry->pager . "\n";
        }
        $this->actingAs($this->user)
            ->get("/directory_entries/csv")
            ->see($csv);
    }
}
