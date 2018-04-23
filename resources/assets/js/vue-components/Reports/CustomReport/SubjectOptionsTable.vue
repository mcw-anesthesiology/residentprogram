<template>
	<table class="report-subject-table table table-striped">
		<thead>
			<tr>
				<th>Subject</th>
				<th v-for="option of options" class="text-right">
					{{ option.text }}
				</th>
				<th class="text-right">
					Total
				</th>
			</tr>
		</thead>
		<tbody>
			<subject-row v-for="subject of subjects" :key="subject.id"
				:subject="subject"
				:options="options" />
		</tbody>
		<tfoot>
			<tr>
				<th>Total</th>
			<template v-for="optionTotal of optionTotals">
				<td class="subject-table-cell">
					<span class="count">
						{{ optionTotal || '' }}
					</span>
					<span class="percent">
						{{
							(
								optionTotal && optionTotalTotal
								&& percent(optionTotal / optionTotalTotal)
							) || ''
						}}
					</span>
				</td>
			</template>
				<td class="total-cell">
					{{ optionTotalTotal }}
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<style scoped>
	.report-subject-table-container {
		overflow: auto;
	}
</style>

<style>
	.report-subject-table th,
	.report-subject-table td {
		padding: 0.5em 0.75em;
	}

	.report-subject-table td {
		text-align: right;
		border: 1px solid #ddd;
	}

	.report-subject-table td span {
		display: block;
	}

	.report-subject-table td .count,
	.report-subject-table .total-cell {
		font-size: 1.25em;
		/* font-weight: bold; */
	}

	.report-subject-table td .percent {
		font-size: 0.9em;
		color: rgba(0, 0, 0, 0.55);
	}

	.report-subject-table .total-cell {
		border-left-width: 2px;
	}

	.report-subject-table tfoot {
		border-top: 2px solid #d0d0d0;
		/* border-bottom: 2px solid #d0d0d0; */
	}

	.report-subject-table tfoot th,
	.report-subject-table tfoot td {
		border-bottom: none;
	}
</style>

<script>
import SubjectRow from './SubjectOptionsRow.vue';

import { percent } from '@/modules/formatters.js';

export default {
	props: {
		options: {
			type: Array,
			required: true
		},
		subjects: {
			type: Array,
			required: true
		}
	},
	computed: {
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
		SubjectRow
	}
};
</script>
