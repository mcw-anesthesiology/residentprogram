/* @flow */

import type {
	QuestionnaireQuestion,
	QuestionnaireTextQuestion,
	QuestionnaireNumberQuestion,
	QuestionnaireCheckboxQuestion,
	QuestionnaireRadioQuestion,
	QuestionnaireListQuestion,
	QuestionnaireListItem,
	QuestionnaireText,
	QuestionnaireTextListItem,
	QuestionnairePublicationListItem,
	QuestionnaireCommitteeListItem,
	QuestionnaireStudyListItem,
	QuestionnaireGrantListItem,
	QuestionnaireCertificationListItem,
	QuestionnaireEditorialBoardListItem,
	QuestionnaireReviewListItem,
	QuestionnaireLectureListItem,
	QuestionnaireMenstorshipListItem
} from './index.js';

export type Validation = {
	valid: boolean,
	errors: ValidationErrors
};

export type ValidationErrors = Map<string, string>;

export function lectureListItem(item: QuestionnaireLectureListItem): Validation {
	const required = [
		'title',
		'date',
		'audience'
	];

	let valid = true;
	const errors: Map<string, string> = new Map();

	for (let prop of required) {
		if (!item[prop]) {
			valid = false;
			errors.set(prop, `Please enter the lecture ${prop} or remove this list item`);
		}
	}

	return {
		valid,
		errors
	};
}
