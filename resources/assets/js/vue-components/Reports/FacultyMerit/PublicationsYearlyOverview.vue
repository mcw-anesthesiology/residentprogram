<template>
	<section class="form-inline">
		<h2>Publications</h2>
		<label class="containing-label">
			Breakdown
			<select v-model="breakdown" class="form-control">
				<option value=""></option>
				<option value="publicationType">Publication type</option>
			</select>
		</label>
		<figure>
			<line-chart :data="chartData" />
			<legend>Publications</legend>
		</figure>
		<chart-data-table :data="chartData" />
	</section>
</template>

<script>
/** @format */
import { LineChart } from '@/vue-mixins/Chart.js';
import ChartDataTable from '#/ChartDataTable.vue';

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
			breakdown: 'publicationType'
		};
	},
	computed: {
		yearPublications() {
			const map = new Map();

			for (const [key, reports] of this.reports.entries()) {
				map.set(key, reports.flatMap(r => r.publications));
			}

			return map;
		},
		publications() {
			return [].concat(...Array.from(this.yearPublications.values()));
		},
		yLabel() {
			return '# Publications';
		},
		chartData() {
			const data = {
				labels: Array.from(this.yearPublications.keys()).map(
					this.formatKey
				),
				datasets: [
					{
						label: 'Total',
						data: Array.from(this.yearPublications.values()).map(
							this.getValue
						)
					}
				]
			};

			switch (this.breakdown) {
				case 'publicationType': {
					const types = new Set(
						this.publications.map(p => p.publicationType)
					);

					data.datasets.push(
						...Array.from(types.values()).map(type => ({
							label: type,
							data: Array.from(
								this.yearPublications.values()
							).map(publications =>
								this.getValue(
									publications.filter(
										p => p.publicationType === type
									)
								)
							)
						}))
					);
					break;
				}
			}

			return data;
		}
	},
	methods: {
		getValue(publications = []) {
			return publications.length;
		}
	},
	components: {
		LineChart,
		ChartDataTable
	}
};
</script>
