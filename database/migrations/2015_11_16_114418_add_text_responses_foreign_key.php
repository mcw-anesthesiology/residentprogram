<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTextResponsesForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('text_responses', function (Blueprint $table) {
            $table->integer("evaluation_id")->unsigned()->change();
        });

        Schema::table('text_responses', function (Blueprint $table) {
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
        Schema::table('text_responses', function (Blueprint $table) {
            $table->dropForeign("text_responses_evaluation_id_foreign");
        });

        Schema::table('text_responses', function (Blueprint $table) {
            $table->integer("evaluation_id")->signed()->change();
        });
    }
}
