/* @flow */

import randomcolor from 'randomcolor';


export type QuestionCountSummary = Map<string | number, number>;

export type Color = string;

export function getColors(count: number = 1, seed: string | number = 'RESIDENTPROGRAM'): Array<Color> {
	return randomcolor({
		count,
		seed
	});
}
