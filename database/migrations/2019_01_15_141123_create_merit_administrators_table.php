<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeritAdministratorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merit_administrators', function (Blueprint $table) {
            $table->increments('id');

			$table->integer('administrator_id')->unsigned();
			$table->integer('administratee_id')->unsigned();

            $table->timestamps();

			$table->unique(['administrator_id', 'administratee_id']);
			$table->foreign('administrator_id')->references('id')->on('users');
			$table->foreign('administratee_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merit_administrators');
    }
}
