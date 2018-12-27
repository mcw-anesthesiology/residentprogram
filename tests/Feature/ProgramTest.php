<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

use App\Evaluation;
use App\Form;
use App\Milestone;
use App\Competency;
use App\MilestoneQuestion;
use App\CompetencyQuestion;
use App\Program;
use App\Response;
use App\TextResponse;
use App\User;

class ProgramTest extends TestCase {

	use RefreshDatabase;

	public function setUp() {
		parent::setUp();

		$this->faker = \Faker\Factory::create();
		$this->startDate = Carbon::parse('2018-01-01');
		$this->endDate = Carbon::parse('2018-06-01');

		$this->fellowship = $this->faker->word;
		$this->faculty = factory(User::class, 'faculty')->create();
		$this->fellow = factory(User::class, 'fellow')->create([
			'secondary_training_level' => $this->fellowship
		]);
		$this->fellowForm = factory(Form::class, 'fellow')->create();
		$this->facultyForm = factory(Form::class, 'faculty')->create();
		$this->milestones = factory(Milestone::class, 2)->create();
		$this->competencies = factory(Competency::class, 2)->create();

		factory(MilestoneQuestion::class)->create([
			"form_id" => $this->fellowForm->id,
			"question_id" => "q1",
			"milestone_id" => $this->milestones[0]->id
		]);
		factory(MilestoneQuestion::class)->create([
			"form_id" => $this->fellowForm->id,
			"question_id" => "q2",
			"milestone_id" => $this->milestones[1]->id
		]);
		factory(CompetencyQuestion::class)->create([
			"form_id" => $this->fellowForm->id,
			"question_id" => "q1",
			"competency_id" => $this->competencies[0]->id
		]);
		factory(CompetencyQuestion::class)->create([
			"form_id" => $this->fellowForm->id,
			"question_id" => "q2",
			"competency_id" => $this->competencies[1]->id
		]);

		$this->program = Program::create([
			'name' => $this->faker->word,
			'type' => 'fellow',
			'secondary_training_level' => $this->fellowship
		]);
		$this->program->administrators()->attach($this->faculty->id);

	}

	private function createEval($subject, $evaluator, $form, $num = 1, $overrides = []) {
		$evalDateStart = $this->faker->dateTimeBetween($this->startDate, $this->endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $this->endDate);

		$requestDate = $this->faker->dateTimeBetween($this->startDate, $evalDateStart);
		$completeDate = $this->faker->dateTimeBetween($evalDateEnd, $this->endDate);

		$return = [];

		factory(Evaluation::class, 'complete', $num)->create(
			array_merge(
				[
					'form_id' => $form->id,
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
}
