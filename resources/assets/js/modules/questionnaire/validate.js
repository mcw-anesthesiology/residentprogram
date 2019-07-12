/* @flow */

// This has to manually be kept in sync with server-side implementation
// in app/Helpers/QuestionnaireValidation.php

import {
	isQuestion,
	getSelectValue,
	getQuestions,
	getConditionChecker
} from './index.js';

import type {
	Questionnaire,
	QuestionnaireSection,
	QuestionnaireQuestion,
	QuestionnaireTextQuestion,
	QuestionnaireNumberQuestion,
	QuestionnaireSelectQuestion,
	QuestionnaireCheckboxQuestion,
	QuestionnaireRadioQuestion,
	QuestionnaireListQuestion,
	QuestionnaireListItem,
	QuestionnaireTextListItem,
	QuestionnairePublicationListItem,
	QuestionnaireCommitteeListItem,
	QuestionnaireStudyListItem,
	QuestionnaireGrantListItem,
	QuestionnaireCertificationListItem,
	QuestionnaireEditorialBoardListItem,
	QuestionnaireReviewListItem,
	QuestionnaireLectureListItem,
	QuestionnaireMentorshipListItem,
	QuestionnaireDatedEventListItem,
	ConditionChecker
} from './index.js';

export type QuestionnaireValidation = {
	valid: boolean,
	errors: QuestionnaireValidationErrors
};

export type SectionValidation = {
	valid: boolean,
	errors: SectionValidationErrors
};

export type Validation = {
	valid: boolean,
	errors: ValidationErrors
};

// TODO: Consider making not a map so multiple errors can be returned per prop
export type QuestionnaireValidationErrors = Map<number, SectionValidationErrors>;
export type SectionValidationErrors = Map<number, ValidationErrors>;
export type ValidationErrors = Map<string, string>;

export function questionnaire(thisQuestionnaire: Questionnaire): QuestionnaireValidation {
	let valid = true;
	const errors: QuestionnaireValidationErrors = new Map();

	const meetsCondition = getConditionChecker(getQuestions(thisQuestionnaire));

	for (const [index, thisSection] of thisQuestionnaire.sections.entries()) {
		if (!thisSection.condition || meetsCondition(thisSection.condition)) {
			const sectionValidation = section(thisSection);
			if (!sectionValidation.valid) {
				valid = false;
				errors.set(index, sectionValidation.errors);
			}
		}
	}

	return {
		valid,
		errors
	};
}

export function section(
	thisSection: QuestionnaireSection,
	meetsCondition?: ConditionChecker = getConditionChecker(
		/* $FlowFixMe This is right I promise */
		thisSection.items.filter(isQuestion)
	)
): SectionValidation {
	let valid = true;
	const errors: SectionValidationErrors = new Map();

	// $FlowFixMe This is right I promise
	for (const [index, item] of thisSection.items.filter(isQuestion).entries()) {
		if (!item.condition || meetsCondition(item.condition)) {
			const questionValidation = question(item);
			if (!questionValidation.valid) {
				valid = false;
				errors.set(index, questionValidation.errors);
			}
		}
	}

	return {
		valid,
		errors
	};
}

export function question(question: QuestionnaireQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (!question.required)
		return {
			valid,
			errors
		};

	switch (question.type) {
		case 'text':
			return textQuestion(question);
		case 'number':
			return numberQuestion(question);
		case 'select':
			return selectQuestion(question);
		case 'checkbox':
			return checkboxQuestion(question);
		case 'radio':
			return radioQuestion(question);
		case 'list':
			return listQuestion(question);
	}

	throw new Error('Unrecognized question type');
}

export function textQuestion(question: QuestionnaireTextQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (question.required && !question.value) {
		valid = false;
		errors.set('value', 'Please complete the question');
	}

	return {
		valid,
		errors
	};
}

export function numberQuestion(question: QuestionnaireNumberQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (question.required && question.value == null) {
		valid = false;
		errors.set('value', 'Please complete the question');
	}

	const value = Number(question.value);

	if (valid && Number.isNaN(value)) {
		valid = false;
		errors.set('value', 'Please enter a valid number');
	}

	if (valid && question.min && value < question.min) {
		valid = false;
		errors.set('value', `Value must be greater than min (${question.min})`);
	}

	if (valid && question.max && value > question.max) {
		valid = false;
		errors.set('value', `Value must be less than max (${question.max})`);
	}

	return {
		valid,
		errors
	};
}

export function selectQuestion(question: QuestionnaireSelectQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	const value = getSelectValue(question);

	if (question.required && value == null) {
		valid = false;
		errors.set('options', 'Please complete the question');
	}

	return {
		valid,
		errors
	};
}

export function radioQuestion(question: QuestionnaireRadioQuestion): Validation {
	return radioCheckboxQuestion(question);
}

export function checkboxQuestion(question: QuestionnaireCheckboxQuestion): Validation {
	return radioCheckboxQuestion(question);
}

export function radioCheckboxQuestion(question: QuestionnaireRadioQuestion | QuestionnaireCheckboxQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (question.required) {
		let optionChecked = false;
		for (let option of question.options) {
			if (option.checked)
				optionChecked = true;
		}

		if (!optionChecked) {
			valid = false;
			errors.set('options', 'Please select an option');
		}
	}

	return {
		valid,
		errors
	};
}

