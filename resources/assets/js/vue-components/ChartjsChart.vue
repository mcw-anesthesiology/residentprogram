<template>
	<canvas :id="id"></canvas>
</template>

<script>
import Chart from 'chart.js';

import { CHART_TYPES } from '../modules/constants.js';

export default {
	props: {
		id: {
			type: String,
			required: true
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
	},
	watch: {
		data(data){
			this.chart.data = data;
		},
		options(options){
			this.chart.destroy();
			this.createChart();
		},
		type(type){
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
			const ctx = document.querySelector(`#${this.id}`).getContext('2d');
			this.chart = new Chart(ctx, {
				type: this.type,
				data: this.data,
				options: this.options
			});
		}
	}
};
</script>
