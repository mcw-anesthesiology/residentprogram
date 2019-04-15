<template>
    <section class="form-inline">
		<h2>Grants</h2>
        <label class="containing-label">
            Breakdown
            <select v-model="breakdown" class="form-control">
                <option value=""></option>
                <option value="agency">Agency</option>
                <option value="type">Type</option>
            </select>
        </label>
        <label class="containing-label">
            Unit
            <select v-model="unit" class="form-control">
                <option>#</option>
                <option>$</option>
            </select>
        </label>
        <figure>
            <line-chart :data="chartData" :options="chartOptions" :y-label="yLabel" />
            <legend>Grants</legend>
        </figure>
        <chart-data-table :data="chartData" :value-formatter="valueFormatter" />
    </section>
</template>

<style>
figure legend {
	border: none;
	text-align: center;
}
</style>

<script>
/** @format */
import { LineChart } from '@/vue-mixins/Chart.js';
import ChartDataTable from '#/ChartDataTable.vue';

import { currency } from '@/modules/formatters.js';
import { ucfirst } from '@/modules/text-utils.js';

export default {
	props: {
		reports: {
			type: Map,
			required: true
		},
		formatKey: {
			type: Function,
			required: true
		}
	},
	data() {
		return {
			breakdown: 'type',
			unit: '#'
		};
	},
	computed: {
		yearGrants() {
			const map = new Map();

			for (const [key, reports] of this.reports.entries()) {
				map.set(key, reports.flatMap(r => r.grants));
			}

			return map;
		},
		grants() {
			return Array.from(this.yearGrants.values()).flat();
		},
		yLabel() {
			return this.unit === '$' ? 'Dollars' : 'Grants';
		},
		chartData() {
			const data = {
				labels: Array.from(this.yearGrants.keys()).map(this.formatKey),
				datasets: [
					{
						label: 'Total',
						data: Array.from(this.yearGrants.values()).map(l =>
							this.getReportsValue(l)
						)
					}
				]
			};

			switch (this.breakdown) {
				case 'agency': {
					const agencies = new Set(this.grants.map(r => r.agency));

					data.datasets.push(
						...Array.from(agencies.values()).map(agency => {
							return {
								label: agency,
								data: Array.from(this.yearGrants.values()).map(
									grants =>
										this.getReportsValue(
											grants.filter(
												r => r.agency === agency
											)
										)
								)
							};
						})
					);

					break;
				}
				case 'type': {
					const types = new Set(this.grants.map(r => r.type));
					data.datasets.push(
						...Array.from(types.values()).map(type => ({
							label: ucfirst(type.toLowerCase()),
							data: Array.from(this.yearGrants.values()).map(
								grants =>
									this.getReportsValue(
										grants.filter(r => r.type === type)
									)
							)
						}))
					);
					break;
				}
			}

			return data;
		},
		chartOptions() {
			if (this.unit === '$') {
				return {
					tooltips: {
						callbacks: {
							label: tooltipItem => {
								const label =
									this.chartData.datasets[
										tooltipItem.datasetIndex
									].label || '';

								return `${label}: ${currency(
									tooltipItem.yLabel
								)}`;
							}
						}
					},
					scales: {
						yAxes: [
							{
								ticks: {
									callback: currency
								}
							}
						]
					}
				};
			}
		},
		valueFormatter() {
			if (this.unit === '$') {
				return currency;
			}
		}
	},
	methods: {
		getReportsValue(grants = []) {
			switch (this.unit) {
				case '$':
					return grants.reduce((acc, grant) => acc + grant.amount, 0);
				case '#':
				default:
					return grants.length;
			}
		}
	},
	components: {
		LineChart,
		ChartDataTable
	}
};
</script>
