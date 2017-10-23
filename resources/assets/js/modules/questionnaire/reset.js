import {
	walkQuestionnaireQuestions,
	getConditionChecker,
	getQuestions
} from './index.js';

import type {
	ConditionChecker,
	Questionnaire,
	QuestionnaireQuestion,
	QuestionnaireTextQuestion,
	QuestionnaireNumberQuestion,
	QuestionnaireSelectQuestion,
	QuestionnaireCheckboxQuestion,
	QuestionnaireRadioQuestion,
	QuestionnaireListQuestion
} from './index.js';

export function resetQuestion(question: QuestionnaireQuestion): QuestionnaireQuestion {
	switch (question.type) {
		case 'text':
			return resetTextQuestion(question);
		case 'number':
			return resetNumberQuestion(question);
		case 'select':
			return resetSelectQuestion(question);
		case 'checkbox':
			return resetCheckboxQuestion(question);
		case 'radio':
			return resetRadioQuestion(question);
		case 'list':
			return resetListQuestion(question);
	}
}

function resetTextQuestion(question: QuestionnaireTextQuestion): QuestionnaireTextQuestion {
	const newQuestion = Object.assign({}, question);
	delete newQuestion.value;
	return newQuestion;
}

function resetNumberQuestion(question: QuestionnaireNumberQuestion): QuestionnaireNumberQuestion {
	const newQuestion = Object.assign({}, question);
	delete newQuestion.value;
	return newQuestion;
}

function resetSelectQuestion(question: QuestionnaireSelectQuestion): QuestionnaireSelectQuestion {
	const newQuestion = Object.assign({}, question);
	newQuestion.options = newQuestion.options.map(option => {
		const newOption = Object.assign({}, option);
		delete newOption.selected;
		return newOption;
	});
	return newQuestion;
}

function resetCheckboxQuestion(question: QuestionnaireCheckboxQuestion): QuestionnaireCheckboxQuestion {
	return resetRadioCheckboxQuestion(question);
}

function resetRadioQuestion(question: QuestionnaireRadioQuestion): QuestionnaireRadioQuestion {
	return resetRadioCheckboxQuestion(question);
}

function resetRadioCheckboxQuestion(
	question: QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion
): QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion {
	const newQuestion = Object.assign({}, question);
	newQuestion.options = newQuestion.options.map(option => {
		const newOption = Object.assign({}, option);
		delete newOption.checked;

		if (newOption.editable) {
			newOption.text = '';
			newOption.value = '';
		}

		return newOption;
	});
	return newQuestion;
}

function resetListQuestion(question: QuestionnaireListQuestion): QuestionnaireListQuestion {
	const newQuestion = Object.assign({}, question);
	newQuestion.items = [];
	return newQuestion;
}

export function resetUnmetQuestions(
	questionnaire: Questionnaire,
	checker: ConditionChecker = getConditionChecker(getQuestions(questionnaire))
): Questionnaire {
	const resetter = (question, section) => (
			(section.condition && !checker(section.condition))
			|| (question.condition && !checker(question.condition))
		)
			? resetQuestion(question)
			: question;

	return walkQuestionnaireQuestions(questionnaire, resetter);
}
