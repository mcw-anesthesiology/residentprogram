/* @flow */

import moment from 'moment';
import 'twix';

import type { DateLike } from './date-utils.js';
import type { Evaluation } from './utils.js';

import { NEW_ITEM_TAG, UNSEEN_EVALUATION_PRIORITY } from './constants.js';
import { ucfirst } from './utils.js';
import { renderDate, renderDateTime, renderDateRange } from './date-utils.js';

export const TRAINING_LEVEL_ORDER = [
	'intern',
	'ca-1',
	'ca-2',
	'ca-3',
	'fellow'
];

export function unlimitTableEvals(): void {
	let dt = this.DataTable({
		retrieve: true
	});
	let url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('/'))).load().draw();
}

export function unlimitRestTableEvals(): void {
	let dt = this.DataTable({
		retrieve: true
	});
	let url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('?'))).load().draw();
}

export function createDateCell(td: HTMLTableCellElement, date: DateLike): void {
	if (date && $(td).text() !== moment(date).format('ll'))
		$(td).attr('data-date-value', moment(date).valueOf())
			.addClass('table-date-cell');
}

export function createDateTimeCell(td: HTMLTableCellElement, date: DateLike): void {
	if (date && $(td).text() !== moment(date).format('ll LT'))
		$(td).attr('data-date-value', moment(date).valueOf())
			.addClass('table-date-time-cell');
}

export function createDateRangeCell(start: string, end: string):
		(HTMLTableCellElement, {start: DateLike, end: DateLike}) => void {

	return (td: HTMLTableCellElement, obj: {start: DateLike, end: DateLike}) => {
		if (start in obj && end in obj) {
			$(td).attr('data-date-range-value',
					renderDateRange(obj[start], obj[end], true))
				.addClass('table-date-range-cell');
		}
	};
}

export function renderDateCell(date: DateLike, type: string) {
	if (type === 'sort' || type === 'type')
		return date ? moment(date).valueOf() : '';

	return renderDate(date);
}

export function renderDateTimeCell(date: DateLike, type: string) {
	if (type === 'sort' || type === 'type')
		return date ? moment(date).valueOf() : '';

	return renderDateTime(date);
}

export function renderDateRangeCell(start: string, end: string):
		({start: DateLike, end: DateLike}, string) => string {

	return (obj, type) => {
		if (type === 'sort' || type === 'type')
			return start in obj ? moment(obj[start]).valueOf() : '';

		return start in obj && end in obj
			? renderDateRange(obj[start], obj[end])
			: '';
	};
}

export function renderAccountStatus(status: string): string {
	let labelContext;
	switch (status) {
		case 'active':
			labelContext = 'label-success';
			break;
		case 'inactive':
			labelContext = 'label-danger';
			break;
		case 'pending':
			labelContext = 'label-warning';
			break;
		default:
			labelContext = 'label-default';
			break;
	}

	return `<span class="label ${labelContext}">${ucfirst(status)}</span>`;
}

export function renderEvaluationType(evaluation: Evaluation): string {
	switch (evaluation.type) {
		case 'resident':
		case 'trainee':
			return 'Trainee evaluation';
		case 'fellow':
			return 'Fellow evaluation';
		case 'intern':
			return 'Intern 360 evaluation';
		case 'faculty':
			return 'Faculty evaluation';
		case 'app':
			return 'APP evaluation';
		case 'self':
			return 'Self evaluation';
		default:
			return 'Evaluation';
	}
}

export function getEvaluationStatusLabelType(status: string): string {
	switch (status) {
		case 'complete':
			return 'success';
		case 'disabled':
		case 'canceled by admin':
		case 'canceled by faculty':
		case 'canceled by resident':
		case 'canceled by fellow':
		case 'canceled by staff':
		case 'declined':
			return 'danger';
		case 'pending':
			return 'warning';
		case 'open for editing':
			return 'info';
		default:
			return 'default';
	}
}

export function getEvaluationStatusLabel(status: string): string {
	return `label-${getEvaluationStatusLabelType(status)}`;
}

export function renderEvaluationStatus(status: string): string {
	return `<span class="label ${getEvaluationStatusLabel(status)}">
			${ucfirst(status)}
		</span>`;
}

export function renderTrainingLevel(trainingLevel: string): string {
	if (trainingLevel) {
		if (trainingLevel.indexOf("ca-") > -1)
			return trainingLevel.toUpperCase();
		else
			return ucfirst(trainingLevel);
	}

	return '';
}

export function renderSecondaryTrainingLevel(secondaryTrainingLevel: string): string {
	if (secondaryTrainingLevel) {
		let allCaps = ['raaps'];
		if (allCaps.indexOf(secondaryTrainingLevel) > -1)
			return secondaryTrainingLevel.toUpperCase();
		else
			return ucfirst(secondaryTrainingLevel);
	}

	return '';
}

export function renderIdToEvalUrl(id: string | number): string {
	return `<a href="/evaluation/${id}">${id}</a>`;
}

export function renderSubjectEvalUrl(
	url: string, type: string, evaluation: Evaluation
): string | number {
	if (['sort', 'type'].includes(type)) {
		if (evaluation.seen_by_subject_at) {
			return evaluation.id;
		}
		else {
			if (typeof evaluation.id === 'number')
				return evaluation.id * UNSEEN_EVALUATION_PRIORITY;
			else
				return '~' + evaluation.id;
		}
	}

	if (evaluation.seen_by_subject_at)
		return url;
	else
		return `${NEW_ITEM_TAG} ${url}`;
}

export function renderEvaluatorEvalUrl(
	url: string, type: string, evaluation: Evaluation
): string | number {
	if (['sort', 'type'].includes(type)) {
		if (evaluation.seen_by_evaluator_at) {
			return evaluation.id;
		}
		else {
			if (typeof evaluation.id === 'number')
				return evaluation.id * UNSEEN_EVALUATION_PRIORITY;
			else
				return '~' + evaluation.id;
		}
	}

	if (evaluation.seen_by_evaluator_at)
		return url;
	else
		return `${NEW_ITEM_TAG} ${url}`;
}

export function renderNewTag(type: string, evaluation: Evaluation) {
	if (evaluation.seen_by_evaluator_at)
		return '';
	else
		return NEW_ITEM_TAG;
}

export function renderSubjectCell(
	name: string, type: string, evaluation: Evaluation
) {
	if (type === 'display')
		return `<a href="/profile/${evaluation.subject_id}">${name}</a>`;

	return name;
}

export function createEditAndDeleteButtons(thing: Object, name: string): [string, string] {
	let dataAttributes = getDataAttributes(thing);

	let editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-edit"></span> Edit</button>';

	let deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-remove"></span> Delete</button>';

	return [editButton, deleteButton];
}

export function getDataAttributes(thing: Object, excludes: Array<string> = []): string {
	let dataAttributes = '';
	Object.getOwnPropertyNames(thing).forEach(function(propName) {
		if (!excludes.includes(propName) && thing[propName] != null)
			dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
	});

	return dataAttributes;
}
