/* @flow */

import {
	computeScore,
	scoreQuestion,
	mergeScores,
	isValidValueScoringDefinition
} from '../questionnaire/scoring.js';

import type { MeritReportItem } from './index.js';
import type { Score, ValueScoringDefinition } from '../questionnaire/scoring.js';


export function scoreItem(item: MeritReportItem): Score {
	const score: Score = new Map();

	if (item.scoring && isValidValueScoringDefinition(item.scoring) && item.checked) {
		const scoring: ValueScoringDefinition = item.scoring;
		score.set(scoring.category,
			computeScore(scoring, scoring.value));
	}

	const questionScores = item.questions.map(scoreQuestion);

	return mergeScores(score, ...questionScores);
}
