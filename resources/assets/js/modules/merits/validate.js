/* @flow */

import * as validateQuestionnaire from '../questionnaire/validate.js';

import type {
	MeritReportChecklist,
	MeritReportSection,
	MeritReportItem
} from './index.js';

import type {
	ValidationErrors
} from '../questionnaire/validate.js';

export type MeritSectionValidation = {
	valid: boolean,
	errors: MeritSectionValidationErrors
};

export type MeritItemValidation = {
	valid: boolean,
	errors: MeritItemValidationErrors
};

export type MeritValidationErrors = MeritSectionValidationErrors | MeritItemValidationErrors;
export type MeritSectionValidationErrors = Map<number, MeritValidationErrors>;
export type MeritItemValidationErrors = Map<number, ValidationErrors>;

export function flattenErrors(errors: MeritValidationErrors | ValidationErrors): Array<string> {
	const flatErrors: Array<string> = [];

	for (let error of errors.values()) {
		if (typeof error === 'string') {
			flatErrors.push(error);
		} else if (error instanceof Map) {
			flatErrors.push(...flattenErrors(error));
		}
	}

	return flatErrors;
}

export function checklist(checklist: MeritReportChecklist): MeritSectionValidation {
	let valid = true;
	const errors: MeritSectionValidationErrors = new Map();

	if ('pages' in checklist && checklist.pages.length > 0) {
		for (const [index, page] of checklist.pages.entries()) {
			const pageValidation = section(page);
			if (!pageValidation.valid) {
				valid = false;
				errors.set(index, pageValidation.errors);
			}
		}
	}

	return {
		valid,
		errors
	};
}

export function section(thisSection: MeritReportSection): MeritSectionValidation {
	let valid = true;
	const errors: MeritSectionValidationErrors = new Map();

	if ('items' in thisSection && thisSection.items.length > 0) {
		for (const [index, sectionItem] of thisSection.items.entries()) {
			let itemValidation;
			switch (sectionItem.type) {
				case 'section':
					itemValidation = section(sectionItem);
					if (!itemValidation.valid) {
						valid = false;
						errors.set(index, itemValidation.errors);
					}
					break;
				case 'item':
					itemValidation = item(sectionItem);
					if (!itemValidation.valid) {
						valid = false;
						errors.set(index, itemValidation.errors);
					}
					break;
			}
		}
	}

	return {
		valid,
		errors
	};
}

export function item(item: MeritReportItem): MeritItemValidation {
	let valid = true;
	const errors: MeritItemValidationErrors = new Map();

	if (item.checked && 'questions' in item && item.questions.length > 0) {
		for (const [index, itemQuestion] of item.questions.entries()) {
			const questionValidation = validateQuestionnaire.question(itemQuestion);
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
