<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCaseLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('case_logs', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('user_id');
			$table->integer('location_id');
			$table->datetime('case_date');
			$table->string('details_type');
			$table->text('comment')->nullable();
			$table->text('details')->nullable(); // TODO: Change to JSON some day
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
        Schema::drop('case_logs');
    }
}
