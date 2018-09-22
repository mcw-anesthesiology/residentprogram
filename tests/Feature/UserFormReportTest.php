<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

class UserFormReportTest extends TestCase
{
	use RefreshDatabase;

	public function setUp() {
		parent::setUp();

		$this->user = factory(App\User::class, 'resident')->create();
		$this->faculty = factory(App\User::class, 'faculty')->create();
		$this->form = factory(App\Form::class, 'resident')->create();
	}

	public function testScoping() {
		$startDate = Carbon::parse('2018-01-01');
		$endDate = Carbon::parse('2018-02-01');

		$otherResident = factory(App\User::class, 'resident')->create();
		$evaluation = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $this->form->id,
			'subject_id' => $otherResident->id,
			'evaluator_id' => $this->faculty->id,
			'requested_by_id' => $otherResident->id,
			'evaluation_date_start' => $startDate,
			'evaluation_date_end' => $endDate
		]);

		$responses = [
			'q1' => factory(App\Response::class)->create([
				'evaluation_id' => $evaluation->id,
				'question_id' => 'q1'
			]),
			'q2' => factory(App\Response::class)->create([
				'evaluation_id' => $evaluation->id,
				'question_id' => 'q2'
			])
		];
		$textResponses = [
			'q3' => factory(App\TextResponse::class)->create([
				'evaluation_id' => $evaluation->id,
				'question_id' => 'q3'
			])
		];

		$this->actingAs($this->user)
			->post('/report/form', [
				'form_id' => $this->form->id,
				'startDate' => $startDate,
				'endDate' => $endDate
			])->assertJson([
				'evals' => [],
				'subjectEvals' => [],
				'subjectResponses' => [],
				'averageResponses' => [],
				'subjectPercentages' => [],
				'averagePercentages' => [],
				'subjectResponseValues' => [],
				'formContents' => [],
				'evaluators' => []
			]);
	}
}
