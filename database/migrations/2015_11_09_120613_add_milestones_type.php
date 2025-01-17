<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMilestonesType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('milestones', function (Blueprint $table) {
            $table->string("type")->default("resident");
			$table->string("training_level");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('milestones', function (Blueprint $table) {
            $table->dropColumn("type");
			$table->dropColumn("training_level");
        });
    }
}
