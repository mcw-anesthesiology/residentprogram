<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeritReportsForms extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merit_reports_forms', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->integer('version');
			$table->longText('form'); // Production db doesn't support JSON
            $table->timestamps();

			$table->unique(['name', 'version']);
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
        Schema::dropIfExists('merit_reports_forms');
    }
}
