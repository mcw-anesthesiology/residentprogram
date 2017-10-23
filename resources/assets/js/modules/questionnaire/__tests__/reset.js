/* @flow */

import { resetQuestion, resetUnmetQuestions } from '../reset.js';

import completeText from './complete-questions/text-question.json';
import completeNumber from './complete-questions/number-question.json';
import completeSelect from './complete-questions/select-question.json';
import completeCheckbox from './complete-questions/checkbox-question.json';
import completeCheckboxWithEditableOption from './complete-questions/checkbox-question-with-editable-option.json';
import completeRadio from './complete-questions/radio-question.json';
import completeList from './complete-questions/list-question.json';

import questionnaireWithUnmetQuestion from './complete-reports/reset/with-unmet-complete-question.json';
import questionnaireWithUnmetSection from './complete-reports/reset/with-unmet-section.json';

describe('resetQuestion', () => {
	test('resets text question', () => {
		expect(resetQuestion(completeText)).toEqual({
			"type": "text",
			"text": "Text question"
		});
	});

	test('resets number question', () => {
		expect(resetQuestion(completeNumber)).toEqual({
			"type": "number",
			"text": "Number question",
			"min": 1
		});
	});

	test('resets select question', () => {
		expect(resetQuestion(completeSelect)).toEqual({
			"type": "select",
			"text": "Select question",
			"options": [
				{
					"text": "Option 1",
					"value": 1
				},
				{
					"text": "Option 2",
					"value": 2
				}
			]
		});
	});

	test('resets checkbox question', () => {
		expect(resetQuestion(completeCheckbox)).toEqual({
			"type": "checkbox",
			"text": "Checkbox question",
			"options": [
				{
					"text": "Option 1",
					"value": 1
				},
				{
					"text": "Option 2",
					"value": 2
				},
				{
					"text": "Option 3",
					"value": 3
				}
			]
		});
	});

	test('resets radio question', () => {
		expect(resetQuestion(completeRadio)).toEqual({
			"type": "radio",
			"text": "Radio question",
			"options": [
				{
					"text": "Option 1",
					"value": 1
				},
				{
					"text": "Option 2",
					"value": 2
				},
				{
					"text": "Option 3",
					"value": 3
				}
			]
		});
	});

	test('resets value of editable option', () => {
		expect(resetQuestion(completeCheckboxWithEditableOption)).toEqual({
			"type": "checkbox",
			"text": "Checkbox question with editable option",
			"options": [
				{
					"text": "",
					"value": "",
					"editable": true
				}
			]
		});
	});

	test('resets list question', () => {
		expect(resetQuestion(completeList)).toEqual({
			"type": "list",
			"listType": "text",
			"text": "List question",
			"items": []
		});
	});
});

describe('resetUnmetQuestions', () => {
	test('resets unmet question', () => {
		expect(resetUnmetQuestions(questionnaireWithUnmetQuestion)).toEqual({
			"title": "Questionnaire with unmet but complete question",
			"sections": [
				{
					"title": "",
					"items": [
						{
							"type": "text",
							"text": "Text question",
							"id": "qid",
							"value": "Ok"
						},
						{
							"type": "text",
							"text": "Conditional question",
							"condition": {
								"questionId": "qid",
								"questionValue": "No"
							}
						}
					]
				}
			]
		});
	});

	test('resets all questions in unmet section', () => {
		expect(resetUnmetQuestions(questionnaireWithUnmetSection)).toEqual({
			"title": "Questionnaire with unmet but complete question",
			"sections": [
				{
					"title": "",
					"items": [
						{
							"type": "text",
							"text": "Text question",
							"id": "qid",
							"value": "Ok"
						}
					]
				},
				{
					"title": "",
					"condition": {
						"questionId": "qid",
						"questionValue": "No"
					},
					"items": [
						{
							"type": "text",
							"text": "Conditional question"
						},
						{
							"type": "number",
							"text": "Conditional question"
						}
					]
				}
			]
		});
	});
});
