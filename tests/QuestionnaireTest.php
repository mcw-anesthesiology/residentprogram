<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Helpers\QuestionnaireValidation;

class QuestionnaireTest extends TestCase {

	use DatabaseTransactions;

    public function testExample() {
        $textQuestion = getQuestion('text-question.json');
		$this->assertTrue(QuestionnaireValidation::questionIsValid($textQuestion));
    }
}

function getQuestion($filename) {
	$dir = 'assets/js/modules/questionnaire/__tests__/complete-reports/scoring';
	return json_decode(file_get_contents(resource_path(
		"{$dir}/{$filename}"
	)), true);
}
