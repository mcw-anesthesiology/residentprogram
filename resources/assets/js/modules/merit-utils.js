/* @flow */

import moment from 'moment';

import type { DateLike } from './date-utils.js';

export type MeritReport = {
	period_start: DateLike,
	period_end: DateLike,
	report: MeritReportChecklist
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
	| MeritReportInstruction;

export type MeritReportItem = {
	type: 'item',
	text: string,
	checked?: boolean,
	subjectReadonly?: boolean,
	questions: Array<MeritReportQuestion>
};

type MeritReportQuestion =
	| MeritReportTextQuestion
	| MeritReportNumberQuestion
	| MeritReportCheckboxQuestion
	| MeritReportRadioQuestion
	| MeritReportListQuestion;

export type MeritReportTextQuestion = {
	type: 'text' | 'textarea',
	text: string,
	description?: string,
	placeholder?: string,
	value?: string,
	required?: boolean
};

export type MeritReportNumberQuestion = {
	type: 'number',
	text: string,
	description?: ?string,
	placeholder?: ?string,
	min?: number,
	max?: number,
	value?: number
};

export type MeritReportCheckboxQuestion = {
	type: 'checkbox',
	text: string,
	description?: string,
	required?: boolean,
	options: Array<MeritReportOption>
};

export type MeritReportRadioQuestion = {
	type: 'radio',
	text: string,
	description?: string,
	required?: string,
	options: Array<MeritReportOption>
};

export type MeritReportOption = {
	text: string,
	description?: string,
	value: string | number,
	editable?: boolean,
	checked?: boolean
};

export type MeritReportListQuestion = {
	type: 'list',
	listType:
		| 'text'
		| 'publication'
		| 'committee'
		| 'study'
		| 'grant'
		| 'grantOther'
		| 'certification'
		| 'editorialBoard'
		| 'review'
		| 'lecture'
		| 'audienceLecture'
		| 'mentorship'
		| 'subjectMentorship',
	text?: string,
	description?: string,
	ordered?: boolean,
	itemProps?: Object, // FIXME
	itemLabels?: Object, // FIXME
	items?: Array<MeritReportListItem>
};

export type MeritReportListItem =
	| MeritReportTextListItem
	| MeritReportPublicationListItem
	| MeritReportCommitteeListItem
	| MeritReportStudyListItem
	| MeritReportGrantListItem
	| MeritReportCertificationListItem
	| MeritReportEditorialBoardListItem
	| MeritReportReviewListItem
	| MeritReportLectureListItem
	| MeritReportMenstorshipListItem;

export type MeritReportTextListItem = {
	type: 'text',
	text?: string
};

export type MeritReportPublicationListItem = {
	type: 'publication',
	title: string,
	author: string,
	link: string,
	role: string
};

export type MeritReportCommitteeListItem = {
	type: 'committee',
	name: string,
	role: 'chair' | 'member'
};

export type MeritReportStudyListItem = {
	type: 'study',
	title: string,
	role: string,
	yearInitiated: string,
	approvalNumber: string,
	progress: string
};

export type MeritReportGrantListItem = {
	type: 'grant' | 'grantOther',
	agency: string,
	project: string,
	amount: number
};

export type MeritReportCertificationListItem = {
	type: 'certification',
	board: string,
	specialty: string
};

export type MeritReportEditorialBoardListItem = {
	type: 'editorialBoard',
	journal: string,
	role: string
};

export type MeritReportReviewListItem = {
	type: 'review',
	work: string,
	reviews: number
};

export type MeritReportLectureListItem = {
	type: 'lecture' | 'audienceLecture',
	title: string,
	date: string,
	audience: string
};

export type MeritReportMenstorshipListItem = {
	type: 'mentorship' | 'subjectMentorship',
	mentee: string,
	subject: string
};

export type MeritReportInstruction = {
	type: 'instruction',
	text: string
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

export function questionIsValid(question: MeritReportQuestion): boolean {
	if (question.type !== 'list' && !question.required)
		return true;

	switch (question.type) {
		case 'text':
			if (!question.value)
				return false;
			break;
		case 'number':
			if (question.value == null)
				return false;
			if (question.min && question.value < question.min)
				return false;
			if (question.max && question.value > question.max)
				return false;
			break;
		case 'checkbox':
		case 'radio': {
			let optionChecked = false;
			for (let option of question.options) {
				if (option.checked)
					optionChecked = true;
			}
			if (!optionChecked)
				return false;
		}
			break;
		case 'list':
			return listQuestionIsValid(question);
	}

	return true;
}

export function listQuestionIsValid(list: MeritReportListQuestion): boolean {
	if (!list.items || list.items.length === 0)
		return false;

	for (let listItem of list.items) {
		if ('itemProps' in list) {
			for (let [key, value] of Object.entries(list.itemProps)) {
				if (listItem[key] !== value)
					return false;
			}
		}

		if (!listItemIsValid(listItem))
			return false;
	}

	return true;
}

export function listItemIsValid(listItem: MeritReportListItem): boolean {
	switch (listItem.type) {
		case 'text':
			if (!listItem.text)
				return false;
			break;
		case 'publication':
			if (!listItem.title || !listItem.role)
				return false;
			break;
		case 'committee':
			if (!listItem.name || !listItem.role)
				return false;
			break;
		case 'study':
			if (
				!listItem.title
				|| !listItem.role
				|| !listItem.yearInitiated
				|| !listItem.approvalNumber
				|| !listItem.progress
			)
				return false;
			break;
		case 'grant':
		case 'grantOther':
			if (
				!listItem.agency
				|| !listItem.project
				|| listItem.amount == null
			)
				return false;
			break;
		case 'certification':
			if (!listItem.board || !listItem.specialty)
				return false;
			break;
		case 'editorialBoard':
			if (!listItem.journal || !listItem.role)
				return false;
			break;
		case 'review':
			if (!listItem.work || !listItem.reviews)
				return false;
			break;
		case 'lecture':
		case 'audienceLecture':
			if (!listItem.title || !listItem.date || !listItem.audience)
				return false;
			break;
		case 'mentorship':
		case 'subjectMentorship':
			if (!listItem.mentee || !listItem.subject)
				return false;
			break;
	}

	return true;
}

export function itemIsChecked(item: MeritReportSectionChild): boolean {
	// TODO
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
