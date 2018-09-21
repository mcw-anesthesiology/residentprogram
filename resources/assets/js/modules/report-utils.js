/* @flow */

import download from 'downloadjs';

import { sortNumbers } from './utils.js';

import type { pdfmake$Table } from 'pdfmake';
import type { DateLike } from './date-utils.js';
import type { User } from './utils.js';

export function quoteValue(value: string | number): string {
	if (typeof value === 'number')
		return value.toString();

	return `"${value.replace(/"/g, '""')}"`;
}

export function downloadCsv(
	csv: Array<Array<string | number>>,
	name: string,
	dates?: {startDate: DateLike, endDate: DateLike}
): void {

	let filename = `${name}`;
	if (dates)
		filename += ` - ${dates.startDate.toString()}-${dates.endDate.toString()}`;
	filename += '.csv';

	let file = arrToCsv(csv);

	download(file, filename, 'text/csv');
}

export function arrToCsv(arr: Array<Array<string | number>>): string {
	return arr.map(row =>
		row.map(quoteValue).join(',')
	).join("\n");
}

export function csvHeader(
	thead: Array<Array<string | number | {rowspan?: number, colspan?: number, text: string | number}>>
): Array<Array<string>> {
	let header = [];
	header.fill([], thead.length);
	thead.map((row, rowIndex) => {
		if (!header[rowIndex])
			header[rowIndex] = [];

		row.map((cell, cellIndex) => {
			while (header[rowIndex][cellIndex])
				cellIndex++;

			if (cell.rowspan && typeof cell.rowspan === 'number') {
				for (let i = 0; i < cell.rowspan; i++) {
					if (!header[rowIndex + i])
						header[rowIndex + i] = [];

					header[rowIndex + i][cellIndex] = getHeaderCellText(cell);
					if (cell.colspan  && typeof cell.colspan === 'number') {
						for (let j = 0; j < cell.colspan; j++) {
							header[rowIndex][cellIndex + j] = getHeaderCellText(cell);
						}
					}
				}
			} else if (cell.colspan && typeof cell.colspan === 'number') {
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

export function getHeaderCellText(cell: string | number | {text: string | number}): string {
	const value = cell.text ? cell.text : cell;
	if (typeof value === 'string')
		return `"${value}"`;
	if (typeof value === 'number')
		return `${value}`;

	return '';
}

export function createRadarScaleCallback(valueMap: Map<number, string>): number => string {
	return value => (valueMap.get(value) || '');
}

export function createResponseLegend(valueMap: Map<number, string>): pdfmake$Table {
	let labels = [];
	let values = [];

	let keys = Array.from(valueMap.keys()).sort(sortNumbers);

	for (let key of keys) {
		let label = valueMap.get(key);
		if (label) {
			labels.push(label);
			values.push(key.toString());
		}
	}

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

export function pdfmakeStyle(style: string): string => {
	text: string,
	style: string
} {
	return text => ({
		text,
		style
	});
}

export function tableHeader(text: string): {
	text: string,
	style: string
} {
	return pdfmakeStyle('tableHeader')(text);
}

export function fullWidthTable(table: pdfmake$Table): pdfmake$Table {
	table.widths = Array(table.body[0].length).fill('*');
	return table;
}

export function borderedStripedTable(element: pdfmake$Table): pdfmake$Table {
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

export function getAverageLevel(average: number): string {
	let level = Math.floor(average) / 2;
	return level >= 1
		? `Level ${level}`
		: 'Not Level 1';
}

export const sortFunctions: Map<string, (User, User) => number> = new Map([
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

export const CUSTOM_OPTION_VALUES: Map<string, {[string]: number}> = new Map([
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

export const DISREGARD_OPTION: Map<string, {[string]: boolean}> = new Map([
	['faculty', {
		'n-a': true
	}]
]);
