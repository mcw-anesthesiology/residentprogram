/* @flow */

import { getRandom } from './utils.js';

export const ACKNOWLEDGE_TEXT_OPTIONS = [
	'OK',
	'Cool',
	'Nice',
	'Good to know',
	'Thanks',
	'Neat'
];

export function getAcknowledgeText(exclaim: boolean = true): string {
	let phrase = getRandom(ACKNOWLEDGE_TEXT_OPTIONS);

	if (exclaim)
		phrase += '!';

	return phrase;
}
