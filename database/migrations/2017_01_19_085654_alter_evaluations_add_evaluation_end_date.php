<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterEvaluationsAddEvaluationEndDate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluations', function (Blueprint $table) {
            $table->renameColumn('evaluation_date', 'evaluation_date_start');
			$table->date('evaluation_date_end')->after('evaluation_date')->nullable();
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
            $table->renameColumn('evaluation_date_start', 'evaluation_date');
			$table->dropColumn('evaluation_date_end');
        });
    }
}
/*
Translate evaluation_date to start and end dates

App\Evaluation::all()->each(function($eval){
	if(empty($eval->evaluation_date_start)){
		$eval->evaluation_date_start = Carbon\Carbon::parse($eval->request_date)->startOfMonth();
		$eval->evaluation_date_end = Carbon\Carbon::parse($eval->request_date)->endOfMonth();
	}
	elseif($eval->evaluation_date_start ==
			Carbon\Carbon::parse($eval->evaluation_date_start)->startOfMonth()){
				
		$eval->evaluation_date_end = Carbon\Carbon::parse($eval->evaluation_date_start)->endOfMonth();
	}
	else {
		$eval->evaluation_date_end = $eval->evaluation_date_start;
	}
		
	$eval->save();
});
*/
