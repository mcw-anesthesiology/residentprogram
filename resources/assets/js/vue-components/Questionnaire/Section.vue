<script>
import QuestionnaireInstruction from './Instruction.vue';
import QuestionnaireQuestion from './Question/Question.vue';

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
		},
		conditionChecker: {
			type: Function,
			required: false
		}
	},

	render(h) {
		const validItems = this.items.filter(validItem);

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
				'questionnaire-section': true
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
