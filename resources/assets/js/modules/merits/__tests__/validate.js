/* @flow */

import { flattenErrors } from '../validate.js';

describe('flattenErrors', () => {
	test('1', () => {
		let errors = new Map([
			[0, new Map([
				[0, new Map([
					['value', 'Error 1']
				])],
				[1, new Map([
					[0, new Map([
						['value', 'Error 2']
					])]
				])]
			])],
			[1, new Map([
				[0, new Map([
					['value', 'Error 3']
				])]
			])]
		]);

		// $FlowFixMe: This is rightish I promise
		expect(flattenErrors(errors)).toEqual([
			'Error 1',
			'Error 2',
			'Error 3'
		]);
	});
});
