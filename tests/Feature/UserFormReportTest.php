<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

use App\User;
use App\Evaluation;
use App\Form;
use App\Mentorship;
use App\Program;
use App\Response;
use App\TextResponse;

use Log;

class UserFormReportTest extends TestCase
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

		factory(User::class, 'resident', 3)->create()->each(function ($otherResident) {
			$this->createEval($otherResident, $this->faculty, 20);
		});
	}

	private function createEval($subject, $evaluator, $num = 1, $overrides = []) {
		$evalDateStart = $this->faker->dateTimeBetween($this->startDate, $this->endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $this->endDate);

		$return = [];

		factory(Evaluation::class, 'complete', $num)->create(
			array_merge(
				[
					'form_id' => $this->form->id,
					'subject_id' => $subject->id,
					'evaluator_id' => $evaluator->id,
					'requested_by_id' => $this->faker->randomElement([$subject->id, $evaluator->id]),
					'evaluation_date_start' => $evalDateStart,
					'evaluation_date_end' => $evalDateEnd,
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
			->post('/report/form', [
				'form_id' => $this->form->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'evals' => [],
				'subjectEvals' => [],
				'subjectResponses' => [],
				'subjectPercentages' => [],
				'subjectResponseValues' => [],
				'evaluators' => []
			]);
	}

	public function testOwn() {

		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);

		$this->actingAs($this->resident)
			->post('/report/form', [
				'form_id' => $this->form->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'evals' => [$evaluation->id],
				'subjectEvals' => [
					$this->resident->id => [$evaluation->id]
				],
				'subjectResponses' => [
					$this->resident->id => [
						'q1' => [
							$responses['q1']->response => 1
						],
						'q2' => [
							$responses['q2']->response => 1
						],
						'q3' => [
							$textResponses['q3']->response => 1
						]
					]
				],
				'subjectPercentages' => [
					$this->resident->id => [
						'q1' => [
							$responses['q1']->response => 100
						],
						'q2' => [
							$responses['q2']->response => 100
						],
						'q3' => [
							$textResponses['q3']->response => 100
						]
					]
				],
				'subjectResponseValues' => [
					$this->resident->id => [
						'q1' => [
							$evaluation->id => $responses['q1']->response
						],
						'q2' => [
							$evaluation->id => $responses['q2']->response
						],
						'q3' => [
							$evaluation->id => $textResponses['q3']->response
						]

					]
				],
				'evaluators' => [
					$evaluation->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);
	}

	public function testMentee() {
		$user = factory(User::class, 'faculty')->create();
		Mentorship::create([
			'mentor_id' => $user->id,
			'mentee_id' => $this->resident->id,
			'status' => 'active'
		]);

		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);

		$this->actingAs($user)
			->post('/report/form', [
				'form_id' => $this->form->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'evals' => [$evaluation->id],
				'subjectEvals' => [
					$this->resident->id => [$evaluation->id]
				],
				'subjectResponses' => [
					$this->resident->id => [
						'q1' => [
							$responses['q1']->response => 1
						],
						'q2' => [
							$responses['q2']->response => 1
						],
						'q3' => [
							$textResponses['q3']->response => 1
						]
					]
				],
				'subjectPercentages' => [
					$this->resident->id => [
						'q1' => [
							$responses['q1']->response => 100
						],
						'q2' => [
							$responses['q2']->response => 100
						],
						'q3' => [
							$textResponses['q3']->response => 100
						]
					]
				],
				'subjectResponseValues' => [
					$this->resident->id => [
						'q1' => [
							$evaluation->id => $responses['q1']->response
						],
						'q2' => [
							$evaluation->id => $responses['q2']->response
						],
						'q3' => [
							$evaluation->id => $textResponses['q3']->response
						]

					]
				],
				'evaluators' => [
					$evaluation->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);
	}

	public function testProgram() {
		$fellowship = $this->faker->word;
		$user = factory(User::class, 'faculty')->create();
		$fellow = factory(User::class, 'fellow')->create([
			'secondary_training_level' => $fellowship
		]);
		$fellowForm = factory(Form::class, 'fellow')->create();

		$program = Program::create([
			'name' => $this->faker->word,
			'type' => 'fellow',
			'secondary_training_level' => $fellowship
		]);
		$program->administrators()->attach($user->id);

		[$evaluation, $responses, $textResponses] = $this->createEval($fellow, $this->faculty, 1, [
			'form_id' => $fellowForm->id
		]);

		$this->actingAs($user)
			->post('/report/form', [
				'form_id' => $fellowForm->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'evals' => [$evaluation->id],
				'subjectEvals' => [
					$fellow->id => [$evaluation->id]
				],
				'subjectResponses' => [
					$fellow->id => [
						'q1' => [
							$responses['q1']->response => 1
						],
						'q2' => [
							$responses['q2']->response => 1
						],
						'q3' => [
							$textResponses['q3']->response => 1
						]
					]
				],
				'subjectPercentages' => [
					$fellow->id => [
						'q1' => [
							$responses['q1']->response => 100
						],
						'q2' => [
							$responses['q2']->response => 100
						],
						'q3' => [
							$textResponses['q3']->response => 100
						]
					]
				],
				'subjectResponseValues' => [
					$fellow->id => [
						'q1' => [
							$evaluation->id => $responses['q1']->response
						],
						'q2' => [
							$evaluation->id => $responses['q2']->response
						],
						'q3' => [
							$evaluation->id => $textResponses['q3']->response
						]

					]
				],
				'evaluators' => [
					$evaluation->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);
	}

	public function testHiddenEvaluations() {
		[
			$eval,
			$responses,
			$textResponses
		] = $this->createEval($this->resident, $this->faculty, 1, [
			'visibility' => 'hidden'
		]);

		$this->actingAs($this->resident)
			->post('/report/form', [
				'form_id' => $this->form->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJsonMissing([
				'subjectResponses' => [
					$this->resident->id => [
						'q3' => [
							$textResponses['q3']->response => 1
						]
					]
				],
				'subjectPercentages' => [
					$this->resident->id => [
						'q3' => [
							$textResponses['q3']->response => 100
						]
					]
				],
				'subjectResponseValues' => [
					$this->resident->id => [
						$textResponses['q3']->id => [
							$eval->id => $textResponses['q3']->response
					   	]
					]
				],
				'evaluators' => [
					$eval->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);

		$hiddenForm = factory(Form::class, 'resident')->create([
			'visibility' => 'hidden'
		]);
		[
			$eval,
			$responses,
			$textResponses
		] = $this->createEval($this->resident, $this->faculty, 1, [
			'form_id' => $hiddenForm->id,
			'visibility' => null
		]);

		$this->actingAs($this->resident)
			->post('/report/form', [
				'form_id' => $hiddenForm->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJsonMissing([
				'subjectResponses' => [
					$this->resident->id => [
						'q3' => [
							$textResponses['q3']->response => 1
						]
					]
				],
				'subjectPercentages' => [
					$this->resident->id => [
						'q3' => [
							$textResponses['q3']->response => 100
						]
					]
				],
				'subjectResponseValues' => [
					$this->resident->id => [
						'q3' => [
							$eval->id => $textResponses['q3']->response
					   	]
					]
				],
				'evaluators' => [
					$eval->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);
	}

	public function testAnonymousEvaluations() {
		$anonymousForm = factory(Form::class, 'resident')->create([
			'visibility' => 'anonymous'
		]);
		[
			$anonymousResidentEval,
		   	$anonymousResidentResponses,
			$anonymousResidentTextResponses
		] = $this->createEval($this->resident, $this->faculty, 1, [
			'form_id' => $anonymousForm
		]);

		$this->actingAs($this->resident)
			->post('/report/form', [
				'form_id' => $anonymousForm->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJsonMissing([
				'evaluators' => [
					$anonymousResidentEval->id => [
						'id' => $this->faculty->id,
						'full_name' => $this->faculty->full_name
					]
				]
			]);

		$facultyForm = factory(Form::class, 'faculty')->create();
		[
			$facultyEval,
			$facultyResponses,
			$facultyTextResponses
		] = $this->createEval($this->faculty, $this->resident, 1, [
			'form_id' => $facultyForm,
			'visibility' => 'anonymous'
	   	]);

		// All responses are textResponses in faculty form
		$this->actingAs($this->faculty)
			->post('/report/form', [
				'form_id' => $facultyForm->id,
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJsonMissing([
				'evaluators' => [
					$facultyEval->id => [
						'id' => $this->resident->id,
						'full_name' => $this->resident->full_name
					]
				]
			]);
	}
}
