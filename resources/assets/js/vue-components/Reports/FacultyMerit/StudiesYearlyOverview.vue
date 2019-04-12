<template>
	<section class="form-inline">
		<figure>
			<line-chart :data="chartData" />
			<legend>Studies</legend>
		</figure>

		<chart-data-table :data="chartData" />
	</section>
</template>

<script>
/** @format */

import { LineChart } from '@/vue-mixins/Chart.js';
import ChartDataTable from '#/ChartDataTable.vue';

function yearLabel(date) {
	return new Date(date).getFullYear();
}

export default {
	props: {
		reports: {
			type: Map,
			required: true
		}
	},
	computed: {
		yearStudies() {
			const map = new Map();

			for (const [key, reports] of this.reports.entries()) {
				map.set(key, reports.flatMap(r => r.studies));
			}

			return map;
		},
		studies() {
			return [].concat(...Array.from(this.yearStudies.values()));
		},
		yLabel() {
			return '# Studies';
		},
		chartData() {
			const data = {
				labels: Array.from(this.yearStudies.keys()).map(yearLabel),
				datasets: [
					{
						label: 'Total',
						data: Array.from(this.yearStudies.values()).map(
							this.getValue
						)
					}
				]
			};

			return data;
		}
	},
	methods: {
		getValue(studies = []) {
			return studies.length;
		}
	},
	components: {
		LineChart,
		ChartDataTable
	}
};
</script>
