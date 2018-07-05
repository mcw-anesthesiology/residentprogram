<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateMeritReportsFormsAddReportSlug extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('merit_reports_forms', function (Blueprint $table) {
			$table->string('report_slug')->nullable();

			$table->unique('report_slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('merit_reports_forms', function (Blueprint $table) {
			$table->dropColumn('report_slug');
        });
    }
}
