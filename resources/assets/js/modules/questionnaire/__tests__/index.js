import { questionMatchesValue } from '../index.js';

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
