<?php

namespace Tests\Feature;

use TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

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
	use DatabaseTransactions;

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
		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);

		$this->actingAs($this->resident)
			->post('/report/trainee', [
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'subjectMilestone' => [
					$this->resident->id => [
						$this->milestones[0]->id => $responses['q1']->response,
						$this->milestones[1]->id => $responses['q2']->response
					]
				],
				'subjectMilestoneEvals' => [
					$this->resident->id => [
						$this->milestones[0]->id => 1,
						$this->milestones[1]->id => 1
					]
				],
				'subjectCompetency' => [
					$this->resident->id => [
						$this->competencies[0]->id => $responses['q1']->response,
						$this->competencies[1]->id => $responses['q2']->response
					]
				],
				'subjectCompetencyEvals' => [
					$this->resident->id => [
						$this->competencies[0]->id => 1,
						$this->competencies[1]->id => 1
					]
				],
				'subjectRequests' => [
					$this->resident->id => [
						$evaluation->id => 1
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

	public function testMentee() {
		$user = factory(User::class, 'faculty')->create();
		[$evaluation, $responses, $textResponses] = $this->createEval($this->resident, $this->faculty);
		Mentorship::create([
			'mentor_id' => $user->id,
			'mentee_id' => $this->resident->id,
			'status' => 'active'
		]);

		$this->actingAs($user)
			->post('/report/trainee', [
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'subjectMilestone' => [
					$this->resident->id => [
						$this->milestones[0]->id => $responses['q1']->response,
						$this->milestones[1]->id => $responses['q2']->response
					]
				],
				'subjectMilestoneEvals' => [
					$this->resident->id => [
						$this->milestones[0]->id => 1,
						$this->milestones[1]->id => 1
					]
				],
				'subjectCompetency' => [
					$this->resident->id => [
						$this->competencies[0]->id => $responses['q1']->response,
						$this->competencies[1]->id => $responses['q2']->response
					]
				],
				'subjectCompetencyEvals' => [
					$this->resident->id => [
						$this->competencies[0]->id => 1,
						$this->competencies[1]->id => 1
					]
				],
				'subjectRequests' => [
					$this->resident->id => [
						$evaluation->id => 1
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

	public function testProgram() {
		$fellowship = $this->faker->word;
		$user = factory(User::class, 'faculty')->create();
		$fellow = factory(User::class, 'fellow')->create([
			'secondary_training_level' => $fellowship
		]);
		$fellowForm = factory(Form::class, 'fellow')->create();
		factory(MilestoneQuestion::class)->create([
			"form_id" => $fellowForm->id,
			"question_id" => "q1",
			"milestone_id" => $this->milestones[0]->id
		]);
		factory(MilestoneQuestion::class)->create([
			"form_id" => $fellowForm->id,
			"question_id" => "q2",
			"milestone_id" => $this->milestones[1]->id
		]);
		factory(CompetencyQuestion::class)->create([
			"form_id" => $fellowForm->id,
			"question_id" => "q1",
			"competency_id" => $this->competencies[0]->id
		]);
		factory(CompetencyQuestion::class)->create([
			"form_id" => $fellowForm->id,
			"question_id" => "q2",
			"competency_id" => $this->competencies[1]->id
		]);

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
			->post('/report/trainee', [
				'startDate' => $this->startDate,
				'endDate' => $this->endDate
			])->assertJson([
				'subjectMilestone' => [
					$fellow->id => [
						$this->milestones[0]->id => $responses['q1']->response,
						$this->milestones[1]->id => $responses['q2']->response
					]
				],
				'subjectMilestoneEvals' => [
					$fellow->id => [
						$this->milestones[0]->id => 1,
						$this->milestones[1]->id => 1
					]
				],
				'subjectCompetency' => [
					$fellow->id => [
						$this->competencies[0]->id => $responses['q1']->response,
						$this->competencies[1]->id => $responses['q2']->response
					]
				],
				'subjectCompetencyEvals' => [
					$fellow->id => [
						$this->competencies[0]->id => 1,
						$this->competencies[1]->id => 1
					]
				],
				'subjectRequests' => [
					$fellow->id => [
						$evaluation->id => 1
					]
				],
				'subjects' => [
					$fellow->id => $fellow->full_name
				],
				'subjectEvaluators' => [
					$fellow->id => [
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
}
