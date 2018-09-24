<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

use App\Competency;
use App\CompetencyQuestion;
use App\Evaluation;
use App\Form;
use App\Mentorship;
use App\Milestone;
use App\MilestoneQuestion;
use App\Program;
use App\Response;
use App\TextResponse;
use App\User;

use Log;

class UserTraineeReportTest extends TestCase
{
	use RefreshDatabase;

	public function setUp() {
		parent::setUp();

		$this->faker = \Faker\Factory::create();
		$this->startDate = Carbon::parse('2018-01-01');
		$this->endDate = Carbon::parse('2018-06-01');

		$this->resident = factory(User::class, 'resident')->create();
		$this->faculty = factory(User::class, 'faculty')->create();
		$this->form = factory(Form::class, 'resident')->create();
		$this->milestones = factory(Milestone::class, 2)->create();
		$this->competencies = factory(Competency::class, 2)->create();
        $this->milestoneQuestions = [
			factory(MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"milestone_id" => $this->milestones[0]->id
			]),
			factory(MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"milestone_id" => $this->milestones[1]->id
			])
		];
		$this->competencyQuestions = [
			factory(CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"competency_id" => $this->competencies[0]->id
			]),
			factory(CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"competency_id" => $this->competencies[1]->id
			])
		];

		factory(User::class, 'resident', 3)->create()->each(function ($otherResident) {
			$this->createEval($otherResident, $this->faculty, 20);
		});
	}

	private function createEval($subject, $evaluator, $num = 1, $overrides = []) {
		$evalDateStart = $this->faker->dateTimeBetween($this->startDate, $this->endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $this->endDate);

		$requestDate = $this->faker->dateTimeBetween($this->startDate, $evalDateStart);
		$completeDate = $this->faker->dateTimeBetween($evalDateEnd, $this->endDate);

		$return = [];

		factory(Evaluation::class, 'complete', $num)->create(
			array_merge(
				[
					'form_id' => $this->form->id,
					'subject_id' => $subject->id,
					'evaluator_id' => $evaluator->id,
					'requested_by_id' => $subject->id,
					'evaluation_date_start' => $evalDateStart,
					'evaluation_date_end' => $evalDateEnd,
					'request_date' => $requestDate,
					'complete_date' => $completeDate,
					'training_level' => $subject->training_level
				],
				$overrides
			)
		)->each(function ($evaluation) use (&$return) {
			$responses = [
				'q1' => factory(Response::class)->create([
					'evaluation_id' => $evaluation->id,
					'question_id' => 'q1'
				]),
				'q2' => factory(Response::class)->create([
					'evaluation_id' => $evaluation->id,
					'question_id' => 'q2'
				])
			];
			$textResponses = [
				'q3' => factory(TextResponse::class)->create([
					'evaluation_id' => $evaluation->id,
					'question_id' => 'q3'
				])
			];

			$return[] = [
				$evaluation,
				$responses,
				$textResponses
			];
		});

		if (count($return) == 1)
			$return = $return[0];

		return $return;
	}

	public function testScoping() {
		$this->actingAs($this->resident)
			->post('/report/trainee', [
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'subjectMilestone' => [],
				'subjectMilestoneEvals' => [],
				'subjectCompetency' => [],
				'subjectCompetencyEvals' => [],
				'subjectEvals' => [],
				'subjectRequests' => [],
				'subjects' => [],
				'subjectEvaluators' => [],
				'averageMilestone' => [],
				'averageCompetency' => [],
				'subjectTextResponses' => []
			]);
	}

	public function testOwn() {
		// TODO: Fix this?
		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);
		Log::debug($evaluation);
		Log::debug($evaluation->responses()->with('milestoneQuestions')->get());
		$this->actingAs($this->resident)
			->post('/report/trainee', [
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJsonFragment([
				'subjectMilestone' => [
					$this->resident->id => [
						$this->milestones[0]->id => $responses['q1']->response,
						$this->milestones[1]->id => $responses['q2']->response
					]
				],
				'subjectMilestoneEvals' => [
					$this->resident->id => [
						$evaluation->id => 1
					]
				],
				'subjectCompetency' => [
						$this->competencies[0]->id => $responses['q1']->response,
						$this->competencies[1]->id => $responses['q2']->response
				],
				'subjectCompetencyEvals' => [
					$this->resident->id => [
						$evaluation->id => true
					]
				],
				'subjectEvaluations' => [
					$this->resident->id => [
						$evaluation->id => 1
					]
				],
				'subjectRequests' => [
					$this->resident->id => [
						$evaluation->id => 2
					]
				],
				'subjects' => [
					$this->resident->id => $this->resident->full_name
				],
				'subjectEvaluators' => [
					$this->resident->id => [
						$this->faculty->id => 1
					]
				],
				'averageMilestone' => [
					$this->milestones[0]->id => $responses['q1']->response,
					$this->milestones[1]->id => $responses['q2']->response
				],
				'averageCompetency' => [
					$this->competencies[0]->id => $responses['q1']->response,
					$this->competencies[1]->id => $responses['q2']->response
				],
			]);
	}

	// public function testMentee() {
	// 	$user = factory(User::class, 'faculty')->create();
	// 	Mentorship::create([
	// 		'mentor_id' => $user->id,
	// 		'mentee_id' => $this->resident->id,
	// 		'status' => 'active'
	// 	]);
	//
	// 	[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);
	//
	// 	$this->actingAs($user)
	// 		->post('/report/form', [
	// 			'form_id' => $this->form->id,
	// 			'startDate' => $this->startDate,
	// 			'endDate' => $this->endDate
	// 		])->assertJson([
	// 			'evals' => [$evaluation->id],
	// 			'subjectEvals' => [
	// 				$this->resident->id => [$evaluation->id]
	// 			],
	// 			'subjectResponses' => [
	// 				$this->resident->id => [
	// 					'q1' => [
	// 						$responses['q1']->response => 1
	// 					],
	// 					'q2' => [
	// 						$responses['q2']->response => 1
	// 					],
	// 					'q3' => [
	// 						$textResponses['q3']->response => 1
	// 					]
	// 				]
	// 			],
	// 			'averageResponses' => [
	// 				'q1' => [
	// 					$responses['q1']->response => 1
	// 				],
	// 				'q2' => [
	// 					$responses['q2']->response => 1
	// 				],
	// 				'q3' => [
	// 					$textResponses['q3']->response => 1
	// 				]
	// 			],
	// 			'subjectPercentages' => [
	// 				$this->resident->id => [
	// 					'q1' => [
	// 						$responses['q1']->response => 100
	// 					],
	// 					'q2' => [
	// 						$responses['q2']->response => 100
	// 					],
	// 					'q3' => [
	// 						$textResponses['q3']->response => 100
	// 					]
	// 				]
	// 			],
	// 			'averagePercentages' => [
	// 				'q1' => [
	// 					$responses['q1']->response => 100
	// 				],
	// 				'q2' => [
	// 					$responses['q2']->response => 100
	// 				],
	// 				'q3' => [
	// 					$textResponses['q3']->response => 100
	// 				]
	// 			],
	// 			'subjectResponseValues' => [
	// 				$this->resident->id => [
	// 					'q1' => [
	// 						$evaluation->id => $responses['q1']->response
	// 					],
	// 					'q2' => [
	// 						$evaluation->id => $responses['q2']->response
	// 					],
	// 					'q3' => [
	// 						$evaluation->id => $textResponses['q3']->response
	// 					]
	//
	// 				]
	// 			],
	// 			'evaluators' => [
	// 				$evaluation->id => [
	// 					'id' => $this->faculty->id,
	// 					'full_name' => $this->faculty->full_name
	// 				]
	// 			]
	// 		]);
	// }
	//
	// public function testProgram() {
	// 	$fellowship = $this->faker->word;
	// 	$user = factory(User::class, 'faculty')->create();
	// 	$fellow = factory(User::class, 'fellow')->create([
	// 		'secondary_training_level' => $fellowship
	// 	]);
	// 	$fellowForm = factory(Form::class, 'fellow')->create();
	//
	// 	$program = Program::create([
	// 		'name' => $this->faker->word,
	// 		'type' => 'fellow',
	// 		'secondary_training_level' => $fellowship
	// 	]);
	// 	$program->administrators()->attach($user->id);
	//
	// 	[$evaluation, $responses, $textResponses] = $this->createEval($fellow, $this->faculty, 1, [
	// 		'form_id' => $fellowForm->id
	// 	]);
	//
	// 	$this->actingAs($user)
	// 		->post('/report/form', [
	// 			'form_id' => $fellowForm->id,
	// 			'startDate' => $this->startDate,
	// 			'endDate' => $this->endDate
	// 		])->assertJson([
	// 			'evals' => [$evaluation->id],
	// 			'subjectEvals' => [
	// 				$fellow->id => [$evaluation->id]
	// 			],
	// 			'subjectResponses' => [
	// 				$fellow->id => [
	// 					'q1' => [
	// 						$responses['q1']->response => 1
	// 					],
	// 					'q2' => [
	// 						$responses['q2']->response => 1
	// 					],
	// 					'q3' => [
	// 						$textResponses['q3']->response => 1
	// 					]
	// 				]
	// 			],
	// 			'averageResponses' => [
	// 				'q1' => [
	// 					$responses['q1']->response => 1
	// 				],
	// 				'q2' => [
	// 					$responses['q2']->response => 1
	// 				],
	// 				'q3' => [
	// 					$textResponses['q3']->response => 1
	// 				]
	// 			],
	// 			'subjectPercentages' => [
	// 				$fellow->id => [
	// 					'q1' => [
	// 						$responses['q1']->response => 100
	// 					],
	// 					'q2' => [
	// 						$responses['q2']->response => 100
	// 					],
	// 					'q3' => [
	// 						$textResponses['q3']->response => 100
	// 					]
	// 				]
	// 			],
	// 			'averagePercentages' => [
	// 				'q1' => [
	// 					$responses['q1']->response => 100
	// 				],
	// 				'q2' => [
	// 					$responses['q2']->response => 100
	// 				],
	// 				'q3' => [
	// 					$textResponses['q3']->response => 100
	// 				]
	// 			],
	// 			'subjectResponseValues' => [
	// 				$fellow->id => [
	// 					'q1' => [
	// 						$evaluation->id => $responses['q1']->response
	// 					],
	// 					'q2' => [
	// 						$evaluation->id => $responses['q2']->response
	// 					],
	// 					'q3' => [
	// 						$evaluation->id => $textResponses['q3']->response
	// 					]
	//
	// 				]
	// 			],
	// 			'evaluators' => [
	// 				$evaluation->id => [
	// 					'id' => $this->faculty->id,
	// 					'full_name' => $this->faculty->full_name
	// 				]
	// 			]
	// 		]);
	// }
}
