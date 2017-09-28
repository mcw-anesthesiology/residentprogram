/* @flow */

import type {
	QuestionnaireQuestion,
	QuestionnaireTextQuestion,
	QuestionnaireNumberQuestion,
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
	QuestionnaireMentorshipListItem
} from './index.js';

export type Validation = {
	valid: boolean,
	errors: ValidationErrors
};

// TODO: Consider making not a map so multiple errors can be returned per prop
export type ValidationErrors = Map<string, string>;

export function question(question: QuestionnaireQuestion): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (question.type !== 'list' && !question.required)
		return {
			valid,
			errors
		};

	switch (question.type) {
		case 'text':
			return textQuestion(question);
		case 'number':
			return numberQuestion(question);
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

	if (question.required && !question.value == null) {
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

	if (!list.items || !Array.isArray(list.items) || list.items.length === 0) {
		valid = false;
		errors.set('items', 'Please enter a list item');
	}

	if (valid) {
		for (let [index, item] of list.items.entries()) {
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
				const listItemValidation = listItem(item);
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

export function listItem(item: QuestionnaireListItem): Validation {
	switch (item.type) {
		case 'text':
			return textListItem(item);
		case 'publication':
			return publicationListItem(item);
		case 'committee':
			return committeeListItem(item);
		case 'study':
			return studyListItem(item);
		case 'grant':
		case 'grantOther':
			return grantListItem(item);
		case 'certification':
			return certificationListItem(item);
		case 'editorialBoard':
			return editorialBoardListItem(item);
		case 'review':
			return reviewListItem(item);
		case 'lecture':
		case 'audienceLecture':
			return lectureListItem(item);
		case 'mentorship':
		case 'subjectMentorship':
			return mentorshipListItem(item);
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

export function textListItem(item: QuestionnaireTextListItem): Validation {
	let valid = true;
	const errors: ValidationErrors = new Map();

	if (!item.text) {
		valid = false;
		errors.set('text', 'Please complete or remove this list item');
	}

	return {
		valid,
		errors
	};
}

export function publicationListItem(item: QuestionnairePublicationListItem): Validation {
	return requiredListItem(item, new Map([
		['title', 'enter the publication title'],
		['role', 'describe your role']
	]));
}

export function certificationListItem(item: QuestionnaireCertificationListItem): Validation {
	return requiredListItem(item, new Map([
		['board', 'enter the certification board'],
		['specialty', 'enter the certification specialty']
	]));
}

export function committeeListItem(item: QuestionnaireCommitteeListItem): Validation {
	return requiredListItem(item, new Map([
		['name', 'enter the committee name'],
		['role', 'select your role in the committee']
	]));
}

export function editorialBoardListItem(item: QuestionnaireEditorialBoardListItem): Validation {
	return requiredListItem(item, new Map([
		['journal', 'enter the journal'],
		['role', 'describe your role']
	]));
}

export function grantListItem(item: QuestionnaireGrantListItem): Validation {
	return requiredListItem(item, new Map([
		['agency', 'enter the funding agency'],
		['project', 'enter the name of the project'],
		['amount', 'enter the funding amount']
	]));
}

export function lectureListItem(item: QuestionnaireLectureListItem): Validation {
	return requiredListItem(item, new Map([
		['title', 'enter the lecture title'],
		['date', 'enter the lecture date(s)'],
		['audience', 'enter the lecture audience']
	]));
}

export function mentorshipListItem(item: QuestionnaireMentorshipListItem): Validation {
	return requiredListItem(item, new Map([
		['mentee', 'enter the mentee / trainee name'],
		['subject', 'enter the mentorship subject']
	]));
}

export function reviewListItem(item: QuestionnaireReviewListItem): Validation {
	return requiredListItem(item, new Map([
		['work', "enter the name of what's being reviewed"]
	]));
}

export function studyListItem(item: QuestionnaireStudyListItem): Validation {
	return requiredListItem(item, new Map([
		['title', 'the study title'],
		['role', 'describe your role'],
		['yearInitiated', 'enter the year the study was initiated'],
		['approvalNumber', 'enter the study approval number'],
		['progress', "describe the study's progress"]
	]));
}
