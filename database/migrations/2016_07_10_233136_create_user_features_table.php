<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserFeaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_features', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('feature_id');
			$table->integer('user_id')->nullable();
			$table->string('user_type')->nullable();
			$table->string('user_training_level')->nullable();
			$table->string('user_secondary_training_level')->nullable();
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
        Schema::drop('user_features');
    }
}
