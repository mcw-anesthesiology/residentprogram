/* @flow */

import moment from 'moment';
import striptags from 'striptags';

import type { DateLike } from './date-utils.js';

// All the $FlowFixMes in this file are due to
// https://github.com/facebook/flow/issues/2221

type DateString = string;

// FIXME
export type User = {
	id: number,
	username: string,
	type: string, // TODO: make enum
	specific_type: string, // TODO: make enum
	training_level: string, // TODO: make enum
	secondary_training_level: string, // TODO: make enum
	first_name: string,
	last_name: string,
	full_name: string,
	email: string,
	status: string, // TODO: make enum
	reminder_frequency: string, // TODO: make enum
	remind_only_if_pending: boolean,
	photo_path: string,
	profile_link: string
	// TODO: Add relationships
};

export type Milestone = {
	id: number,
	title: string,
	type: string, // TODO: make enum
	training_level: string,
	description: string
};

export type Form = {
	id: number,
	title: string,
	status: string, // TODO: make enum
	type: string, // TODO: make enum
	visibility: string, // TODO: make enum
	evaluation_period_type: string, // TODO: make enum
	contents: Object // FIXME
};

export type Evaluation = {
	id: number,
	form_id: number,
	evaluator_id: number,
	subject_id: number,
	requested_by_id: number,

	status: string,
	training_level: string,
	comment: string,
	completion_hash?: ?string,
	url: string,

	request_date: DateString,
	complete_date: DateString,
	evaluation_date_start: DateString,
	evaluationDate_end: DateString,
	archive_date: DateString,
	hash_expires: DateString,
	request_ip: string,
	complete_ip: string,
	request_note?: string,

	evaluator: User,
	subject: User,
	requestor: User,
	form: Form,
	responses: Array<ResidentProgramResponse>,
	textResponses: Array<ResidentProgramTextResponse>,
	flag: FlaggedEvaluation,

	contents?: {
		items: Object // FIXME
	}
};

// FIXME
export type ResidentProgramResponse = Object;
export type ResidentProgramTextResponse = Object;
export type FlaggedEvaluation = Object;

type Select2OptGroup = {
	text: string,
	children: Array<Select2Option>
};

type Select2Option = {
	id: string | number,
	text: string
};

export function appendAlert(
	alertText: string,
	parent: string | HTMLElement = '#alert-container',
	alertType: string = 'danger',
	dismissable: boolean = true
): void {
	let alert = document.createElement("div");
	alert.className = "alert alert-" + alertType;
	alert.setAttribute('role', 'alert');

	if (dismissable) {
		alert.className += " alert-dismissable";
		let close = document.createElement("button");
		close.type = "button";
		close.className = "close";
		close.setAttribute("data-dismiss", "alert");
		close.setAttribute("aria-label", "Close");

		let innerClose = document.createElement("span");
		innerClose.setAttribute("aria-hidden", "true");
		innerClose.innerHTML = "&times;";
		close.appendChild(innerClose);

		alert.appendChild(close);
	}

	alert.insertAdjacentHTML("beforeend", alertText);

	$(parent).append(alert);
}

