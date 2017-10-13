<script>
import QuestionnaireInstruction from './Instruction.vue';
import QuestionnaireQuestion from './Question/Question.vue';

import { getQuestionConditionChecker } from '@/modules/questionnaire/index.js';

export default {
	name: 'questionnaire-section',
	model: {
		prop: 'items'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'section';
			}
		},
		title: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: true
		},
		page: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render(h) {
		const validItems = this.items.filter(validItem);
		const questionConditionMet = getQuestionConditionChecker(validItems);

		const items = validItems.map((item, index) => {
			let componentName = item.type === 'instruction'
				? 'questionnaire-instruction'
				: 'questionnaire-question';

			return h(componentName, {
				props: {
					readonly: this.readonly,
					conditionMet: questionConditionMet(item),
					...item
				},
				on: {
					input: item => {
						let items = this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						this.$emit('input', {items});
					}
				}
			});
		});

		if (this.title)
			items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	},

	components: {
		QuestionnaireInstruction,
		QuestionnaireQuestion
	}
};

function validItem(item) {
	return item.type && [
		'instruction',
		'text',
		'textarea',
		'number',
		'checkbox',
		'radio',
		'list'
	].includes(item.type);
}
</script>
