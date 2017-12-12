import { sortEmptyLast, sortNumbers } from '../utils.js';

describe('sortEmptyLast', () => {
	test('works', () => {
		const emptyVals = [null, undefined, ''];
		const vals = [1, 0, 'hi'];
		const sorted = [null, 1, undefined, 0, '', 'hi'].sort(sortEmptyLast);

		for (const emptyVal of emptyVals) {
			for (const val of vals) {
				expect(sorted.indexOf(emptyVal) > sorted.indexOf(val));
			}
		}
	});
});

describe('sortNumbers', () => {
	test('sorts numbers', () => {
		expect([5, 6, 1, 7, 0].sort(sortNumbers)).toEqual([0, 1, 5, 6, 7]);
	});
});
