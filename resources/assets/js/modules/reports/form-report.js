import { average, standardDeviation } from 'modules/math-utils.js';

export function generateScoresReportCsv(report, subjects, hideQuestions, scoreQuestions, customOptionValues, disregardOption) {
	let csv = [];
	let header = [
		'#',
		'Question text'
	];

	for (let subject of subjects) {
		header.push(`${subject.full_name} average`);
		header.push(`${subject.full_name} standard dev`);
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
			&& canScoreQuestion(item)
			&& valuesForAllOptions(
				item,
				questionCustomOptionValues,
				questionDisregardOption
			)
		) {
			for (let subject of subjects) {
				let subjectResponses = getResponseValues(
					report.subjectResponses[subject.id],
					item.id,
					questionCustomOptionValues,
					questionDisregardOption
				);

				let subjectAverage = average(subjectResponses);
				let subjectStdDev = standardDeviation(subjectResponses);
				row.push(!Number.isNaN(subjectAverage) ? subjectAverage : '');
				row.push(!Number.isNaN(subjectStdDev) ? subjectStdDev : '');
			}

			row.push(average(getResponseValues(
				report.averageResponses,
				item.id,
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

function canScoreQuestion(question) {
	return [
		'radio',
		'number',
		'radiononnumeric'
	].includes(question.questionType);
}

function valuesForAllOptions(question, customOptionValues, disregardOption) {
	for (let option of question.options) {
		if (
			getResponseValue(option.value, customOptionValues) == null
			&& !shouldDisregardOption(option.value, disregardOption)
		)
			return false;
	}

	return true;
}

function getResponseValues(subjectResponses, questionId, customOptionValues, disregardOption) {
	let responses = subjectResponses[questionId];
	if (!responses)
		return;

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

function getResponseValue(optionValue, customOptionValues) {
	return (
		customOptionValues
		&& customOptionValues[optionValue]
		&& !Number.isNaN(Number(customOptionValues[optionValue]))
	)
		? Number(customOptionValues[optionValue])
		: (!Number.isNaN(Number(optionValue))
			? Number(optionValue)
			: null);
}

function shouldDisregardOption(optionValue, disregardOption) {
	return disregardOption[optionValue];
}

// export function generateScoresReportDocDefinition(formContents, report, subject) {
// 	let content = [];
//
//
// 	return {
// 		pageSize: 'LETTER',
// 		content,
// 		styles: {
// 			h1: {
// 				bold: true,
// 				fontSize: 20,
// 				margin: [0, 20],
// 			},
// 			h2: {
// 				bold: true,
// 				fontSize: 16,
// 				margin: [0, 10]
// 			},
// 			questionText: {
// 				fontSize: 11
// 			},
// 			tableHeader: {
// 				bold: true,
// 				fontSize: 10
// 			},
// 			tableBody: {
// 				fontSize: 8
// 			}
// 		}
// 	};
// }
