<template>
			<section class="form-inline">
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

function yearLabel(date) {
	return new Date(date).getFullYear();
}

export default {
	props: {
		reports: {
			type: Map,
			required: true
		},
		years: {
			type: Array,
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
				labels: this.years.map(yearLabel),
				datasets: [
					{
						label: 'Total',
						data: this.years.map(y =>
							this.getValue(this.yearPublications.get(y))
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
							data: this.years.map(year =>
								this.getValue(
									this.yearPublications
										.get(year)
										.filter(
											p => p.publicationType === 'type'
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
