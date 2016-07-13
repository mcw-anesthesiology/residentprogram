<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterFeatureColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_features', function (Blueprint $table) {
            $table->dropColumn('feature_id');
			$table->string('feature')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_features', function (Blueprint $table) {
            $table->dropColumn('feature');
			$table->integer('feature_id')->after('id');
        });
    }
}
