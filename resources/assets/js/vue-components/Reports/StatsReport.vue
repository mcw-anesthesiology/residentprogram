<template>
	<div class="container body-block">
		<h3>{{ title }}</h3>
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="field of availableFields">
				<input type="checkbox" :value="show[field]"
					@change="show = Object.assign({}, show, {[field]: !show[field]})"/>
				{{ camelCaseToWords(field) }}
			</label>
		</fieldset>
		<div class="row">
			<div class="col-md-6">
				<label class="containing-label">
					Table height
					<select class="form-control" v-model="tableHeight">
						<option :value="false">Full size</option>
						<option value="500px">Fixed</option>
					</select>
				</label>
			</div>
			<div class="col-md-6">
				<label class="containing-label">
					Chart height
					<select class="form-control" v-model="chartHeight">
						<option :value="false">Full size</option>
						<option value="625px">Fixed</option>
					</select>
				</label>
			</div>
		</div>
		
		<alert-list v-model="alerts" />
		
		<button type="button" class="btn btn-primary center-block"
				@click="exportPdf">
			Export PDF
			<svg-icon src="/img/icons/pdf.svg" />
		</button>

		<div class="stats-report-container">
			<div v-if="show.ratios">
				<h3>Ratios</h3>
				<data-table id="stats-ratios" :bordered="true"
					:thead="ratiosThead" :config="listTableConfig"
					:data="ratiosData" />
			</div>
			<div v-if="show.ratios && show.graphs">
				<h3>Ratios</h3>
				<div class="list-chart-container-container"
						:style="listChartContainerContainerStyle">
					<div class="list-chart-container" :style="listChartContainerStyle">
						<chartjs-chart id="chart-ratios" type="horizontalBar"
							:data="ratiosGraphData" :options="listChartConfig" />
					</div>
				</div>
			</div>
			<div v-if="show.noRequests">
				<h3>No requests</h3>
				<data-table id="stats-no-requests" :bordered="true"
					:thead="noRequestsThead" :config="listTableConfig"
					:data="noRequestsData" />
			</div>
			<div v-if="show.noneCompleted">
				<h3>None completed</h3>
				<data-table id="stats-none-completed" :bordered="true"
					:thead="noneCompletedThead" :config="listTableConfig"
					:data="noneCompletedData" />
			</div>
			<div v-if="show.averageCompletionTimes">
				<h3>Average completion times</h3>
				<data-table id="stats-average-completion-times" :bordered="true"
					:thead="averageCompletionTimesThead"
					:config="averageCompletionTimesConfig"
					:data="averageCompletionTimesData" />
			</div>
			<div v-if="show.lastCompleted">
				<h3>Last completed evaluations</h3>
				<data-table id="stats-last-completed" :bordered="true"
					:thead="lastCompletedThead" :config="lastCompletedConfig"
					:data="lastCompletedData" />
			</div>
		</div>
	</div>
</template>

<script>
import Color from 'color';

import AlertList from '../AlertList.vue';
import ChartjsChart from '../ChartjsChart.vue';
import DataTable from '../DataTable.vue';
import SvgIcon from '../SvgIcon.vue';

import { CHART_COLORS } from '../../modules/constants.js';
import { camelCaseToWords } from '../../modules/utils.js';
import {
	createDateCell,
	renderDateCell,
	renderIdToEvalUrl
} from '../../modules/datatable-utils.js';
import { tableHeader } from '../../modules/report-utils.js';

