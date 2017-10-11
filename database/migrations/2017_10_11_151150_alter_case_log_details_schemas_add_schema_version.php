<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCaseLogDetailsSchemasAddSchemaVersion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('case_log_details_schemas', function (Blueprint $table) {
			$table->integer('case_log_version')->default(1);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('case_log_details_schemas', function (Blueprint $table) {
			$table->dropColumn('case_log_version');
		});
    }
}
