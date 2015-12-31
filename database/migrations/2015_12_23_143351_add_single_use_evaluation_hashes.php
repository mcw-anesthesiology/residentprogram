<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSingleUseEvaluationHashes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->string("completion_hash")->unique()->nullable();
            $table->dateTime("hash_expires")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->dropColumn("completion_hash");
            $table->dropColumn("hash_expires");
        });
    }
}
