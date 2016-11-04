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
import DataTable from './DataTable.vue';

import { createDateCell, renderDateCell } from '../modules/datatable-utils.js';
import { camelCaseToWords } from '../modules/utils.js';

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
				ratio: false,
				graph: false,
				noRequests: false,
				noneCompleted: false,
				averageCompletionTimes: false,
				lastCompleted: false
			}
		};
	},
	computed: {
		statsThead(){
			return [
				'User',
				'Requested',
				'Total Requests',
				'Total Completed',
				'Total Ratio'
			];
		},
		statsConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true
			};
		},
		statsData(){
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
		},
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
				['User', 'Date']
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
						data: 'date.date',
						render: renderDateCell,
						createdCell: createDateCell
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
		DataTable
	}
};
</script>

<style scoped>
	.show-container label + label {
		margin-left: 2em;
	}
</style>
