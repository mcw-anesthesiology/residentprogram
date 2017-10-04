/* @flow */

import {
	computeScore,
	scoreQuestion,
	mergeScores
} from '../questionnaire/scoring.js';

import type {
	MeritReportChecklist,
	MeritReportSection,
	MeritReportItem
} from './index.js';
import type { Score, ValueScoringDefinition } from '../questionnaire/scoring.js';

export function scoreChecklist(checklist: MeritReportChecklist): Score {
	return mergeScores(...checklist.pages.map(scoreSection));
}

export function scoreSection(section: MeritReportSection): Score {
	const scores: Array<Score> = [];

	for (let item of section.items) {
		switch (item.type) {
			case 'section':
				scores.push(scoreSection(item));
				break;
			case 'item':
				scores.push(scoreItem(item));
				break;
		}
	}

	return mergeScores(...scores);
}

export function scoreItem(item: MeritReportItem): Score {
	let score: Score = new Map();

	if (item.scoring && item.checked) {
		const scoring: ValueScoringDefinition = item.scoring;
		score.set(scoring.category,
			computeScore(scoring, scoring.value));
	}

	if (item.questions) {
		const questionScores = item.questions.map(scoreQuestion);
		score = mergeScores(score, ...questionScores);
	}

	return score;
}
