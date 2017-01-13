export function residentRadarScaleCallback(value){
	switch(value){
		case 2:
			return 'CBY';
		case 4:
			return 'CA-1';
		case 6:
			return 'CA-2';
		case 8:
			return 'CA-3';
		case 10:
			return 'Attending';
	}

	return '';
}

export function createRadarScaleCallback(valueMap){
	return value => valueMap.get(value);
}

export function createResponseLegend(valueMap){
	let labels = [];
	let values = [];

	let keys = Array.from(valueMap.keys()).sort();
	
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
