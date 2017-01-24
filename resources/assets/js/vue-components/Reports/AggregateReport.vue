<template>
	<div class="container body-block">
		<h3>Aggregate</h3>
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>

		<data-table id="aggregate-table" :thead="tableThead" :data="tableData"
			:config="tableConfig" :exportable="true"
			:exportFilename="tableExportFilename" />
			
		<div class="graphs-container" v-if="show.charts">
			<div class="row">
				<div v-if="show.competencies" :class="chartWidth">
					<chartjs-chart id="aggregate-competency-chart" :type="chartType"
						:options="chartOptions" :data="competencyChartData" />
				</div>
				<div v-if="show.milestones" :class="chartWidth">
					<chartjs-chart id="aggregate-milestone-chart" :type="chartType"
						:options="chartOptions" :data="milestoneChartData" />
				</div>
			</div>

			<div class="row chart-options">
				<div class="col-sm-offset-5 col-sm-2">
					<div class="panel panel-default">
						<div class="panel-heading">
							<span class="panel-title">Chart options</span>
						</div>
						<div class="panel-body">
							<fieldset v-if="show.milestones && show.competencies">
								<legend>Orientation</legend>
								<div class="btn-group btn-group-justified" data-toggle="buttons">
									<bootstrap-button-input type="radio" option="horizontal"
											v-model="chartOrientation">
										<span class="glyphicon glyphicon-option-horizontal"></span>
									</bootstrap-button-input>
									<bootstrap-button-input type="radio" option="vertical"
											v-model="chartOrientation">
										<span class="glyphicon glyphicon-option-vertical"></span>
									</bootstrap-button-input>
								</div>
							</fieldset>

							<div class="form-group">
								<label class="containing-label">
									Type
									<select class="form-control" v-model="chartType">
										<option v-for="type of chartTypes" :value="type">
											{{ ucfirst(type) }}
										</option>
									</select>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BootstrapButtonInput from '../BootstrapButtonInput.vue';
import ChartjsChart from '../ChartjsChart.vue';
import DataTable from '../DataTable.vue';

import Color from 'color';

import { CHART_COLORS } from '../../modules/constants.js';
import { camelCaseToWords, ucfirst } from '../../modules/utils.js';
import { renderTrainingLevel } from '../../modules/datatable-utils.js';
import { getAverageLevel } from '../../modules/report-utils.js';
import { isoDateString } from '../../modules/date-utils.js';

