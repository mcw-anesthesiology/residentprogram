<template>
	<section class="individual-merit-dashboard-section individual-merit-dashboard-compensation">
		<h2 class="compensation">Compensation</h2>
		<table class="compensation">
			<tbody>
				<tr>
					<th>Base salary</th>
					<td>{{ currency(compensation.baseSalary) }}</td>
				</tr>
				<tr>
					<th>Incentive / premium pay</th>
					<td>{{ currency(compensation.incentive) }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th>Total compensation</th>
					<td>{{ currency(totalCompensation) }}</td>
				</tr>
			</tfoot>
		</table>

		<h2 class="productivity">Clinical productivity</h2>
		<table class="productivity">
			<tbody>
				<tr>
					<th>Total Units</th>
					<td>{{ clinicalProductivity.anesthesiaUnits }}</td>
				</tr>
				<tr>
					<th>Clinical FTE</th>
					<td>{{ clinicalProductivity.fte }}</td>
				</tr>
			</tbody>
		</table>

		<h2 class="eval-metrics">Evaluation metrics</h2>
		<table class="eval-metrics">
			<tbody>
				<tr>
					<th>Evaluations completed</th>
					<td>{{ user.evaluatorEvaluations.length }}</td>
				</tr>
				<tr>
					<th>Lectures given</th>
					<td>{{ numLectures }}</td>
				</tr>
				<tr>
					<th>Continue to train</th>
					<td v-if="user.continueToTrain.num > 0">
						{{ percent(user.continueToTrain.withValue.percent) }}
						({{ user.continueToTrain.withValue.num }}/{{ user.continueToTrain.num }})
					</td>
					<td v-else></td>
				</tr>
				<tr>
					<th>Overall abilities</th>
					<td v-if="user.overallAbilities.num > 0">
						{{ decimal(user.overallAbilities.withNumericValues.average) }}

						&plusmn;{{
							decimal(
								user.overallAbilities.withNumericValues.stdDev
							)
						}}
					</td>
					<td v-else></td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<style scoped>
.individual-merit-dashboard-compensation {
	display: grid;
	grid-template-columns: 3;
	grid-template-rows: 2;
	align-items: start;
	grid-column-gap: 1em;
}

.compensation {
	grid-column: 1 / span 1;
}

.productivity {
	grid-column: 2 / span 1;
}

.eval-metrics {
	grid-column: 3 / span 1;
}

h2 {
	grid-row: 1 / span 1;
}

table {
	grid-row: 2 / span 1;
	font-size: 1em;
	margin-bottom: 1em;
	border-collapse: collapse;
}

tr:hover {
	background: #f3f3f3;
}

th,
td {
	border: 1px solid #ddd;
	padding: 0.25em 0.5em;
}

th {
	font-weight: bold;
}

td {
	text-align: right;
	font-family: monospace;
	color: '#111';
	font-size: 0.825em;
}

tfoot {
	border-top: 2px solid #ddd;
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

import { currency, percent, decimal } from '@/modules/formatters.js';

export default {
	extends: DashboardSection,
	props: {
		compensation: {
			type: Object,
			default() {
				return {
					baseSalary: 0,
					incentive: 0
				};
			}
		},
		clinicalProductivity: {
			type: Object,
			default() {
				return {
					anesthesiaUnits: 0,
					wrvus: 0,
					fte: 0
				};
			}
		}
	},
	computed: {
		totalCompensation() {
			return this.compensation.baseSalary + this.compensation.incentive;
		},
		numLectures() {
			return this.user.meritReports.map(mr => mr.lectures.length).reduce((sum, val) => sum + val, 0);
		}
	},
	methods: {
		currency,
		percent,
		decimal
	}
};
</script>
