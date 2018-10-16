<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Carbon\Carbon;

use App\Evaluation;
use App\Form;
use App\Mentorship;
use App\User;

use Hashids;

class DashboardTest extends TestCase
{
	use RefreshDatabase;

	public function setUp() {
		parent::setUp();

		$this->faker = \Faker\Factory::create();
		$this->resident = factory(User::class, 'resident')->create();
		$this->faculty = factory(User::class, 'faculty')->create();
	}

	public function testNoHidden() {
		$form = factory(Form::class, 'resident')->create();
		$startDate = Carbon::create(2018, 1, 1);
		$endDate = Carbon::create(2018, 6, 1);

		$evalDateStart = $this->faker->dateTimeBetween($startDate, $endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $endDate);

		$eval = factory(Evaluation::class, 'complete')->create([
			'form_id' => $form->id,
			'subject_id' => $this->resident->id,
			'evaluator_id' => $this->faculty->id,
			'requested_by_id' => $this->faker->randomElement([$this->resident, $this->faculty]),
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd,
			'training_level' => $this->resident->training_level,
			'visibility' => 'hidden'
		]);

		$this->actingAs($this->resident)
			->get('/api/dashboard/subject')
			->assertExactJson([]);
	}

	public function testAnonymous() {
		$residentForm = factory(Form::class, 'resident')->create();
		$startDate = Carbon::create(2018, 1, 1);
		$endDate = Carbon::create(2018, 6, 1);

		$evalDateStart = $this->faker->dateTimeBetween($startDate, $endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $endDate);

		$residentEval = factory(Evaluation::class, 'complete')->create([
			'form_id' => $residentForm->id,
			'subject_id' => $this->resident->id,
			'evaluator_id' => $this->faculty->id,
			'requested_by_id' => $this->faker->randomElement([$this->resident, $this->faculty]),
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd,
			'training_level' => $this->resident->training_level,
			'visibility' => 'anonymous'
		]);

		$response = $this->actingAs($this->resident)
			->get('/api/dashboard/subject');

		$response->assertJson([
			['id' => Hashids::encode($residentEval->id)]
		]);

		$response->assertJsonMissing([
			'evaluator_id' => $this->faculty->id,
			'evaluator' => [
				'id' => $this->faculty->id,
				'full_name' => $this->faculty->full_name
			]
		]);

		$facultyForm = factory(Form::class, 'faculty')->create();

		$facultyEval = factory(Evaluation::class, 'complete')->create([
			'form_id' => $facultyForm->id,
			'subject_id' => $this->faculty->id,
			'evaluator_id' => $this->resident->id,
			'requested_by_id' => $this->resident->id,
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd
		]);

		$response = $this->actingAs($this->faculty)
			->get('/api/dashboard/subject');

		$response->assertJson([
			['id' => Hashids::encode($facultyEval->id)]
		]);

		$response->assertJsonMissing([
			'evaluator_id' => $this->resident->id,
			'evaluator' => [
				'id' => $this->resident->id,
				'full_name' => $this->resident->full_name
			]
		]);
	}

	public function testMenteeEvaluation() {
		Mentorship::create([
			'mentor_id' => $this->faculty->id,
			'mentee_id' => $this->resident->id,
			'status' => 'active'
		]);

		$evaluator = factory(User::class, 'faculty')->create();
		$form = factory(Form::class, 'resident')->create();
		$startDate = Carbon::create(2018, 1, 1);
		$endDate = Carbon::create(2018, 6, 1);

		$evalDateStart = $this->faker->dateTimeBetween($startDate, $endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $endDate);

		$eval = factory(Evaluation::class, 'complete')->create([
			'form_id' => $form->id,
			'subject_id' => $this->resident->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $this->faker->randomElement([$this->resident, $evaluator]),
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd,
			'training_level' => $this->resident->training_level
		]);

		$this->actingAs($this->faculty)
			->get("/mentorships/evaluations?startDate={$evalDateStart->format('Y-m-d')}&endDate={$evalDateEnd->format('Y-m-d')}")
			->assertJson([
				$this->resident->id => [
					[
						'form_id' => $form->id,
						'form' => [
							'title' => $form->title
						],
						'subject_id' => $this->resident->id,
						'subject' => [
							'full_name' => $this->resident->full_name
						],
						'evaluator_id' => $evaluator->id,
						'evaluator' => [
							'full_name' => $evaluator->full_name
						],
						'requested_by_id' => $eval->requested_by_id
					]
				]
			]);
	}

	public function testAnonymousMenteeEvaluation() {
		Mentorship::create([
			'mentor_id' => $this->faculty->id,
			'mentee_id' => $this->resident->id,
			'status' => 'active'
		]);
		$evaluator = factory(User::class, 'faculty')->create();
		$form = factory(Form::class, 'resident')->create([
			'visibility' => 'anonymous'
		]);
		$startDate = Carbon::create(2018, 1, 1);
		$endDate = Carbon::create(2018, 6, 1);

		$evalDateStart = $this->faker->dateTimeBetween($startDate, $endDate);
		$evalDateEnd = $this->faker->dateTimeBetween($evalDateStart, $endDate);

		$eval = factory(Evaluation::class, 'complete')->create([
			'form_id' => $form->id,
			'subject_id' => $this->resident->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $this->faker->randomElement([$this->resident, $evaluator]),
			'evaluation_date_start' => $evalDateStart,
			'evaluation_date_end' => $evalDateEnd,
			'training_level' => $this->resident->training_level
		]);

		$this->actingAs($this->faculty)
			->get("/mentorships/evaluations?startDate={$evalDateStart->format('Y-m-d')}&endDate={$evalDateEnd->format('Y-m-d')}")
			->assertJson([
				$this->resident->id => [
					[
						'id' => Hashids::encode($eval->id),
						'form_id' => $form->id,
						'form' => [
							'title' => $form->title
						],
						'subject_id' => $this->resident->id,
						'subject' => [
							'full_name' => $this->resident->full_name
						],
						'requested_by_id' => $eval->requested_by_id
					]
				]
			])
			->assertJsonMissing([
				$this->resident->id => [
					[
						'evaluator_id' => $evaluator->id,
						'evaluator' => [
							'full_name' => $evaluator->full_name
						]
					]
				]
			]);
	}
}
