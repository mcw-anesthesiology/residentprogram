<template>
	<section class="individual-merit-dashboard-section individual-merit-dashboard-compensation">
		<section>
			<h2>Compensation</h2>
			<table>
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
		</section>
		<section>
			<h2>Clinical productivity</h2>
			<table>
				<tbody>
					<tr>
						<th>Total Anesthesia Units</th>
						<td>{{ clinicalProductivity.anesthesiaUnits }}</td>
					</tr>
					<tr>
						<th>Total wRVUs</th>
						<td>{{ clinicalProductivity.wrvus }}</td>
					</tr>
					<tr>
						<th>Total Clinical FTE</th>
						<td>{{ clinicalProductivity.fte }}</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section>
			<h2>Evaluation metrics</h2>
			<table>
				<tbody>
					<tr>
						<th>Evaluations completed</th>
						<td>{{ user.evaluatorEvaluations.length }}</td>
					</tr>
					<tr>
						<th>Lectures given</th>
						<td>{{ numLectures }}</td>
					</tr>
				</tbody>
			</table>
		</section>
	</section>
</template>

<style scoped>
.individual-merit-dashboard-compensation {
	display: flex;
	justify-content: space-around;
}

.individual-merit-dashboard-compensation > section {
	margin: 0 0.5em;
}

table {
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
	padding: 0.5em 1em;
}

th {
	font-weight: bold;
}

td {
	text-align: right;
	font-family: monospace;
	color: '#111';
}

tfoot {
	border-top: 2px solid #ddd;
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

import { currency } from '@/modules/formatters.js';

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
		currency
	}
};
</script>
