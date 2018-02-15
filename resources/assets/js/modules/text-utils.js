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

export function pluralize(noun: string, items: number): string {
	if (items !== 1)
		noun += 's';

	return noun;
}
