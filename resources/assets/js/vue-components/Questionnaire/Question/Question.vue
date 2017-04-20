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
		}
	},
	
	render(h) {
		let type;
		if (this.question.type === 'textarea')
			type = 'text';
		else
			type = this.question.type;
		
		let questionComponent = `${type}-question`;
		
		return h(questionComponent, {
			props: {
				...this.question
			},
			on: {
				input(question) {
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
