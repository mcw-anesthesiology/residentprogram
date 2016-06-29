<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvancementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advancements', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('user_id');
			$table->string('advanced_field');
			$table->string('advanced_value');
			$table->dateTime('run_at');
			$table->boolean('complete')->default(false);
			$table->boolean('successful')->nullable();
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
        Schema::drop('advancements');
    }
}
