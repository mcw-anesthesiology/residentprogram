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
		helpClass: {
			type: String,
			required: false
		},
		conditionMet: {
			type: Boolean,
			default: false
		},
		previewing: {
			type: Boolean,
			default: false
		}
	},

	beforeMount() {
		if (this.previewing && this.question.type === 'list' &&
			(
				!this.question.items || !this.question.items.length
			)
		)
			this.question.items = [
				{
					type: this.question.listType,
					...this.question.itemProps
				}
			];
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
				helpClass: this.helpClass,
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
