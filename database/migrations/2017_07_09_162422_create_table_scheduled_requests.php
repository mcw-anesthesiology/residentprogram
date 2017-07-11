<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableScheduledRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scheduled_requests', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('form_id');
			$table->integer('evaluator_id');
			$table->integer('subject_id');
			$table->integer('requested_by_id');
			$table->dateTime('scheduled_date');
			$table->dateTime('request_date');
			$table->date('evaluation_date_start');
			$table->date('evaluation_date_end');
			$table->ipAddress('request_ip');
			$table->string('request_type');
			$table->boolean('send_hash');
			$table->integer('hash_expires_in');
			$table->boolean('force_notification');
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
        Schema::dropIfExists('scheduled_requests');
    }
}
