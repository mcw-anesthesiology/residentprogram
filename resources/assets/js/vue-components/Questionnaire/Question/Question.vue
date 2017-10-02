<script>
import TextQuestion from './Text.vue';
import NumberQuestion from './Number.vue';
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
		}
	},

	render(h) {
		let type = (this.question.type === 'textarea')
			? 'text'
			: this.question.type;

		let questionComponent = `${type}-question`;

		return h(questionComponent, {
			props: {
				readonly: this.readonly,
				showErrors: this.showErrors,
				...this.question
			},
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
		CheckboxQuestion,
		RadioQuestion,
		ListQuestion
	}
};
</script>
