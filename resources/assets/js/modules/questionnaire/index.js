/* @flow */

import { arraysIntersect } from '@/modules/utils.js';

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

export type QuestionnaireQuestionValue =
	| boolean
	| string
	| number
	| Array<string | number>;

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
		| 'datedEvent',
	text?: string,
	description?: string,
	ordered?: boolean,
	itemProps?: Object, // FIXME
	itemLabels?: Object, // FIXME
	suggestions?: Object, // FIXME
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
	| QuestionnaireDatedEventListItem;

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
	role: 'chair' | 'member',
	meetingsPerYear?: number // Required, but an addition. Older entries won't have it
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
	specialty: string,
	current: boolean,
	recertified: string
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

export type QuestionnaireDatedEventListItem = {
	type: 'datedEvent',
	description: string,
	date: string
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
			if (question.value && (
				(typeof value === 'boolean' && value)
				|| (typeof value === 'string' && value === question.value)
				|| (Array.isArray(value) && value.includes(question.value))
			))
				return true;
			break;
		case 'number':
			(question: QuestionnaireNumberQuestion);
			if (question.value && (
				(typeof value === 'boolean' && value)
				|| (typeof value === 'number' && value === question.value)
				|| (Array.isArray(value) && value.includes(question.value))
			))
				return true;
			break;
		case 'select': {
			(question: QuestionnaireSelectQuestion);
			let selectValue = getSelectValue(question);
			if (selectValue && (
				(typeof value === 'boolean' && value)
				|| (
					(typeof value === 'string' || typeof value === 'number')
					&& value === selectValue
				)
				|| (Array.isArray(value) && value.includes(selectValue))
			))
				return true;
			break;
		}
		case 'checkbox':
		case 'radio': {
			question = (question: QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion);
			let values = getRadioCheckboxValues(question);
			if (values.length > 0 && (
				(typeof value === 'boolean' && value)
				|| (
					(typeof value === 'string' || typeof value === 'number')
					&& values.includes(value)
				)
				|| (Array.isArray(value) && arraysIntersect(value, values))
			))
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

export function walkQuestionnaireQuestions(
	questionnaire: Questionnaire,
	questionCallback?: (
		QuestionnaireQuestion,
		?QuestionnaireSection
	) => QuestionnaireQuestion
): Questionnaire {

	const newQuestionnaire: Questionnaire = Object.assign({}, questionnaire);

	newQuestionnaire.sections = questionnaire.sections.map(section => {
		const newSection: QuestionnaireSection = Object.assign({}, section);
		newSection.items = section.items.map(item =>
			// $FlowFixMe
			(questionCallback && isQuestion(item)) // $FlowFixMe
				? questionCallback(item, newSection) // $FlowFixMe
				: Object.assign({}, item)
		);

		return newSection;
	});

	return newQuestionnaire;
}

export function getValue(question: QuestionnaireQuestion): ?string | ?number {
	switch (question.type) {
		case 'text':
		case 'number':
			return question.value;
		case 'select':
			return getSelectValue(question);
		case 'checkbox':
		case 'radio': {
			const values = getRadioCheckboxValues(question);
			if (values.length === 1)
				return values[0];
			if (values.length > 1)
				throw new RangeError('Question has multiple responses, use getValues');

			break;
		}
		case 'list':
			throw new TypeError('Cannot currently get value of list questions');
	}
}

export function getValues(question: QuestionnaireQuestion): Array<string | number> {
	switch (question.type) {
		case 'text':
		case 'number':
		case 'select': {
			const value = getValue(question);
			if (value)
				return [value];

			break;
		}
		case 'checkbox':
		case 'radio':
			return getRadioCheckboxValues(question);
		case 'list':
			throw new TypeError('Cannot currently get values for list questions');
	}

	return [];
}

export function getResponse(question: QuestionnaireQuestion): ?string {
	switch (question.type) {
		case 'text':
		case 'number': {
			const value = getValue(question);
			if (value && typeof value !== 'string')
				return `${value}`;

			break;
		}
		case 'select':
			return getSelectResponse(question);
		case 'radio':
		case 'checkbox': {
			const responses = getRadioCheckboxResponses(question);
			if (responses.length === 1)
				return responses[0];
			if (responses.length > 1)
				throw new RangeError('Question has multiple responses, use getResponses');

			break;
		}
		case 'list':
			throw new TypeError('Cannot currently get responses for list questions');
	}
}

export function getResponses(question: QuestionnaireQuestion): Array<string> {
	switch (question.type) {
		case 'text':
		case 'number':
		case 'select': {
			const response = getResponse(question);
			if (response)
				return [response];

			break;
		}
		case 'radio':
		case 'checkbox':
			return getRadioCheckboxResponses(question);
		case 'list':
			throw new TypeError('Cannot currently get responses for list questions');
	}

	return [];
}

export function getSelectValue(question: QuestionnaireSelectQuestion): ?string | ?number {
	const selectedOption = question.options.find(option => option.selected);
	if (selectedOption)
		return selectedOption.value;
}

export function getRadioCheckboxValues(
	question: QuestionnaireRadioQuestion | QuestionnaireCheckboxQuestion
): Array<string | number> {
	return question.options
		.filter(option => option.checked)
		.map(option => option.value);
}

export function getSelectResponse(question: QuestionnaireSelectQuestion): ?string {
	const selectedOption = question.options.find(option => option.selected);
	if (selectedOption)
		return selectedOption.text;
}

export function getRadioCheckboxResponses(
	question: QuestionnaireRadioQuestion | QuestionnaireCheckboxQuestion
): Array<string> {
	return question.options
		.filter(option => option.checked)
		.map(option => option.text);
}
