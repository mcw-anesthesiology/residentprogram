<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableHighlightedQuestions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('highlighted_questions', function (Blueprint $table) {
            $table->increments('id');
			$table->string('highlight_name');
            $table->timestamps();
        });

		Schema::create('highlighted_questions_questions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('highlighted_question_id');
            $table->unsignedInteger('form_id');
			$table->string('question_id');
            $table->timestamps();

            $table->unique(
                ['highlighted_question_id', 'form_id', 'question_id'],
                'hqq_hq_form_question_unique'
            );
            $table->foreign(
                    'highlighted_question_id',
                    'hqq_hq_id_foreign'
                )
                ->references('id')
                ->on('highlighted_questions');
        });

        Schema::create('highlighted_questions_questions_values', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('highlighted_question_question_id');
			// These are usually numbers but I don't want to make
			// a table for each numeric and string values so I'll just
			// use == and be loosey goosey
            $table->string('value');
			$table->string('highlighted_value');
			$table->timestamps();

            $table->unique(
                ['highlighted_question_question_id', 'value'],
                'hqqv_hqq_value_unique'
            );
            $table->foreign(
                    'highlighted_question_question_id',
                    'hqqv_hqq_id_foreign'
                )
                ->references('id')
                ->on('highlighted_questions_questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('highlighted_questions');
        Schema::dropIfExists('highlighted_questions_questions');
		Schema::dropIfExists('highlighted_questions_questions_values');
    }
}
