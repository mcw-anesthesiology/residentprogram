<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateScenariosAddTitle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('beyond_milestones')->table('scenarios', function (Blueprint $table) {
			$table->string('title')->nullable()->after('scenario_difficulty');
		});

        Schema::connection('beyond_milestones')->table('scenario_responses', function (Blueprint $table) {
			$table->unique(['scenario_id', 'evaluation_id']);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('beyond_milestones')->table('scenario_responses', function (Blueprint $table) {
			$table->dropUnique(['scenario_id', 'evaluation_id']);
		});

        Schema::connection('beyond_milestones')->table('scenarios', function (Blueprint $table) {
			$table->dropColumn('title');
		});
    }
}
