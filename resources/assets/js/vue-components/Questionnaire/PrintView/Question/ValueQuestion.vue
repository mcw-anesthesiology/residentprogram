<template>
	<div class="print-view-value-question">
		<p class="question-text">{{ text }}</p>
		<span class="value">{{ value }}</span>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		value: {
			type: String,
			default: ''
		}
	}
};
</script>

<style scoped>
	.print-view-value-question {
		page-break-inside: avoid;
	}

	.question-text, .value {
		padding: 0.5em;
	}

	.question-text {
		font-weight: bold;
	}

	.value {
		padding-left: 1em;
	}

	@media (min-width: 768px) {
		.value {
			padding-left: 5em;
		}
	}
</style>
