<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgramsFixProgramAdministrators extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name');

			$table->string('type');
			$table->string('training_level')->nullable();
			$table->string('secondary_training_level')->nullable();
			$table->timestamps();
        });

		Schema::table('program_administrators', function (Blueprint $table) {
			$table->dropColumn('type');
			$table->dropColumn('training_level');
			$table->dropColumn('secondary_training_level');

			$table->integer('program_id')->unsigned();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs');
		Schema::table('program_administrators', function (Blueprint $table) {
			$table->string('type');
			$table->string('training_level')->nullable();
			$table->string('secondary_training_level')->nullable();

			$table->dropColumn('program_id');
		});
    }
}
