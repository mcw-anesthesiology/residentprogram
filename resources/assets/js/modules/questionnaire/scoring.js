/* @flow */

import { getSelectValue } from './index.js';
import { logError } from '../errors.js';

import type {
	QuestionnaireQuestion,
	QuestionnaireTextQuestion,
	QuestionnaireNumberQuestion,
	QuestionnaireSelectQuestion,
	QuestionnaireCheckboxQuestion,
	QuestionnaireRadioQuestion,
	QuestionnaireListQuestion,
} from './index.js';

export type ScoringDefinition = {
	category: string,
	min?: number,
	max?: number,
	weight?: number,
};

// Used per-item for list questions and for text questions and checklist items
export type ValueScoringDefinition = ScoringDefinition & {
	value: number,
};

export type CommitteeScoringDefinition = ScoringDefinition & {
	valuePerMeeting: number,
};

export type Score = Map<string, number>;

export function isValidScoringDefinition(scoring: Object): boolean {
	return (
		scoring && 'category' in scoring && typeof scoring.category === 'string'
	);
}

export function isValidValueScoringDefinition(scoring: Object): boolean {
	return (
		isValidScoringDefinition(scoring) &&
		'value' in scoring &&
		typeof scoring.value === 'number'
	);
}

export function mergeScores(...scores: Array<Score>): Score {
	const mergedScore: Score = new Map();

	for (const score of scores) {
		for (const [category, scoreValue] of score.entries()) {
			let newValue = mergedScore.has(category)
				? mergedScore.get(category)
				: 0;

			mergedScore.set(category, newValue + scoreValue);
		}
	}

	return mergedScore;
}

export function computeScore(
	scoring: ScoringDefinition,
	value: number
): number {
	if (scoring.weight) {
		value = value * scoring.weight;
	}

	if (scoring.min && value < scoring.min) {
		value = scoring.min;
	}

	if (scoring.max && value > scoring.max) {
		value = scoring.max;
	}

	return value;
}

export function scoreQuestion(question: QuestionnaireQuestion): Score {
	switch (question.type) {
		case 'text':
		case 'textarea':
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

	throw new Error(`Unrecognized question type ${question.type}`);
}

export function textQuestion(question: QuestionnaireTextQuestion): Score {
	const score: Score = new Map();

	if (question.scoring) {
		score.set(
			question.scoring.category,
			computeScore(question.scoring, question.scoring.value)
		);
	}

	return score;
}

export function numberQuestion(question: QuestionnaireNumberQuestion): Score {
	const score: Score = new Map();

	if (question.scoring && question.value) {
		score.set(
			question.scoring.category,
			computeScore(question.scoring, question.value)
		);
	}

	return score;
}

export function selectQuestion(question: QuestionnaireSelectQuestion): Score {
	const score: Score = new Map();

	if (question.scoring) {
		const scoring: ScoringDefinition = question.scoring;
		const value = getSelectValue(question);
		if (typeof value === 'number')
			score.set(scoring.category, computeScore(scoring, value));
	}

	return score;
}

export function checkboxQuestion(
	question: QuestionnaireCheckboxQuestion
): Score {
	return radioCheckboxQuestion(question);
}

export function radioQuestion(question: QuestionnaireRadioQuestion): Score {
	return radioCheckboxQuestion(question);
}

export function radioCheckboxQuestion(
	question: QuestionnaireCheckboxQuestion | QuestionnaireRadioQuestion
): Score {
	const score: Score = new Map();

	for (const option of question.options) {
		// if instead of continue in order to appease flow
		if (option.checked && typeof option.value === 'number') {
			let optionValue: number = option.value;

			let scoring = option.scoring;
			if (!scoring) scoring = question.scoring;

			if (scoring) {
				let scoreValue = score.has(scoring.category)
					? score.get(scoring.category)
					: 0;

				score.set(
					scoring.category,
					computeScore(scoring, scoreValue + optionValue)
				);
			}
		}
	}

	return score;
}

export function listQuestion(question: QuestionnaireListQuestion): Score {
	const score: Score = new Map();

	if (question.scoring && question.items) {
		const scoring = question.scoring;
		question.items.forEach((item) => {
			const scoreValue = score.has(scoring.category)
				? score.get(scoring.category)
				: 0;

			let itemScore;

			try {
				if (
					question.listType === 'committee' &&
					scoring.valuePerMeeting
				) {
					itemScore =
						Number(item.meetingsPerYear) *
						Number(scoring.valuePerMeeting);
				} else {
					itemScore = scoring.value;
				}

				if (itemScore) {
					score.set(
						scoring.category,
						computeScore(scoring, scoreValue + itemScore)
					);
				}
			} catch (err) {
				logError(err);
			}
		});
	}

	return score;
}
