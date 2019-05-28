/** @format */
/* @flow */

import moment from 'moment';
import striptags from 'striptags';

import { ucfirst } from './text-utils.js';

import type { DateLike } from './date-utils.js';

// All the FlowFixMes in this file are due to
// https://github.com/facebook/flow/issues/2221

type DateString = string;

export {
	ucfirst,
	ucfirstWords,
	camelCaseToWords,
	snakeCaseToWords,
	kebabCaseToWords,
	nl2br,
	pluralize
} from './text-utils.js';

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
	profile_link: string,
	user_features?: Array<UserFeature>,
	user_settings?: Array<UserSetting>
	// TODO: Add relationships
};

export type UserSetting = {
	user_id?: ?number,
	name: string,
	value: string
};

export type UserFeature = {
	feature: string,
	user_id?: ?number,
	user_type?: ?string,
	user_training_level?: ?string,
	user_secondary_training_level?: ?string
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
	evaluation_date_end: DateString,
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
	let alert = document.createElement('div');
	alert.className = 'alert alert-' + alertType;
	alert.setAttribute('role', 'alert');

	if (dismissable) {
		alert.className += ' alert-dismissable';
		let close = document.createElement('button');
		close.type = 'button';
		close.className = 'close';
		close.setAttribute('data-dismiss', 'alert');
		close.setAttribute('aria-label', 'Close');

		let innerClose = document.createElement('span');
		innerClose.setAttribute('aria-hidden', 'true');
		innerClose.innerHTML = '&times;';
		close.appendChild(innerClose);

		alert.appendChild(close);
	}

	alert.insertAdjacentHTML('beforeend', alertText);

	$(parent).append(alert);
}

export function escapeCsv(text: string): string {
	return `"${striptags(text)}"`;
}

export function getFetchHeaders(
	options: { contentType?: string } = {}
): Headers {
	let contentType =
		'contentType' in options ? options.contentType : 'application/json';

	let headers = new Headers();
	headers.append(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE, OPTIONS'
	);

	if (contentType) headers.append('Content-Type', contentType);

	headers.append('X-Requested-With', 'XMLHttpRequest');

	const csrfToken = getCsrfToken();
	if (csrfToken) headers.append('X-CSRF-TOKEN', csrfToken);

	return headers;
}

export function fetchConfig(
	options: { contentType?: string } = {}
): { headers: Headers, credentials: 'same-origin' } {
	return {
		headers: getFetchHeaders(options),
		credentials: 'same-origin'
	};
}

export function getCsrfToken(): ?string {
	let tokenMeta = document.querySelector('meta[name="csrf-token"]');

	if (!tokenMeta) return;

	return tokenMeta.getAttribute('content');
}

export function okOrThrow(response: Response): Response {
	if (response.ok) return response;

	throw new Error(response.statusText);
}

export function jsonOrThrow(response: Response): Object {
	if (response.ok) return response.json();

	throw new Error(response.statusText);
}

export function fetchCompetencies(): Promise<Object> {
	return fetch('/competencies', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	})
		.then(jsonOrThrow)
		.then(competencies => competencies.sort(sortPropNumbers('order')));
}

export function fetchMilestoneGroups(): Promise<Array<Select2OptGroup>> {
	return fetchMilestones().then(groupMilestones);
}

export function fetchMilestones(): Promise<Array<Milestone>> {
	return fetch('/milestones', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	})
		.then(jsonOrThrow)
		.then(milestones => milestones.sort(sortPropNumbers('order')));
}

