<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EvaluationTest extends BrowserKitTestCase
{
    use DatabaseTransactions;

    public function setUp(){
        parent::setUp();

        $this->residents = factory(App\User::class, "resident", 2)->create();
        $this->fellow = factory(App\User::class, "resident")->create([
            "training_level" => "fellow"
        ]);
        $this->faculty = factory(App\User::class, "faculty", 2)->create();
        $this->staff = factory(App\User::class, "staff", 2)->create();
        $this->admin = factory(App\User::class, "admin")->create();
        $this->users = [
            $this->residents[0],
            $this->residents[1],
            $this->fellow,
            $this->faculty[0],
            $this->faculty[1],
            $this->staff[0],
            $this->staff[1],
            $this->admin
        ];
		$this->form = factory(App\Form::class, "resident")->create();
        $this->facultyForm = factory(App\Form::class, "faculty")->create();
		$this->milestone = factory(App\Milestone::class)->create();
		$this->competency = factory(App\Competency::class)->create();
		$this->milestoneQuestions = [
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"milestone_id" => $this->milestone->id
			]),
			factory(App\MilestoneQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"milestone_id" => $this->milestone->id
			])
		];
		$this->competencyQuestions = [
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q1",
				"competency_id" => $this->competency->id
			]),
			factory(App\CompetencyQuestion::class)->create([
				"form_id" => $this->form->id,
				"question_id" => "q2",
				"competency_id" => $this->competency->id
			])
		];
    }


    public function testResidentEvaluation(){
        $subject = $this->residents[0];
        $evaluator = $this->faculty[0];
        $eval = factory(App\Evaluation::class, "complete")->create([
            "form_id" => $this->form->id,
            "subject_id" => $subject->id,
            "evaluator_id" => $evaluator->id,
            "requested_by_id" => $subject->id
        ]);

        foreach($this->users as $user){
            $scen = $this->actingAs($user)
                ->visit("/dashboard")
                ->visit("/evaluation/" . $eval->id);
            if($user == $subject || $user == $evaluator || $user->isType("admin") || $user->mentees->contains($subject))
                $scen->seePageIs("/evaluation/" . $eval->id)
                    ->see($eval->id)
                    ->see("View Evaluation");
            else
                $scen->seePageIs("/dashboard")
                    ->see("Error")
                    ->see("Insufficient permissions to view the requested evaluation");
        }
    }

	public function testDeclineEvaluation() {
		$subject = $this->residents[0];
		$evaluator = $this->faculty[0];
		$eval = factory(App\Evaluation::class)->create([
			'form_id' => $this->form->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $subject->id
		]);

		$this->actingAs($evaluator)
			->visit("/evaluation/{$eval->id}")
			->post("/evaluations/{$eval->id}/decline", [
				'_method' => 'PATCH',
				'reason' => "I don't want to"
			]);

		$this->seeInDatabase('evaluations', [
			'id' => $eval->id,
			'status' => 'declined',
			'comment' => "I don't want to"
		]);
	}

	public function testVisibleAnonymousCompleteNotification() {
		$subject = $this->residents[0];
		$evaluator = $this->faculty[0];

		Mail::shouldReceive('send')
			->twice()
			->andReturnUsing(function($view, $params) {
				$this->assertEquals($view, 'emails.complete-notification');
			});

		$visibleEval = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $this->form->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $subject->id
		]);

		$visibleEval->sendCompleteNotification();

		$anonymousEval = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $this->form->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $subject->id,
			'visibility' => 'anonymous'
		]);

		$anonymousEval->sendCompleteNotification();
	}

	public function testHiddenCompleteNotification() {
		$subject = $this->residents[0];
		$evaluator = $this->faculty[0];

		Mail::shouldReceive('send')->times(0);

		$hiddenEval = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $this->form->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $subject->id,
			'visibility' => 'hidden'
		]);

		$hiddenSent = $hiddenEval->sendCompleteNotification();
		$this->assertFalse($hiddenSent);

		$hiddenForm = factory(App\Form::class)->create([
			'visibility' => 'hidden'
		]);
		$hiddenFormEval = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $hiddenForm->id,
			'subject_id' => $subject->id,
			'evaluator_id' => $evaluator->id,
			'requested_by_id' => $subject->id
		]);
		$hiddenFormSent = $hiddenFormEval->sendCompleteNotification();
		$this->assertFalse($hiddenFormSent);
	}

	public function testFacultyCompleteNotification() {
		$resident = $this->residents[0];
		$faculty = $this->faculty[0];

		Mail::shouldReceive('send')->times(0);

		$facultyEval = factory(App\Evaluation::class, 'complete')->create([
			'form_id' => $this->facultyForm->id,
			'subject_id' => $faculty->id,
			'evaluator_id' => $resident->id,
			'requested_by_id' => $resident->id
		]);
		$facultySent = $facultyEval->sendCompleteNotification();
		$this->assertFalse($facultySent);
	}
}
