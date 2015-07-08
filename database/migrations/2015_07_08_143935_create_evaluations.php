<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvaluations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("form_id");
            $table->integer("evaluator_id");
            $table->integer("subject_id");
            $table->integer("requested_by_id");
            $table->string("status");
            $table->string("training_level")->nullable();
            $table->dateTime("request_date");
            $table->dateTime("complete_date");
            $table->dateTime("evaluation_date");
            $table->dateTime("archive_date");
            $table->string("request_ip");
            $table->string("complete_ip");
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
        Schema::drop('evaluations');
    }
}
