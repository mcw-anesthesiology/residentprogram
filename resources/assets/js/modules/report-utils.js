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
