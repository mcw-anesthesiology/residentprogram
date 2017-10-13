import { mount } from 'vue-test-utils';

import Question from '../Question.vue';
import questionWithCondition from './question-with-condition.json';

describe('Question', () => {
	test("Displays none when doesn't meet condition", () => {
		const wrapper = mount(Question, {
			propsData: {
				question: questionWithCondition,
				conditionMet: false
			}
		});

		console.log(wrapper);
	});
});
