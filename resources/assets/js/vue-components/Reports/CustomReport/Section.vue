<template>
	<section class="report-section">
		<h2>{{ title }}</h2>
		<report-question v-for="(question, index) of questions" :key="index"
			v-bind="question" :subjects="subjects" />
	</section>
</template>

<script>
import ReportQuestion from './Question.vue';

export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		questions: {
			type: Array,
			required: true
		},
		subjects: {
			type: Array,
			required: true
		}
	},
	components: {
		ReportQuestion
	}
};
</script>
