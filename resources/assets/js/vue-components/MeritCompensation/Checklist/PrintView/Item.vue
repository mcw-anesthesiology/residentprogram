<template>
	<table class="print-view-checklist-item">
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
	table {
		margin-left: 1em;
	}

	thead th {
		font-size: 1.15em;
		font-weight: normal;
	}

	tbody {
		margin-left: 1em;
		font-size: 0.85em;
	}
</style>
