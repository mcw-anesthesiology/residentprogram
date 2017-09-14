/* @flow */

import { average, standardDeviation } from '../math-utils.js';

import type { User } from '../utils.js';

export function generateScoresReportCsv(
	report: {
		evals: Array<number>,
		subjectEvals: Array<number>,
		subjectResponses: {[string]: {[string]: {[string]: number}}},
		averageResponses: {[string]: {[string]: number}},
		formContents: { // FIXME
			items: Array<Object>
		}
	},
	subjects: Array<User>,
	hideQuestions: Array<boolean>,
	scoreQuestions: Array<boolean>,
	customOptionValues: Array<{[string]: number}>,
	disregardOption: Array<{[string]: boolean}>
): Array<Array<string | number>> {
	let csv = [];
	let header = [
		'#',
		'Question text'
	];

	for (let subject of subjects) {
		header.push(`${subject.full_name} - # responses`);
		header.push(`${subject.full_name} - average`);
		header.push(`${subject.full_name} - standard dev`);
	}

	header.push(
		'Total average'
	);

	csv.push(header);

	for (let i = 0; i < report.formContents.items.length; i++) {
		if (hideQuestions[i])
			continue;

		let item = report.formContents.items[i];
		let questionCustomOptionValues = customOptionValues[i];
		let questionDisregardOption = disregardOption[i];

		let row = [];
		row.push(item.id);
		row.push(item.text);

		if (
			scoreQuestions[i]
			&& canScoreQuestion(item.questionType)
			&& valuesForAllOptions(
				item,
				questionCustomOptionValues,
				questionDisregardOption
			)
		) {
			for (let subject of subjects) {
				let subjectResponses = getResponseValues(
					report.subjectResponses[`${subject.id}`][`${item.id}`],
					questionCustomOptionValues,
					questionDisregardOption
				);

				let subjectAverage = average(subjectResponses);
				let subjectStdDev = standardDeviation(subjectResponses);
				row.push(subjectResponses.length);
				row.push(!Number.isNaN(subjectAverage) ? subjectAverage : '');
				row.push(!Number.isNaN(subjectStdDev) ? subjectStdDev : '');
			}

			row.push(average(getResponseValues(
				report.averageResponses[item.id],
				questionCustomOptionValues,
				questionDisregardOption
			)));

		} else {
			row.push('', '', '');
		}

		csv.push(row);
	}

	return csv;
}

export function canScoreQuestion(questionType: string): boolean {
	return [
		'radio',
		'number',
		'radiononnumeric'
	].includes(questionType);
}

export function valuesForAllOptions(
	question: {options: Array<{value: number}>},
	customOptionValues: {[string]: number},
	disregardOption: {[string]: boolean}
) {
	for (let option of question.options) {
		if (
			getResponseValue(option.value, customOptionValues) == null
			&& !shouldDisregardOption(option.value, disregardOption)
		)
			return false;
	}

	return true;
}

export function getResponseValues(
	responses: {[string]: number},
	customOptionValues: {[string]: number},
	disregardOption: {[string]: boolean}
): Array<number> {
	if (!responses)
		return [];

	let scores = [];

	for (let response of Object.keys(responses)) {
		if (!disregardOption[response]) {
			let value = getResponseValue(response, customOptionValues);
			let optionArr = Array(Number(responses[response]))
				.fill(value);
			scores = scores.concat(optionArr);
		}
	}

	return scores;
}

export function getResponseValue(
	optionValue: number | string,
	customOptionValues: {[string]: number}
): ?number {
	return (
		customOptionValues
		&& optionValue in customOptionValues
		&& !Number.isNaN(Number(customOptionValues[`${optionValue}`]))
	)
		? Number(customOptionValues[`${optionValue}`])
		: !Number.isNaN(Number(optionValue))
			? Number(optionValue)
			: null;
}

export function shouldDisregardOption(
	optionValue: number,
	disregardOption: {[string]: boolean}
): boolean {
	return disregardOption[`${optionValue}`];
}
