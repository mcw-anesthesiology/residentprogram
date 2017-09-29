/* @flow */

import type {
	QuestionnaireQuestion,
	QuestionnaireInstruction
} from '../questionnaire/index.js';

import type { User } from '../utils.js';
import type { DateLike } from '../date-utils.js';

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
