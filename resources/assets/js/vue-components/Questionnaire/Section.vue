<script>
import QuestionnaireInstruction from './Instruction.vue';

import TextQuestion from './Question/Text.vue';
import NumberQuestion from './Question/Number.vue';
import CheckboxQuestion from './Question/Checkbox.vue';
import RadioQuestion from './Question/Radio.vue';
import ListQuestion from './Question/List/List.vue';

import {
	isQuestion,
	getQuestionConditionChecker
} from 'modules/questionnaire/index.js';

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
		const activeItems = validItems.filter(item =>
			!isQuestion(item) || questionConditionMet(item)
		);

		const items = activeItems.map((item, index) => {
			let componentName = item.type === 'instruction'
				? 'questionnaire-instruction'
				: `question-${item.type}`;

			return h(componentName, {
				props: {
					readonly: this.readonly,
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
		TextQuestion,
		NumberQuestion,
		CheckboxQuestion,
		RadioQuestion,
		ListQuestion
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
