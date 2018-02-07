/* @flow */

import { getRandom } from './utils.js';

export const ACKNOWLEDGE_TEXT_OPTIONS = [
	'OK',
	'Cool',
	'Nice',
	'Good to know',
	'Thanks',
	'Neat',
	'Sweet'
];

export function getAcknowledgeText(exclaim: boolean = true): string {
	let phrase = getRandom(ACKNOWLEDGE_TEXT_OPTIONS);

	if (exclaim)
		phrase += '!';

	return phrase;
}

export const LINK_TEXT_OPTIONS = [
	'Take me there',
	"Let's go",
	'Show me',
	'Check it out',
	'Give it a peek'
];

export function getLinkText(exclaim: boolean = true): string {
	let phrase = getRandom(LINK_TEXT_OPTIONS);

	if (exclaim)
		phrase += '!';

	return phrase;
}
