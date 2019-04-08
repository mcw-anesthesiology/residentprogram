<template>
	<div class="reports-yearly-overview">
		<div class="charts-container">
			<section class="form-inline">
				<label class="containing-label">
					Breakdown
					<select v-model="grantsBreakdown" class="form-control">
						<option value=""></option>
						<option value="agency">Agency</option>
						<option value="type">Type</option>
					</select>
				</label>
				<label class="containing-label">
					Unit
					<select v-model="grantsUnit" class="form-control">
						<option>#</option>
						<option>$</option>
					</select>
				</label>
				<figure>
					<yearly-grants-chart :options="options" :reports="yearReports" :breakdown="grantsBreakdown" :unit="grantsUnit" />
					<legend>Grants</legend>
				</figure>
			</section>

			<section class="form-inline">
				<label class="containing-label">
					Breakdown
					<select v-model="publicationsBreakdown" class="form-control">
						<option value=""></option>
						<option value="publicationType">Publication type</option>
					</select>
				</label>
				<figure>
					<yearly-publications-chart :options="options" :reports="yearReports" :breakdown="publicationsBreakdown" />
					<legend>Publications</legend>
				</figure>
			</section>

			<section class="form-inline">
				<figure>
					<yearly-studies-chart :options="options" :reports="yearReports" />
					<legend>Studies</legend>
				</figure>
			</section>
		</div>
	</div>
</template>

<style>
.charts-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.charts-container section {
	flex-basis: 500px;
	flex-grow: 1;
	margin: 1em;
	min-width: 0;
	min-height: 0;
}

figure legend {
	border: none;
	text-align: center;
}
</style>

<script>
import YearlyGrantsChart from './YearlyGrantsChart.js';
import YearlyPublicationsChart from './YearlyPublicationsChart.js';
import YearlyStudiesChart from './YearlyStudiesChart.js';

export default {
	props: {
		reports: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			grantsBreakdown: 'type',
			grantsUnit: '#',

			publicationsBreakdown: 'publicationType',
		};
	},
	computed: {
		yearKeys() {
			const starts = Array.from(new Set(this.reports.map(r => r.period_start)).values());
			starts.sort();

			return starts;
		},
		yearReports() {
			const map = new Map();

			for (const start of this.yearKeys) {
				map.set(start, []);
			}

			for (const report of this.reports) {
				map.get(report.period_start).push(report);
			}

			return map;
		},
		options() {
			const padding = 5;

			return {
				responsive: true,
				aspectRatio: 2,
				scales: {
					yAxes: [
						{
							ticks: {
								precision: 0,
								beginAtZero: true,
								padding
							}
						}
					],
					xAxes: [
						{
							ticks: {
								padding
							}
						}
					]
				}
			};
		}
	},
	components: {
		YearlyGrantsChart,
		YearlyPublicationsChart,
		YearlyStudiesChart
	}
};
</script>
