<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailsSchemasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('case_log_details_schemas', function (Blueprint $table) {
            $table->increments('id');
			$table->string('details_type');
			$table->integer('version');
			$table->text('schema'); // TODO: Change to json
            $table->timestamps();

			$table->unique(["details_type", "version"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('case_log_details_schemas');
    }
}