export default {
	props: [
		'report'
	],
	data(){
		return {
			show: {
				milestones: false,
				competencies: true,
				averages: true,
				averageLevels: false,
				evaluationCounts: true,
				standardDeviations: false,
				totals: true,
				charts: true
			},
			transformations: {
				levelRatings: false
			},
			chartType: 'radar',
			chartOrientation: 'vertical'
		};
	},
	computed: {
		colsPerItem(){
			return [
				this.show.averages,
				this.show.averageLevels,
				this.show.evaluationCounts,
				this.show.standardDeviations
			].filter(col => col).length;
		},
		nameRowspan(){
			let rowspan = 1;
			if(this.show.milestones && this.show.competencies)
				rowspan++;
			if(this.showSomething && this.colsPerItem > 1)
				rowspan++;
				
			return rowspan;
		},
		showSomething(){
			return this.show.milestones || this.show.competencies || this.show.totals;
		},
		milestoneColspan(){
			return this.colsPerItem * Object.keys(this.report.milestones).length;
		},
		competencyColspan(){
			return this.colsPerItem * Object.keys(this.report.competencies).length;
		},
		tableThead(){
			let thead = [];
			let row;
			if(this.show.milestones && this.show.competencies){
				row = [];
				row.push({rowspan: this.nameRowspan, text: 'Name'});
				row.push({
					colspan: this.milestoneColspan,
					text: 'Milestones'
				});
				row.push({
					colspan: this.competencyColspan,
					text: 'Competencies'
				});
				if(this.show.totals)
					row.push({colspan: 3, text: 'All'});

				thead.push(row);
			}


			if(this.showSomething && this.colsPerItem > 1){
				row = [];
				if(this.nameRowspan === 2)
					row.push({rowspan: this.nameRowspan, text: 'Name'});
				
				if(this.show.milestones){
					for(let milestoneId in this.report.milestones){
						row.push({
							colspan: this.colsPerItem,
							text: this.report.milestones[milestoneId]
						});
					}
				}
				if(this.show.competencies){
					for(let competencyId in this.report.competencies){
						row.push({
							colspan: this.colsPerItem,
							text: this.report.competencies[competencyId]
						});
					}
				}
				if(this.show.totals)
					row.push({colspan: 3, text: 'Total'});

				if(row.length > 0)
					thead.push(row);
			}
			

			row = [];
			if(this.nameRowspan === 1)
				row.push({rowspan: this.nameRowspan, text: 'Name'});
			if(this.show.milestones){
				// eslint-disable-next-line no-unused-vars
				for(let milestoneId in this.report.milestones){
					if(this.colsPerItem > 1){
						if(this.show.averages)
							row.push({text: 'Average'});
						if(this.show.averageLevels)
							row.push({text: 'Average Level'});
						if(this.show.standardDeviations)
							row.push({text: 'Std. Dev.'});
						if(this.show.evaluationCounts)
							row.push({text: '#'});
					}
					else{
						row.push({
							colspan: this.colsPerItem,
							text: this.report.milestones[milestoneId]
						});
					}
				}
			}
			if(this.show.competencies){
				// eslint-disable-next-line no-unused-vars
				for(let competencyId in this.report.competencies){
					if(this.colsPerItem > 1){
						if(this.show.averages)
							row.push({text: 'Average'});
						if(this.show.averageLevels)
							row.push({text: 'Average Level'});
						if(this.show.standardDeviations)
							row.push({text: 'Std. Dev.'});
						if(this.show.evaluationCounts)
							row.push({text: '#'});
					}
					else {
						row.push({
							colspan: this.colsPerItem,
							text: this.report.competencies[competencyId]
						});
					}
				}
			}
			if(this.show.totals){
				row.push({text: '# Evaluators'});
				row.push({text: '# Evaluations'});
				row.push({text: '# Trainee Requests'});
			}

			if(row.length > 0)
				thead.push(row);

			return thead;
		},
		tableConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				dom: 'lfprtip',
				scrollX: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedColumns: true,
			};
		},
		tableData(){
			let data = [];
			for(let subjectId in this.report.subjects){
				let row = [];
				row.push(`<a href="/profile/${subjectId}" target="_blank">${this.report.subjects[subjectId]}</a>`);
				if(this.show.milestones){
					for(let milestoneId in this.report.milestones){
						if(this.show.averages)
							row.push(
								this.report.subjectMilestone
										&& this.report.subjectMilestone[subjectId]
										&& this.report.subjectMilestone[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestone[subjectId][milestoneId]).toFixed(2)
									: ''
							);
						
						if(this.show.averageLevels)
							row.push(getAverageLevel(
								this.report.subjectMilestone
										&& this.report.subjectMilestone[subjectId]
										&& this.report.subjectMilestone[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestone[subjectId][milestoneId]).toFixed(2)
									: 0
							));

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectMilestoneDeviations
										&& this.report.subjectMilestoneDeviations[subjectId]
										&& this.report.subjectMilestoneDeviations[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2)
									: ''
							);
							
						if(this.show.evaluationCounts)
							row.push(
								this.report.subjectMilestoneEvals
										&& this.report.subjectMilestoneEvals[subjectId]
										&& this.report.subjectMilestoneEvals[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestoneEvals[subjectId][milestoneId]).toFixed()
									: 0
							);
							
						if(this.colsPerItem === 0)
							row.push('');
					}
				}

				if(this.show.competencies){
					for(let competencyId in this.report.competencies){
						if(this.show.averages)
							row.push(
								this.report.subjectCompetency
										&& this.report.subjectCompetency[subjectId]
										&& this.report.subjectCompetency[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetency[subjectId][competencyId]).toFixed(2)
									: ''
							);
							
						if(this.show.averageLevels)
							row.push(getAverageLevel(
								this.report.subjectCompetency
										&& this.report.subjectCompetency[subjectId]
										&& this.report.subjectCompetency[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetency[subjectId][competencyId]).toFixed(2)
									: 0
							));

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectCompetencyDeviations
										&& this.report.subjectCompetencyDeviations[subjectId]
										&& this.report.subjectCompetencyDeviations[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2)
									: ''
							);

						if(this.show.evaluationCounts)
							row.push(
								this.report.subjectCompetencyEvals
										&& this.report.subjectCompetencyEvals[subjectId]
										&& this.report.subjectCompetencyEvals[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetencyEvals[subjectId][competencyId]).toFixed()
									: 0
							);
							
						if(this.colsPerItem === 0)
							row.push('');
					}
				}

				if(this.show.totals){
					row.push(
						this.report.subjectEvaluators[subjectId]
							? Object.keys(this.report.subjectEvaluators[subjectId]).length
							: 0
					);
					row.push(
						this.report.subjectEvals[subjectId]
							? Object.keys(this.report.subjectEvals[subjectId]).length
							: 0
					);
					row.push(
						this.report.subjectRequests[subjectId]
							? Object.keys(this.report.subjectRequests[subjectId]).length
							: 0
					);
				}

				data.push(row);
			}

			return data;
		},
		tableExportFilename(){
			let level = this.report.trainingLevel === 'all'
				? ''
				: renderTrainingLevel(this.report.trainingLevel);
			let start = isoDateString(new Date(this.report.startDate.date));
			let end = isoDateString(new Date(this.report.endDate.date));
			let now = new Date().toLocaleString();
			return `Aggregate Report ${level}, ${start} - ${end}, exported ${now}`;
		},
		chartTypes(){
			return [
				'radar',
				'line',
				'bar'
			];
		},
		chartWidth(){
			return {
				'col-md-6': this.chartOrientation === 'horizontal',
				'col-md-12': this.chartOrientation === 'vertical'
			};
		},
		chartOptions(){
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
		},
		competencyChartData(){
			let color = Color(CHART_COLORS.AVERAGE);
			let backgroundColor = color.clone().alpha(0.2);
			return {
				labels: Object.values(this.report.competencies),
				datasets: [
					{
						label: 'Average Competencies',
						backgroundColor: backgroundColor.rgbString(),
						borderColor: color.rgbString(),
						pointBackgroundColor: color.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: color.rgbString(),
						data: Object.values(this.report.averageCompetency)
					}
				]
			};
		},
		milestoneChartData(){
			let color = Color(CHART_COLORS.AVERAGE);
			let backgroundColor = color.clone().alpha(0.2);
			return {
				labels: Object.values(this.report.milestones),
				datasets: [
					{
						label: 'Average Milestones',
						backgroundColor: backgroundColor.rgbString(),
						borderColor: color.rgbString(),
						pointBackgroundColor: color.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: color.rgbString(),
						data: Object.values(this.report.averageMilestone)
					}
				]
			};
		}
	},
	methods: {
		camelCaseToWords,
		ucfirst
	},
	components: {
		BootstrapButtonInput,
		ChartjsChart,
		DataTable
	}
};
</script>

<style scoped>
	.show-container label + label {
		margin-left: 2em;
	}

	.graphs-container {
		margin: 2em 0;
	}

	.graphs-container .chart-options {
		margin: 2em 0 0;
	}
</style>
