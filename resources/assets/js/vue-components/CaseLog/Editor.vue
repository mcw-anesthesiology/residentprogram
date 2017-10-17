<template>
	<div class="container body-block">
		<questionnaire-questionnaire :title="title"
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
			title: this.detailsSchema.schema
				? this.detailsSchema.schema.title || ''
				: '',
			sections: this.detailsSchema.schema
				? this.detailsSchema.schema.sections || []
				: []
		};
	},

	mounted() {

	},

	methods: {
		handleInput({sections}) {
			this.sections = sections;
		}
	},

	components: {
		QuestionnaireQuestionnaire
	}
};
</script>
