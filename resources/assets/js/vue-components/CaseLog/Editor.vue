<template>
	<div>
		<queestionnaire-questionnaire :title="title"
			:sections="sections"
			@input="handleInput"/>
	</div>
</template>

<script>
import QuestionnaireQuestionnaire from '../Questionnaire/Questionnaire.vue';

export default {
	props: {
		detailsSchema: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			title: this.detailsSchema.title || '',
			sections: this.detailsSchema.sections
		};
	},

	mounted() {

	},

	methods: {
		handleInput(sections) {
			this.sections = sections;
		}
	},

	components: {
		QuestionnaireQuestionnaire
	}
};
</script>
