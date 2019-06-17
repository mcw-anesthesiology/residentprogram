<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Helpers\QuestionnaireValidation;

use App\MeritReport;
use App\MeritReportForm;

class QuestionnaireTest extends TestCase {

	use DatabaseTransactions;

    public function testExample() {
        $textQuestion = getQuestion('text-question.json');
		$this->assertTrue(QuestionnaireValidation::questionIsValid($textQuestion));
    }

	public function testLectures() {
		$questionnaire = json_decode(file_get_contents(__DIR__ . '/questionnaire/mcw-anesth-2017-2018/lectures.json'));
		$mr = new MeritReport();
		$mr->form = new MeritReportForm();
		$mr->form->report_slug = 'mcw-anesth-faculty-merit-2017-2018';
		$mr->report = $questionnaire;
		$this->assertEquals(count($mr->lectures), 15);
	}
}

function getQuestion($filename) {
	$dir = 'assets/js/modules/questionnaire/__tests__/complete-reports/scoring';
	return json_decode(file_get_contents(resource_path(
		"{$dir}/{$filename}"
	)), true);
}
