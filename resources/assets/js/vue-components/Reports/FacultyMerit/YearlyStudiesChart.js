/** @format */

import { LineChart } from '@/vue-mixins/Chart.js';

function yearLabel(date) {
	return new Date(date).getFullYear();
}

export default {
	extends: LineChart,
	props: {
		reports: {
			type: Map,
			required: true
		},
		cssClasses: {
			default: 'yearly-chart'
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
