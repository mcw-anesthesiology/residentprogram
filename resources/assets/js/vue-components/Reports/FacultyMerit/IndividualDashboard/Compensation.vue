<template>
	<section class="individual-merit-dashboard-section individual-merit-dashboard-compensation">
		<section v-if="includeCompensation && providerInfo" class="comp-productivity">
			<h2>Compensation</h2>
			<table class="productivity">
				<tbody>
					<tr>
						<th>Total Units</th>
						<td>{{ providerInfo.totalUnits && decimal(providerInfo.totalUnits) }}</td>
					</tr>
					<tr>
						<th>Clinical FTE</th>
						<td>{{ providerInfo.clinicalFTE && decimal(providerInfo.clinicalFTE) }}</td>
					</tr>
				</tbody>
			</table>
			<table class="compensation">
				<tbody>
					<tr>
						<th>Base salary</th>
						<td>{{ providerInfo.baseSalary && currency(providerInfo.baseSalary) }}</td>
					</tr>
					<tr>
						<th>
							<span class="avoid-break">Incentive /</span>
							<span class="avoid-break">Premium pay</span>
						</th>
						<td>{{ providerInfo.premiumPay && currency(providerInfo.premiumPay) }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>Total compensation</th>
						<td>{{ providerInfo.totalPay && currency(providerInfo.totalPay) }}</td>
					</tr>
				</tfoot>
			</table>
		</section>

		<section>
			<h2>Education metrics</h2>
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
						<th>Overall teaching score</th>
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
	</section>
</template>

<style scoped>
.individual-merit-dashboard-compensation {
	display: flex;
	margin: 0 -0.5em;
}

.individual-merit-dashboard-compensation > section {
	margin: 0 0.5em;
	flex-basis: 75%;
	flex-shrink: 1;
}

table {
	width: 100%;
	font-size: 1em;
	margin-bottom: 2em;
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
	width: 60%;
	font-weight: bold;
}

td {
	width: 40%;
	text-align: right;
	font-family: monospace;
	color: '#111';
}

tfoot {
	border-top: 2px solid #ddd;
}

.avoid-break {
	break-inside: avoid;
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

import { currency, percent, decimal } from '@/modules/formatters.js';

export default {
	extends: DashboardSection,
	props: {
		includeCompensation: {
			type: Boolean,
			default: false
		},
		providerInfo: {
			type: Object,
			required: false
		}
	},
	computed: {
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
