<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnesthesiaCasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anesthesia_cases', function (Blueprint $table) {
            $table->increments('id');
			$table->string('report_type', 50);
			$table->string('report_case_id', 200);
			$table->date('procedure_date');
			$table->dateTime('start_time');
			$table->dateTime('stop_time');

			// Additional info, will likely add more as we go
			$table->text('procedure_desc')->nullable();
			$table->text('location')->nullable();
			$table->string('surgeon_name')->nullable();

            $table->timestamps();

			$table->unique(['report_type', 'report_case_id'], 'report_type_id_unique');
        });

		Schema::create('user_anesthesia_cases', function (Blueprint $table) {
			$table->increments('id');
			$table->unsignedInteger('user_id');
			$table->unsignedInteger('anesthesia_case_id');
			$table->dateTime('start_time');
			$table->dateTime('stop_time');

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
        Schema::dropIfExists('anesthesia_cases');
		Schema::dropIfExists('user_anesthesia_cases');
    }
}
