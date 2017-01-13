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
