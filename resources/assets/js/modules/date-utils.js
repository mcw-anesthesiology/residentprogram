import moment from 'moment';

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
