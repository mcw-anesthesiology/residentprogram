<script>
import TextQuestion from './Text.vue';
import NumberQuestion from './Number.vue';
import SelectQuestion from './Select.vue';
import CheckboxQuestion from './Checkbox.vue';
import RadioQuestion from './Radio.vue';
import ListQuestion from './List/List.vue';

export default {
	model: {
		prop: 'question'
	},
	props: {
		question: {
			type: Object,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		conditionMet: {
			type: Boolean,
			default: false
		}
	},

	render(h) {
		let type = (this.question.type === 'textarea')
			? 'text'
			: this.question.type;

		let questionComponent = `${type}-question`;

		let style = {};
		if (this.question.condition && !this.conditionMet)
			style.display = 'none';

		return h(questionComponent, {
			props: {
				readonly: this.readonly,
				showErrors: this.showErrors,
				...this.question
			},
			style,
			on: {
				input: question => {
					this.$emit('input', question);
				}
			}
		});
	},

	components: {
		TextQuestion,
		NumberQuestion,
		SelectQuestion,
		CheckboxQuestion,
		RadioQuestion,
		ListQuestion
	}
};
</script>
