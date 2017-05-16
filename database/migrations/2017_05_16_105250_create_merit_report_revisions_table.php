<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeritReportRevisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merit_report_revisions', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('merit_report_id');
			$table->integer('changed_by');

			$table->string('old_status');
			$table->string('new_status');

			$table->longText('old_report');
			$table->longText('new_report');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merit_report_revisions');
    }
}
