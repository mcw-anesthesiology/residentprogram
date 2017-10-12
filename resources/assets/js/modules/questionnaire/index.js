/* @flow */

import type {
	ScoringDefinition,
	ValueScoringDefinition
} from './scoring.js';

export type QuestionnaireSection = {
	title?: string,
	items: Array<QuestionnaireQuestion | QuestionnaireInstruction>
};

export type QuestionnaireQuestion =
	| QuestionnaireTextQuestion
	| QuestionnaireNumberQuestion
	| QuestionnaireCheckboxQuestion
	| QuestionnaireRadioQuestion
	| QuestionnaireListQuestion;

type QuestionnaireQuestionBase = {
	id?: string,
	text: string,
	description?: string,
	required?: boolean,
	required?: boolean,
	scoring?: ValueScoringDefinition,
	condition?: QuestionnaireQuestionCondition
};

export type QuestionnaireQuestionCondition = {
	questionId: string,
	questionValue: QuestionnaireQuestionValue
};

export type QuestionnaireQuestionValue = boolean | string | number;

export type QuestionnaireTextQuestion = QuestionnaireQuestionBase & {
	type: 'text' | 'textarea',
	placeholder?: string,
	value?: string
};

export type QuestionnaireNumberQuestion = QuestionnaireQuestionBase & {
	type: 'number',
	placeholder?: ?string,
	min?: number,
	max?: number,
	value?: number
};

export type QuestionnaireCheckboxQuestion = QuestionnaireQuestionBase & {
	type: 'checkbox',
	options: Array<QuestionnaireOption>
};

export type QuestionnaireRadioQuestion = QuestionnaireQuestionBase & {
	type: 'radio',
	options: Array<QuestionnaireOption>
};

export type QuestionnaireOption = {
	text: string,
	description?: string,
	value: string | number,
	editable?: boolean,
	checked?: boolean,
	scoring?: ScoringDefinition
};

export type QuestionnaireListQuestion = QuestionnaireQuestionBase & {
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
		| 'subjectMentorship'
		| 'project',
	text?: string,
	description?: string,
	ordered?: boolean,
	itemProps?: Object, // FIXME
	itemLabels?: Object, // FIXME
	items: Array<QuestionnaireListItem>,
	scoring?: ValueScoringDefinition
};

export type QuestionnaireListItem =
	| QuestionnaireTextListItem
	| QuestionnairePublicationListItem
	| QuestionnaireCommitteeListItem
	| QuestionnaireStudyListItem
	| QuestionnaireGrantListItem
	| QuestionnaireCertificationListItem
	| QuestionnaireEditorialBoardListItem
	| QuestionnaireReviewListItem
	| QuestionnaireLectureListItem
	| QuestionnaireMentorshipListItem
	| QuestionnaireProjectListItem;

export type QuestionnaireTextListItem = {
	type: 'text',
	text?: string
};

export type QuestionnairePublicationListItem = {
	type: 'publication',
	title: string,
	author: string,
	link: string,
	role: string
};

export type QuestionnaireCommitteeListItem = {
	type: 'committee',
	name: string,
	role: 'chair' | 'member'
};

export type QuestionnaireStudyListItem = {
	type: 'study',
	title: string,
	role: string,
	yearInitiated: string,
	approvalNumber: string,
	progress: string
};

export type QuestionnaireGrantListItem = {
	type: 'grant' | 'grantOther',
	agency: string,
	project: string,
	amount: number
};

export type QuestionnaireCertificationListItem = {
	type: 'certification',
	board: string,
	specialty: string
};

export type QuestionnaireEditorialBoardListItem = {
	type: 'editorialBoard',
	journal: string,
	role: string
};

export type QuestionnaireReviewListItem = {
	type: 'review',
	work: string,
	reviews: number
};

export type QuestionnaireLectureListItem = {
	type: 'lecture' | 'audienceLecture',
	title: string,
	date: string,
	audience: string
};

export type QuestionnaireMentorshipListItem = {
	type: 'mentorship' | 'subjectMentorship',
	mentee: string,
	subject: string
};

export type QuestionnaireProjectListItem = {
	type: 'project',
	description: string,
	hours: number
};

export type QuestionnaireInstruction = {
	type: 'instruction',
	text: string
};

export function getQuestionConditionChecker(questions: Array<QuestionnaireQuestion>):
		(string, QuestionnaireQuestionValue) => boolean {
	const questionIdMap = getQuestionsIdMap(questions);
	return (questionId, questionValue) =>
		questionIdMap.has(questionId) && questionMatchesValue(
			// $FlowFixMe: Okay flow I tested has right above here can you read
			(questionIdMap.get(questionId): QuestionnaireQuestion),
			questionValue
		);
}

export function getQuestions(questionnaire: QuestionnaireSection)
		: Array<QuestionnaireQuestion> {
	// $FlowFixMe: This is right I promise
	return questionnaire.items.filter(isQuestion);
}

export function isQuestion(item: QuestionnaireQuestion | QuestionnaireInstruction)
		: boolean {
	return [
		'text',
		'number',
		'checkbox',
		'radio',
		'list'
	].includes(item.type);
}

export function getQuestionnaireIdMap(questionnaire: QuestionnaireSection)
		: Map<string, QuestionnaireQuestion> {
	return getQuestionsIdMap(getQuestions(questionnaire));
}

export function getQuestionsIdMap(
	questions: Array<QuestionnaireQuestion>
): Map<string, QuestionnaireQuestion> {
	const map = new Map();

	for (let question of questions) {
		if (question.id && !map.has(question.id))
			map.set(question.id, question);
	}

	return map;
}

export function questionMatchesValue(
	question: QuestionnaireQuestion,
	value: QuestionnaireQuestionValue
): boolean {
	switch (question.type) {
		case 'text':
			(question: QuestionnaireTextQuestion);
			if (
				(typeof value === 'boolean' && question.value)
				|| (typeof value === 'string' && value === question.value)
			)
				return true;
			break;
		case 'number':
			(question: QuestionnaireNumberQuestion);
			if (
				(typeof value === 'boolean' && question.value)
				|| (typeof value === 'number' && value === question.value)
			)
				return true;
			break;
		case 'checkbox':
		case 'radio': {
			(question: QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion);
			let values = getRadioCheckboxValues(question);
			if (
				(typeof value === 'boolean' && values.length > 0)
				|| (
					(typeof value === 'string' || typeof value === 'number')
					&& values.includes(value)
				)
			)
				return true;
			break;
		}
		case 'list':
			(question: QuestionnaireListQuestion);
			if (typeof value === 'boolean' && question.items.length > 0)
				return true;
			break;
	}

	return false;
}

export function getRadioCheckboxValues(
	question: QuestionnaireRadioQuestion | QuestionnaireCheckboxQuestion
): Array<string | number> {
	return question.options
		.filter(option => option.checked)
		.map(option => option.value);
}
