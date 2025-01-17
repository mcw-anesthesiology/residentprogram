<template>
	<div class="report-question panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">{{ text }}</h3>
		</div>

		<component v-if="options"
			:is="viewComponent"
			:options="options"
			:subjects="subjects" />

		<QuestionResponses v-if="responses"
			:responses="responses"
			:subjects="subjects" />
	</div>
</template>

<style scoped>
	h3 {
		font-size: 2em;
	}

	.report-question {
		margin: 2em 0;
		page-break-inside: avoid;
	}
</style>

<script>
import QuestionResponses from './QuestionResponses.vue';
import SubjectOptionsTable from './SubjectOptionsTable.vue';
import SubjectOptionsGrid from './SubjectOptionsGrid.vue';
import CustomFormQuestion from './FormQuestion.vue';

import { percent } from '@/modules/formatters.js';

export default {
	props: {
		text: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: false
		},
		responses: {
			type: Object,
			required: false
		},
		subjects: {
			type: Array,
			required: true
		},
		view: {
			type: String,
			default: 'form',
			validate(view) {
				return [
					'grid',
					'table',
					'form'
				].includes(view);
			}
		}
	},
	computed: {
		viewComponent() {
			switch (this.view) {
				case 'grid':
					return SubjectOptionsGrid;
				case 'form':
					if (this.subjects.length === 1)
						return CustomFormQuestion;
					// eslint-disable-next-line no-fallthrough
				case 'table':
				default:
					return SubjectOptionsTable;
			}
		},
		optionTotals() {
			return this.options.map(option =>
				this.sum(Object.values(option.responses))
			);
		},
		optionTotalTotal() {
			return this.sum(this.optionTotals);
		}
	},
	methods: {
		percent,
		sum(arr) {
			if (!arr)
				return 0;

			return arr.reduce((total, option) => total + option, 0);
		},
		getResponsesTotal(responses) {
			if (!responses)
				return;

			return Object.values(responses);
		}
	},
	components: {
		QuestionResponses
	}
};
</script>
