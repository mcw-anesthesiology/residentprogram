<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Faker\Factory as Faker;

class AdminTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

		$this->user = factory(App\User::class, "admin")->create();
        $this->resident = factory(App\User::class, "resident")->create();
		$this->faculty = factory(App\User::class, "faculty")->create();
        $this->staff = factory(App\User::class, "staff")->create();
		$this->form = factory(App\Form::class, "resident")->create();
        $this->facultyForm = factory(App\Form::class, "faculty")->create();
        $this->staffForm = factory(App\Form::class, "staff")->create();
		$this->milestones = factory(App\Milestone::class, 2)->create();
		$this->competencies = factory(App\Competency::class, 2)->create();
        $this->milestoneQuestions = [
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"milestone_id" => $this->milestones[0]->id
			]),
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"milestone_id" => $this->milestones[1]->id
			])
		];
		$this->competencyQuestions = [
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"competency_id" => $this->competencies[0]->id
			]),
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"competency_id" => $this->competencies[1]->id
			])
		];
    }

    public function testRequestEvaluationWithCompletionHash(){
        $faker = Faker::create();
        $evaluationDate = $faker->date();
        $hashExpiresIn = 30;

        $evalParams = [
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->staff->id,
            "form_id" => $this->staffForm->id
        ];

        Mail::shouldReceive("send")
            ->once()
            ->andReturnUsing(function($view, $params){
                $this->assertEquals($view, "emails.hash-link");
                $this->seeInDatabase("evaluations", [
                    "completion_hash" => $params["evaluationHash"]
                ]);
            });

        $this->actingAs($this->user)
            ->visit("/request/staff")
            ->see("Request staff evaluation")
            ->post("/request/staff", array_merge($evalParams, [
                "_token" => csrf_token(),
                "send_hash" => "true",
                "hash_expires_in" => $hashExpiresIn
            ]))
            ->seeInDatabase("evaluations", $evalParams);

        $eval = App\Evaluation::where("subject_id", $evalParams["subject_id"])
            ->where("evaluator_id", $evalParams["evaluator_id"])
            ->where("form_id", $evalParams["form_id"])
            ->orderBy("id", "desc")
            ->first();

        $this->assertNotNull($eval->completion_hash);
        $this->assertNotNull($eval->hash_expires);
    }

    public function testSendEvaluationCompletionHash(){
        $eval = factory(App\Evaluation::class, "with-hash")->create([
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->staff->id,
            "requested_by_id" => $this->user->id,
            "form_id" => $this->staffForm->id
        ]);

        $oldHash = $eval->completion_hash;

        Mail::shouldReceive("send")
            ->once()
            ->andReturnUsing(function($view, $params) use ($eval, $oldHash){
                $eval = $eval->fresh();
                $this->assertEquals($view, "emails.hash-link");
                $this->assertEquals($params["evaluationHash"], $eval->completion_hash);
                $this->assertNotEquals($params["evaluationHash"], $oldHash);
            });

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->post("/evaluation/" . $eval->id . "/hash", [
                "_token" => csrf_token(),
                "action" => "new",
                "hash_expires_in" => 30
            ])
            ->see("true");
    }

    public function testResendEvaluationCompletionHash(){
        $eval = factory(App\Evaluation::class, "with-hash")->create([
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->staff->id,
            "requested_by_id" => $this->user->id,
            "form_id" => $this->staffForm->id
        ]);

        Mail::shouldReceive("send")
            ->once()
            ->andReturnUsing(function($view, $params) use ($eval){
                $this->assertEquals($view, "emails.hash-link");
                $this->assertEquals($params["evaluationHash"], $eval->completion_hash);
            });

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->post("/evaluation/" . $eval->id . "/hash", [
                "_token" => csrf_token(),
                "action" => "resend"
            ])
            ->see("true");
    }

    public function testVoidEvaluationCompletionHash(){
        $eval = factory(App\Evaluation::class, "with-hash")->create([
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->staff->id,
            "requested_by_id" => $this->user->id,
            "form_id" => $this->staffForm->id
        ]);

        $this->actingAs($this->user)
            ->visit("/evaluation/" . $eval->id)
            ->post("/evaluation/" . $eval->id . "/hash", [
                "_token" => csrf_token(),
                "action" => "void"
            ])
            ->see("true")
            ->seeInDatabase("evaluations", [
                "id" => $eval->id,
                "completion_hash" => null
            ]);
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
                $user = $this->resident->fresh();
                $this->assertEquals($view, "emails.manual-password-reset");
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
            "id" => $this->milestones[0]->id,
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
            "id" => $this->competencies[0]->id,
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
        $mentorship = [
            "mentor_id" => $this->faculty->id,
            "mentee_id" => $this->resident->id
        ];
        $this->actingAs($this->user)
            ->visit("/manage/mentors")
            ->post("/manage/mentors/add", array_merge($mentorship, [
                "_token" => csrf_token(),
                "ajax" => true
            ]))
            ->see("true")
            ->seeInDatabase("mentorships", $mentorship);
    }

    public function testRemoveMentorship(){
        $mentorship = factory(App\Mentorship::class)->create([
            "mentor_id" => $this->faculty->id,
            "mentee_id" => $this->resident->id
        ]);
        $this->actingAs($this->user)
            ->visit("/manage/mentors")
            ->post("/manage/mentors/delete", [
                "_token" => csrf_token(),
                "ajax" => true,
                "mentorship_id" => $mentorship->id
            ])
            ->see("true")
            ->seeInDatabase("mentorships", [
                "id" => $mentorship->id,
                "status" => "inactive"
            ]);
    }

    public function testAddBlockAssignments(){
        $resident = factory(App\User::class, "resident")->create([
            "first_name" => "Test",
            "last_name" => "Resident"
        ]);
        $faculty = factory(App\User::class, "faculty")->create([
            "first_name" => "Test",
            "last_name" => "Faculty"
        ]);

        $this->actingAs($this->user)
            ->visit("/manage/block-assignments")
            ->select("new", "year")
            ->type("Now", "new_year")
            ->attach(storage_path("app/tests/schedule.xls"), "schedule")
            ->press("Submit");

        $blocks = App\Block::all();

        $expectedBlocks = [
            [
                "year" => "Now",
                "block_number" => 1,
                "block_name" => "Block 1 (07/01/2015 - 10/02/2015)",
                "start_date" => "2015-07-01",
                "end_date" => "2015-10-02"
            ],
            [
                "year" => "Now",
                "block_number" => 2,
                "block_name" => "Block 2 (10/03/2015 - 12/30/2015)",
                "start_date" => "2015-10-03",
                "end_date" => "2015-12-30"
            ],
            [
                "year" => "Now",
                "block_number" => 3,
                "block_name" => "Block 3 (12/31/2015 - 03/27/2016)",
                "start_date" => "2015-12-31",
                "end_date" => "2016-03-27"
            ],
            [
                "year" => "Now",
                "block_number" => 4,
                "block_name" => "Block 4 (03/28/2016 - 06/30/2016)",
                "start_date" => "2016-03-28",
                "end_date" => "2016-06-30"
            ],
        ];

        foreach($expectedBlocks as $block){
            $this->seeInDatabase("blocks", $block);
        }

        // $blocks = App\Block::all();
        //
        // foreach($blocks as $block){
        //     var_dump($block->toArray());
        // }

        $assignments = App\BlockAssignment::all();
        foreach($assignments as $a){
            var_dump($a->toArray());
        }

        $expectedBlockAssignments = [
            [
                "block_id" => $blocks[0]->id,
                "user_id" => $faculty->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[1]->id,
                "user_id" => $faculty->id,
                "location" => "Moon"
            ],
            [
                "block_id" => $blocks[2]->id,
                "user_id" => $faculty->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[3]->id,
                "user_id" => $faculty->id,
                "location" => "Space"
            ],
            [
                "block_id" => $blocks[0]->id,
                "user_id" => $resident->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[1]->id,
                "user_id" => $resident->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[2]->id,
                "user_id" => $resident->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[3]->id,
                "user_id" => $resident->id,
                "location" => "Sun"
            ]
        ];

        foreach($expectedBlockAssignments as $blockAssignment){
            $this->seeInDatabase("block_assignments", $blockAssignment);
        }
    }
}
