<template>
	<div v-if="chartData" class="case-log-summary">
		<h3>{{ title }}</h3>

		<div class="chart-container">
			<chartjs-chart type="doughnut"
				:data="chartData" :options="chartOptions" />
			<img v-if="chartImg" :src="chartImg" alt="" />
		</div>

		<table class="table table-striped">
			<thead>
				<tr>
					<th>Response</th>
					<th>Times selected</th>
					<th>Percentage</th>
				</tr>
			</thead>
			<tbody v-if="currentSummaryCountsValues">
				<tr v-for="{response, color, count} of summaryDataEntries"
						:key="response">
					<td>
						<span class="color-square"
							:style="{backgroundColor: color}">
						</span>
						{{ response }}
					</td>
					<td>{{ count }}</td>
					<td>{{ (100 * (count / numTotalCaseLogs)).toFixed() }}%</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th>Total responses</th>
					<td>{{ currentTotalCount }}</td>
					<td></td>
				</tr>
				<tr>
					<th>Total cases</th>
					<td>{{ numTotalCaseLogs.length }}</td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<style scoped>
	.case-log-summary {
		page-break-inside: avoid;
	}

	.color-square {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		vertical-align: middle;
	}

	.table-striped > tfoot {
		border-top: 2px solid #ddd;
	}

	img {
		max-width: 100%;
		width: 100%;
		display: none;
	}

	@media print {
		.chart-container >>> .chartjs-chart {
			display: none;
		}

		img {
			display: block;
		}
	}
</style>

<script>
import Color from 'color';

import ChartjsChart from '#/ChartjsChart.vue';

import { getColors } from '@/modules/chart-utils.js';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		currentSummaryCounts: {
			type: Map,
			required: true
		},
		numTotalCaseLogs: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			chartImg: null
		};
	},
	computed: {
		chartOptions() {
			return {
				animation: {
					onComplete: ({ chart }) => {
						this.chartImg = chart.toBase64Image();
					}
				}
			};
		},
		currentTotalCount() {
			if (!this.currentSummaryCounts)
				return;

			return Array.from(this.currentSummaryCounts.values())
				.reduce((sum, val) => sum + val, 0);
		},
		currentSummaryCountsValues() {
			if (!this.currentSummaryCounts)
				return;

			const counts = [];
			const responses = [];

			for (const [response, count] of this.currentSummaryCounts.entries()) {
				counts.push(count);
				responses.push(response);
			}

			const colors = getColors(counts.length);

			return {
				counts,
				responses,
				colors
			};
		},
		summaryDataEntries() {
			if (!this.currentSummaryCountsValues)
				return;

			const entries = [];
			const { counts, responses, colors } = this.currentSummaryCountsValues;

			for (let i = 0; i < counts.length; i++) {
				entries.push({
					count: counts[i],
					response: responses[i],
					color: colors[i]
				});
			}

			return entries;
		},
		chartData() {
			if (!this.currentSummaryCountsValues)
				return;

			const { counts, responses, colors } = this.currentSummaryCountsValues;

			return {
				datasets: [{
					label: this.title,
					backgroundColor: colors,
					borderColor: colors.map(color => Color(color).darken(0.1)),
					data: counts
				}],
				labels: responses
			};
		}
	},
	components: {
		ChartjsChart,
	}
};
</script>
