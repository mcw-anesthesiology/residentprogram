/* @flow */

import type {
	ScoringDefinition,
	ValueScoringDefinition
} from './scoring.js';

export type Questionnaire = {
	title: string,
	sections: Array<QuestionnaireSection>
};

export type QuestionnaireSection = {
	title?: string,
	items: Array<QuestionnaireQuestion | QuestionnaireInstruction>,
	direction?: 'vertical' | 'horizontal',
	condition?: QuestionnaireCondition
};

export type QuestionnaireQuestion =
	| QuestionnaireTextQuestion
	| QuestionnaireNumberQuestion
	| QuestionnaireSelectQuestion
	| QuestionnaireCheckboxQuestion
	| QuestionnaireRadioQuestion
	| QuestionnaireListQuestion;

type QuestionnaireQuestionBase = {
	id?: string,
	text: string,
	description?: string,
	required?: boolean,
	scoring?: ValueScoringDefinition,
	condition?: QuestionnaireCondition
};

export type QuestionnaireCondition = {
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

export type QuestionnaireSelectQuestion = QuestionnaireQuestionBase & {
	type: 'select',
	placeholder?: ?string,
	options: Array<QuestionnaireSelectOption>
};

export type QuestionnaireSelectOption = {
	text: string,
	value: string | number,
	selected?: ?boolean
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

export type ConditionChecker = (QuestionnaireCondition) => boolean;

export function getConditionChecker(questions: Array<QuestionnaireQuestion>)
		: ConditionChecker {
	const questionIdMap = getQuestionsIdMap(questions);
	return (condition: QuestionnaireCondition) =>
		questionIdMap.has(condition.questionId) && questionMatchesValue(
			// $FlowFixMe: Okay flow I tested has right above here can you read
			(questionIdMap.get(condition.questionId): QuestionnaireQuestion),
			condition.questionValue
		);
}

export function getQuestions(questionnaire: Questionnaire)
		: Array<QuestionnaireQuestion> {
	const questions = [];

	for (let section of questionnaire.sections) {
		// $FlowFixMe: This is right but I can't prove it
		questions.push(...section.items.filter(isQuestion));
	}

	return questions;
}

export function isValidItem(item: {type: string}): boolean {
	return Boolean(
		(item.type && typeof item.type === 'string')
		&& (
			item.type === 'instruction'
			|| isQuestion(item)
		)
	);
}

export function isQuestion(item: {type: string}) : boolean {
	return [
		'text',
		'number',
		'select',
		'checkbox',
		'radio',
		'list'
	].includes(item.type);
}

export function getQuestionnaireIdMap(questionnaire: Questionnaire)
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
		case 'select': {
			(question: QuestionnaireSelectQuestion);
			let selectValue = getSelectValue(question);
			if (
				(typeof value === 'boolean' && selectValue)
				|| (
					(typeof value === 'string' || typeof value === 'number')
					&& value === selectValue
				)
			)
				return true;
			break;
		}
		case 'checkbox':
		case 'radio': {
			question = (question: QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion);
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

export function getSelectValue(question: QuestionnaireSelectQuestion): ?string | ?number {
	const selectedOption = question.options.find(option => option.selected);
	return selectedOption
		? selectedOption.value
		: null;
}

export function getRadioCheckboxValues(
	question: QuestionnaireRadioQuestion | QuestionnaireCheckboxQuestion
): Array<string | number> {
	return question.options
		.filter(option => option.checked)
		.map(option => option.value);
}
