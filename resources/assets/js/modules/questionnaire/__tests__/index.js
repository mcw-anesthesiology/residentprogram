import { getValue, getValues, questionMatchesValue } from '../index.js';

describe('getValue', () => {
	test('gets text values', () => {
		expect(getValue({
			type: 'text',
			text: 'Question',
			value: 'okay'
		})).toBe('okay');

		expect(getValue({
			type: 'text',
			text: 'Question without value'
		})).toBeUndefined();
	});

	test('gets number values', () => {
		expect(getValue({
			type: 'number',
			text: 'Question',
			value: 5
		})).toBe(5);

		expect(getValue({
			type: 'number',
			text: 'Question without value'
		})).toBeUndefined();
	});

	test('gets select values', () => {
		expect(getValue({
			type: 'select',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					selected: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBe('okay');

		expect(getValue({
			type: 'select',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBeUndefined();
	});

	test('gets radio values', () => {
		expect(getValue({
			type: 'radio',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					checked: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBe('okay');

		expect(getValue({
			type: 'radio',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBeUndefined();
	});

	test('gets checkbox values', () => {
		expect(getValue({
			type: 'checkbox',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					checked: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBe('okay');

		expect(getValue({
			type: 'checkbox',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toBeUndefined();

		function getMultipleValues() {
			return getValue({
				type: 'checkbox',
				text: 'Question with two values',
				options: [
					{
						text: 'Option 1',
						value: 'okay',
						checked: true
					},
					{
						text: 'Option 2',
						value: 'no',
						checked: true
					}
				]
			});
		}

		expect(getMultipleValues).toThrow(RangeError);
	});

	test('Errors for list questions', () => {
		function getListValue() {
			return getValue({
				type: 'list',
				listType: 'text',
				items: []
			});
		}

		expect(getListValue).toThrow(TypeError);
	});
});

describe('getValues', () => {
	test('gets text values', () => {
		expect(getValues({
			type: 'text',
			text: 'Question',
			value: 'okay'
		})).toEqual(['okay']);

		expect(getValues({
			type: 'text',
			text: 'Question without value'
		})).toEqual([]);
	});

	test('gets number values', () => {
		expect(getValues({
			type: 'number',
			text: 'Question',
			value: 5
		})).toEqual([5]);

		expect(getValues({
			type: 'number',
			text: 'Question without value'
		})).toEqual([]);
	});

	test('gets select values', () => {
		expect(getValues({
			type: 'select',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					selected: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual(['okay']);

		expect(getValues({
			type: 'select',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual([]);
	});

	test('gets radio values', () => {
		expect(getValues({
			type: 'radio',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					checked: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual(['okay']);

		expect(getValues({
			type: 'radio',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual([]);
	});

	test('gets checkbox values', () => {
		expect(getValues({
			type: 'checkbox',
			text: 'Question',
			options: [
				{
					text: 'Option 1',
					value: 'okay',
					checked: true
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual(['okay']);

		expect(getValues({
			type: 'checkbox',
			text: 'Question without value',
			options: [
				{
					text: 'Option 1',
					value: 'okay'
				},
				{
					text: 'Option 2',
					value: 'no'
				}
			]
		})).toEqual([]);

		function getMultipleValues() {
			return getValues({
				type: 'checkbox',
				text: 'Question with two values',
				options: [
					{
						text: 'Option 1',
						value: 'okay',
						checked: true
					},
					{
						text: 'Option 2',
						value: 'no',
						checked: true
					}
				]
			});
		}

		expect(getMultipleValues()).toEqual(['okay', 'no']);
	});

	test('Errors for list questions', () => {
		function getListValue() {
			return getValues({
				type: 'list',
				listType: 'text',
				items: []
			});
		}

		expect(getListValue).toThrow(TypeError);
	});
});

describe('questionMatchesValue', () => {
	describe('text questions', () => {
		test('matches boolean condition value', () => {
			expect(questionMatchesValue({
				type: 'text',
				text: 'Text question',
				value: 'anything'
			}, true)).toBe(true);
		});

		test('matches string value', () => {
			expect(questionMatchesValue({
				type: 'text',
				text: 'Text question',
				value: 'something'
			}, 'something')).toBe(true);
		});

		test('matches array of values', () => {
			expect(questionMatchesValue({
				type: 'text',
				text: 'Text question',
				value: 'something'
			}, ['something', 'something else'])).toBe(true);
		});
	});

	describe('number questions', () => {
		test('matches boolean condition value', () => {
			expect(questionMatchesValue({
				type: 'number',
				text: 'Number question',
				value: 1
			}, true)).toBe(true);
		});

		test('matches string value', () => {
			expect(questionMatchesValue({
				type: 'number',
				text: 'Number question',
				value: 2
			}, 2)).toBe(true);
		});

		test('matches array of values', () => {
			expect(questionMatchesValue({
				type: 'number',
				text: 'Number question',
				value: 1
			}, [1, 3])).toBe(true);
		});
	});

	describe('select questions', () => {
		test('matches boolean condition value', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'anything',
						selected: true
					}
				]
			}, true)).toBe(true);
		});

		test('matches string value', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'something',
						selected: true
					}
				]
			}, 'something')).toBe(true);
		});

		test('matches array of values', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'something',
						selected: true
					}
				]
			}, ['something', 'something else'])).toBe(true);
		});
	});

	describe('select questions', () => {
		test('matches boolean condition value', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'anything',
						selected: true
					}
				]
			}, true)).toBe(true);
		});

		test('matches string value', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'something',
						selected: true
					}
				]
			}, 'something')).toBe(true);
		});

		test('matches array of values', () => {
			expect(questionMatchesValue({
				type: 'select',
				text: 'Select question',
				options: [
					{
						text: 'Option',
						value: 'something',
						selected: true
					}
				]
			}, ['something', 'something else'])).toBe(true);
		});
	});

	describe('radio questions', () => {
		test('matches boolean condition value', () => {
			expect(questionMatchesValue({
				type: 'radio',
				text: 'Radio question',
				options: [
					{
						text: 'Option',
						value: 'anything',
						checked: true
					}
				]
			}, true)).toBe(true);
		});

		test('matches string value', () => {
			expect(questionMatchesValue({
				type: 'radio',
				text: 'Radio question',
				options: [
					{
						text: 'Option',
						value: 'something',
						checked: true
					}
				]
			}, 'something')).toBe(true);
		});

		test('matches array of values', () => {
			expect(questionMatchesValue({
				type: 'radio',
				text: 'Radio question',
				options: [
					{
						text: 'Option',
						value: 'something',
						checked: true
					}
				]
			}, ['something', 'something else'])).toBe(true);
		});
	});
});