export default {
	props: {
		title: {
			type: String,
			default: 'Statistics'
		},
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
			tableHeight: '500px',
			chartHeight: '625px',
			
			alerts: []
		};
	},
	computed: {
		availableFields(){
			let fields = [
				'ratios',
				'graphs',
				'noRequests',
				'noneCompleted',
				'lastCompleted',
			];
			
			if(this.report.statsType === 'evaluator')
				fields.push('averageCompletionTimes');
				
			return fields;
		},
		listTableConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollX: true,
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false
			};
		},
		listChartContainerContainerStyle(){
			return {
				height: this.chartHeight
			};
		},
		listChartContainerStyle(){
			return {
				width: '100%',
				height: `${20 * this.report.userStats.length}px`
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
						label(tooltip){
							let value = parseFloat(tooltip.xLabel).toFixed();
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
						? `${stat.ratio}%`
						: ''
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
				['User', 'Average Time']
			];
		},
		averageCompletionTimesConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false,
				columns: [
					null,
					{
						render(time, type, obj){
							if(['sort', 'type'].includes(type))
								return obj.epoch;

							let [days, hours, minutes] = time.split(', ');
							return [
								`<b>${days},</b>`,
								`<span>${hours},</span>`,
								`<i>${minutes}</i>`
							].join(' ');
						},
						createdCell(td){
							td.classList.add('time-period-cell');
						}
					}
				],
				fixedHeader: true
			};
		},
		averageCompletionTimesData(){
			return this.report.averageCompletionTimes.map(obj => [
				obj.name,
				obj.time
			]);
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
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false,
				columns: [
					null,
					{
						render: renderDateCell,
						createdCell: createDateCell
					},
					{
						render: renderIdToEvalUrl
					}
				],
				fixedHeader: true
			};
		},
		lastCompletedData(){
			return this.report.lastCompleted.map(obj => [
				obj.name,
				obj.evaluation.complete_date,
				obj.evaluation.id
			]);
		}
	},
	watch: {
		show(){
			this.$nextTick(() => {
				$(window).resize();
			});
		}
	},
	methods: {
		camelCaseToWords,
		exportPdf(){
			Promise.all([
				import('pdfmake/build/pdfmake.js'),
				import('../../vfs_fonts.json')
			]).then(([pdfmake, vfs]) => {
				pdfmake.vfs = vfs;
				
				const filename = `${this.title} - ${new Date().toLocaleString()}`;
				
				let content = [
					{ text: this.title, style: 'heading' },
					{
						table: {
							headerRows: 1,
							body: [
								['Start date', 'End date'].map(tableHeader),
								[
									this.report.startDate.date
										? this.report.startDate.date.split(' ')[0]
										: this.report.startDate,
									this.report.endDate.date
										? this.report.endDate.date.split(' ')[0]
										: this.report.endDate,
								]
							]
						}
					}
				];
				
				if(this.ratiosData.length > 0)
					content.push({
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.ratiosThead[0].map(tableHeader),
								...this.ratiosData
							]))
						}
					});
					
				if(this.noRequestsData.length > 0)
					content.push({
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.noRequestsThead[0].map(tableHeader),
								...this.noRequestsData
							]))
						}
					});
					
				if(this.noneCompletedData.length > 0)
					content.push({
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.noneCompletedThead[0].map(tableHeader),
								...this.noneCompletedData
							]))
						}
					});
					
				if(this.lastCompletedData.length > 0)
					content.push({
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.lastCompletedThead[0].map(tableHeader),
								...this.lastCompletedData
							]))
						}
					});
					
				if(this.report.statsType === 'evaluator'
						&& this.averageCompletionTimesData.length > 0)
					content.push({
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.averageCompletionTimesThead[0].map(tableHeader),
								...this.averageCompletionTimesData
							]))
						}
					});
					
				// TODO: Chart, improved styling
				
				const docDefinition = {
					pageSize: 'LETTER',
					content,
					styles: {
						heading: {
							bold: true,
							fontSize: 20,
							margin: [0, 20, 0, 10]
						},
						tableHeader: {
							bold: true,
							fontSize: 14
						}
					}
				};
				
				pdfmake.createPdf(docDefinition).download(filename);
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: `<strong>Error:</strong> There was a problem exporting the ${this.title} PDF`
				});
			});
		}
	},
	components: {
		AlertList,
		ChartjsChart,
		DataTable,
		SvgIcon
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
		overflow: auto;
	}
</style>

<style>
	.time-period-cell > * {
		display: inline-block;
	}

	.time-period-cell b {
		width: 4.5em;
		margin-right: 0;
	}
	
	.time-period-cell span {
		margin-right: 0.5em;
	}
</style>
