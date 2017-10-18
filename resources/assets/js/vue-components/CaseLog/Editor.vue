<template>
	<div class="container body-block">
		<div class="case-log-editor">
			<questionnaire-questionnaire :title="title"
				:sections="sections"
				@input="handleInput"/>
		</div>
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

<style>
	.case-log-editor .questionnaire-section {
		margin: 2em 0;
		padding: 1em;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.case-log-editor .checkbox-question {
		font-size: 1em;
	}
</style>
