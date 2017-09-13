/* @flow */

import type moment$Moment from 'moment';

export type DateLike = string | Date | moment$Moment;

type DateLikeObject = { [string]: DateLike };

import moment from 'moment';

export function isoDateString(date: DateLike){
	return moment(date).format('Y-MM-DD');
}

export function isoDateStringObject(dates: DateLikeObject){
	dates = Object.assign({}, dates);
	Object.keys(dates).map(key => {
		let date = dates[key];
		if(date)
			dates[key] = isoDateString(date);
	});

	return dates;
}

export function datesEqual(dates1: DateLikeObject, dates2: DateLikeObject){
	dates1 = isoDateStringObject(dates1);
	dates2 = isoDateStringObject(dates2);

	return dates1.startDate === dates2.startDate
		&& dates1.endDate === dates2.endDate;
}

export function renderDate(date: DateLike) {
	return date ? moment(date).format('MMMM Y') : '';
}

export function renderDateTime(date: DateLike) {
	return date ? moment(date).calendar() : '';
}

export function renderDateRange(
	startDate: DateLike,
	endDate: DateLike,
	explicit: boolean = false
): string {
	if (startDate === null && endDate === null)
		return 'All time';

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

export function renderDateRangeExplicit(startDate: DateLike, endDate: DateLike): string {
	return renderDateRange(startDate, endDate, true);
}

export const DATE_RANGES = {
	CUSTOM: 'custom',
	CURRENT_QUARTER: 'currentQuarter',
	LAST_QUARTER: 'lastQuarter',
	CURRENT_SEMESTER: 'currentSemester',
	LAST_SEMESTER: 'lastSemester',
	CURRENT_YEAR: 'currentYear',
	LAST_YEAR: 'lastYear',
	ALL_TIME: 'allTime'
};

export function currentQuarter() {
	let startDate = moment().startOf('month');
	while(startDate.month() % 3 !== 0)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(2, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastQuarter() {
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

export function currentSemester() {
	let startDate = moment().startOf('month');
	while(startDate.month() % 6 !== 0)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(5, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastSemester() {
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

export function currentYear() {
	let startDate = moment().startOf('month');
	while(startDate.month() !== 6)
		startDate.subtract(1, 'month');
	let endDate = moment(startDate).add(11, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function lastYear() {
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

export function allTime() {
	return {
		startDate: null,
		endDate: null
	};
}

export function academicYearForDate(date: DateLike) {
	date = moment(date);


	let startYear = (date.month() >= 6) // July
		? date.year()
		: date.year() - 1;

	let startDate = {
		year: startYear,
		month: 6,
		day: 1
	};
	let endDate = moment(startDate).add(1, 'year').subtract(1, 'day');

	return {
		startDate,
		endDate
	};
}

export function quarterForDate(date: DateLike) {
	let startDate = moment(date).startOf('month');
	while (startDate.month() % 3 !== 0)
		startDate.subtract(1, 'month');

	let endDate = moment(startDate).add(2, 'months').endOf('month');

	return {
		startDate,
		endDate
	};
}

export function monthForDate(date: DateLike) {
	let startDate = moment(date).startOf('month');
	let endDate = moment(startDate).endOf('month');

	return {
		startDate,
		endDate
	};
}

export function quartersInAcademicYear() {
	let academicYear = academicYearForDate(new Date());
	let date = moment(academicYear.startDate);

	let quarters = [];
	while (date <= academicYear.endDate) {
		quarters.push(quarterForDate(date));
		date.add(3, 'months');
	}

	return quarters;
}

export function monthsInAcademicYear() {
	let academicYear = academicYearForDate(new Date());
	let date = moment(academicYear.startDate);

	let months = [];
	while (date <= academicYear.endDate) {
		months.push(monthForDate(date));
		date.add(1, 'month');
	}

	return months;
}
