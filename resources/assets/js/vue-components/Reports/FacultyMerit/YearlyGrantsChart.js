/** @format */

import { Line } from 'vue-chartjs';

import { ucfirst } from '@/modules/text-utils.js';

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
		breakdown: {
			type: String,
			validator(breakdown) {
				return ['agency', 'type'].includes(breakdown);
			}
		},
		unit: {
			type: String,
			validator(unit) {
				return ['#', '$'].includes(unit);
			},
			default: '#'
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
		yearGrants() {
			const map = new Map();

			for (const [key, reports] of this.reports.entries()) {
				map.set(key, reports.flatMap(r => r.grants));
			}

			return map;
		},
		grants() {
			return [].concat(...Array.from(this.yearGrants.values()));
		},
		chartData() {
			const years = Array.from(this.yearGrants.keys());
			years.sort();

			const data = {
				labels: years.map(yearLabel),
				datasets: [{
					label: `Total ${this.unit}`,
					data: years.map(l =>
						this.getReportsValue(this.yearGrants.get(l))
					)
				}]
			};

			switch (this.breakdown) {
				case 'agency': {
					const agencies = new Set(this.grants.map(r => r.agency));

					data.datasets.push(...Array.from(agencies.values()).map(
						agency => {
							return {
								label: `${agency} ${this.unit}`,
								data: years.map(year =>
									this.getReportsValue(
										this.yearGrants
										.get(year)
										.filter(r => r.agency === agency)
									)
								)
							};
						}
					));

					break;
				}
				case 'type': {
					const types = new Set(this.grants.map(r => r.type));
					data.datasets.push(...Array.from(types.values()).map(type => ({
						label: `${ucfirst(type.toLowerCase())} ${this.unit}`,
						data: years.map(year =>
							this.getReportsValue(
								this.yearGrants
								.get(year)
								.filter(r => r.type === type)
							)
						)
					})));
					break;
				}
			}

			data.datasets.forEach(d => {
				d.fill = false;
			});

			return data;
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
	}
};
