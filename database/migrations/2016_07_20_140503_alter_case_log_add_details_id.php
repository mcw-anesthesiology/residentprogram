<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCaseLogAddDetailsId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('case_logs', function (Blueprint $table) {
            $table->integer('details_schema_id');
			$table->dropcolumn('details_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('case_logs', function (Blueprint $table) {
            $table->dropColumn('details_schema_id');
			$table->string('details_type');
        });
    }
}
