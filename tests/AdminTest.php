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
            ->post("/evaluations/" . $eval->id . "/hash", [
				"_method" => "PATCH",
                "action" => "new",
                "hash_expires_in" => 30
            ])
            ->seeInDatabase("evaluations", [
				"id" => $eval->id,
				"hash_expires" => Carbon::now()->addDays(30)
			]);
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
            ->post("/evaluations/" . $eval->id . "/hash", [
				"_method" => "PATCH",
                "action" => "resend"
            ]);;
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
            ->post("/evaluations/" . $eval->id . "/hash", [
				"_method" => "PATCH",
                "action" => "void"
            ])
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
            ->post("/evaluations/" . $eval->id, [
				"_method" => "PATCH",
                "action" => "disable"
            ])
	        ->seeInDatabase("evaluations", [
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
            ->visit("/manage/evaluations")
            ->post("/evaluations/" . $eval->id, [
				"_method" => "PATCH",
                "action" => "enable"
            ])
	        ->seeInDatabase("evaluations", [
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
            ->post("/evaluations/" . $eval->id, [
				"_method" => "PATCH",
                "action" => "cancel"
            ])
	        ->seeInDatabase("evaluations", [
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
                ->post("/evaluations/" . $eval->id, [
					"_method" => "PATCH",
                    "action" => "visibility",
                    "visibility" => $visibility
                ])
	            ->seeInDatabase("evaluations", [
	                "id" => $eval->id,
	                "visibility" => $visibility
	            ]);
        }
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
            ->post("/users", $newAccount)
        	->seeInDatabase("users", $newAccount);
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
            ->post("/users/" . $editedAccount["id"], array_merge($editedAccount, [
                "_method" => "PATCH"
            ]))
        	->seeInDatabase("users", $editedAccount);
    }

    public function testSendNewAccountEmail(){
        Mail::shouldReceive("send")
            ->once()
            ->andReturnUsing(function($view, $params){
                $user = $this->resident->fresh();
                $this->assertEquals($view, "emails.new-account");
                $this->assertEquals($params["username"], $user->username);
                $this->assertEquals($params["userType"], $user->specific_type);
            });
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/users/" . $this->resident->id . "/welcome", [
                "_method" => "PATCH"
            ]);
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
            ->post("/users/" . $this->resident->id . "/password", [
				"_method" => "PATCH"
            ]);
    }

    public function testDisableAccount(){
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/users/" . $this->resident->id, [
                "_method" => "PATCH",
                "status" => "inactive"
            ])
        	->seeInDatabase("users", [
	            "id" => $this->resident->id,
	            "status" => "inactive"
	        ]);
    }

    public function testEnableAccount(){
        $this->resident->status = "inactive";
        $this->resident->save();
        $this->actingAs($this->user)
            ->visit("/manage/accounts")
            ->post("/users/" . $this->resident->id, [
				"_method" => "PATCH",
				"status" => "active"
            ])
	        ->seeInDatabase("users", [
	            "id" => $this->resident->id,
	            "status" => "active"
	        ]);
    }

    public function testAddForm(){ // TODO

    }

    public function testEditForm(){
        $faker = Faker::create();
        $editedForm = [
            "title" => $faker->words(4, true),
            "visibility" => "anonymous"
        ];
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/forms/" . $this->form->id, array_merge($editedForm, [
                "_method" => "PATCH"
            ]))
	        ->seeInDatabase("forms", array_merge($editedForm, [
	            "id" => $this->form->id
	        ]));
    }

    public function testDisableForm(){
        $this->form->status = "active";
        $this->form->save();
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/forms/" . $this->form->id, [
				"_method" => "PATCH",
                "status" => "inactive"
            ])
	        ->seeInDatabase("forms", [
	            "id" => $this->form->id,
	            "status" => "inactive"
	        ]);
    }

    public function testEnableForm(){
        $this->form->status = "inactive";
        $this->form->save();
        $this->actingAs($this->user)
            ->visit("/manage/forms")
            ->post("/forms/" . $this->form->id, [
                "_method" => "PATCH",
				"status" => "active"
            ])
	        ->seeInDatabase("forms", [
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
            ->post("/forms/" . $this->form->id, [
                "_method" => "PATCH",
                "visibility" => $newVisibility
            ])
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
            ->post("/milestones/", $milestone)
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
            ->post("/milestones/" . $milestone["id"], array_merge($milestone, [
                "_method" => "PATCH"
            ]))
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
            ->post("/milestones/" . $milestone["id"], array_merge($milestone, [
                "_method" => "DELETE"
            ]))
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
            ->post("/competencies/", $competency)
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
            ->post("/competencies/" . $competency["id"], array_merge($competency, [
                "_method" => "PATCH"
            ]))
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
            ->post("/competencies/" . $competency["id"], array_merge($competency, [
                "_method" => "DELETE"
            ]))
            ->notSeeInDatabase("competencies", $competency);
    }

    public function testAddMentorship(){
        $mentorship = [
            "mentor_id" => $this->faculty->id,
            "mentee_id" => $this->resident->id
        ];
        $this->actingAs($this->user)
            ->visit("/manage/mentors")
            ->post("/mentorships/", $mentorship)
            ->seeInDatabase("mentorships", $mentorship);
    }

    public function testRemoveMentorship(){
        $mentorship = factory(App\Mentorship::class)->create([
            "mentor_id" => $this->faculty->id,
            "mentee_id" => $this->resident->id
        ]);
        $this->actingAs($this->user)
            ->visit("/manage/mentors")
            ->post("/mentorships/" . $mentorship->id, [
                "_method" => "DELETE"
            ])
            ->notSeeInDatabase("mentorships", [
                "id" => $mentorship->id,
            ]);
    }

    public function testAddBlockAssignments(){
        // Lots of magic strings from storage/app/tests/schedule.html
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
            ->attach(storage_path("app/tests/schedule.html"), "schedule")
            ->press("Submit");

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

        $blocks = App\Block::all();

        $expectedBlockAssignments = [
            [
                "block_id" => $blocks[0]->id,
                "user_id" => $faculty->id,
                "location" => "Earth"
            ],
            [
                "block_id" => $blocks[1]->id,
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
                "location" => "Moon"
            ],
            [
                "block_id" => $blocks[2]->id,
                "user_id" => $faculty->id,
                "location" => "Space"
            ],
            [
                "block_id" => $blocks[3]->id,
                "user_id" => $faculty->id,
                "location" => "Earth"
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

    public function testProfile(){
        $faker = Faker::create();
        $yearStart = Carbon::now()->gt(Carbon::parse("July 1")) ? Carbon::parse("July 1") : Carbon::parse("July 1 last year");
        $evals = factory(App\Evaluation::class, "complete", 2)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id,
            "evaluation_date" => $faker->dateTimeBetween($yearStart, "now")
        ]);
        $anotherEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id,
            "evaluation_date" => $faker->dateTimeBetween($yearStart, "now")
        ]);

        $this->actingAs($this->user)
            ->visit("/profile/".$this->resident->id);
        $this->assertViewHas("profileUser", $this->resident->fresh());

        $this->assertViewHas("yearStart", $yearStart);

        $this->assertViewHas("lastCompleted", $this->resident->subjectEvaluations
            ->where("status", "complete")->sortByDesc("complete_date")
            ->first()->complete_date);

        $this->assertViewHas("requests", 1);
        $this->assertViewHas("totalRequests", 3);
        $this->assertViewHas("totalComplete", 2);
        $this->assertViewHas("evalData", [
            [
                "id" => $evals[0]->id,
                "request_date" => $evals[0]->request_date->toDateTimeString(),
                "complete_date" => $evals[0]->complete_date->toDateTimeString(),
                "status" => "complete",
                "url" => "<a href='/evaluation/{$evals[0]->id}'>{$evals[0]->id}</a>"
            ],
            [
                "id" => $evals[1]->id,
                "request_date" => $evals[1]->request_date->toDateTimeString(),
                "complete_date" => $evals[1]->complete_date->toDateTimeString(),
                "status" => "complete",
                "url" => "<a href='/evaluation/{$evals[1]->id}'>{$evals[1]->id}</a>"
            ],
            [
                "id" => $anotherEval->id,
                "request_date" => $anotherEval->request_date->toDateTimeString(),
                "complete_date" => null,
                "status" => "pending",
                "url" => "<a href='/evaluation/{$anotherEval->id}'>{$anotherEval->id}</a>"
            ],
        ]);
    }

    public function testProfileEvaluations(){
        $evals = factory(App\Evaluation::class, "complete", 2)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);
        $anotherEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->resident->id
        ]);
        $anonymousEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id,
            "visibility" => "anonymous"
        ]);
        $hiddenEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
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
				"subject_id" => $this->resident->id
			])
			->seeJson(["id" => $evals[0]->id])
			->seeJson(["id" => $evals[1]->id])
			->seeJson(["id" => $anotherEval->id])
			->seeJson(["id" => $anonymousEval->id])
			->seeJson(["id" => $hiddenEval->id]);
    }

    public function testEditDirectoryEntry(){
        $faker = Faker::create();
        $directory = factory(App\DirectoryEntry::class, 3)->create()->sortBy("last_name");
        $newEntry = [
            "id" => $directory[0]->id,
            "first_name" => $faker->firstName,
            "last_name" => $faker->lastName,
            "pager" => $faker->phoneNumber
        ];
        $this->actingAs($this->user)
            ->visit("/directory")
            ->post("/directory/edit", $newEntry)
        	->seeInDatabase("directory", $newEntry);
    }

    public function testDeleteDirectoryEntry(){
        $directory = factory(App\DirectoryEntry::class, 3)->create()->sortBy("last_name");
        $this->actingAs($this->user)
            ->visit("/directory")
            ->post("/directory/delete", [
                "id" => $directory[1]->id
            ]);
        $entry = App\DirectoryEntry::withTrashed()->find($directory[1]->id);
        $this->assertTrue($entry->trashed());
        $this->actingAs($this->user)
            ->visit("/directory")
            ->get("/directory/get")
            ->seeJsonEquals([
                "data" => [
                    [
                        $directory[0]->first_name,
                        $directory[0]->last_name,
                        $directory[0]->pager,
                        "<button type='button' data-id='{$directory[0]->id}' "
                            . "data-pager='{$directory[0]->pager}' "
                            . "data-first='{$directory[0]->first_name}' "
                            . "data-last='{$directory[0]->last_name}' "
                            . "class='btn btn-xs btn-info edit-directory-entry'>"
                            . "<span class='glyphicon glyphicon-edit'></span> Edit</button>"
                    ],
                    [
                        $directory[2]->first_name,
                        $directory[2]->last_name,
                        $directory[2]->pager,
                        "<button type='button' data-id='{$directory[2]->id}' "
                            . "data-pager='{$directory[2]->pager}' "
                            . "data-first='{$directory[2]->first_name}' "
                            . "data-last='{$directory[2]->last_name}' "
                            . "class='btn btn-xs btn-info edit-directory-entry'>"
                            . "<span class='glyphicon glyphicon-edit'></span> Edit</button>"
                    ]
                ]
            ]);
    }
}
