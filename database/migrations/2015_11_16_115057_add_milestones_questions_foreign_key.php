<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMilestonesQuestionsForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('milestones_questions', function (Blueprint $table) {
            $table->integer("form_id")->unsigned()->change();
			$table->integer("milestone_id")->unsigned()->change();

			$table->foreign("form_id")->references("id")->on("forms");
			$table->foreign("milestone_id")->references("id")->on("milestones");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('milestones_questions', function (Blueprint $table) {
            $table->dropForeign("milestones_questions_form_id_foreign");
			$table->dropForeign("milestones_questions_milestone_id_foreign");

			$table->integer("form_id")->signed()->change();
			$table->integer("milestone_id")->signed()->change();
        });
    }
}
