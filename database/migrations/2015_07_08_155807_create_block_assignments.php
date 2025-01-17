<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlockAssignments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_assignments', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("block_id");
            $table->integer("user_id");
            $table->string("location");
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
        Schema::drop('block_assignments');
    }
}
