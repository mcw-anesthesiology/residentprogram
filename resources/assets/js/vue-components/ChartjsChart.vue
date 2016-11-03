<template>
	<canvas :id="id"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
	props: {
		id: {
			type: String,
			required: true
		},
		defaultType: {
			type: String,
			required: true,
			validator(value){
				return [
					'line',
					'bar',
					'radar',
					'polarArea',
					'pie',
					'doughnut',
					'bubble'
				].includes(value);
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
				return {};
			}
		}
	},
	data(){
		return {
			type: this.defaultType,
			chart: null
		};
	},
	mounted(){
		const ctx = document.querySelector(`#${this.id}`).getContext('2d');
		this.chart = new Chart(ctx, {
			type: this.type,
			data: this.data,
			options: this.options
		});
	},
	watch: {
		data(data){
			this.chart.data = data;
		},
		options(options){
			this.chart.options = options;
		},
		type(type){
			this.chart.type = type;
		}
	},
	updated(){
		this.chart.update();
	},
	destroyed(){
		this.chart.destroy();
	}
};
</script>
