import { quoteValue } from '../report-utils.js';

describe('quoteValue', () => {
	test('it properly escapes double-quotes', () => {
		expect(quoteValue('"And I said, "Hey!""'))
			.toBe('"""And I said, ""Hey!"""""');
	});
});
