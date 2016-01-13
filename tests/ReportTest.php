<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Carbon\Carbon;

class ReportTest extends TestCase
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
                "requested_by_id" => $this->admin->id
            ]),
            factory(App\Evaluation::class, "complete", 2)->create([
                "form_id" => $this->form->id,
                "subject_id" => $this->residents[1]->id,
                "evaluator_id" => $this->faculty->id,
                "requested_by_id" => $this->admin->id
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

        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/aggregate", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "trainingLevel" => "all",
                "graphs" => "none"
            ])
            ->assertViewHasAll([
                "trainingLevel" => "all",
                "graphOption" => "none",
                "startDate" => $startDate,
                "endDate" => $endDate,
                "subjects" => [
                    $this->residents[0]->id => $this->residents[0]->full_name,
                    $this->residents[1]->id => $this->residents[1]->full_name
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
                "subjectTextResponses" => [
                    (object)[
                        "subject_id" => $this->textResponses[0]->evaluation->subject_id,
                        "first_name" => $this->textResponses[0]->evaluation->evaluator->first_name,
                        "last_name" => $this->textResponses[0]->evaluation->evaluator->last_name,
                        "form_title" => $this->textResponses[0]->evaluation->form->title,
                        "evaluation_date" => $this->textResponses[0]->evaluation->evaluation_date->toDateString(),
                        "response" => $this->textResponses[0]->response
                    ],
                    (object)[
                        "subject_id" => $this->textResponses[1]->evaluation->subject_id,
                        "first_name" => $this->textResponses[1]->evaluation->evaluator->first_name,
                        "last_name" => $this->textResponses[1]->evaluation->evaluator->last_name,
                        "form_title" => $this->textResponses[1]->evaluation->form->title,
                        "evaluation_date" => $this->textResponses[1]->evaluation->evaluation_date->toDateString(),
                        "response" => $this->textResponses[1]->response
                    ]
                ],
            ]]);
    }

    public function testFormReport(){
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        function encodeAndStrip($array){
            $array = addslashes(json_encode($array));
            str_replace("'", "", $array);
            return $array;
        }

        $this->actingAs($this->admin)
            ->visit("/dashboard")
            ->post("/report/form", [
                "subject" => $this->residents[0]->id,
                "startDate" => $startDate,
                "endDate" => $endDate,
                "form_id" => $this->form->id
            ]);
        $this->assertViewHas("subjectResponses", encodeAndStrip([
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
        ]));
        $this->assertViewHas("questionResponses", encodeAndStrip([
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
        ]));
        $this->assertViewHas("subjectPercentages", encodeAndStrip([
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
        ]));
        $this->assertViewHas("averagePercentages", encodeAndStrip([
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
        ]));
    }

    public function testNeedsEvaluations(){
        $moreMilestones = factory(App\Milestone::class, 2)->create();
        $anotherCompetency = factory(App\Milestone::class)->create();

        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $this->actingAs($this->admin)
            ->post("/report/needs-eval/get", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "trainingLevel" => "all"
            ])
            ->seeJson([
                "data" => [
                    [
                        $this->residents[0]->full_name,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>"
                    ],
                    [
                        $this->residents[1]->full_name,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>"
                    ]
                ]
            ]);
    }

    public function testMilestonesCompetenciesFormsReport(){
        $moreMilestones = factory(App\Milestone::class, 2)->create();
        $anotherCompetency = factory(App\Competency::class)->create();
        $anotherForm = factory(App\Form::class, "resident")->create();

        $this->actingAs($this->admin)
            ->get("/report/milestones-competencies-forms/milestones")
            ->seeJson([
                "data" => [
                    [
                        $this->milestones[0]->title,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                    ],
                    [
                        $this->milestones[1]->title,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                    ],
                    [
                        $moreMilestones[0]->title,
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                    ],
                    [
                        $moreMilestones[1]->title,
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                    ]
                ]
            ]);

        $this->actingAs($this->admin)
            ->get("/report/milestones-competencies-forms/competencies")
            ->seeJson([
                "data" => [
                    [
                        $this->competencies[0]->title,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>"
                    ],
                    [
                        $this->competencies[1]->title,
                        "<span class='glyphicon glyphicon-ok'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>"
                    ],
                    [
                        $anotherCompetency->title,
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>",
                        "<span class='glyphicon glyphicon-remove'></span>"
                    ]
                ]
            ]);
    }

    public function testStatistics(){
        $anotherFaculty = factory(App\User::class, "faculty")->create();
        $anotherEval = factory(App\Evaluation::class)->create([
            "form_id" => $this->form->id,
            "subject_id" => $this->residents[0]->id,
            "evaluator_id" => $this->faculty->id,
            "requested_by_id" => $this->faculty->id
        ]);
        $startDate = Carbon::parse("0001-01-01");
        $endDate = Carbon::now();
        $endDate->second = 0;

        $response = $this->actingAs($this->admin)
            ->post("/report/stats/faculty", [
                "startDate" => $startDate,
                "endDate" => $endDate,
                "user" => "all"
            ])
            ->see("{$this->faculty->full_name}\t1\t5\t4\t80")
            ->see("{$anotherFaculty->full_name}\t0\t0\t0\t0");
    }
}
