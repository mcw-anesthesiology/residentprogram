/* @flow */

import type { Evaluation } from './utils.js';

export function processQuestionTemplates(evaluation: Evaluation, templates: Array<[string, Function]>) {
	if (!evaluation || !evaluation.contents || !evaluation.contents.items)
		return;

	if (!templates || templates.size === 0)
		return evaluation.contents;

	let items = evaluation.contents.items.map(item => {
		item = Object.assign({}, item);

		for (const [template, replacementFunc] of templates) {
			const replacement = replacementFunc(evaluation);
			item.text = item.text.replace(template, replacement);
		}

		return item;
	});

	return Object.assign({}, evaluation.contents, {items});
}
