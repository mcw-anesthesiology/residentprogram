<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCompetenciesQuestionsForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('competencies_questions', function (Blueprint $table) {
            $table->integer("form_id")->unsigned()->change();
			$table->integer("competency_id")->unsigned()->change();

			$table->foreign("form_id")->references("id")->on("forms");
			$table->foreign("competency_id")->references("id")->on("competencies");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('competencies_questions', function (Blueprint $table) {
            $table->dropForeign("competencies_questions_form_id_foreign");
			$table->dropForeign("competencies_questions_competency_id_foreign");

			$table->integer("form_id")->unsigned()->change();
			$table->integer("competency_id")->unsigned()->change();
        });
    }
}
