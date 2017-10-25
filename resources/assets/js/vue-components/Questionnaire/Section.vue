<script>
import QuestionnaireInstruction from './Instruction.vue';
import QuestionnaireQuestion from './Question/Question.vue';

import { isValidItem } from '@/modules/questionnaire/index.js';

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
		direction: {
			type: String,
			default: 'vertical',
			validator(direction) {
				return [
					'vertical',
					'horizontal'
				].includes(direction);
			}
		},
		readonly: {
			type: Boolean,
			default: false
		},
		helpClass: {
			type: String,
			required: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		conditionChecker: {
			type: Function,
			required: false
		}
	},

	render(h) {
		const validItems = this.items.filter(isValidItem);

		const items = validItems.map((item, index) => {
			let componentName = item.type === 'instruction'
				? 'questionnaire-instruction'
				: 'questionnaire-question';
			let props = componentName === 'questionnaire-question'
				? {question: item}
				: {...item};

			return h(componentName, {
				props: {
					readonly: this.readonly,
					showErrors: this.showErrors,
					helpClass: this.helpClass,
					conditionMet: item.condition && this.conditionChecker(item.condition),
					...props
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
			items.unshift(h('h2', this.title));

		return h('section', {
			class: {
				page: this.page,
				'questionnaire-section': true,
				'direction-horizontal': this.direction === 'horizontal'
			}
		}, items);
	},

	components: {
		QuestionnaireInstruction,
		QuestionnaireQuestion
	}
};
</script>

<style scoped>
	.questionnaire-section.direction-horizontal {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
