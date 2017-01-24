import moment from 'moment';
import 'twix';

import { NEW_ITEM_TAG, UNSEEN_EVALUATION_PRIORITY } from './constants.js';
import { ucfirst } from './utils.js';
import { renderDateRange } from './date-utils.js';

export function unlimitTableEvals(){
	let dt = this.DataTable({
		retrieve: true
	});
	let url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('/'))).load().draw();
}

export function unlimitRestTableEvals(){
	let dt = this.DataTable({
		retrieve: true
	});
	let url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('?'))).load().draw();
}

export function createDateCell(td, date){
	if(date && $(td).text() !== moment(date).format('ll'))
		$(td).attr('data-date-value', moment(date).valueOf())
			.addClass('table-date-cell');
}

export function createDateTimeCell(td, date){
	if(date && $(td).text() !== moment(date).format('ll LT'))
		$(td).attr('data-date-value', moment(date).valueOf())
			.addClass('table-date-time-cell');
}

export function createDateRangeCell(start, end){
	return (td, obj) => {
		if(start in obj && end in obj){
			$(td).attr('data-date-range-value',
					renderDateRange(obj[start], obj[end], true))
				.addClass('table-date-range-cell');
		}
	};
}

export function renderDateCell(date, type){
	if(type === 'sort' || type === 'type')
		return date ? moment(date).valueOf() : '';

	return date ? moment(date).format('MMMM Y') : '';
}

export function renderDateTimeCell(date, type){
	if(type === 'sort' || type === 'type')
		return date ? moment(date).valueOf() : '';

	return date ? moment(date).calendar() : '';
}

export function renderDateRangeCell(start, end){
	return (obj, type) => {
		if(type === 'sort' || type === 'type')
			return start in obj ? moment(obj[start]).valueOf() : '';
			
		return start in obj && end in obj
			? renderDateRange(obj[start], obj[end])
			: '';
	};
}

export function renderAccountStatus(status){
	let labelContext;
	switch(status){
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
	return '<span class="label ' + labelContext + '">' + ucfirst(status) + '</span>';
}

export function renderEvaluationStatus(status){
	let labelContext;
	switch(status){
		case 'complete':
			labelContext = 'label-success';
			break;
		case 'disabled':
		case 'canceled by admin':
		case 'canceled by faculty':
		case 'canceled by resident':
		case 'canceled by fellow':
		case 'canceled by staff':
			labelContext = 'label-danger';
			break;
		case 'pending':
			labelContext = 'label-warning';
			break;
		default:
			labelContext = 'label-default';
			break;
	}
	return '<span class="label ' + labelContext + '">' + ucfirst(status) + '</span>';
}

export function renderTrainingLevel(trainingLevel){
	if(trainingLevel){
		if(trainingLevel.indexOf("ca-") > -1)
			return trainingLevel.toUpperCase();
		else
			return ucfirst(trainingLevel);
	}

	return '';
}

export function renderSecondaryTrainingLevel(secondaryTrainingLevel){
	if(secondaryTrainingLevel){
		let allCaps = ['raaps'];
		if(allCaps.indexOf(secondaryTrainingLevel) > -1)
			return secondaryTrainingLevel.toUpperCase();
		else
			return ucfirst(secondaryTrainingLevel);
	}

	return '';
}

export function renderIdToEvalUrl(id){
	return `<a href="/evaluation/${id}">${id}</a>`;
}

export function renderSubjectEvalUrl(url, type, evaluation){
	if(['sort', 'type'].includes(type)){
		if(evaluation.seen_by_subject_at){
			return evaluation.id;
		}
		else {
			if(typeof evaluation.id === 'number')
				return evaluation.id * UNSEEN_EVALUATION_PRIORITY;
			else
				return '~' + evaluation.id;
		}
	}

	if(evaluation.seen_by_subject_at)
		return url;
	else
		return `${NEW_ITEM_TAG} ${url}`;
}

export function renderEvaluatorEvalUrl(url, type, evaluation){
	if(['sort', 'type'].includes(type)){
		if(evaluation.seen_by_evaluator_at){
			return evaluation.id;
		}
		else {
			if(typeof evaluation.id === 'number')
				return evaluation.id * UNSEEN_EVALUATION_PRIORITY;
			else
				return '~' + evaluation.id;
		}
	}

	if(evaluation.seen_by_evaluator_at)
		return url;
	else
		return `${NEW_ITEM_TAG} ${url}`;
}

export function renderNewTag(type, evaluation){
	if(evaluation.seen_by_evaluator_at)
		return '';
	else
		return NEW_ITEM_TAG;
}

export function createEditAndDeleteButtons(thing, name){
	let dataAttributes = getDataAttributes(thing);

	let editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-edit"></span> Edit</button>';

	let deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-remove"></span> Delete</button>';

	return [editButton, deleteButton];
}

export function getDataAttributes(thing, excludes = []){
	let dataAttributes = '';
	Object.getOwnPropertyNames(thing).forEach(function(propName){
		if(!excludes.includes(propName) && thing[propName] != null)
			dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
	});
	return dataAttributes;
}
