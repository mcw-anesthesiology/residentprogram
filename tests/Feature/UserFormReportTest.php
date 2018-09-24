<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

use App\User;
use App\Evaluation;
use App\Form;
use App\Response;
use App\TextResponse;

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
			$this->createEval($otherResident, 20);
		});
	}

	private function createEval($subject, $num = 1) {
		$evalDateStart = $this->faker->dateTimeBetween($this->startDate, $this->endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $this->endDate);

		$return = [];

		factory(Evaluation::class, 'complete', $num)->create([
			'form_id' => $this->form->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $this->faculty->id,
			'requested_by_id' => $subject->id,
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd
		])->each(function ($evaluation) use (&$return) {
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
				'averageResponses' => [],
				'subjectPercentages' => [],
				'averagePercentages' => [],
				'subjectResponseValues' => [],
				'evaluators' => []
			]);
	}

	public function testOwn() {

		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident);

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
				'averageResponses' => [
					'q1' => [
						$responses['q1']->response => 1
					],
					'q2' => [
						$responses['q2']->response => 1
					],
					'q3' => [
						$textResponses['q3']->response => 1
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
				'averagePercentages' => [
					'q1' => [
						$responses['q1']->response => 100
					],
					'q2' => [
						$responses['q2']->response => 100
					],
					'q3' => [
						$textResponses['q3']->response => 100
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
		$evalDateStart = $this->faker->dateTimeBetween($this->startDate, $this->endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $this->endDate);

		$evaluation = factory(Evaluation::class, 'complete')->create([
			'form_id' => $this->form->id,
			'subject_id' => $this->resident->id,
			'evaluator_id' => $this->faculty->id,
			'requested_by_id' => $this->resident->id,
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd
		]);

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
				'averageResponses' => [
					'q1' => [
						$responses['q1']->response => 1
					],
					'q2' => [
						$responses['q2']->response => 1
					],
					'q3' => [
						$textResponses['q3']->response => 1
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
				'averagePercentages' => [
					'q1' => [
						$responses['q1']->response => 100
					],
					'q2' => [
						$responses['q2']->response => 100
					],
					'q3' => [
						$textResponses['q3']->response => 100
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

}
