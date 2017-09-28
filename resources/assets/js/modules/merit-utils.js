/* @flow */

import moment from 'moment';
import { isoDateStringObject, academicYearForDate } from './date-utils.js';
import { getFetchHeaders, jsonOrThrow } from './utils.js';
import * as validate from './questionnaire/validate.js';

import type {
	QuestionnaireQuestion,
	QuestionnaireInstruction
} from './questionnaire/index.js';

import type { User } from './utils.js';
import type { DateLike } from './date-utils.js';

export type MeritReport = {
	period_start: DateLike,
	period_end: DateLike,
	report: MeritReportChecklist,
	user?: User,
	form?: MeritReportForm
};

export type MeritReportForm = {
	id: number,
	name: string,
	version: number,
	form: MeritReportChecklist
};

export type MeritReportChecklist = {
	pages: Array<MeritReportSection>
};

export type MeritReportSection = {
	type: 'section',
	title: string,
	items: Array<MeritReportSectionChild>
};

export type MeritReportSectionChild =
	| MeritReportSection
	| MeritReportItem
	| QuestionnaireInstruction;

export type MeritReportItem = {
	type: 'item',
	text: string,
	checked?: boolean,
	subjectReadonly?: boolean,
	questions: Array<QuestionnaireQuestion>
};

export function getCheckedItemCount(report: MeritReportChecklist): number {
	let count = 0;

	if (report.pages) {
		for (let section of report.pages) {
			count += getSectionCheckedItemCount(section);
		}
	}

	return count;
}

export function getSectionCheckedItemCount(section: MeritReportSection): number {
	let count = 0;

	if (section.items) {
		for (let item of section.items) {
			switch (item.type) {
				case 'section':
					count += getSectionCheckedItemCount(item);
					break;
				case 'item':
					count += getItemCheckedItemCount(item);
					break;
			}
		}
	}

	return count;
}

export function getItemCheckedItemCount(item: MeritReportItem): number {
	return item.checked ? 1 : 0;
}

export function getUsersWithCompleteMerit(
	usersWithMerits: Array<{merit_reports: Array<MeritReport>}>
): Array<{report: MeritReport}> {

	if (!usersWithMerits)
		return [];

	let usersWithMerit = [];

	for (let user of usersWithMerits) {
		let report = getMostRecentCompleteReport(user.merit_reports);

		if (report) {
			usersWithMerit.push(Object.assign({}, user, {report}));
		}
	}

	return usersWithMerit;
}

export function sectionIsValid(section: MeritReportSection): boolean {
	if (!('items' in section) || section.items.length === 0)
		return true;

	for (let item of section.items) {
		switch (item.type) {
			case 'section':
				if (!sectionIsValid(item))
					return false;
				break;
			case 'item':
				if (!itemIsValid(item))
					return false;
				break;
		}
	}

	return true;
}

export function itemIsValid(item: MeritReportItem): boolean {
	if (!item.checked || !('questions' in item) || item.questions.length === 0)
		return true;

	for (let question of item.questions) {
		if (!questionIsValid(question))
			return false;
	}

	return true;
}

export function questionIsValid(question: QuestionnaireQuestion): boolean {
	try {
		return validate.question(question).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function itemIsChecked(item: MeritReportSectionChild): boolean {
	switch (item.type) {
		case 'section':
			return item.items.some(item => itemIsChecked(item));
		case 'item':
			if (item.checked)
				return true;
			break;
	}

	return false;
}

export function getYearlyFacultyMeritForm(
	meritForms: Array<MeritReportForm>,
	meritReportTypes: {[string]: string},
	meritReportTypeForms: {[string]: string}
): ?MeritReportForm {
	if (
		meritReportTypes.faculty_yearly
		&& meritReportTypeForms.faculty_yearly
		&& meritForms
	) {
		let forms = meritForms.slice();
		forms.sort((a, b) => Number(b.version) - Number(a.version));

		return forms.find(form =>
			form.name === meritReportTypeForms.faculty_yearly
		);
	}
}

export function getMostRecentCompleteReport(meritReports: Array<MeritReport>) {
	if (!meritReports || meritReports.length < 1)
		return;

	let mostRecent = null;

	for (let meritReport of meritReports) {
		if (
			meritReport.status === 'complete'
			&& (
				mostRecent == null
				|| moment(meritReport.period_end) >= moment(mostRecent.period_end)
			)
		)
			mostRecent = meritReport;
	}

	return mostRecent;
}

export function getCurrentYearlyMeritDateRange(): {[string]: string} {
	// FIXME: This is naive and not good
	return isoDateStringObject(academicYearForDate(new Date()));
}

export function fetchAllMeritReports(): Promise<Array<MeritReport>> {
	let query = $.param({
		with: {
			form: true,
			user: [
				'full_name'
			]
		}
	});

	return fetch(`/merits?${query}`, {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(jsonOrThrow);
}
