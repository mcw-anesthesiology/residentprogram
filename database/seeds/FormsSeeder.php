<?php

use Illuminate\Database\Seeder;

use App\Competency;
use App\CompetencyQuestion;
use App\Form;
use App\Milestone;
use App\MilestoneQuestion;

class FormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$residentForm = factory(Form::class, 'resident')->create([
			'title' => 'Resident form'
		]);

		$fellowForm = factory(Form::class, 'fellow')->create([
			'title' => 'Fellow form'
		]);

		factory(Form::class, 'faculty')->create([
			'title' => 'Faculty form'
		]);

		$competencies = factory(Competency::class, 2)->create();
		factory(CompetencyQuestion::class)->create([
			'form_id' => $residentForm->id,
			'question_id' => 'q1',
			'competency_id' => $competencies[0]->id
		]);
		factory(CompetencyQuestion::class)->create([
			'form_id' => $residentForm->id,
			'question_id' => 'q2',
			'competency_id' => $competencies[1]->id
		]);
		factory(CompetencyQuestion::class)->create([
			'form_id' => $fellowForm->id,
			'question_id' => 'q1',
			'competency_id' => $competencies[0]->id
		]);
		factory(CompetencyQuestion::class)->create([
			'form_id' => $fellowForm->id,
			'question_id' => 'q2',
			'competency_id' => $competencies[1]->id
		]);

		$residentMilestones = factory(Milestone::class, 2)->create();
		factory(MilestoneQuestion::class)->create([
			'form_id' => $residentForm->id,
			'question_id' => 'q1',
			'milestone_id' => $residentMilestones[0]->id
		]);
		factory(MilestoneQuestion::class)->create([
			'form_id' => $residentForm->id,
			'question_id' => 'q2',
			'milestone_id' => $residentMilestones[1]->id
		]);


		$fellowMilestones = factory(Milestone::class, 2)->create();
		factory(MilestoneQuestion::class)->create([
			'form_id' => $fellowForm->id,
			'question_id' => 'q1',
			'milestone_id' => $fellowMilestones[0]->id
		]);
		factory(MilestoneQuestion::class)->create([
			'form_id' => $fellowForm->id,
			'question_id' => 'q2',
			'milestone_id' => $fellowMilestones[1]->id
		]);
    }
}
