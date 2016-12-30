<template>
	<canvas ref="canvas" :id="id" :width="width" :height="height"></canvas>
</template>

<script>
import Chart from 'chart.js';
import ElementResizeDetector from 'element-resize-detector';

import { CHART_TYPES } from '../modules/constants.js';

const erd = ElementResizeDetector({
	strategy: 'scroll'
});

export default {
	props: {
		id: {
			type: String,
			required: false
		},
		width: {
			required: false
		},
		height: {
			required: false
		},
		type: {
			type: String,
			required: true,
			validator(value){
				return CHART_TYPES.includes(value);
			}
		},
		data: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: false,
			default(){
				return {
					legend: {
						labels: {
							fontSize: 18,
							fontColor: '#333'
						}
					},
					tooltips: {
						callbacks: {
							label(tooltip, data){
								let value = parseFloat(tooltip.yLabel).toFixed(2);
								let name = data.datasets[tooltip.datasetIndex].label;
								return `${name}: ${value}`;
							}
						}
					}
				};
			}
		}
	},
	data(){
		return {
			chart: null
		};
	},
	mounted(){
		this.createChart();
		let parent = this.$refs.canvas.parentElement;
		erd.listenTo(parent, () => {
			if(this.chart)
				this.chart.resize();
		});
	},
	watch: {
		data(data){
			this.chart.data.labels = data.labels;
			this.chart.data.datasets = data.datasets;
			this.chart.update();
		},
		options(){
			this.chart.destroy();
			this.createChart();
		},
		type(){
			this.chart.destroy();
			this.createChart();
		}
	},
	updated(){
		this.chart.update();
	},
	destroyed(){
		this.chart.destroy();
	},
	methods: {
		createChart(){
			const ctx = this.$refs.canvas.getContext('2d');
			this.chart = new Chart(ctx, {
				type: this.type,
				data: this.data,
				options: this.options
			});
		}
	}
};
</script>
