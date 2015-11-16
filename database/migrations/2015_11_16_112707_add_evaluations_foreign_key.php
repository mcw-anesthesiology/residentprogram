<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEvaluationsForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->integer("form_id")->unsigned()->change();
			$table->integer("subject_id")->unsigned()->change();
			$table->integer("evaluator_id")->unsigned()->change();
			$table->integer("requested_by_id")->unsigned()->change();
        });

		Schema::table("evaluations", function (Blueprint $table) {
			$table->foreign("form_id")->references("id")->on("forms");
			$table->foreign("subject_id")->references("id")->on("users");
			$table->foreign("evaluator_id")->references("id")->on("users");
			$table->foreign("requested_by_id")->references("id")->on("users");
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->dropForeign("evaluations_form_id_foreign");
			$table->dropForeign("evaluations_subject_id_foreign");
			$table->dropForeign("evaluations_evaluator_id_foreign");
			$table->dropForeign("evaluations_requested_by_id_foreign");
        });

		Schema::table("evaluations", function (Blueprint $table) {
			$table->integer("form_id")->signed()->change();
			$table->integer("subject_id")->signed()->change();
			$table->integer("evaluator_id")->signed()->change();
			$table->integer("requested_by_id")->signed()->change();
		});
    }
}
