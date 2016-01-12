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

    public function testIndividualReport(){
        $evals = factory(App\Evaluation::class, "complete", 2)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->resident->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->user->id
        ]);

        $responses = [
            factory(App\Response::class)->create([
                "evaluation_id" => $evals[0]->id,
                "question_id" => "q1",
                "response" => 5
            ]),
            factory(App\Response::class)->create([
                "evaluation_id" => $evals[0]->id,
                "question_id" => "q2",
                "response" => 1
            ]),
            factory(App\Response::class)->create([
                "evaluation_id" => $evals[1]->id,
                "question_id" => "q1",
                "response" => 7
            ]),
            factory(App\Response::class)->create([
                "evaluation_id" => $evals[1]->id,
                "question_id" => "q2",
                "response" => 2
            ])
        ];

        $textResponses = [
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $evals[0]->id,
                "question_id" => "q3"
            ]),
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $evals[1]->id,
                "question_id" => "q3"
            ]),
        ];

        $subjectMilestone = [
            $this->resident->id => [
                $this->milestones[0]->id => 6,
                $this->milestones[0]->id =>1.5
            ]
        ];

        $subjectCompetency = $subjectMilestone;

        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->user)
            ->visit("/dashboard")
            ->post("/report/specific", [
                "resident" => $this->resident->id,
                "startDate1" => $startDate,
                "endDate1" => $endDate,
                "trainingLevel1" => "all",
                "graphs" => "none"
            ])
            ->assertViewHas("reportData", [0 => [
                "trainingLevel" => "all",
                "graphOption" => "none",
                "startDate" => $startDate,
                "endDate" => $endDate,
                "subjects" => [
                    $this->resident->id => $this->resident->full_name
                ],
                "subjectEvaluators" => [
                    $this->resident->id => [
                        $this->faculty->id => 1
                    ]
                ],
                "graphs" => [],
                "milestones" => [
                    $this->milestones[0]->id => $this->milestones[0]->title,
                    $this->milestones[1]->id => $this->milestones[1]->title
                ],
                "competencies" => [
                    $this->competencies[0]->id => $this->competencies[0]->title,
                    $this->competencies[1]->id => $this->competencies[1]->title,
                ],
                "averageMilestone" => [
                    $this->milestones[0]->id => 6,
                    $this->milestones[1]->id => 1.5
                ],
                "averageCompetency" => [
                    $this->competencies[0]->id => 6,
                    $this->competencies[1]->id => 1.5
                ],
                "subjectMilestone" => [
                    $this->resident->id => [
                        $this->milestones[0]->id => 6,
                        $this->milestones[1]->id => 1.5
                    ]
                ],
                "subjectCompetency" => [
                    $this->resident->id => [
                        $this->competencies[0]->id => 6,
                        $this->competencies[1]->id => 1.5
                    ]
                ],
                "subjectMilestoneDeviations" => [
                    $this->resident->id => [
                        $this->milestones[0]->id => 0,
                        $this->milestones[1]->id => 0
                    ]
                ],
                "subjectCompetencyDeviations" => [
                    $this->resident->id => [
                        $this->competencies[0]->id => 0,
                        $this->competencies[1]->id => 0
                    ]
                ],
                "subjectMilestoneEvals" => [
                    $this->resident->id => [
                        $this->milestones[0]->id => 2,
                        $this->milestones[1]->id => 2
                    ]
                ],
                "subjectCompetencyEvals" => [
                    $this->resident->id => [
                        $this->competencies[0]->id => 2,
                        $this->competencies[1]->id => 2
                    ]
                ],
                "subjectEvals" => [
                    $this->resident->id => [
                        $evals[0]->id => 2,
                        $evals[1]->id => 2
                    ]
                ],
                "subjectTextResponses" => [
                    (object)[
                        "subject_id" => $textResponses[0]->evaluation->subject_id,
                        "first_name" => $textResponses[0]->evaluation->evaluator->first_name,
                        "last_name" => $textResponses[0]->evaluation->evaluator->last_name,
                        "form_title" => $textResponses[0]->evaluation->form->title,
                        "evaluation_date" => $textResponses[0]->evaluation->evaluation_date->toDateString(),
                        "response" => $textResponses[0]->response
                    ],
                    (object)[
                        "subject_id" => $textResponses[1]->evaluation->subject_id,
                        "first_name" => $textResponses[1]->evaluation->evaluator->first_name,
                        "last_name" => $textResponses[1]->evaluation->evaluator->last_name,
                        "form_title" => $textResponses[1]->evaluation->form->title,
                        "evaluation_date" => $textResponses[1]->evaluation->evaluation_date->toDateString(),
                        "response" => $textResponses[1]->response
                    ]
                ],
            ]]);
    }
}
