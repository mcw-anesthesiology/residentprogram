/** @format */

import { Line } from 'vue-chartjs';

function yearLabel(date) {
	return new Date(date).getFullYear();
}

export default {
	extends: Line,
	props: {
		reports: {
			type: Map,
			required: true
		},
		options: {
			type: Object
		},
		breakdown: {
			type: String,
			validator(val) {
				return ['publicationType'].includes(val);
			}
		},
		height: {
			default: null
		},
		width: {
			default: null
		},
		cssClasses: {
			default: 'yearly-chart'
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	},
	watch: {
		chartData(chartData) {
			this.renderChart(chartData, this.options);
		},
		options(options) {
			this.renderChart(this.chartData, options);
		}
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
		chartData() {
			const years = Array.from(this.yearPublications.keys());
			years.sort();

			const data = {
				labels: years.map(yearLabel),
				datasets: [{
					label: 'Total',
					data: years.map(y => this.getValue(this.yearPublications.get(y)))
				}]
			};

			switch (this.breakdown) {
				case 'publicationType': {
					const types = new Set(this.publications.map(p => p.publicationType));

					data.datasets.push(...Array.from(types.values()).map(type => ({
						label: type,
						data: years.map(year => this.getValue(this.yearPublications.get(year).filter(p => p.publicationType === 'type')))
					})));
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
	}
};