export function listQuestion(list: QuestionnaireListQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (
		list.required
		&& (!list.items || !Array.isArray(list.items) || list.items.length === 0)
	) {
		valid = false;
		errors.set('items', 'Please enter a list item');
	}

	if (
		list.fixedLength
		&& (
			!list.items
			|| !Array.isArray(list.items)
			|| list.items.length !== list.fixedLength
		)
	) {
		valid = false;
		errors.set('items', 'Number of items does not match specified size');
	}

	if (valid) {
		for (let [index, item] of list.items.entries()) {
			if ('itemRequired' in list) {
				for (let [key, required] of Object.entries(list.itemRequired)) {
					if (required && !item[key]) {
						valid = false;
						// This string interp thing kinda stinks
						errors.set(`item[${index}][${key}]`, `Required item prop ${key} not present in list item`);
					}
				}
			}

			if ('itemProps' in list) {
				for (let [key, value] of Object.entries(list.itemProps)) {
					if (item[key] !== value) {
						valid = false;
						// This string interp thing kinda stinks
						errors.set(`item[${index}][${key}]`, `Predefined itemProp ${key} not present in list item`);
					}
				}
			}

			if (!errors.has(`item[${index}]`)) {
				const listItemValidation = listItem(item, list.itemRequired);
				if (!listItemValidation.valid) {
					valid = false;
					for (let [itemKey, itemVal] of listItemValidation.errors.entries()) {
						// This string interp thing kinda stinks
						errors.set(`item[${index}][${itemKey}]`, itemVal);
					}
				}
			}
		}
	}

	return {
		valid,
		errors
	};
}

export function listItem(
	item: QuestionnaireListItem,
	propsRequired?: {[string]: string}
): Validation {
	switch (item.type) {
		case 'text':
			return textListItem(item, propsRequired);
		case 'publication':
			return publicationListItem(item, propsRequired);
		case 'committee':
			return committeeListItem(item, propsRequired);
		case 'study':
			return studyListItem(item, propsRequired);
		case 'grant':
		case 'grantOther':
			return grantListItem(item, propsRequired);
		case 'certification':
			return certificationListItem(item, propsRequired);
		case 'editorialBoard':
			return editorialBoardListItem(item, propsRequired);
		case 'review':
			return reviewListItem(item, propsRequired);
		case 'lecture':
		case 'audienceLecture':
			return lectureListItem(item, propsRequired);
		case 'mentorship':
		case 'subjectMentorship':
			return mentorshipListItem(item, propsRequired);
		case 'datedEvent':
			return datedEventListItem(item, propsRequired);
	}

	// Unrecognized list type
	throw new Error('Unrecognized list type');
}

function requiredListItem(item: QuestionnaireListItem, requiredMap: Map<string, string>) {
	let valid = true;
	const errors: ValidationErrors = new Map();

	for (let [prop, str]: [string, string] of requiredMap.entries()) {
		if (!item[prop]) {
			valid = false;
			errors.set(prop, `Please ${str} or remove this list item`);
		}
	}

	return {
		valid,
		errors
	};
}

function addPropsRequired(
	map: Map<string, string>,
	propsRequired?: {[string]: string}
): Map<string, string> {
	if (propsRequired) {
		for (let [key, val] of Object.entries(propsRequired)) {
			if (val) {
				if (typeof val === 'string')
					map.set(key, val);
				else
					map.set(key, 'complete');
			}
		}
	}

	return map;
}

export function textListItem(
	item: QuestionnaireTextListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['text', 'complete']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function publicationListItem(
	item: QuestionnairePublicationListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['title', 'enter the publication title'],
		['role', 'describe your role']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function certificationListItem(
	item: QuestionnaireCertificationListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['board', 'enter the certification board'],
		['specialty', 'enter the certification specialty']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function committeeListItem(
	item: QuestionnaireCommitteeListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['name', 'enter the committee name'],
		['role', 'select your role in the committee'],
		['meetingsPerYear', 'estimate the number of meetings the committee holds per year']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function editorialBoardListItem(
	item: QuestionnaireEditorialBoardListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['journal', 'enter the journal'],
		['role', 'describe your role']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function grantListItem(
	item: QuestionnaireGrantListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['agency', 'enter the funding agency'],
		['agencyType', 'select the type of funding agency'],
		['project', 'enter the name of the project'],
		['amount', 'enter the funding amount']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function lectureListItem(
	item: QuestionnaireLectureListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['title', 'enter the lecture title'],
		['date', 'enter the lecture date(s)'],
		['audience', 'enter the lecture audience']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function mentorshipListItem(
	item: QuestionnaireMentorshipListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['mentee', 'enter the mentee / trainee name'],
		['subject', 'enter the mentorship subject']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function reviewListItem(
	item: QuestionnaireReviewListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['work', "enter the name of what's being reviewed"],
		['reviews', 'enter the number of reviews you completed']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function studyListItem(
	item: QuestionnaireStudyListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['title', 'the study title'],
		['role', 'describe your role'],
		['yearInitiated', 'enter the year the study was initiated'],
		['approvalNumber', 'enter the study approval number'],
		['progress', "describe the study's progress"]
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}

export function datedEventListItem(
	item: QuestionnaireDatedEventListItem,
	propsRequired?: {[string]: string}
): Validation {
	const map = new Map([
		['description', 'describe the event and your involvement'],
		['date', 'list the date(s) it took place']
	]);

	return requiredListItem(item, addPropsRequired(map, propsRequired));
}
