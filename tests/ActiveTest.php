
<?php

class ActiveTest extends TestCase
{
	public function setUp() {
		parent::setUp();

		$this->user = factory(App\User::class, 'resident')->create(['status' => 'inactive']);
	}

	public function testRequest() {
		$this->actingAs($this->user)
			->get('/request')
			->assertRedirect()
			->assertSessionHas('error');

		$this->ajax()
			->actingAs($this->user)
			->get('/request')
			->assertForbidden();

		$this->ajax()
			->actingAs($this->user)
			->post('/request')
			->assertForbidden();
	}

	public function testEvaluation() {
		$form = factory(App\Form::class, "resident")->create();
		$faculty = factory(App\User::class, 'faculty')->create();
		$admin = factory(App\User::class, 'admin')->create(['status' => 'inactive']);
		$eval = factory(App\Evaluation::class)->create([
			'form_id' => $form->id,
			'subject_id' => $this->user->id,
			'evaluator_id' => $faculty->id,
			'requested_by_id' => $this->user->id
		]);

		$this->actingAs($this->user)
			->get("/evaluation/{$eval->id}")
			->assertOk();

		$this->actingAs($this->user)
			->post("/evaluation/{$eval->id}")
			->assertRedirect()
			->assertSessionHas('error');

		$this->actingAs($admin)
			->ajax()
			->patch("/evaluations/{$eval->id}/cancel")
			->assertForbidden();
	}

	public function testManage() {
		$user = factory(App\User::class, 'admin')->create(['status' => 'inactive']);
		$this->actingAs($user)
			->get('/manage/evaluations')
			->assertRedirect();
	}

	public function ajax() {
		return $this->withHeaders([
			'X-Requested-With' => 'XMLHttpRequest'
		]);
	}
}
