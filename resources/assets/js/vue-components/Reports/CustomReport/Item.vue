<template>
	<div class="report-item">
		<h3>{{ text }}</h3>
		<report-question v-for="(question, index) of questions" :key="index"
			v-bind="question" :subjects="subjects" />
	</div>
</template>

<script>
import ReportQuestion from './Question.vue';

export default {
	props: {
		text: {
			type: String,
			required: true
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
