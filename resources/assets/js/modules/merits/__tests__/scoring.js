/* @flow */

import selectedItem from './complete-reports/scoring/selected-item.json';
import nonselectedItem from './complete-reports/scoring/nonselected-item.json';
import textQuestion from './complete-reports/scoring/text-question.json';
import numberQuestion from './complete-reports/scoring/number-question.json';
import checkboxQuestion from './complete-reports/scoring/checkbox-question.json';
import radioQuestion from './complete-reports/scoring/radio-question.json';
import listQuestion from './complete-reports/scoring/list-question.json';

import scoredMerit from './complete-reports/scoring/scored-merit.json';

import { scoreChecklist } from '../scoring.js';

describe('scoreChecklist', () => {
	test('scores selected item', () => {
		expect(scoreChecklist(selectedItem)).toEqual(new Map([
			['Selected item', 5]
		]));
	});

	test('ignores scores for nonselected item', () => {
		expect(scoreChecklist(nonselectedItem)).toEqual(new Map([]));
	});

	test('scores text question', () => {
		expect(scoreChecklist(textQuestion)).toEqual(new Map([
			['Text category', 10]
		]));
	});

	test('scores number question', () => {
		expect(scoreChecklist(numberQuestion)).toEqual(new Map([
			['Category', 10]
		]));
	});

	test('scores checkbox question', () => {
		expect(scoreChecklist(checkboxQuestion)).toEqual(new Map([
			['Category', 1011]
		]));
	});

	test('scores radio question with max', () => {
		expect(scoreChecklist(radioQuestion)).toEqual(new Map([
			['Category', 1]
		]));
	});

	test('scores list question with max', () => {
		expect(scoreChecklist(listQuestion)).toEqual(new Map([
			['Category', 3]
		]));
	});


	test('works in this one slightly complex case, merges categories', () => {
		expect(scoreChecklist(scoredMerit)).toEqual(new Map([
			['Item and text category', 8],
			['Number category', 10],
			['List category', 6],
			['Radio and checkbox category', 19]
		]));
	});
});
