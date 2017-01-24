<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterFormAddEvaluationRangeType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('forms', function (Blueprint $table) {
            $table->string('evaluation_range_type')->default('month');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('forms', function (Blueprint $table) {
			$table->dropColumn('evaluation_range_type');
        });
    }
}
