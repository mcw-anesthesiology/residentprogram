<template>
	<div class="container body-block">
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>

		<div class="row">
			<div v-if="show.ratios" :class="listTableClass">
				<h3>Ratios</h3>
				<data-table id="stats-ratios"
					:thead="ratiosThead" :config="listTableConfig"
					:data="ratiosData" />
			</div>
			<div v-if="show.ratios && show.graphs" :class="listTableClass">
				<h3>Ratios</h3>
				<chartjs-chart id="chart-ratios" type="bar"
					:data="ratiosGraphData" />
			</div>
			<div v-if="show.noRequests" :class="listTableClass">
				<h3>No requests</h3>
				<data-table id="stats-no-requests"
					:thead="noRequestsThead" :config="listTableConfig"
					:data="noRequestsData" />
			</div>
			<div v-if="show.noneCompleted" :class="listTableClass">
				<h3>None completed</h3>
				<data-table id="stats-none-completed"
					:thead="noneCompletedThead" :config="listTableConfig"
					:data="noneCompletedData" />
			</div>
			<div v-if="show.averageCompletionTimes" :class="listTableClass">
				<h3>Average completion times</h3>
				<data-table id="stats-average-completion-times"
					:thead="averageCompletionTimesThead"
					:config="averageCompletionTimesConfig"
					:data="averageCompletionTimesData" />
			</div>
			<div v-if="show.lastCompleted" :class="listTableClass">
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
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedHeader: true
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
</style>
