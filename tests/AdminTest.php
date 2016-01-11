<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Faker\Factory as Faker;

class AdminTest extends TestCase
{
    public function setUp(){
        parent::setUp();

		$this->artisan("migrate");
		$this->user = factory(App\User::class, "admin")->create();
        $this->resident = factory(App\User::class, "resident")->create();
		$this->faculty = factory(App\User::class, "faculty")->create();
        $this->staff = factory(App\User::class, "staff")->create();
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

    public function testDisableEvaluation(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $this->actingAs($this->user)
            ->visit("/manage/evaluations/")
            ->post("/manage/evaluations/" . $eval->id, [
                "_token" => csrf_token(),
                "action" => "disable"
            ])
            ->see("disabled");

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "disabled"
        ]);
    }

    public function testEnableEvaluation(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $this->actingAs($this->user)
            ->visit("/manage/evaluations/")
            ->post("/manage/evaluations/" . $eval->id, [
                "_token" => csrf_token(),
                "action" => "enable"
            ]);

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "pending"
        ]);
    }

    public function testCancelEvaluation(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $this->actingAs($this->user)
            ->visit("/manage/evaluations/")
            ->post("/manage/evaluations/" . $eval->id, [
                "_token" => csrf_token(),
                "action" => "cancel"
            ]);

        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "canceled by admin"
        ]);
    }

    public function testChangeEvalVisibility(){
        $eval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $visibilities = ["visible", "anonymous", "hidden"];

        foreach($visibilities as $visibility){
            $this->actingAs($this->user)
                ->visit("/manage/evaluations/")
                ->post("/manage/evaluations/" . $eval->id, [
                    "_token" => csrf_token(),
                    "action" => "visibility",
                    "visibility" => $visibility
                ]);
            $this->seeInDatabase("evaluations", [
                "id" => $eval->id,
                "visibility" => $visibility
            ]);
        }
    }

    public function testArchiveEvals(){
        $eval = factory(App\Evaluation::class, "complete")->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);

        $archiveDate = Carbon::parse("tomorrow");

        $this->actingAs($this->user)
            ->visit("/manage/evaluations/")
            ->post("/manage/evaluations", [
                "_token" => csrf_token(),
                "archive_date" => $archiveDate
            ]);
        $this->seeInDatabase("evaluations", [
            "id" => $eval->id,
            "status" => "archived"
        ]);
    }

    public function testAddAccount(){
        $faker = Faker::create();
        $newAccount = [
            "username" => $faker->userName,
            "email" => $faker->email,
            "last_name" => $faker->lastName,
            "first_name" => $faker->firstName,
            "type" => "resident",
            "training_level" => "intern"
        ];

        $this->actingAs($this->user)
            ->visit("/manage/accounts/")
            ->post("/manage/accounts/add", array_merge($newAccount, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true");
        $this->seeInDatabase("users", $newAccount);
    }

    public function testEditAccount(){
        $faker = Faker::create();
        $editedAccount = [
            "id" => $this->resident->id,
            "email" => $faker->email,
            "last_name" => $faker->lastName,
            "first_name" => $faker->firstName,
            "type" => "resident",
            "training_level" => "ca-3"
        ];

        $this->actingAs($this->user)
            ->visit("/manage/accounts/")
            ->post("/manage/accounts/edit", array_merge($editedAccount, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true");
        $this->seeInDatabase("users", $editedAccount);
    }

    public function testResetAccountPassword(){
        Mail::shouldReceive("send")
            ->once()
            ->andReturnUsing(function($view, $params){
                $user = $this->user->fresh();
                $this->assertTrue(password_verify($params["password"], $user->password));
            });
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/manage/accounts/password", [
                "_token" => csrf_token(),
                "id" => $this->resident->id
            ]);
    }

    public function testDisableAccount(){
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/manage/accounts/disable", [
                "_token" => csrf_token(),
                "id" => $this->resident->id,
                "ajax" => true
            ])
            ->see("true");
        $this->seeInDatabase("users", [
            "id" => $this->resident->id,
            "status" => "inactive"
        ]);
    }

    public function testEnableAccount(){
        $this->resident->status = "inactive";
        $this->resident->save();
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/manage/accounts/enable", [
                "_token" => csrf_token(),
                "id" => $this->resident->id,
                "ajax" => true
            ])
            ->see("true");
        $this->seeInDatabase("users", [
            "id" => $this->resident->id,
            "status" => "active"
        ]);
    }

    public function testAddForm(){

    }

    public function testEditForm(){
        $faker = Faker::create();
        $editedForm = [
            "title" => $faker->words(4, true),
            "visibility" => "anonymous"
        ];
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/manage/forms/" . $this->form->id, array_merge($editedForm, [
                "_token" => csrf_token(),
                "action" => "edit"
            ]))
            ->see("true");
        $this->seeInDatabase("forms", array_merge($editedForm, [
            "id" => $this->form->id
        ]));
    }

    public function testDisableForm(){
        $this->form->status = "active";
        $this->form->save();
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/manage/forms/" . $this->form->id, [
                "_token" => csrf_token(),
                "action" => "disable"
            ])
            ->see("true");
        $this->seeInDatabase("forms", [
            "id" => $this->form->id,
            "status" => "inactive"
        ]);
    }

    public function testEnableForm(){
        $this->form->status = "inactive";
        $this->form->save();
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/manage/forms/" . $this->form->id, [
                "_token" => csrf_token(),
                "action" => "enable"
            ])
            ->see("true");
        $this->seeInDatabase("forms", [
            "id" => $this->form->id,
            "status" => "active"
        ]);
    }

    public function testChangeFormVisibility(){
        $this->form->visibility = "visible";
        $this->form->save();
        $newVisibility = "hidden";

        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/manage/forms/" . $this->form->id, [
                "_token" => csrf_token(),
                "action" => "visibility",
                "visibility" => $newVisibility
            ])
            ->see("true")
            ->seeInDatabase("forms", [
            "id" => $this->form->id,
            "visibility" => $newVisibility
        ]);
    }

    public function testAddMilestone(){
        $faker = Faker::create();
        $milestone = [
            "title" => $faker->words(4, true),
            "type" => "resident",
            "training_level" => "",
            "description" => $faker->text
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/milestones/add", array_merge($milestone, [
                "ajax" => true,
                "_token" => csrf_token()
            ]))
            ->see("true")
            ->seeInDatabase("milestones", $milestone);
    }

    public function testEditMilestone(){
        $faker = Faker::create();
        $milestone = [
            "id" => $this->milestone->id,
            "title" => $faker->words(4, true),
            "type" => "resident",
            "description" => $faker->text
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/milestones/edit", array_merge($milestone, [
                "ajax" => true,
                "_token" => csrf_token()
            ]))
            ->see("true")
            ->seeInDatabase("milestones", $milestone);
    }

    public function testDeleteMilestone(){
        $faker = Faker::create();
        $newMilestone = factory(App\Milestone::class)->create();
        $milestone = [
            "id" => $newMilestone->id
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/milestones/delete", array_merge($milestone, [
                "ajax" => true,
                "_token" => csrf_token()
            ]))
            ->see("true")
            ->notSeeInDatabase("milestones", $milestone);
    }

    public function testAddCompetency(){
        $faker = Faker::create();
        $competency = [
            "title" => $faker->words(4, true),
            "description" => $faker->text
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/competencies/add", array_merge($competency, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true")
            ->seeInDatabase("competencies", $competency);
    }

    public function testEditCompetency(){
        $faker = Faker::create();
        $competency = [
            "id" => $this->competency->id,
            "title" => $faker->words(4, true),
            "description" => $faker->text
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/competencies/edit", array_merge($competency, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true")
            ->seeInDatabase("competencies", $competency);
    }

    public function testDeleteCompetency(){
        $faker = Faker::create();
        $newCompetency = factory(App\Competency::class)->create();
        $competency = [
            "id" => $newCompetency->id
        ];
        $this->actingAs($this->user)
            ->visit("/manage/milestones-competencies")
            ->post("/manage/competencies/delete", array_merge($competency, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true")
            ->notSeeInDatabase("competencies", $competency);
    }

    public function testAddMentorship(){

    }

    public function testRemoveMentorship(){

    }
}
