<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

use App\Evaluation;
use App\Form;
use App\User;
use App\Response;
use App\TextResponse;

class EvaluationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
		$this->residentEvals();
		$this->fellowEvals();
    }

	public function residentEvals() {
		$form = Form::where('type', 'resident')->first();
		$facultyList = User::where('type', 'faculty')->get();
		$residents = User::where('type', 'resident')->get();

		$startDate = Carbon::now()->subMonths(2);
		$endDate = Carbon::now()->subMonths(1);
		$requestDate = Carbon::parse($startDate)->subHours(1);
		$completeDate = Carbon::parse($requestDate)->addHours(1);

		foreach ($facultyList as $faculty) {
			foreach ($residents as $resident) {
				$evaluations = factory(Evaluation::class, 'complete', 5)->create([
					'form_id' => $form->id,
					'evaluator_id' => $faculty->id,
					'subject_id' => $resident->id,
					'requested_by_id' => $resident->id,
					'evaluation_date_start' => $startDate,
					'evaluation_date_end' => $endDate,
					'request_date' => $requestDate,
					'complete_date' => $completeDate,
					'training_level' => $resident->training_level
				])->each(function ($evaluation) {
					foreach ($evaluation->form->contents['items'] as $item) {
						if ($item['type'] == 'question' && $item['questionType'] == 'radio') {
							factory(Response::class)->create([
								'evaluation_id' => $evaluation->id,
								'question_id' => $item['questionId']
							]);
						} else {
							factory(TextResponse::class)->create([
								'evaluation_id' => $evaluation->id,
								'question_id' => $item['questionId']
							]);
						}
					}
				});
			}
		}
	}

	public function fellowEvals() {
		$fellowForm = Form::where('type', 'fellow')->first();
		$facultyList = User::where('type', 'faculty')->get();
		$fellows = User::where('type', 'resident')->where('training_level', 'fellow')->get();

		$startDate = Carbon::now()->subMonths(2);
		$endDate = Carbon::now()->subMonths(1);
		$requestDate = Carbon::parse($startDate)->subHours(1);
		$completeDate = Carbon::parse($requestDate)->addHours(1);

		foreach ($facultyList as $faculty) {
			foreach ($fellows as $fellow) {
				$evaluations = factory(Evaluation::class, 'complete', 5)->create([
					'form_id' => $fellowForm->id,
					'evaluator_id' => $faculty->id,
					'subject_id' => $fellow->id,
					'requested_by_id' => $fellow->id,
					'evaluation_date_start' => $startDate,
					'evaluation_date_end' => $endDate,
					'request_date' => $requestDate,
					'complete_date' => $completeDate,
					'training_level' => $fellow->training_level
				])->each(function ($evaluation) {
					foreach ($evaluation->form->contents['items'] as $item) {
						if ($item['type'] == 'question' && $item['questionType'] == 'radio') {
							factory(Response::class)->create([
								'evaluation_id' => $evaluation->id,
								'question_id' => $item['questionId']
							]);
						} else {
							factory(TextResponse::class)->create([
								'evaluation_id' => $evaluation->id,
								'question_id' => $item['questionId']
							]);
						}
					}
				});
			}
		}
	}
}
