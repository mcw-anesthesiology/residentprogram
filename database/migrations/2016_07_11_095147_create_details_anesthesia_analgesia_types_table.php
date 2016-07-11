<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailsAnesthesiaAnalgesiaTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('details_anesthesia_analgesia_types', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('details_id');
			$table->integer('anesthesia_analgesia_type_id');
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
        Schema::drop('details_anesthesia_analgesia_types');
    }
}
