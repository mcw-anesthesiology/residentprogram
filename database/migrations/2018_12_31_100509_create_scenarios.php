<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScenarios extends Migration
{
	const CONNECTION = 'beyond_milestones';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection(self::CONNECTION)->create('scenarios', function (Blueprint $table) {
            $table->increments('id');
			$table->enum('scenario_type', [
				'GENERAL',
				'CARDIO',
				'OB',
				'NEURO',
				'TRAUMA'
			]);
			$table->enum('scenario_difficulty', [
				'BEGINNER',
				'ADVANCED'
			]);

			$table->text('intro')->nullable();
			$table->longText('text');
			$table->json('options');

            $table->timestamps();
			$table->softDeletes();
        });

		Schema::connection(self::CONNECTION)->create('scenario_responses', function (Blueprint $table) {
			$table->increments('id');

			$table->unsignedInteger('scenario_id');
			$table->unsignedInteger('evaluation_id');

			$table->string('text')->nullable();
			$table->double('value');

            $table->timestamps();
			$table->softDeletes();

			$table->foreign('scenario_id')->references('id')->on('scenarios');
			// $table->foreign('evaluation_id')->references('id')->on('evaluations');
		});

		Schema::connection(self::CONNECTION)->create('form_scenarios', function (Blueprint $table) {
			$table->increments('id');

			$table->unsignedInteger('scenario_id');
			$table->unsignedInteger('form_id');

            $table->timestamps();

			$table->foreign('scenario_id')->references('id')->on('scenarios');
			// $table->foreign('evaluation_id')->references('id')->on('evaluations');

			$table->unique(['scenario_id', 'form_id']);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::connection(self::CONNECTION)->dropIfExists('form_scenarios');
		Schema::connection(self::CONNECTION)->dropIfExists('scenario_responses');
        Schema::connection(self::CONNECTION)->dropIfExists('scenarios');
    }
}
