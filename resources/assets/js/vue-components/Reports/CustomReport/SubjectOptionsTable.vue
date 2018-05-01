<template>
	<div>
		<div v-for="[trainingLevel, groupSubjects] of Array.from(sortedGroupedSubjects.entries())" class="panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">
					{{ renderTrainingLevel(trainingLevel) }}
				</span>
			</div>
			<div class="panel-body">
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
						<subject-row v-for="subject of groupSubjects" :key="subject.id"
							:subject="subject"
							:options="options" />
					</tbody>
					<tfoot>
						<tr>
							<th>Total</th>
							<template v-for="optionTotal of optionTotals(groupSubjects)">
								<td class="subject-table-cell">
									<span class="count">
										{{ optionTotal || '' }}
									</span>
									<span class="percent">
										{{
										(
										optionTotal && optionTotalTotal(groupSubjects)
										&& percent(optionTotal / optionTotalTotal(groupSubjects))
										) || ''
										}}
									</span>
								</td>
							</template>
							<td class="total-cell">
								{{ optionTotalTotal(groupSubjects) }}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
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
import { TRAINING_LEVEL_ORDER, renderTrainingLevel } from '@/modules/datatable-utils.js';

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
		groupedSubjects() {
			const groups = new Map();

			for (const subject of this.subjects) {
				const group = groups.get(subject.training_level) || new Set();
				group.add(subject);
				groups.set(subject.training_level, group);
			}

			return groups;
		},
		sortedGroupedSubjects() {
			const arr = Array.from(this.groupedSubjects.entries()).map(([trainingLevel, group]) =>
				([trainingLevel, Array.from(group.values()).sort((a, b) => {
					if (a.full_name < b.full_name)
						return -1;
					if (a.full_name > b.full_name)
						return 1;
					return 0;
				})]));

			arr.sort(([trainingLevelA, _g1], [trainingLevelB, _g2]) =>
				TRAINING_LEVEL_ORDER.indexOf(trainingLevelA) - TRAINING_LEVEL_ORDER.indexOf(trainingLevelB)
			)

			return new Map(arr);
		}
	},
	methods: {
		percent,
		renderTrainingLevel,
		optionTotals(subjects) {
			return this.options.map(option =>
				this.sum(Object.entries(option.responses).filter(([subjectId, _]) =>
					// eslint-disable-next-line eqeqeq
					subjects.some(s => s.id == subjectId)
				).map(([_, responses]) => responses))
			);
		},
		optionTotalTotal(subjects) {
			return this.sum(this.optionTotals(subjects));
		},
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
