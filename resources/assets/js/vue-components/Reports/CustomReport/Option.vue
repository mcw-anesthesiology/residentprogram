<template>
	<div class="report-option">
		<h3>{{ text }}</h3>
		<report-response v-for="(response, index) of responses" :key="index"
			v-bind="response" />
	</div>
</template>

<script>
import ReportOption from './Option.vue';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		responses: {
			type: Array,
			required: true
		},
		subjects: {
			type: Array,
			required: true
		}
	},
	components: {
		ReportOption
	}
};
</script>
