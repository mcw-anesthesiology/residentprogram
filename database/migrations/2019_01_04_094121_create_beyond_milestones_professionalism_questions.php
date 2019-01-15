<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBeyondMilestonesProfessionalismQuestions extends Migration
{
	const CONNECTION = 'beyond_milestones';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection(self::CONNECTION)->create('professionalism_questions', function (Blueprint $table) {
            $table->increments('id');

			$table->string('title')->nullable();
			$table->text('intro')->nullable();
			$table->longText('text');
			$table->json('options');


            $table->timestamps();
			$table->softDeletes();
        });

		Schema::connection(self::CONNECTION)->create('professionalism_responses', function (Blueprint $table) {
			$table->increments('id');

			$table->unsignedInteger('question_id');
			$table->unsignedInteger('evaluation_id');

			$table->boolean('value');

            $table->timestamps();
			$table->softDeletes();

			$table->foreign('question_id')->references('id')->on('professionalism_questions');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::connection(self::CONNECTION)->dropIfExists('professionalism_responses');
        Schema::connection(self::CONNECTION)->dropIfExists('professionalism_questions');
    }
}
