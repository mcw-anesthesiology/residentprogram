import { mount } from 'vue-test-utils';

import Question from '../Question.vue';
import questionWithCondition from './question-with-condition.json';
import questionWithoutCondition from './question-without-condition.json';

describe('Question', () => {
	test('Displays none when has unmet condition', () => {
		const wrapper = mount(Question, {
			propsData: {
				question: questionWithCondition
			}
		});

		expect(wrapper.hasStyle('display', 'none')).toBe(true);
	});

	test('Displays with met condition', () => {
		const wrapper = mount(Question, {
			propsData: {
				question: questionWithCondition,
				conditionMet: true
			}
		});

		expect(wrapper.hasStyle('display', 'none')).toBe(false);
	});

	test('Displays when no condition', () => {
		const wrapper = mount(Question, {
			propsData: {
				question: questionWithoutCondition
			}
		});

		expect(wrapper.hasStyle('display', 'none')).toBe(false);
	});
});
