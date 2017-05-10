<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacultyPeerEvaluations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faculty_peer_evaluations', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('form_id');
			$table->integer('subject_id');
			$table->string('evaluator_email');
			$table->date('evaluation_date_start');
			$table->date('evaluation_date_end');
			$table->dateTime('request_date');
			$table->dateTime('complete_date')->nullable();

			$table->longText('contents'); // JSON not currently supported in db

			$table->string('hash')->unique();
			$table->dateTime('hash_expires');

			$table->string('requested_by');

			$table->string('request_ip');
			$table->string('complete_ip')->nullable();

			$table->string('status');

            $table->timestamps();
			$table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faculty_peer_evaluations');
    }
}