export function ucfirst(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export function ucfirstWords(str: string): string {
	return str.split(' ').map(ucfirst).join(' ');
}

export function camelCaseToWords(str: string): string {
	let result = '';
	for(let char of str) {
		if (result === '') {
			result += char.toUpperCase();
		}
		else if (char === char.toUpperCase()) {
			result += ' ' + char.toLowerCase();
		}
		else {
			result += char;
		}
	}
	return result;
}

export function snakeCaseToWords(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('_', ' ');
}

export function kebabCaseToWords(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('-', ' ');
}

export function nl2br(text: string): string {
	return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

export function escapeCsv(text: string): string {
	return `"${striptags(text)}"`;
}

export function getFetchHeaders(
	options: {contentType?: string} = {}
): Headers {
	let contentType = ('contentType' in options)
		? options.contentType
		: 'application/json';

	let headers = new Headers();
	headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

	if (contentType)
		headers.append('Content-Type', contentType);

	headers.append('X-Requested-With', 'XMLHttpRequest');

	const csrfToken = getCsrfToken();
	if (csrfToken)
		headers.append('X-CSRF-TOKEN', csrfToken);

	return headers;
}

export function getCsrfToken(): ?string {
	let tokenMeta = document.querySelector('meta[name="csrf-token"]');

	if (!tokenMeta)
		return;

	return tokenMeta.getAttribute('content');
}

export function okOrThrow(response: Response): Response {
	if (response.ok)
		return response;

	throw new Error(response.statusText);
}

export function jsonOrThrow(response: Response): Object {
	if (response.ok)
		return response.json();

	throw new Error(response.statusText);
}

export function fetchCompetencies(): Promise<Object> {
	return fetch('/competencies', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(jsonOrThrow).then(competencies =>
		competencies.sort(sortPropNumbers('order'))
	);
}

export function fetchMilestoneGroups(): Promise<Array<Select2OptGroup>> {
	return fetchMilestones().then(groupMilestones);
}

export function fetchMilestones(): Promise<Array<Milestone>> {
	return fetch('/milestones', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(jsonOrThrow).then(milestones =>
		milestones.sort(sortPropNumbers('order'))
	);
}

export function groupMilestones(milestones: Array<Milestone>): Array<Select2OptGroup> {
	let milestoneGroups: {[string]: Select2OptGroup} = {};

	for(let milestone of milestones) {
		let groupTitle = ucfirst(milestone.type);

		if (milestone.training_level)
			groupTitle += ` — ${milestone.training_level}`;

		if (!milestoneGroups[groupTitle])
			milestoneGroups[groupTitle] = {
				text: groupTitle,
				children: []
			};

		milestoneGroups[groupTitle].children.push({
			id: milestone.id.toString(),
			text: milestone.title
		});
	}
	for(let groupTitle in milestoneGroups) {
		let milestoneGroup = milestoneGroups[groupTitle];
		milestoneGroup.children.sort((a, b) => {
			if (a.text < b.text)
				return 1;
			else if (a.text > b.text)
				return -1;
			else
				return 0;
		});
	}

	// $FlowFixMe
	return (Object.values(milestoneGroups): Array<Select2OptGroup>);
}

export function fetchUserGroups(): Promise<Array<Select2OptGroup>> {
	return fetchUsers().then(groupUsers);
}

export function fetchUsers(): Promise<Array<User>> {
	return fetch('/users', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(response => response.json());
}

export function groupUsers(users: Array<User>): Array<Select2OptGroup> {
	let groups: { [string]: Select2OptGroup } = {
		intern: {
			text: 'Intern',
			children: []
		},
		'ca-1': {
			text: 'CA-1',
			children: []
		},
		'ca-2': {
			text: 'CA-2',
			children: []
		},
		'ca-3': {
			text: 'CA-3',
			children: []
		},
		fellow: {
			text: 'Fellow',
			children: []
		},
		faculty: {
			text: 'Faculty',
			children: []
		},
		staff: {
			text: 'Staff',
			children: []
		},
		app: {
			text: 'APP',
			children: []
		},
		inactive: {
			text: 'Inactive',
			children: []
		}
	};

	users.map(user => {
		let select2Obj: Select2Option = {
			id: user.id,
			text: user.full_name
		};

		if (user.status === 'active') {
			if (user.type) {
				if (user.type === 'resident' && user.training_level
				&& groups[user.training_level]) {

					groups[user.training_level].children.push(select2Obj);
				}
				else if (groups[user.type]) {
					groups[user.type].children.push(select2Obj);
				}
			}
		}
		else {
			groups.inactive.children.push(select2Obj);
		}
	});

	// $FlowFixMe
	let groupedUsers: Array<Select2OptGroup> = Object.values(groups);
	for (let group: Select2OptGroup of groupedUsers) {
		group.children.sort(sortSelect2Objects);
	}

	return groupedUsers;
}

export function fetchForms(): Promise<Array<Form>> {
	return fetch('/forms', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(response => response.json());
}

export function fetchFormGroups(): Promise<Array<Select2OptGroup>> {
	return fetchForms().then(groupForms);
}

export function groupForms(forms: Array<Form>): Array<Select2OptGroup> {
	let groups: {[string]: Select2OptGroup} = {};

	forms.map(form => {
		if (form.type) {
			if (!groups[form.type]) {
				groups[form.type] = {
					text: ucfirst(form.type),
					children: []
				};
			}

			groups[form.type].children.push({
				id: form.id,
				text: form.title
			});
		}
	});

	// $FlowFixMe
	let groupedForms: Array<Select2OptGroup> = Object.values(groups);
	for (let group: Select2OptGroup of groupedForms) {
		group.children.sort(sortSelect2Objects);
	}

	return groupedForms;
}

export function sortSelect2Objects(a: Select2Option, b: Select2Option): number {
	if (a.text < b.text)
		return -1;
	if (a.text > b.text)
		return 1;

	return 0;
}

export function sortEmptyLast(a: any, b: any): number {
	let aEmpty = (a == null || (typeof a === 'string' && a.trim() === ''));
	let bEmpty = (b == null || (typeof b === 'string' && b.trim() === ''));

	if (aEmpty && bEmpty)
		return 0;
	if (aEmpty)
		return 1;
	if (bEmpty)
		return -1;

	return 0;
}

export function sortNumbers(a: number, b: number): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null)
		return emptyVal;

	return Number(a) - Number(b);
}

export function sortPropNumbers(prop: string): ({prop: number}, {prop: number}) => number {
	return (a, b) => sortNumbers(a[prop], b[prop]);
}

export function sortDates(a: DateLike, b: DateLike): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null)
		return emptyVal;

	return moment(a) - moment(b);
}

export function sortPropDates(prop: string): ({prop: DateLike}, {prop: DateLike}) => number {
	return (a, b) => sortDates(a[prop], b[prop]);
}

export function sortIgnoreCase(a: string, b: string): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null)
		return emptyVal;

	a = a.toLowerCase();
	b = b.toLowerCase();

	if (a < b)
		return -1;
	if (a > b)
		return 1;

	return 0;
}

export function sortPropIgnoreCase(prop: string): ({prop: string}, {prop: string}) => number {
	return (a, b) => sortIgnoreCase(a[prop], b[prop]);
}

export function htmlLabelReplacements(html: string, replacements: Array<string>) {
	html = html.replace(/<span class="label label-info">/g, '[[')
		.replace(/<\/span>/g, ']]');


	replacements.map(replacement => {
		const pattern = new RegExp(`\\[\\[${replacement}\\]\\]`, 'g');
		const label = `<span class="label label-info">${replacement}</span>`;
		html = html.replace(pattern, label);
	});

	return html;
}

export function errorToAlert(err: Error) {
	return {
		type: 'error',
		html: `<strong>Error:</strong> ${err.message}`
	};
}

export function userIsType(user: User, type: string) {
	return (user != null && 'type' in user && user.type === type);
}

export function isAdmin(user: User) {
	return userIsType(user, 'admin');
}
