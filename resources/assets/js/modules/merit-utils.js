/* @flow */

import moment from 'moment';
import { isoDateStringObject, academicYearForDate } from './date-utils.js';
import { getFetchHeaders, jsonOrThrow } from './utils.js';
import * as validateQuestionnaire from './questionnaire/validate.js';
import * as validateMerit from './merits/validate.js';

import type { QuestionnaireQuestion } from './questionnaire/index.js';

import type {
	MeritReport,
	MeritReportForm,
	MeritReportChecklist,
	MeritReportSection,
	MeritReportSectionChild,
	MeritReportItem
} from './merits/index.js';

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
	try {
		return validateMerit.section(section).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function itemIsValid(item: MeritReportItem): boolean {
	try {
		return validateMerit.item(item).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function questionIsValid(question: QuestionnaireQuestion): boolean {
	try {
		return validateQuestionnaire.question(question).valid;
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
