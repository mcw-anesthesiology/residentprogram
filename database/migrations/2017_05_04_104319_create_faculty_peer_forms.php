<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacultyPeerForms extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faculty_peer_forms', function (Blueprint $table) {
            $table->increments('id');
			$table->string('title');
			$table->longText('contents'); // JSON not supported in db yet
			$table->string('evaluation_period_type')->default('year');
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
        Schema::dropIfExists('faculty_peer_forms');
    }
}
