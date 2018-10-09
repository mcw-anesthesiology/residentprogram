/** @format */
/* @flow */

import moment from "moment";

import type { Evaluation } from "./utils.js";
import type { DateLike } from "./date-utils.js";

export function processQuestionTemplates(
	evaluation: Evaluation,
	templates: Array<[string, Function]>
) {
	if (!evaluation || !evaluation.contents || !evaluation.contents.items) return;

	if (!templates || templates.length === 0) return evaluation.contents;

	let items = evaluation.contents.items.map(item => {
		item = Object.assign({}, item);

		for (const [template, replacementFunc] of templates) {
			const replacement = replacementFunc(evaluation);
			item.text = item.text.replace(template, replacement);
		}

		return item;
	});

	return Object.assign({}, evaluation.contents, { items });
}

export function evaluationDateBetween(
	evaluation: Evaluation,
	{ startDate, endDate }: { startDate: DateLike, endDate: DateLike }
) {
	if (startDate && moment(evaluation.evaluation_date_end) < moment(startDate))
		return false;

	if (endDate && moment(evaluation.evaluation_date_start) > moment(endDate))
		return false;

	return true;
}
