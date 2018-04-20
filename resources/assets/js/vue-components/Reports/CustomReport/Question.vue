<template>
	<div class="report-question">
		<h3>{{ text }}</h3>

		<div v-if="options">
			<component :is="viewComponent"
				:options="options"
				:subjects="subjects" />
		</div>

		<div v-if="responses">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Subject</th>
						<th>Evaluation #</th>
						<th>Response</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(subjectResponses, subjectId) of responses">
						<tr>
							<th :rowspan="subjectResponses.length">
								{{ subjects.find(s => s.id == subjectId).full_name }}
							</th>
							<td>
								<a :href="`/evaluation/${subjectResponses[0].evaluation_id}`"
										target="_blank">
									{{ subjectResponses[0].evaluation_id }}
								</a>
							</td>
							<td>{{ subjectResponses[0].response }}</td>
						</tr>
						<tr v-for="subjectResponse of subjectResponses.slice(1)">
							<td>
								<a :href="`/evaluation/${subjectResponse.evaluation_id}`"
										target="_blank">
									{{ subjectResponse.evaluation_id }}
								</a>
							</td>
							<td>{{ subjectResponse.response }}</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
	.report-question {
		margin: 2em 0;
	}
</style>

<script>
import SubjectOptionsTable from './SubjectOptionsTable.vue';
import SubjectOptionsGrid from './SubjectOptionsGrid.vue';

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
			default: 'table',
			validate(view) {
				return [
					'grid',
					'table'
				].includes(view);
			}
		}
	},
	computed: {
		viewComponent() {
			switch (this.view) {
				case 'table':
					return SubjectOptionsTable;
				case 'grid':
				default:
					return SubjectOptionsGrid;
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
	}
};
</script>
