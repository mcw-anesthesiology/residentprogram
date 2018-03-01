<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Helpers\CaseParser;

class AnesthesiaCase extends Model
{
    protected $table = 'anesthesia_cases';

	protected $fillable = [
		'report_type',
		'report_case_id',
		'procedure_date',
		'start_time',
		'stop_time',
		'procedure_desc',
		'location',
		'surgeon_name'
	];

	protected $casts = [
		'id' => 'integer'
	];

	protected $dates = [
		'procedure_date',
		'start_time',
		'stop_time'
	];

	public function users() {
		return $this->belongsToMany(
			'App\User',
			'user_anesthesia_cases',
			'anesthesia_case_id',
			'user_id'
		)->withPivot('start_time', 'stop_time');
	}

	public static function fromFroedtertEgressRow($row) {
		return CaseParser::parseFroedtertEgressCase($row);
	}

	public static function fromCHWTraineeReportRow($row) {
		return CaseParser::parseCHWTraineeProcedureCase($row);
	}
}
