<script>
import ValueQuestion from './ValueQuestion.vue';
import RadioCheckboxQuestion from './RadioCheckboxQuestion.vue';
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
		let type = 'value';
			if (this.question.type === 'list')
				type = 'list';
			else if (['radio', 'checkbox'].includes(this.question.type))
				type = 'radio-checkbox';

		return h(`${type}-question`, {
			props: this.question
		});
	},

	components: {
		ValueQuestion,
		RadioCheckboxQuestion,
		ListQuestion
	}
};
</script>
