<script>
import ValueQuestion from './ValueQuestion.vue';
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
		let type = (this.question.type === 'list')
			? 'list'
			: 'value';

		return h(`${type}-question`, {
			...this.question
		});
	},

	components: {
		ValueQuestion,
		ListQuestion
	}
};
</script>
