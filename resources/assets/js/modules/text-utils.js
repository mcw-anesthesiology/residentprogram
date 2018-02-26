/* @flow */

export function ucfirst(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export function ucfirstWords(str: string): string {
	return str.split(' ').map(ucfirst).join(' ');
}

export function camelCaseToWords(str: string): string {
	let result = '';
	for(let char of str) {
		if (result === '') {
			result += char.toUpperCase();
		}
		else if (char === char.toUpperCase()) {
			result += ' ' + char.toLowerCase();
		}
		else {
			result += char;
		}
	}
	return result;
}

export function snakeCaseToWords(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('_', ' ');
}

export function kebabCaseToWords(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('-', ' ');
}

export function nl2br(text: string): string {
	return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

export function titleCase(text: string): string {
	return text.split(' ').map(w => w.toLowerCase()).map(ucfirst).join(' ');
}

export function pluralize(noun: string, items: number, suffix: string = 's'): string {
	if (items !== 1)
		noun += suffix;

	return noun;
}

export const INSTITUTIONAL_ACRONYMS: Set<string> = new Set([
	'MCW',
	'CHW'
]);

export const MEDICAL_ACRONYMS: Set<string> = new Set([
	// Locations
	'ICU',
	'CVICU',
	'PICU',
	'PACU',

	'RAAPS',

	// Procedures / ailments / devices
	'EGD',
	'ORIF',
	'EUA',
	'TAL',
	'IUD',
	'ACL',
	'DCR',
	'BAHA',
	'AVSD',
	'CAVSD',
	'BAL',
	'AVR',
	'TVR',
	'TPVR',
	'FESS',
	'OCD',
	'HHI',
	'LIJ',
	'CCL',
	'PDA',
	'VAC',
	'PSB',
	'IR',
	'TEE',
	'CT',
	'MRI',

	'(IT)',
]);

export const COMMON_ACRONYMS: Set<string> = new Set([
	'Y.O.',
	'N/A'
]);

export const ALL_ACRONYMS: Set<string> = new Set([
	...INSTITUTIONAL_ACRONYMS.values(),
	...MEDICAL_ACRONYMS.values(),
	...COMMON_ACRONYMS.values()
]);

export function replaceAcronyms(
	text: string,
	acronyms: Set<string> = ALL_ACRONYMS
): string {
	for (const acronym of acronyms.values()) {
		text = text.replace(
			new RegExp(`(^|[\\W])(${acronym})(\\W|$)`, 'ig'),
			(_, startSep = '', _matchedAcronym, endSep = '') =>
				`${startSep}${acronym}${endSep}`
		);
	}

	return text;
}
