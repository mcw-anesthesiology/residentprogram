import moment from 'moment';

export function isoDateString(date){
	return moment(date).format('Y-MM-DD');
}

export function isoDateStringObject(dates){
	dates = Object.assign({}, dates);
	Object.keys(dates).map(key => {
		let date = dates[key];
		if(date && typeof date !== 'string')
			dates[key] = isoDateString(date);
	});

	return dates;
}


export function renderDateRange(startDate, endDate, explicit = false){
	let range = moment(startDate).twix(endDate, {allDay: true});
	return range.start().startOf('month') && range.end().endOf('month') && !explicit
		? range.format({
			dayFormat: '_',
			monthFormat: 'MMMM'
		}).replace(/\s+_/g, '')
		: range.format({
			monthFormat: 'MMMM'
		});
}

export function renderDateRangeExplicit(startDate, endDate){
	return renderDateRange(startDate, endDate, true);
}

export function currentQuarter(){
	let startDate = moment().startOf('month');
	while(startDate.month() % 3 !== 0)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(2, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastQuarter(){
	let startDate = moment().startOf('month');
	while(startDate.month() % 3 !== 0)
		startDate.subtract(1, 'month');
	startDate.subtract(3, 'months');
	let endDate = moment(startDate).add(2, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function currentSemester(){
	let startDate = moment().startOf('month');
	while(startDate.month() % 6 !== 0)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(5, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastSemester(){
	let startDate = moment().startOf('month');
	while(startDate.month() % 6 !== 0)
		startDate.subtract(1, 'month');
	startDate.subtract(6, 'months');
	let endDate = moment(startDate).add(5, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function currentYear(){
	let startDate = moment().startOf('month');
	while(startDate.month() !== 6)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(11, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastYear(){
	let startDate = moment().startOf('month');
	while(startDate.month() !== 6)
		startDate.subtract(1, 'month');
	startDate.subtract(1, 'year');
	let endDate = moment(startDate).add(11, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}
