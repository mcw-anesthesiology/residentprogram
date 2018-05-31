<template>
	<div class="print-view-radio-checkbox-question">
		<p class="question-text">{{ text }}</p>
		<ul v-if="type === 'checkbox'">
			<li v-for="(option, index) of checkedOptions" :key="index">
				{{ option.text }}
			</li>
		</ul>
		<p v-else class="value">{{ selectedOptionText }}</p>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return ['radio', 'checkbox'].includes(type);
			}
		},
		text: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},

	computed: {
		checkedOptions() {
			return this.options.filter(option => option.checked);
		},
		selectedOptionText() {
			return (this.checkedOptions.length > 0)
				? this.checkedOptions[0].text
				: '';
		}
	}
};
</script>

<style scoped>
	.print-view-radio-checkbox-question {
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
