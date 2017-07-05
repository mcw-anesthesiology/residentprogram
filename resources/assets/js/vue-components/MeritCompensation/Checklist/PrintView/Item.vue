<template>
	<table>
		<thead>
			<tr>
				<th v-html="markedUpText"></th>
			</tr>
		</thead>
		<tbody>
			<print-view-question v-for="question of questions"
				:question="question" />
		</tbody>
	</table>
</template>

<script>
import PrintViewQuestion from 'vue-components/Questionnaire/PrintView/Question/Question.vue';

import snarkdown from 'snarkdown';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		questions: {
			type: Array,
			required: false
		}
	},

	computed: {
		markedUpText() {
			return snarkdown(this.text);
		}
	},

	components: {
		PrintViewQuestion
	}
};
</script>

<style scoped>
	.checklist-item {
		padding-bottom: 0.25em;
		margin-bottom: 0.75em;
		border-bottom: 1px solid transparent;
		color: rgba(0, 0, 0, 0.5);
	}

	.checklist-item:hover {
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}

	.checklist-item.editable:hover {
		color: rgba(0, 0, 0, 0.95);
	}

	.checklist-item.checked {
		color: rgba(0, 0, 0, 0.85);
	}

	label {
		display: flex;
		font-size: 1.25em;
	}

	input[type="checkbox"] {
		width: 1em;
		height: 1em;
		margin-right: 1em;
		flex-shrink: 0;
	}

	.item-text {
		font-weight: normal;
	}

	.item-questions {
		margin-left: 3em;
		padding: 1em;
	}

	@media (min-width: 768px) {
		label {
			font-size: 1.35em;
		}

		input[type="checkbox"] {
			margin-right: 1.5em;
		}

		.item-questions {
			margin-left: 4em;
		}
	}

	@media (min-width: 1200px) {
		label {
			font-size: 1.5em;
		}

		input[type="checkbox"] {
			margin-right: 2em;
		}

		.item-questions {
			margin-left: 5em;
		}
	}
</style>
