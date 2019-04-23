/** @format */

import merge from 'deepmerge';

import { Bar, HorizontalBar, Line } from 'vue-chartjs';

const Chart = {
	props: {
		height: {
			default: null
		},
		width: {
			default: null
		},
		styleDatasets: {
			default: true
		},
		data: {
			type: Object,
			default: () => {}
		},
		options: {
			type: Object,
			default: () => {}
		}
	},
	mounted() {
		this.renderTransformedChart();
	},
	watch: {
		transformedChartData: 'renderTransformedChart',
		transformedOptions: 'renderTransformedChart'
	},
	computed: {
		chartData() {
			return this.data;
		},
		chartOptions() {
			return (
				this.options || {
					legend: {
						position: 'bottom'
					}
				}
			);
		},
		transformedChartData() {
			if (!this.styleDatasets) return this.chartData;

			return {
				...this.chartData,
				datasets: this.chartData.datasets.map(colorDataset)
			};
		},
		transformedOptions() {
			return this.chartOptions;
		}
	},
	methods: {
		renderTransformedChart() {
			this.renderChart(
				this.transformedChartData,
				this.transformedOptions
			);
		}
	}
};

export default Chart;

const POINT_STYLES = [
	'circle',
	'triangle',
	'square',
	'star',
	'cross',
	'dash',
	'line',
	'rect'
];

const COLORS = [
	'255, 206, 86',
	'255, 99, 132',
	'127, 219, 255',
	'46, 204, 64',
	'255, 220, 0',
	'240, 18, 190',
	'0, 116, 217',
	'1, 255, 112',
	'255, 133, 27',
	'0, 31, 63',
	'61, 153, 112',
	'255, 65, 54',
	'133, 20, 75',
	'57, 204, 204',
	'177, 13, 201'
];

function ringValue(arr, i) {
	return arr[i % arr.length];
}

function pointStyle(i) {
	return {
		pointStyle: ringValue(POINT_STYLES, i),
		pointRotation: ((i / POINT_STYLES.length) % 1) * 30,
		pointRadius: 5
	};
}

export const BACKGROUND_OPACITY = 0.4;
export const BORDER_OPACITY = 0.7;

function color(i) {
	const borderColor = `rgba(${ringValue(COLORS, i)}, ${BORDER_OPACITY})`;
	return {
		backgroundColor: `rgba(${ringValue(COLORS, i)}, ${BACKGROUND_OPACITY})`,
		borderColor,
		borderWidth: 2,
		pointBackgroundColor: borderColor
	};
}

export const LineChart = {
	mixins: [Line, Chart],
	computed: {
		transformedOptions() {
			const padding = 5;
			const options = {
				legend: {
					position: 'bottom',
					labels: {
						usePointStyle: true
					}
				},
				scales: {
					yAxes: [
						{
							...(this.yLabel && {
								scaleLabel: {
									display: true,
									labelString: this.yLabel
								}
							}),
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

			/* eslint-disable no-mixed-spaces-and-tabs */
			return this.chartOptions
				? merge(options, this.chartOptions, {
						arrayMerge: combineMerge
				  })
				: options;
			/* eslint-enable no-mixed-spaces-and-tabs */
		}
	}
};

export const BarChart = {
	mixins: [Bar, Chart],
	computed: {
		chartOptions() {
			return merge(
				{
					scales: {
						yAxes: [
							{
								ticks: {
									precision: 0,
									beginAtZero: true
								}
							}
						]
					}
				},
				this.options || {}
			);
		}
	}
};

export const HorizontalBarChart = {
	mixins: [HorizontalBar, Chart],
	computed: {
		chartOptions() {
			return merge(
				{
					aspectRatio: 0.5,
					scales: {
						xAxes: [
							{
								ticks: {
									precision: 0,
									beginAtZero: true
								}
							}
						]
					}
				},
				this.options || {}
			);
		}
	}
};

export function colorDataset(dataset, index) {
	return merge(
		{
			fill: false,
			...pointStyle(index),
			...color(index)
		},
		dataset
	);
}

function emptyTarget(value) {
	return Array.isArray(value) ? [] : {};
}

function clone(value, options) {
	return merge(emptyTarget(value), value, options);
}

function combineMerge(target, source, options) {
	const destination = target.slice();

	source.forEach(function(e, i) {
		if (typeof destination[i] === 'undefined') {
			const cloneRequested = options.clone !== false;
			const shouldClone = cloneRequested && options.isMergeableObject(e);
			destination[i] = shouldClone ? clone(e, options) : e;
		} else if (options.isMergeableObject(e)) {
			destination[i] = merge(target[i], e, options);
		} else if (target.indexOf(e) === -1) {
			destination.push(e);
		}
	});
	return destination;
}
