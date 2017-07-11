<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterEvaluationsAndScheduledRequestsAddRequestNote extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->text('request_note');
        });

		Schema::table('scheduled_requests', function (Blueprint $table) {
			$table->text('request_note');
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
            $table->dropColumn('request_note');
        });

		Schema::table('scheduled_requests', function (Blueprint $table) {
			$table->dropColumn('request_note');
		});
    }
}
