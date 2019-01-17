<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterMeritReportsAddConstraints extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

		DB::table('merit_reports')->where('status', 'complete')->update(['status' => 'COMPLETE']);
		DB::table('merit_reports')->where('status', 'pending')->update(['status' => 'PENDING']);
		DB::table('merit_reports')->where('status', 'open for editing')->update(['status' => 'OPEN']);
		DB::table('merit_reports')->where('status', 'disabled')->update(['status' => 'DISABLED']);
		DB::statement("ALTER TABLE merit_reports MODIFY COLUMN status enum('COMPLETE', 'PENDING', 'OPEN', 'DISABLED') NOT NULL");
		DB::statement("ALTER TABLE merit_reports MODIFY COLUMN report longtext");

		DB::table('merit_reports')->where('report', '')->update(['report' => null]);

		DB::statement("ALTER TABLE merit_reports MODIFY COLUMN report json");

        Schema::table('merit_reports', function (Blueprint $table) {
			$table->unique(['user_id', 'form_id', 'period_start', 'period_end']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		DB::statement("ALTER TABLE merit_reports MODIFY COLUMN report longtext NOT NULL");
		DB::statement("ALTER TABLE merit_reports MODIFY COLUMN status varchar(255) NOT NULL");

        Schema::table('merit_reports', function (Blueprint $table) {
			$table->dropUnique(['user_id', 'form_id', 'period_start', 'period_end']);
        });

		DB::table('merit_reports')->where('status', 'COMPLETE')->update(['status' => 'complete']);
		DB::table('merit_reports')->where('status', 'PENDING')->update(['status' => 'pending']);
		DB::table('merit_reports')->where('status', 'OPEN')->update(['status' => 'open for editing']);
		DB::table('merit_reports')->where('status', 'DISABLED')->update(['status' => 'disabled']);
    }
}
