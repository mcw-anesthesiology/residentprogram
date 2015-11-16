<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddResponsesForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('responses', function (Blueprint $table) {
            $table->integer("evaluation_id")->unsigned()->change();
			$table->foreign("evaluation_id")->references("id")->on("evaluations");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('responses', function (Blueprint $table) {
            $table->dropForeign("responses_evaluation_id_foreign");
			$table->integer("evaluation_id")->signed()->change();
        });
    }
}
