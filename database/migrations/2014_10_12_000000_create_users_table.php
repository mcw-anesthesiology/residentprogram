<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->binary('username')->unique();
            $table->string("type");
            $table->string("status");
            $table->string("training_level")->nullable();
            $table->binary("first_name");
            $table->binary("last_name");
            $table->binary('email')->unique();
            $table->binary("photo_path")->nullable();
            $table->string('password', 60);
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
