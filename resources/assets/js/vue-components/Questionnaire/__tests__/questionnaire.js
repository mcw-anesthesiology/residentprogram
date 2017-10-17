import { mount } from 'vue-test-utils';

import Questionnaire from '../Questionnaire.vue';
import metSection from './questionnaires/with-met-section.json';
import unmetSection from './questionnaires/with-unmet-section.json';

describe('Questionnaire', () => {
	test('Hides section when condition unmet', () => {
		const wrapper = mount(Questionnaire, {
			propsData: unmetSection
		});

		const section = wrapper.find('.questionnaire-section');
		expect(section.hasStyle('display', 'none')).toBe(true);
	});

	test('Displays section when condition met', () => {
		const wrapper = mount(Questionnaire, {
			propsData: metSection
		});

		const section = wrapper.findAll('.questionnaire-section').at(1);
		expect(section.hasStyle('display', 'none')).toBe(false);
	});
});
