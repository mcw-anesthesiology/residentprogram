<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EvaluationTest extends TestCase
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
            if($user == $subject || $user == $evaluator || $user->type == "admin" || $user->mentees->contains($subject))
                $scen->seePageIs("/evaluation/" . $eval->id)
                    ->see($eval->id)
                    ->see("View Evaluation");
            else
                $scen->seePageIs("/dashboard")
                    ->see("Error")
                    ->see("Insufficient permissions to view the requested evaluation");
        }
    }
}
