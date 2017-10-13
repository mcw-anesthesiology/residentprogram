<template>
	<div>
		{{ title }}
		<questionnaire-section v-for="(section, index) of sections" :key="index"
			:items="section.items" />
	</div>
</template>

<script>
import QuestionnaireSection from './Section.vue';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		sections: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		QuestionnaireSection
	}
};
</script>

<style>
	.question-description {
		color: rgba(0, 0, 0, 0.65);
	}
</style>
