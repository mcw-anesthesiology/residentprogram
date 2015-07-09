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
            $table->dateTime("complete_date")->nullable();
            $table->dateTime("evaluation_date")->nullable();
            $table->dateTime("archive_date")->nullable();
            $table->string("request_ip");
            $table->string("complete_ip")->nullable();
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
