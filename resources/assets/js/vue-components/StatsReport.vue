<template>
	<div class="container body-block">
		<h3>Statistics</h3>
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">Chart settings</span>
			</div>
			<div class="panel-body">
				<label class="containing-label">
					<select class="form-control" v-model="chart.size">
						<option value="fullSize">Full size</option>
						<option value="fit">Fit</option>
					</select>
				</label>
			</div>
		</div>

		<div class="stats-report-container">
			<div v-if="show.ratios">
				<h3>Ratios</h3>
				<data-table id="stats-ratios"
					:thead="ratiosThead" :config="listTableConfig"
					:data="ratiosData" />
			</div>
			<div v-if="show.ratios && show.graphs">
				<h3>Ratios</h3>
				<div class="list-chart-container-container">
					<div class="list-chart-container" :style="listChartContainerStyle">
						<chartjs-chart id="chart-ratios" type="horizontalBar"
							:data="ratiosGraphData" :options="listChartConfig" />
					</div>
				</div>
			</div>
			<div v-if="show.noRequests">
				<h3>No requests</h3>
				<data-table id="stats-no-requests"
					:thead="noRequestsThead" :config="listTableConfig"
					:data="noRequestsData" />
			</div>
			<div v-if="show.noneCompleted">
				<h3>None completed</h3>
				<data-table id="stats-none-completed"
					:thead="noneCompletedThead" :config="listTableConfig"
					:data="noneCompletedData" />
			</div>
			<div v-if="show.averageCompletionTimes">
				<h3>Average completion times</h3>
				<data-table id="stats-average-completion-times"
					:thead="averageCompletionTimesThead"
					:config="averageCompletionTimesConfig"
					:data="averageCompletionTimesData" />
			</div>
			<div v-if="show.lastCompleted">
				<h3>Last completed evaluations</h3>
				<data-table id="stats-last-completed"
					:thead="lastCompletedThead" :config="lastCompletedConfig"
					:data="lastCompletedData" />
			</div>
		</div>
	</div>
</template>

<script>
import Color from 'color';

import ChartjsChart from './ChartjsChart.vue';
import DataTable from './DataTable.vue';

import { CHART_COLORS } from '../modules/constants.js';
import { camelCaseToWords } from '../modules/utils.js';
import { createDateCell, renderDateCell } from '../modules/datatable-utils.js';

export default {
	props: {
		report: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			show: {
				ratios: false,
				graphs: false,
				noRequests: false,
				noneCompleted: false,
				averageCompletionTimes: false,
				lastCompleted: false
			},
			chart: {
				size: 'fullSize'
			}
		};
	},
	computed: {
		listTableClass(){
			return {
				'col-md-6': true
			};
		},
		listTableConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollX: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedColumns: true
			};
		},
		listChartContainerStyle(){
			return this.chart.size === 'fullSize'
			? {
				width: '100%',
				height: `${15 * this.report.userStats.length}px`
			}
			: {
				width: '100%',
				height: '100%'
			};
		},
		listChartConfig(){
			return {
				maintainAspectRatio: false,
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				},
				tooltips: {
					callbacks: {
						label(tooltip, data){
							let value = parseFloat(tooltip.xLabel).toFixed();
							let name = data.datasets[tooltip.datasetIndex].label;
							return `${value}%`;
						}
					}
				}
			};
		},
		ratiosThead(){
			return [[
				'User',
				'Requested',
				'Total Requests',
				'Total Completed',
				'Total Ratio'
			]];
		},
		ratiosData(){
			let data = [];
			for(let stat of this.report.userStats){
				data.push([
					stat.name,
					stat.requested,
					stat.totalRequests,
					stat.completed,
					stat.ratio
				]);
			}

			return data;
		},
		ratiosGraphData(){
			let color = Color(CHART_COLORS.OTHER[0]);
			let backgroundColor = color.clone().alpha(0.2);
			return {
				labels: this.report.userStats.map(userStat => userStat.name),
				datasets: [
					{
						label: 'Requested / Completed %',
						backgroundColor: backgroundColor.rgbString(),
						borderColor: color.rgbString(),
						borderWidth: 1,
						pointBackgroundColor: color.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: color.rgbString(),
						data: this.report.userStats.map(userStat => userStat.ratio)
					}
				]
			};
		},
		noRequestsThead(){
			return [
				['No requests']
			];
		},
		noRequestsData(){
			return this.report.noneRequested.map(name => [name]);
		},
		noneCompletedThead(){
			return [
				['No completed evals']
			];
		},
		noneCompletedData(){
			return this.report.noneCompleted.map(name => [name]);
		},
		averageCompletionTimesThead(){
			return [
				['User', 'Time']
			];
		},
		averageCompletionTimesConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				columns: [
					{data: 'name'},
					{data: 'time'}
				],
				fixedHeader: true
			};
		},
		averageCompletionTimesData(){
			return this.report.averageCompletionTimes;
		},
		lastCompletedThead(){
			return [
				['User', 'Completed', 'Evaluation']
			];
		},
		lastCompletedConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				columns: [
					{data: 'name'},
					{
						data: 'evaluation.complete_date',
						render: renderDateCell,
						createdCell: createDateCell
					},
					{
						data: 'evaluation.url'
					}
				],
				fixedHeader: true
			};
		},
		lastCompletedData(){
			return this.report.lastCompleted;
		}
	},
	methods: {
		camelCaseToWords
	},
	components: {
		ChartjsChart,
		DataTable
	}
};
</script>

<style scoped>
	.show-container label + label {
		margin-left: 2em;
	}

	.stats-report-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: stretch;
	}

	.stats-report-container > div {
		width: calc(50% - 20px);
		margin: 10px;
		flex-grow: 1;
		flex-shrink: 0;
	}

	.list-chart-container-container {
		height: 625px;
		overflow: auto;
	}
</style>
