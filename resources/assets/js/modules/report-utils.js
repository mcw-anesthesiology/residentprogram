import download from 'downloadjs';

import { escapeCsv, sortNumbers } from './utils.js';

export function quoteValue(value) {
	return escapeCsv(value);
}

export function downloadCsv(csv, subjectName, dates) {

	let filename = `${subjectName} - ${dates.startDate}-${dates.endDate}.csv`;

	let file = csv.map(row =>
		row.map(quoteValue).join(',')
	).join("\n");

	download(file, filename, 'text/csv');
}

export function csvHeader(thead) {
	let header = [];
	header.fill([], thead.length);
	thead.map((row, rowIndex) => {
		if (!header[rowIndex])
			header[rowIndex] = [];

		row.map((cell, cellIndex) => {
			while (header[rowIndex][cellIndex])
				cellIndex++;

			if (cell.rowspan) {
				for (let i = 0; i < cell.rowspan; i++) {
					if (!header[rowIndex + i])
						header[rowIndex + i] = [];

					header[rowIndex + i][cellIndex] = getHeaderCellText(cell);
					if (cell.colspan) {
						for (let j = 0; j < cell.colspan; j++) {
							header[rowIndex][cellIndex + j] = getHeaderCellText(cell);
						}
					}
				}
			} else if (cell.colspan) {
				for (let j = 0; j < cell.colspan; j++) {
					header[rowIndex][cellIndex + j] = getHeaderCellText(cell);
				}
			} else {
				header[rowIndex][cellIndex] = getHeaderCellText(cell);
			}
		});
	});

	return header;
}

export function getHeaderCellText(cell) {
	return cell.text
		? cell.text
		: cell;
}

export function createRadarScaleCallback(valueMap) {
	return value => (valueMap.get(value) || '');
}

export function createResponseLegend(valueMap) {
	let labels = [];
	let values = [];

	let keys = Array.from(valueMap.keys()).sort(sortNumbers);

	keys.map(key => {
		labels.push(valueMap.get(key));
		values.push(key.toString());
	});

	return {
		table: {
			headerRows: 1,
			body: [
				labels.map(tableHeader),
				values
			]
		}
	};
}

export function pdfmakeStyle(style) {
	return text => ({
		text,
		style
	});
}

export function tableHeader(text) {
	return pdfmakeStyle('tableHeader')(text);
}

export function fullWidthTable(table) {
	table.widths = Array(table.body[0].length).fill('*');
	return table;
}

export function borderedStripedTable(element) {
	element.layout = {
		hLineWidth: (i, node) =>
			i === node.table.headerRows
				? 2
				: 1,
		vLineWidth: () => 1,
		hLineColor: () => '#555',
		vLineColor: () => '#555',
		fillColor(i, node) {
			return (i >= node.table.headerRows
					&& i % 2 === 1)
				? '#f3f3f3'
				: '#fff';
		}
	};

	return element;
}

export function getAverageLevel(average) {
	let level = Math.floor(average) / 2;
	return level >= 1
		? `Level ${level}`
		: 'Not Level 1';
}

export const sortFunctions = new Map([
	['training_level', (a, b) => {
		const sortOrder = [
			'intern',
			'ca-1',
			'ca-2',
			'ca-3',
			'fellow'
		];

		let aLevel = a.training_level.toLowerCase();
		let bLevel = b.training_level.toLowerCase();

		return sortOrder.indexOf(aLevel) - sortOrder.indexOf(bLevel);
	}]
]);

export const CUSTOM_OPTION_VALUES = new Map([
	['faculty', {
		'strongly-disagree': 1,
		'disagree': 2,
		'undecided': 3,
		'agree': 4,
		'strongly-agree': 5,

		'yes': 1,
		'no': 0,

		'unacceptable': 1,
		'needs-improvement': 2,
		'meets-expectations': 3,
		'exceeds-expectations': 4,
		'outstanding': 5
	}]
]);

export const DISREGARD_OPTION = new Map([
	['faculty', {
		'n-a': true
	}]
]);
