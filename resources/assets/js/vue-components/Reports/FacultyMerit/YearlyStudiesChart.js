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
		chartData() {
			const years = Array.from(this.yearStudies.keys());
			years.sort();

			const data = {
				labels: years.map(yearLabel),
				datasets: [
					{
						label: 'Total',
						data: years.map(y =>
							this.getValue(this.yearStudies.get(y))
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
	}
};
