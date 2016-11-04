<template>
	<div class="container body-block">
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>

		<data-table id="aggregate-table" :thead="tableThead"
			:config="tableConfig" :data="tableData" />

		<div class="graphs-container" v-if="show.graphs">
			<div class="row">
				<div v-if="show.competencies" :class="graphWidth">
					<chartjs-chart id="aggregate-competency-chart" :type="graphType"
						:options="chartOptions" :data="competencyChartData" />
				</div>
				<div v-if="show.milestones" :class="graphWidth">
					<chartjs-chart id="aggregate-milestone-chart" :type="graphType"
						:options="chartOptions" :data="milestoneChartData" />
				</div>
			</div>

			<div class="row graphs-controls">
				<div class="col-sm-offset-5 col-sm-2">
					<div class="panel panel-default">
						<div class="panel-heading">
							<span class="panel-title">Graph options</span>
						</div>
						<div class="panel-body">
							<fieldset v-if="show.milestones && show.competencies">
								<legend>Orientation</legend>
								<div class="btn-group btn-group-justified" data-toggle="buttons">
									<bootstrap-button-input type="radio" option="horizontal"
											v-model="graphOrientation">
										<span class="glyphicon glyphicon-option-horizontal"></span>
									</bootstrap-button-input>
									<bootstrap-button-input type="radio" option="vertical"
											v-model="graphOrientation">
										<span class="glyphicon glyphicon-option-vertical"></span>
									</bootstrap-button-input>
								</div>
							</fieldset>

							<div class="form-group">
								<label class="containing-label">
									Type
									<select class="form-control" v-model="graphType">
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
import Color from 'color';

import BootstrapButtonInput from './BootstrapButtonInput.vue';
import ChartjsChart from './ChartjsChart.vue';
import DataTable from './DataTable.vue';

import { CHART_COLORS } from '../modules/constants.js';
import { camelCaseToWords, ucfirst } from '../modules/utils.js';

export default {
	props: [
		'report'
	],
	data(){
		return {
			show: {
				milestones: false,
				competencies: true,
				standardDeviations: false,
				graphs: true
			},
			graphType: 'radar',
			graphOrientation: 'vertical'
		};
	},
	computed: {
		colsPerItem(){
			return this.show.standardDeviations
				? 3
				: 2;
		},
		milestoneColspan(){
			return this.colsPerItem * Object.keys(this.report.milestones).length;
		},
		competencyColspan(){
			return this.colsPerItem * Object.keys(this.report.competencies).length;
		},
		tableThead(){
			let thead = [];
			let row = [];
			row.push({rowspan: 3, text: 'Trainee'});
			if(this.show.milestones)
				row.push({
					colspan: this.milestoneColspan,
					text: 'Milestones'
				});
			if(this.show.competencies)
				row.push({
					colspan: this.competencyColspan,
					text: 'Competencies'
				});
			row.push({colspan: 3, text: 'All'});
			thead.push(row);

			row = [];
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
			row.push({colspan: 3, text: 'Total'});
			thead.push(row);

			row = [];
			if(this.show.milestones){
				for(let milestoneId in this.report.milestones){
					row.push({text: 'Average'});
					if(this.show.standardDeviations)
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			if(this.show.competencies){
				for(let competencyId in this.report.competencies){
					row.push({text: 'Average'});
					if(this.show.standardDeviations)
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			row.push({text: '# Evaluators'});
			row.push({text: '# Evaluations'});
			row.push({text: '# Trainee Requests'});
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
				row.push(this.report.subjects[subjectId]);
				if(this.show.milestones){
					for(let milestoneId in this.report.milestones){
						row.push(
							this.report.subjectMilestone
									&& this.report.subjectMilestone[subjectId]
									&& this.report.subjectMilestone[subjectId][milestoneId]
								? parseFloat(this.report.subjectMilestone[subjectId][milestoneId]).toFixed(2)
								: ''
						);

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectMilestoneDeviations
										&& this.report.subjectMilestoneDeviations[subjectId]
										&& this.report.subjectMilestoneDeviations[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.subjectMilestoneEvals
									&& this.report.subjectMilestoneEvals[subjectId]
									&& this.report.subjectMilestoneEvals[subjectId][milestoneId]
								? parseFloat(this.report.subjectMilestoneEvals[subjectId][milestoneId]).toFixed()
								: 0
						);
					}
				}

				if(this.show.competencies){
					for(let competencyId in this.report.competencies){
						row.push(
							this.report.subjectCompetency
									&& this.report.subjectCompetency[subjectId]
									&& this.report.subjectCompetency[subjectId][competencyId]
								? parseFloat(this.report.subjectCompetency[subjectId][competencyId]).toFixed(2)
								: ''
						);

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectCompetencyDeviations
										&& this.report.subjectCompetencyDeviations[subjectId]
										&& this.report.subjectCompetencyDeviations[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.subjectCompetencyEvals
									&& this.report.subjectCompetencyEvals[subjectId]
									&& this.report.subjectCompetencyEvals[subjectId][competencyId]
								? parseFloat(this.report.subjectCompetencyEvals[subjectId][competencyId]).toFixed()
								: 0
						);
					}
				}

				row.push(Object.keys(this.report.subjectEvaluators[subjectId]).length);
				row.push(Object.keys(this.report.subjectEvals[subjectId]).length);
				row.push(Object.keys(this.report.subjectRequests[subjectId]).length);

				data.push(row);
			}

			return data;
		},
		chartTypes(){
			return [
				'radar',
				'line',
				'bar'
			];
		},
		graphWidth(){
			return {
				'col-md-6': this.graphOrientation === 'horizontal',
				'col-md-12': this.graphOrientation === 'vertical'
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
			let color = Color(CHART_COLORS.COMPETENCY);
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
			let color = Color(CHART_COLORS.MILESTONE);
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

	.graphs-container .graphs-controls {
		margin: 2em 0 0;
	}
</style>