export function groupMilestones(
	milestones: Array<Milestone>
): Array<Select2OptGroup> {
	let milestoneGroups: { [string]: Select2OptGroup } = {};

	for (let milestone of milestones) {
		let groupTitle = ucfirst(milestone.type);

		if (milestone.training_level) {
			groupTitle = `${groupTitle} — ${milestone.training_level}`;
		}

		if (!milestoneGroups[groupTitle]) {
			milestoneGroups[groupTitle] = {
				text: groupTitle,
				children: []
			};
		}

		milestoneGroups[groupTitle].children.push({
			id: milestone.id.toString(),
			text: milestone.title
		});
	}
	for (let groupTitle in milestoneGroups) {
		let milestoneGroup = milestoneGroups[groupTitle];
		milestoneGroup.children.sort((a, b) => {
			if (a.text < b.text) return 1;
			else if (a.text > b.text) return -1;
			else return 0;
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
		external: {
			text: 'External',
			children: []
		},
		admin: {
			text: 'Administrator',
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

		if (!user.status || user.status.toLowerCase() === 'active') {
			if (user.type) {
				const type = user.type.toLowerCase();
				if (
					type === 'resident' &&
					user.training_level &&
					groups[user.training_level]
				) {
					groups[user.training_level].children.push(select2Obj);
				} else if (groups[type]) {
					groups[type].children.push(select2Obj);
				}
			}
		} else {
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
	let groups: { [string]: Select2OptGroup } = {};

	for (const form of forms) {
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
	}

	// $FlowFixMe
	let groupedForms: Array<Select2OptGroup> = Object.values(groups);
	for (let group: Select2OptGroup of groupedForms) {
		group.children.sort(sortSelect2Objects);
	}

	return groupedForms;
}

export function sortSelect2Objects(a: Select2Option, b: Select2Option): number {
	if (a.text < b.text) return -1;
	if (a.text > b.text) return 1;

	return 0;
}

export function sortEmptyLast(a: any, b: any): ?number {
	let aEmpty = a == null || (typeof a === 'string' && a.trim() === '');
	let bEmpty = b == null || (typeof b === 'string' && b.trim() === '');

	if (aEmpty && bEmpty) return 0;
	if (aEmpty) return 1;
	if (bEmpty) return -1;
}

export function sortNumbers(a: number, b: number): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	return Number(a) - Number(b);
}

export function sortPropNumbers(
	prop: string
): ({ prop: number }, { prop: number }) => number {
	return (a, b) => sortNumbers(a[prop], b[prop]);
}

export function sortDates(a: DateLike, b: DateLike): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	return moment(a) - moment(b);
}

export function sortPropDates(
	prop: string
): ({ prop: DateLike }, { prop: DateLike }) => number {
	return (a, b) => sortDates(a[prop], b[prop]);
}

export function sortIgnoreCase(a: string, b: string): number {
	let emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	a = a.toLowerCase();
	b = b.toLowerCase();

	if (a < b) return -1;
	if (a > b) return 1;

	return 0;
}

export function sortPropIgnoreCase(
	prop: string
): ({ prop: string }, { prop: string }) => number {
	return (a, b) => sortIgnoreCase(a[prop], b[prop]);
}

export function htmlLabelReplacements(
	html: string,
	replacements: Array<string>
) {
	html = html
		.replace(/<span class="label label-info">/g, '[[')
		.replace(/<\/span>/g, ']]');

	replacements.map(replacement => {
		const pattern = new RegExp(`\\[\\[${replacement}\\]\\]`, 'g');
		const label = `<span class="label label-info">${replacement}</span>`;
		html = html.replace(pattern, label);
	});

	return html;
}

export type BootstrapAlertItem =
	| BootstrapAlertTextItem
	| BootstrapAlertHtmlItem;

type BootstrapAlertBaseItem = {
	type?: 'info' | 'success' | 'warning' | 'error' | 'danger',
	dismissable?: boolean
};

export type BootstrapAlertHtmlItem = {
	...BootstrapAlertBaseItem,
	html: string
};

export type BootstrapAlertTextItem = {
	...BootstrapAlertBaseItem,
	text: string
};

export function errorToAlert(err: Error): BootstrapAlertItem {
	return {
		type: 'error',
		html: `<strong>Error:</strong> ${err.message}`
	};
}

export function simpleErrorAlert(message: string): BootstrapAlertItem {
	return {
		type: 'error',
		html: `<strong>Error:</strong> ${message}`
	};
}

export function userIsType(user: User, type: string) {
	return user != null && 'type' in user && user.type === type;
}

export function isAdmin(user: User) {
	return userIsType(user, 'admin');
}

export function usesFeature(user: User, feature: string) {
	if ('user_features' in user && Array.isArray(user.user_features)) {
		for (let userFeature of user.user_features) {
			if (userFeature.feature === feature) return true;
		}
	}

	return false;
}

export function arraysIntersect(arr1: Array<any>, arr2: Array<any>): boolean {
	for (const item of arr1) {
		if (arr2.includes(item)) return true;
	}

	return false;
}

export function filterKeys(obj: Object, keys: Array<string>): Object {
	const newObj = {};

	for (const key of keys) {
		newObj[key] = obj[key];
	}

	return newObj;
}

export function getRandom(arr: Array<any>): any {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function updateSearchParams(params: URLSearchParams) {
	const newUrl =
		window.location.origin +
		window.location.hash +
		window.location.pathname +
		'?' +
		params.toString();
	window.history.replaceState(null, null, newUrl);
}

export function normalizeWhitespace(str: string): string {
	return str.replace(/\s+/g, ' ').trim();
}

export function queryParams(obj) {
	return $.param(obj);
}

export function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

// Decimal round
if (!Math.round10) {
	Math.round10 = function(value, exp) {
		return decimalAdjust('round', value, exp);
	};
}
// Decimal floor
if (!Math.floor10) {
	Math.floor10 = function(value, exp) {
		return decimalAdjust('floor', value, exp);
	};
}
// Decimal ceil
if (!Math.ceil10) {
	Math.ceil10 = function(value, exp) {
		return decimalAdjust('ceil', value, exp);
	};
}
