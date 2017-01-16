import { sortNumbers } from './utils.js';

export function createRadarScaleCallback(valueMap){
	return value => (valueMap.get(value) || '');
}

export function createResponseLegend(valueMap){
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

export function tableHeader(text){
	return {
		text: text,
		style: 'tableHeader'
	};
}

export function getAverageLevel(average){
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
