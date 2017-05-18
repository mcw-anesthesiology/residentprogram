import { sortNumbers } from './utils.js';

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
