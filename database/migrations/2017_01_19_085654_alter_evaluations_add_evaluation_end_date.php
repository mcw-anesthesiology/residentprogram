<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterEvaluationsAddEvaluationEndDate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->renameColumn('evaluation_date', 'evaluation_date_start');
			$table->date('evaluation_date_end')->after('evaluation_date')->nullable();
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
            $table->renameColumn('evaluation_date_start', 'evaluation_date');
			$table->dropColumn('evaluation_date_end');
        });
    }
}
