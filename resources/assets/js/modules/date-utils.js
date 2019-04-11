/* @flow */

import type { moment$Moment, moment$MomentDuration } from 'moment';

export type DateLike = string | Date | moment$Moment;

export type DateLikeObject = { [string]: DateLike };

export type StartEndDateLikeObject = {
	startDate: DateLike,
	endDate: DateLike
};

export type StartEndDateObject = {
	startDate: Date,
	endDate: Date
};

export type StartEndDateStringObject = {
	startDate: string,
	endDate: string
};

import moment from 'moment';

export function isoDateString(date: DateLike): string {
	if (!date) {
		return;
	}

	return moment(date).format('Y-MM-DD');
}

export function isoDateStringObject(
	dates: StartEndDateLikeObject
): StartEndDateStringObject {
	const newDates: {[string]: string} = {};

	for (let [key, date] of Object.entries(dates)) {
		let dateString = isoDateString(date);
		newDates[key] = dateString;
	}

	return newDates;
}

export function datesObject(
	dates: StartEndDateLikeObject
): StartEndDateObject {
	const newDates: {[string]: string} = {};

	for (let [key, date] of Object.entries(dates)) {
		newDates[key] = new Date(date);
	}

	return newDates;
}

export function datesEqual(
	d1: StartEndDateLikeObject,
	d2: StartEndDateLikeObject
): boolean {
	let dates1 = isoDateStringObject(d1);
	let dates2 = isoDateStringObject(d2);

	return dates1.startDate === dates2.startDate
		&& dates1.endDate === dates2.endDate;
}

export function renderDate(date: DateLike, explicit: boolean = false): string {
	const format = explicit ? 'll' : 'MMMM Y';
	return date ? moment(date).format(format) : '';
}

export function renderDateTime(date: DateLike): string {
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
	return (
		isoDateString(startDate) === isoDateString(moment(startDate).startOf('month'))
		&& isoDateString(endDate) === isoDateString(moment(endDate).endOf('month'))
		&& !explicit
	)
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
	THIS_MONTH: 'thisMonth',
	LAST_MONTH: 'lastMonth',
	CURRENT_QUARTER: 'currentQuarter',
	LAST_QUARTER: 'lastQuarter',
	CURRENT_SEMESTER: 'currentSemester',
	LAST_SEMESTER: 'lastSemester',
	CURRENT_YEAR: 'currentYear',
	LAST_YEAR: 'lastYear',
	ALL_TIME: 'allTime'
};

export function thisMonth() {
	return {
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
}

export function lastMonth() {
	const startDate = moment().startOf('month').subtract(1, 'month');
	const endDate = moment(startDate).endOf('month');

	return {
		startDate,
		endDate
	};
}

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

export function semesterForDate(date: DateLike) {
	let startDate = moment(date).startOf('month');
	while (startDate.month() % 6 !== 0)
		startDate.subtract(1, 'month');

	let endDate = moment(startDate).add(5, 'months').endOf('month');

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

export function semestersInAcademicYear() {
	let academicYear = academicYearForDate(new Date());
	let date = moment(academicYear.startDate);

	let semesters = [];
	while (date <= academicYear.endDate) {
		semesters.push(semesterForDate(date));
		date.add(6, 'months');
	}

	return semesters;
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

export type Timezone = string;

export type PhpCarbonDate = {
	date: DateLike,
	timezone: Timezone,
	timezone_type: number
};

export function parseCarbonDate(d: PhpCarbonDate): moment$Moment {
	return moment(d.date);
}

export type PhpDateInterval = {
	y: number,
	m: number,
	d: number,
	days: number,
	h: number,
	i: number,
	s: number,

	f: number,
	first_last_day_of: number,
	have_special_relative: number,
	have_weekday_relative: number,
	special_amount: number,
	special_type: number,
	weekday: number,
	weekday_behavior: number
};

export function parsePhpDateInterval(di: PhpDateInterval): moment$MomentDuration {
	return moment.duration({
		years: di.y,
		months: di.m,
		days: di.days,
		hours: di.h,
		minutes: di.i,
		seconds: di.s
	});
}
