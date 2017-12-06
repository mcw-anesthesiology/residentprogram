<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

use Faker\Factory as Faker;

class ReportTest extends BrowserKitTestCase
{
    // This  class has a lot of magic numbers to check math
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

		$this->admin = factory(App\User::class, "admin")->create();
        $this->residents = factory(App\User::class, "resident", 2)->create();
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

        $this->evals = [
            factory(App\Evaluation::class, "complete", 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->residents[0]->id,
				"evaluation_date_start" => Carbon::parse("2016-06-01"),
				"evaluation_date_end" => Carbon::parse("2016-09-01")
            ]),
            factory(App\Evaluation::class, "complete", 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[1]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->admin->id,
				"evaluation_date_start" => Carbon::parse("2016-03-01"),
				"evaluation_date_end" => Carbon::parse("2016-05-31")
            ])
        ];

        $this->responses = [
            "q1" => [
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[0][0]->id,
                    "question_id" => "q1",
                    "response" => 5
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[0][1]->id,
                    "question_id" => "q1",
                    "response" => 7
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[1][0]->id,
                    "question_id" => "q1",
                    "response" => 8
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[1][1]->id,
                    "question_id" => "q1",
                    "response" => 6
                ])
            ],
            "q2" => [
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[0][0]->id,
                    "question_id" => "q2",
                    "response" => 1
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[0][1]->id,
                    "question_id" => "q2",
                    "response" => 2
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[1][0]->id,
                    "question_id" => "q2",
                    "response" => 0
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $this->evals[1][1]->id,
                    "question_id" => "q2",
                    "response" => 3
                ])
            ]
        ];

        $this->textResponses = [
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $this->evals[0][0]->id,
                "question_id" => "q3"
            ]),
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $this->evals[0][1]->id,
                "question_id" => "q3"
            ]),
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $this->evals[1][0]->id,
                "question_id" => "q3"
            ]),
            factory(App\TextResponse::class)->create([
                "evaluation_id" => $this->evals[1][1]->id,
                "question_id" => "q3"
            ]),
        ];
    }

    public function testAggregateReport(){
        $startDate = Carbon::parse("2016-01-01");
        $endDate = Carbon::parse("2017-01-01");

        $formerResidents = factory(App\User::class, "resident", 3)->create();
        $formerEvals = [
            factory(App\Evaluation::class, "complete", 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $formerResidents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->admin->id,
				"evaluation_date_start" => Carbon::parse("2015-10-01"),
				"evaluation_date_end" => Carbon::parse("2016-01-01")
            ]),
            factory(App\Evaluation::class, "complete", 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $formerResidents[1]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $formerResidents[1]->id,
				"evaluation_date_start" => Carbon::parse("2017-01-01"),
				"evaluation_date_end" => Carbon::parse("2017-01-31")
            ]),
            factory(App\Evaluation::class, 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $formerResidents[2]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $formerResidents[2]->id,
				"evaluation_date_start" => Carbon::parse("2016-06-01"),
				"evaluation_date_end" => Carbon::parse("2016-09-01"),
            ]),
			factory(App\Evaluation::class)->create([
				"form_id" => $this->form->id,
                "subject_id" => $formerResidents[2]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $formerResidents[2]->id,
				"evaluation_date_start" => Carbon::parse("2015-06-01"),
				"evaluation_date_end" => Carbon::parse("2015-12-31"),
			]),
			factory(App\Evaluation::class)->create([
				"form_id" => $this->form->id,
                "subject_id" => $formerResidents[2]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $formerResidents[2]->id,
				"evaluation_date_start" => Carbon::parse("2017-01-02"),
				"evaluation_date_end" => Carbon::parse("2017-12-31"),
			])
        ];

        $formerEvals[2][1]->status = "disabled";
        $formerEvals[2][1]->save();

        $this->responses = [
            "q1" => [
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[0][0]->id,
                    "question_id" => "q1",
                    "response" => 5
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[0][1]->id,
                    "question_id" => "q1",
                    "response" => 7
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[1][0]->id,
                    "question_id" => "q1",
                    "response" => 8
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[1][1]->id,
                    "question_id" => "q1",
                    "response" => 6
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[2][0]->id,
                    "question_id" => "q1",
                    "response" => 8
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[2][1]->id,
                    "question_id" => "q1",
                    "response" => 6
                ]),
				factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[3]->id,
                    "question_id" => "q1",
                    "response" => 10
                ]),
				factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[4]->id,
                    "question_id" => "q1",
                    "response" => 1
                ])
            ],
            "q2" => [
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[0][0]->id,
                    "question_id" => "q2",
                    "response" => 1
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[0][1]->id,
                    "question_id" => "q2",
                    "response" => 2
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[1][0]->id,
                    "question_id" => "q2",
                    "response" => 0
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[1][1]->id,
                    "question_id" => "q2",
                    "response" => 3
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[2][0]->id,
                    "question_id" => "q2",
                    "response" => 0
                ]),
                factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[2][1]->id,
                    "question_id" => "q2",
                    "response" => 3
                ]),
				factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[3]->id,
                    "question_id" => "q1",
                    "response" => 1
                ]),
				factory(App\Response::class)->create([
                    "evaluation_id" => $formerEvals[4]->id,
                    "question_id" => "q1",
                    "response" => 4
                ])
            ]
        ];
        $formerResidents[0]->status = "inactive";
        $formerResidents[0]->save();

        $formerResidents[1]->type = "faculty";
        $formerResidents[1]->save();

        // $formerResidents[2]->status = "inactive";
        // $formerResidents[2]->save();

        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/aggregate", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "trainingLevel" => "all"
            ]);
        $this->seeJson([
            "trainingLevel" => "all",
            "startDate" => (array)$startDate,
            "endDate" => (array)$endDate,
            "subjects" => [
                $this->residents[0]->id => $this->residents[0]->full_name,
                $this->residents[1]->id => $this->residents[1]->full_name,
                $formerResidents[0]->id => $formerResidents[0]->full_name,
                $formerResidents[1]->id => $formerResidents[1]->full_name,
                $formerResidents[2]->id => $formerResidents[2]->full_name
            ],
            "milestones" => [
                $this->milestones[0]->id => $this->milestones[0]->title,
                $this->milestones[1]->id => $this->milestones[1]->title
            ],
            "competencies" => [
                $this->competencies[0]->id => $this->competencies[0]->title,
                $this->competencies[1]->id => $this->competencies[1]->title,
            ],
            "averageMilestone" => [
                $this->milestones[0]->id => 6.5,
                $this->milestones[1]->id => 1.5
            ],
            "averageCompetency" => [
                $this->competencies[0]->id => 6.5,
                $this->competencies[1]->id => 1.5
            ],
            "subjectMilestone" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => 6,
                    $this->milestones[1]->id => 1.5
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 7,
                    $this->milestones[1]->id => 1.5
                ],
                $formerResidents[0]->id => [
                    $this->milestones[0]->id => 6,
                    $this->milestones[1]->id => 1.5
                ],
                $formerResidents[1]->id => [
                    $this->milestones[0]->id => 7,
                    $this->milestones[1]->id => 1.5
                ]
            ],
            "subjectCompetency" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => 6,
                    $this->competencies[1]->id => 1.5
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 7,
                    $this->competencies[1]->id => 1.5
                ],
                $formerResidents[0]->id => [
                    $this->competencies[0]->id => 6,
                    $this->competencies[1]->id => 1.5
                ],
                $formerResidents[1]->id => [
                    $this->competencies[0]->id => 7,
                    $this->competencies[1]->id => 1.5
                ]
            ],
            "subjectMilestoneDeviations" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => -0.86602540378443871,
                    $this->milestones[1]->id => 0
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 0.86602540378443871,
                    $this->milestones[1]->id => 0
                ],
                $formerResidents[0]->id => [
                    $this->milestones[0]->id => -0.86602540378443871,
                    $this->milestones[1]->id => 0
                ],
                $formerResidents[1]->id => [
                    $this->milestones[0]->id => 0.86602540378443871,
                    $this->milestones[1]->id => 0
                ]
            ],
            "subjectCompetencyDeviations" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => -0.86602540378443871,
                    $this->competencies[1]->id => 0
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 0.86602540378443871,
                    $this->competencies[1]->id => 0
                ],
                $formerResidents[0]->id => [
                    $this->competencies[0]->id => -0.86602540378443871,
                    $this->competencies[1]->id => 0
                ],
                $formerResidents[1]->id => [
                    $this->competencies[0]->id => 0.86602540378443871,
                    $this->competencies[1]->id => 0
                ]
            ],
            "subjectMilestoneEvals" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ],
                $formerResidents[0]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ],
                $formerResidents[1]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ]
            ],
            "subjectCompetencyEvals" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ],
                $formerResidents[0]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ],
                $formerResidents[1]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ]
            ],
            "subjectEvals" => [
                $this->residents[0]->id => [
                    $this->evals[0][0]->id => 2,
                    $this->evals[0][1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->evals[1][0]->id => 2,
                    $this->evals[1][1]->id => 2
                ],
                $formerResidents[0]->id => [
                    $formerEvals[0][0]->id => 2,
                    $formerEvals[0][1]->id => 2
                ],
                $formerResidents[1]->id => [
                    $formerEvals[1][0]->id => 2,
                    $formerEvals[1][1]->id => 2
                ],
                $formerResidents[2]->id => []
            ],
            "subjectRequests" => [
                $this->residents[0]->id => [
                    $this->evals[0][0]->id => 1,
                    $this->evals[0][1]->id => 1
                ],
                $this->residents[1]->id => [],
                $formerResidents[0]->id => [],
                $formerResidents[1]->id => [
                    $formerEvals[1][0]->id => 1,
                    $formerEvals[1][1]->id => 1
                ],
                $formerResidents[2]->id => [
                    $formerEvals[2][0]->id => 1
                ]
            ]
        ]);
    }

	public function testAggregateReportWithCurrentTrainingLevel(){
		$startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $fellow = factory(App\User::class, "fellow")->create();

		// Comlplete evals have CA-1 training level by default
		$fellowEval = factory(App\Evaluation::class, "complete")->create([
			"form_id" => $this->form->id,
			"subject_id" => $fellow->id,
			"evaluator_id" => $this->faculty->id,
			"requested_by_id" => $this->admin->id
		]);

		$responses = [
			"q1" => [
				factory(App\Response::class)->create([
					"evaluation_id" => $fellowEval->id,
					"question_id" => "q1",
					"response" => 10
				])
			],
			"q2" => [
				factory(App\Response::class)->create([
					"evaluation_id" => $fellowEval->id,
					"question_id" => "q2",
					"response" => 10
				])
			]
		];


        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/aggregate", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "trainingLevel" => "all",
				"currentTrainingLevel" => "ca-1"
            ]);
        $this->seeJson([
            "trainingLevel" => "all",
            "startDate" => (array)$startDate,
            "endDate" => (array)$endDate,
            "subjects" => [
                $this->residents[0]->id => $this->residents[0]->full_name,
                $this->residents[1]->id => $this->residents[1]->full_name
            ],
            "milestones" => [
                $this->milestones[0]->id => $this->milestones[0]->title,
                $this->milestones[1]->id => $this->milestones[1]->title
            ],
            "competencies" => [
                $this->competencies[0]->id => $this->competencies[0]->title,
                $this->competencies[1]->id => $this->competencies[1]->title,
            ],
            "averageMilestone" => [
                $this->milestones[0]->id => 6.5,
                $this->milestones[1]->id => 1.5
            ],
            "averageCompetency" => [
                $this->competencies[0]->id => 6.5,
                $this->competencies[1]->id => 1.5
            ],
            "subjectMilestone" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => 6,
                    $this->milestones[1]->id => 1.5
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 7,
                    $this->milestones[1]->id => 1.5
                ]
            ],
            "subjectCompetency" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => 6,
                    $this->competencies[1]->id => 1.5
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 7,
                    $this->competencies[1]->id => 1.5
                ]
            ],
            "subjectMilestoneDeviations" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => -0.70710678118654746,
                    $this->milestones[1]->id => 0
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 0.70710678118654746,
                    $this->milestones[1]->id => 0
                ]
            ],
            "subjectCompetencyDeviations" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => -0.70710678118654746,
                    $this->competencies[1]->id => 0
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 0.70710678118654746,
                    $this->competencies[1]->id => 0
                ]
            ],
            "subjectMilestoneEvals" => [
                $this->residents[0]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->milestones[0]->id => 2,
                    $this->milestones[1]->id => 2
                ]
            ],
            "subjectCompetencyEvals" => [
                $this->residents[0]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->competencies[0]->id => 2,
                    $this->competencies[1]->id => 2
                ]
            ],
            "subjectEvals" => [
                $this->residents[0]->id => [
                    $this->evals[0][0]->id => 2,
                    $this->evals[0][1]->id => 2
                ],
                $this->residents[1]->id => [
                    $this->evals[1][0]->id => 2,
                    $this->evals[1][1]->id => 2
                ]
            ],
            "subjectRequests" => [
                $this->residents[0]->id => [
                    $this->evals[0][0]->id => 1,
                    $this->evals[0][1]->id => 1
                ],
                $this->residents[1]->id => []
            ]
        ]);
	}

    public function testIndividualReport(){

        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/specific", [
                "resident" => $this->residents[0]->id,
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
                    $this->residents[0]->id => $this->residents[0]->full_name
                ],
                "subjectEvaluators" => [
                    $this->residents[0]->id => [
                        $this->faculty->id => 1
                    ],
                    $this->residents[1]->id => [
                        $this->faculty->id => 1
                    ],
                ],
                "milestones" => [
                    $this->milestones[0]->id => $this->milestones[0]->title,
                    $this->milestones[1]->id => $this->milestones[1]->title
                ],
                "competencies" => [
                    $this->competencies[0]->id => $this->competencies[0]->title,
                    $this->competencies[1]->id => $this->competencies[1]->title,
                ],
                "averageMilestone" => [
                    $this->milestones[0]->id => 6.5,
                    $this->milestones[1]->id => 1.5
                ],
                "averageCompetency" => [
                    $this->competencies[0]->id => 6.5,
                    $this->competencies[1]->id => 1.5
                ],
                "subjectMilestone" => [
                    $this->residents[0]->id => [
                        $this->milestones[0]->id => 6,
                        $this->milestones[1]->id => 1.5
                    ],
                    $this->residents[1]->id => [
                        $this->milestones[0]->id => 7,
                        $this->milestones[1]->id => 1.5
                    ]
                ],
                "subjectCompetency" => [
                    $this->residents[0]->id => [
                        $this->competencies[0]->id => 6,
                        $this->competencies[1]->id => 1.5
                    ],
                    $this->residents[1]->id => [
                        $this->competencies[0]->id => 7,
                        $this->competencies[1]->id => 1.5
                    ]
                ],
                "subjectMilestoneDeviations" => [
                    $this->residents[0]->id => [
                        $this->milestones[0]->id => -0.7071067812,
                        $this->milestones[1]->id => 0
                    ],
                    $this->residents[1]->id => [
                        $this->milestones[0]->id => 0.7071067812,
                        $this->milestones[1]->id => 0
                    ]
                ],
                "subjectCompetencyDeviations" => [
                    $this->residents[0]->id => [
                        $this->competencies[0]->id => -0.7071067812,
                        $this->competencies[1]->id => 0
                    ],
                    $this->residents[1]->id => [
                        $this->competencies[0]->id => 0.7071067812,
                        $this->competencies[1]->id => 0
                    ]
                ],
                "subjectMilestoneEvals" => [
                    $this->residents[0]->id => [
                        $this->milestones[0]->id => 2,
                        $this->milestones[1]->id => 2
                    ],
                    $this->residents[1]->id => [
                        $this->milestones[0]->id => 2,
                        $this->milestones[1]->id => 2
                    ]
                ],
                "subjectCompetencyEvals" => [
                    $this->residents[0]->id => [
                        $this->competencies[0]->id => 2,
                        $this->competencies[1]->id => 2
                    ],
                    $this->residents[1]->id => [
                        $this->competencies[0]->id => 2,
                        $this->competencies[1]->id => 2
                    ]
                ],
                "subjectEvals" => [
                    $this->residents[0]->id => [
                        $this->evals[0][0]->id => 2,
                        $this->evals[0][1]->id => 2
                    ],
                    $this->residents[1]->id => [
                        $this->evals[1][0]->id => 2,
                        $this->evals[1][1]->id => 2
                    ]
                ],
                "subjectRequests" => [
                    $this->residents[0]->id => [
                        $this->evals[0][0]->id => 1,
                        $this->evals[0][1]->id => 1
                    ],
                    $this->residents[1]->id => []
                ],
                "subjectTextResponses" => [
                    (object)[
                        "subject_id" => $this->textResponses[0]->evaluation->subject_id,
                        "first_name" => $this->textResponses[0]->evaluation->evaluator->first_name,
                        "last_name" => $this->textResponses[0]->evaluation->evaluator->last_name,
                        "form_title" => $this->textResponses[0]->evaluation->form->title,
                        "evaluation_date_start" => $this->textResponses[0]->evaluation->evaluation_date_start->toDateString(),
                        "evaluation_date_end" => $this->textResponses[0]->evaluation->evaluation_date_end->toDateString(),
                        "response" => $this->textResponses[0]->response
                    ],
                    (object)[
                        "subject_id" => $this->textResponses[1]->evaluation->subject_id,
                        "first_name" => $this->textResponses[1]->evaluation->evaluator->first_name,
                        "last_name" => $this->textResponses[1]->evaluation->evaluator->last_name,
                        "form_title" => $this->textResponses[1]->evaluation->form->title,
                        "evaluation_date_start" => $this->textResponses[1]->evaluation->evaluation_date_start->toDateString(),
                        "evaluation_date_end" => $this->textResponses[1]->evaluation->evaluation_date_end->toDateString(),
                        "response" => $this->textResponses[1]->response
                    ]
                ],
				"subjectReportEvaluations" => [
					(object)[
						"evaluation_id" => $this->evals[0][0]->id,
						"subject_id" => $this->evals[0][0]->subject_id,
						"first_name" => $this->evals[0][0]->evaluator->first_name,
						"last_name" => $this->evals[0][0]->evaluator->last_name,
						"form_title" => $this->evals[0][0]->form->title,
						"evaluation_date_start" => $this->evals[0][0]->evaluation_date_start->toDateString(),
                        "evaluation_date_end" => $this->evals[0][0]->evaluation_date_end->toDateString()
					],
					(object)[
						"evaluation_id" => $this->evals[0][1]->id,
						"subject_id" => $this->evals[0][1]->subject_id,
						"first_name" => $this->evals[0][1]->evaluator->first_name,
						"last_name" => $this->evals[0][1]->evaluator->last_name,
						"form_title" => $this->evals[0][1]->form->title,
						"evaluation_date_start" => $this->evals[0][1]->evaluation_date_start->toDateString(),
                        "evaluation_date_end" => $this->evals[0][1]->evaluation_date_end->toDateString()
					]
				],
                "subjectEvaluations" => [
					$this->evals[0][0]->subject_id => [
						(object)[
							'subject_id' => $this->evals[0][0]->subject_id,
							'evaluator_id' => $this->evals[0][0]->evaluator_id,
							'requested_by_id' => $this->evals[0][0]->requested_by_id,
							'subject_last' => $this->evals[0][0]->subject->last_name,
							'subject_first' => $this->evals[0][0]->subject->first_name,
							'evaluator_last' => $this->evals[0][0]->evaluator->last_name,
							'evaluator_first' => $this->evals[0][0]->evaluator->first_name,
							'evaluation_id' => $this->evals[0][0]->id,
							'evaluation_date_start' => $this->evals[0][0]->evaluation_date_start->toDateString(),
                            'evaluation_date_end' => $this->evals[0][0]->evaluation_date_end->toDateString(),
							'evaluation_status' => $this->evals[0][0]->status,
							'form_title' => $this->evals[0][0]->form->title
						],
						(object)[
							'subject_id' => $this->evals[0][1]->subject_id,
							'evaluator_id' => $this->evals[0][1]->evaluator_id,
							'requested_by_id' => $this->evals[0][1]->requested_by_id,
							'subject_last' => $this->evals[0][1]->subject->last_name,
							'subject_first' => $this->evals[0][1]->subject->first_name,
							'evaluator_last' => $this->evals[0][1]->evaluator->last_name,
							'evaluator_first' => $this->evals[0][1]->evaluator->first_name,
							'evaluation_id' => $this->evals[0][1]->id,
							'evaluation_date_start' => $this->evals[0][1]->evaluation_date_start->toDateString(),
                            'evaluation_date_end' => $this->evals[0][1]->evaluation_date_end->toDateString(),
							'evaluation_status' => $this->evals[0][1]->status,
							'form_title' => $this->evals[0][1]->form->title
						],
					],
					$this->evals[1][0]->subject_id => [
						(object)[
							'subject_id' => $this->evals[1][0]->subject_id,
							'evaluator_id' => $this->evals[1][0]->evaluator_id,
							'requested_by_id' => $this->evals[1][0]->requested_by_id,
							'subject_last' => $this->evals[1][0]->subject->last_name,
							'subject_first' => $this->evals[1][0]->subject->first_name,
							'evaluator_last' => $this->evals[1][0]->evaluator->last_name,
							'evaluator_first' => $this->evals[1][0]->evaluator->first_name,
							'evaluation_id' => $this->evals[1][0]->id,
							'evaluation_date_start' => $this->evals[1][0]->evaluation_date_start->toDateString(),
                            'evaluation_date_end' => $this->evals[1][0]->evaluation_date_end->toDateString(),
							'evaluation_status' => $this->evals[1][0]->status,
							'form_title' => $this->evals[1][0]->form->title
						],
						(object)[
							'subject_id' => $this->evals[1][1]->subject_id,
							'evaluator_id' => $this->evals[1][1]->evaluator_id,
							'requested_by_id' => $this->evals[1][1]->requested_by_id,
							'subject_last' => $this->evals[1][1]->subject->last_name,
							'subject_first' => $this->evals[1][1]->subject->first_name,
							'evaluator_last' => $this->evals[1][1]->evaluator->last_name,
							'evaluator_first' => $this->evals[1][1]->evaluator->first_name,
							'evaluation_id' => $this->evals[1][1]->id,
							'evaluation_date_start' => $this->evals[1][1]->evaluation_date_start->toDateString(),
                            'evaluation_date_end' => $this->evals[1][1]->evaluation_date_end->toDateString(),
							'evaluation_status' => $this->evals[1][1]->status,
							'form_title' => $this->evals[1][1]->form->title
						],
					],
				]
            ]]);
    }

    public function testFormReport(){
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/form", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "form_id" => $this->form->id
            ]);
		$this->seeJson([
			"subjectResponses" => [
				$this->residents[0]->id => [
					"q1" => [
						(string)$this->responses["q1"][0]->response => 1,
						(string)$this->responses["q1"][1]->response => 1,
						(string)$this->responses["q1"][2]->response => 0,
						(string)$this->responses["q1"][3]->response => 0
					],
					"q2" => [
						(string)$this->responses["q2"][0]->response => 1,
						(string)$this->responses["q2"][1]->response => 1,
						(string)$this->responses["q2"][2]->response => 0,
						(string)$this->responses["q2"][3]->response => 0
					],
					"q3" => [
						$this->textResponses[0]->response => 1,
						$this->textResponses[1]->response => 1,
						$this->textResponses[2]->response => 0,
						$this->textResponses[3]->response => 0
					]
				],
				$this->residents[1]->id => [
					"q1" => [
						(string)$this->responses["q1"][0]->response => 0,
						(string)$this->responses["q1"][1]->response => 0,
						(string)$this->responses["q1"][2]->response => 1,
						(string)$this->responses["q1"][3]->response => 1
					],
					"q2" => [
						(string)$this->responses["q2"][0]->response => 0,
						(string)$this->responses["q2"][1]->response => 0,
						(string)$this->responses["q2"][2]->response => 1,
						(string)$this->responses["q2"][3]->response => 1
					],
					"q3" => [
						$this->textResponses[0]->response => 0,
						$this->textResponses[1]->response => 0,
						$this->textResponses[2]->response => 1,
						$this->textResponses[3]->response => 1
					]
				]
	        ],
			"questionResponses" => [
	            "q1" => [
	                $this->responses["q1"][0]->response,
	                $this->responses["q1"][1]->response,
	                $this->responses["q1"][2]->response,
	                $this->responses["q1"][3]->response
	            ],
	            "q2" => [
	                $this->responses["q2"][0]->response,
	                $this->responses["q2"][1]->response,
	                $this->responses["q2"][2]->response,
	                $this->responses["q2"][3]->response
	            ],
	            "q3" => [
	                $this->textResponses[0]->response,
	                $this->textResponses[1]->response,
	                $this->textResponses[2]->response,
	                $this->textResponses[3]->response
	            ]
	        ],
			"subjectPercentages" => [
				$this->residents[0]->id => [
					"q1" => [
		                (string)$this->responses["q1"][0]->response => 50,
		                (string)$this->responses["q1"][1]->response => 50,
						(string)$this->responses["q1"][2]->response => 0,
		                (string)$this->responses["q1"][3]->response => 0
		            ],
		            "q2" => [
		                (string)$this->responses["q2"][0]->response => 50,
		                (string)$this->responses["q2"][1]->response => 50,
						(string)$this->responses["q2"][2]->response => 0,
		                (string)$this->responses["q2"][3]->response => 0
		            ],
		            "q3" => [
		                $this->textResponses[0]->response => 50,
		                $this->textResponses[1]->response => 50,
						$this->textResponses[2]->response => 0,
		                $this->textResponses[3]->response => 0
		            ]
				],
	            $this->residents[1]->id => [
					"q1" => [
		                (string)$this->responses["q1"][0]->response => 0,
		                (string)$this->responses["q1"][1]->response => 0,
						(string)$this->responses["q1"][2]->response => 50,
		                (string)$this->responses["q1"][3]->response => 50
		            ],
		            "q2" => [
		                (string)$this->responses["q2"][0]->response => 0,
		                (string)$this->responses["q2"][1]->response => 0,
						(string)$this->responses["q2"][2]->response => 50,
		                (string)$this->responses["q2"][3]->response => 50
		            ],
		            "q3" => [
		                $this->textResponses[0]->response => 0,
		                $this->textResponses[1]->response => 0,
						$this->textResponses[2]->response => 50,
		                $this->textResponses[3]->response => 50
		            ]
				]
	        ],
			"averagePercentages" => [
	            "q1" => [
	                (string)$this->responses["q1"][0]->response => 25,
	                (string)$this->responses["q1"][1]->response => 25,
	                (string)$this->responses["q1"][2]->response => 25,
	                (string)$this->responses["q1"][3]->response => 25
	            ],
	            "q2" => [
	                (string)$this->responses["q2"][0]->response => 25,
	                (string)$this->responses["q2"][1]->response => 25,
	                (string)$this->responses["q2"][2]->response => 25,
	                (string)$this->responses["q2"][3]->response => 25
	            ],
	            "q3" => [
	                $this->textResponses[0]->response => 25,
	                $this->textResponses[1]->response => 25,
	                $this->textResponses[2]->response => 25,
	                $this->textResponses[3]->response => 25
	            ]
	        ]
		]);
    }

    public function testNeedsEvaluations(){
		// FIXME
    }

    public function testNeedsEvaluationsReminder(){
		// FIXME: Move to EmailsTest
    }

    public function testAllNeedsEvaluationsReminders(){
		// FIXME: Move to EmailsTest
    }

    public function testFacultyStatistics(){
        $moreFaculty = factory(App\User::class, "faculty", 2)->create();
        $moreEvals = [
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->faculty->id
            ]),
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[1]->id,
                "evaluator_id" => $moreFaculty[0]->id,
                "requested_by_id" => $moreFaculty[0]->id
            ])
        ];
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->post("/report/stats/trainee/faculty", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "user" => "all"
            ]);

		$this->seeJson([
			'noneRequested' => [
				$moreFaculty[1]->full_name
			],
			'noneCompleted' => [
				$moreFaculty[0]->full_name,
				$moreFaculty[1]->full_name
			],
			'lastCompleted' => [
				[
					'name' => $this->faculty->full_name,
					'evaluation' => $this->faculty->evaluatorEvaluations
	   	                ->where("status", "complete")->sortByDesc("complete_date")
	   	                ->first()->toArray()
				]
			],
			'userStats' => [
	            [
	                "id" => $this->faculty->id,
	                "name" => $this->faculty->full_name,
	                "requested" => 1,
	                "totalRequests" => 5,
	                "completed" => 4,
	                "ratio" => 80
	            ],
	            [
	                "id" => $moreFaculty[0]->id,
	                "name" => $moreFaculty[0]->full_name,
	                "requested" => 1,
	                "totalRequests" => 1,
	                "completed" => 0,
	                "ratio" => 0
	            ],
	            [
	                "id" => $moreFaculty[1]->id,
	                "name" => $moreFaculty[1]->full_name,
	                "requested" => 0,
	                "totalRequests" => 0,
	                "completed" => 0,
	                "ratio" => 0
	            ]
			]
			// 'averageCompletionTimes' => ,
		]);
    }

    public function testSingleFacultyStatistics(){
        $moreFaculty = factory(App\User::class, "faculty", 2)->create();
        $moreEvals = [
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->faculty->id
            ]),
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[1]->id,
                "evaluator_id" => $moreFaculty[0]->id,
                "requested_by_id" => $moreFaculty[0]->id
            ])
        ];
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->post("/report/stats/trainee/faculty", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "user" => $this->faculty->id,
            ]);

		$this->seeJson([
			'lastCompleted' => [
				[
					'name' => $this->faculty->full_name,
					'evaluation' => $this->faculty->evaluatorEvaluations
	   	                ->where("status", "complete")->sortByDesc("complete_date")
	   	                ->first()->toArray()
				]
			],
			'userStats' => [
				[
	                "id" => $this->faculty->id,
	                "name" => $this->faculty->full_name,
	                "requested" => 1,
	                "totalRequests" => 5,
	                "completed" => 4,
	                "ratio" => 80
	            ]
			]
		]);
    }

    public function testResidentStatistics(){
        $moreResidents = factory(App\User::class, "resident", 2)->create();
        $moreEvals = [
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->residents[0]->id
            ]),
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $moreResidents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $moreResidents[0]->id
            ])
        ];
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->post("/report/stats/trainee/resident", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "user" => "all"
            ]);

		$this->seeJson([
			'noneRequested' => [
	            $moreResidents[1]->full_name
			],
			'noneCompleted' => [
				$moreResidents[0]->full_name,
	            $moreResidents[1]->full_name
			],
			'lastCompleted' => [
				[
					'name' => $this->residents[0]->full_name,
					'evaluation' => $this->residents[0]->subjectEvaluations
	   	                ->where("status", "complete")->sortByDesc("complete_date")
	   	                ->first()->toArray()
				],
				[
					'name' => $this->residents[1]->full_name,
					'evaluation' => $this->residents[1]->subjectEvaluations
	   	                ->where("status", "complete")->sortByDesc("complete_date")
	   	                ->first()->toArray()
				]
			],
			'userStats' => [
	            [
	                "id" => $this->residents[0]->id,
	                "name" => $this->residents[0]->full_name,
	                "requested" => 3,
	                "totalRequests" => 3,
	                "completed" => 2,
	                "ratio" => 67.0
	            ],
	            [
	                "id" => $this->residents[1]->id,
	                "name" => $this->residents[1]->full_name,
	                "requested" => 0,
	                "totalRequests" => 2,
	                "completed" => 2,
	                "ratio" => 100
	            ],
	            [
	                "id" => $moreResidents[0]->id,
	                "name" => $moreResidents[0]->full_name,
	                "requested" => 1,
	                "totalRequests" => 1,
	                "completed" => 0,
	                "ratio" => 0
	            ],
	            [
	                "id" => $moreResidents[1]->id,
	                "name" => $moreResidents[1]->full_name,
	                "requested" => 0,
	                "totalRequests" => 0,
	                "completed" => 0,
	                "ratio" => 0
	            ],
	        ]
		]);
    }

    public function testSingleResidentStatistics(){
        $moreResidents = factory(App\User::class, "resident", 2)->create();
        $moreEvals = [
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->residents[0]->id
            ]),
            factory(App\Evaluation::class)->create([
                "form_id" => $this->form->id,
                "subject_id" => $moreResidents[0]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $moreResidents[0]->id
            ])
        ];
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->post("/report/stats/trainee/resident", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "user" => $this->residents[0]->id
            ]);

		$this->seeJson([
			'lastCompleted' => [
				[
					'name' => $this->residents[0]->full_name,
					'evaluation' => $this->residents[0]->subjectEvaluations
	   	                ->where("status", "complete")->sortByDesc("complete_date")
	   	                ->first()->toArray()
				]
	        ],
			'userStats' => [
	            [
	                "id" => $this->residents[0]->id,
	                "name" => $this->residents[0]->full_name,
	                "requested" => 3,
	                "totalRequests" => 3,
	                "completed" => 2,
	                "ratio" => 67.0
	            ]
	        ]
		]);
    }
}
