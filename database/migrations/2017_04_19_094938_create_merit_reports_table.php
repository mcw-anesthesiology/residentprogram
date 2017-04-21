<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeritReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merit_reports', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('user_id');
			$table->integer('form_id');
			$table->date('period_start');
			$table->date('period_end');
			$table->longText('report'); // JSON not currently supported by production db
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
        Schema::dropIfExists('merit_reports');
    }
}
