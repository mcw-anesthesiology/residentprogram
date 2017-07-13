<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterEvaluationsAndScheduledRequestsMakeRequestNoteNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('evaluations', function (Blueprint $table) {
            $table->text('request_note')->nullable()->change();
        });

		Schema::table('scheduled_requests', function (Blueprint $table) {
			$table->text('request_note')->nullable()->change();
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
            $table->text('request_note')->change();
        });

		Schema::table('scheduled_requests', function (Blueprint $table) {
			$table->text('request_note')->change();
		});
    }
}
