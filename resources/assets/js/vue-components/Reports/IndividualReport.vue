<template>
	<div>
		<div v-if="report.subjectEvaluations[subjectId] && report.subjectEvaluations[subjectId].length > 0">
			<section class="container body-block">
				<h3>Evaluations included in report</h3>
				<data-table :thead="evaluationsThead" :config="evaluationsConfig"
						:data="evaluationsData" />
			</section>

			<section class="container body-block">
				<fieldset class="show-container">
					<legend>Show</legend>
					<label v-for="(part, name) of show">
						<input type="checkbox" v-model="show[name]" />
						{{ camelCaseToWords(name) }}
					</label>
				</fieldset>

				<div class="row">
					<div :class="milestoneCompetencyWidth" v-if="show.competencies">
						<h4>Competencies</h4>
						<data-table :thead="competenciesThead" :data="competenciesData" />
					</div>

					<div :class="milestoneCompetencyWidth" v-if="show.milestones">
						<h4>Milestones</h4>
						<data-table :thead="milestonesThead" :data="milestonesData" />
					</div>
				</div>
			</section>

			<section class="container body-block" v-if="show.charts">
				<div class="row charts">
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
			</section>
		</div>
		<div v-else>
			<p class="lead">
				No evaluations found in report.
			</p>
		</div>
	</div>
</template>

<script>
import BootstrapButtonInput from '../BootstrapButtonInput.vue';
import ChartjsChart from '../ChartjsChart.vue';
import DataTable from '../DataTable.vue';

import { CHART_COLORS } from '../../modules/constants.js';
import { camelCaseToWords, ucfirst } from '../../modules/utils.js';
import { renderDateCell } from '../../modules/datatable-utils.js';

export default {
	props: {
		subjectId: Number,
		report: Object
	},
	data(){
		return {
			show: {
				milestones: true,
				competencies: true,
				charts: true
			},
			chartType: 'radar',
			chartOrientation: 'horizontal'
		};
	},
	computed: {
		milestoneCompetencyWidth(){
			return {
				'col-md-6': this.show.milestones && this.show.competencies,
				'col-md-12': !this.show.milestones || !this.show.competencies
			};
		},
		evaluationsThead(){
			return [[
				'#',
				'Evaluation date',
				'Evaluator',
				'Evaluation form'
			]];
		},
		evaluationsConfig(){
			return {
				columns: [
					null,
					{ render: renderDateCell, createdCell: createDateCell },
					null,
					null
				]
			};
		},
		evaluationsData(){
			return this.report.subjectEvaluations[this.subjectId].map(request => [
				`<a href="/evaluation/${request.evaluation_id}">${request.evaluation_id}</a>`,
				request.evaluation_date,
				`${request.evaluator_last}, ${request.evaluator_first}`,
				request.form_title
			]);
		},
		competenciesThead(){
			return [[
				'Competency',
				'Average',
				'Standard Deviation',
				'Number of Evaluations'
			]];
		},
		competenciesData(){
			let data = [];
			for(let competencyId in this.report.subjectCompetency[this.subjectId]){
				data.push([
					this.report.competencies[competencyId],
					Math.round10(this.report.subjectCompetency[this.subjectId][competencyId], -2) || 0,
					Math.round10(this.report.subjectCompetencyDeviations[this.subjectId][competencyId], -2) || 0,
					this.report.subjectCompetencyEvals[this.subjectId][competencyId] || 0
				]);
			}

			return data;
		},
		milestonesThead(){
			return [[
				'Milestone',
				'Average',
				'Standard Deviation',
				'Number of Evaluations'
			]];
		},
		milestonesData(){
			let data = [];
			for(let milestoneId in this.report.subjectMilestone[this.subjectId]){
				data.push([
					this.report.milestones[milestoneId],
					Math.round10(this.report.subjectMilestone[this.subjectId][milestoneId], -2) || 0,
					Math.round10(this.report.subjectMilestoneDeviations[this.subjectId][milestoneId], -2) || 0,
					this.report.subjectMilestoneEvals[this.subjectId][milestoneId] || 0
				]);
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
			let averageColor = Color(CHART_COLORS.AVERAGE);
			let averageBackgroundColor = averageColor.clone().alpha(0.2);

			let subjectColor = Color(CHART_COLORS.SUBJECT);
			let subjectBackgroundColor = subjectColor.clone().alpha(0.2);
			return {
				labels: Object.values(this.report.competencies),
				datasets: [
					{
						label: 'Average Competencies',
						backgroundColor: averageBackgroundColor.rgbString(),
						borderColor: averageColor.rgbString(),
						pointBackgroundColor: averageColor.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: averageColor.rgbString(),
						data: Object.values(this.report.averageCompetency)
					},
					{
						label: 'Subject Competencies',
						backgroundColor: subjectBackgroundColor.rgbString(),
						borderColor: subjectColor.rgbString(),
						pointBackgroundColor: subjectColor.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: subjectColor.rgbString(),
						data: Object.values(this.report.subjectCompetency[this.subjectId])
					}
				]
			};
		},
		milestoneChartData(){
			let averageColor = Color(CHART_COLORS.AVERAGE);
			let averageBackgroundColor = averageColor.clone().alpha(0.2);

			let subjectColor = Color(CHART_COLORS.SUBJECT);
			let subjectBackgroundColor = subjectColor.clone().alpha(0.2);
			return {
				labels: Object.values(this.report.milestones),
				datasets: [
					{
						label: 'Average Milestones',
						backgroundColor: averageBackgroundColor.rgbString(),
						borderColor: averageColor.rgbString(),
						pointBackgroundColor: averageColor.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: averageColor.rgbString(),
						data: Object.values(this.report.averageMilestone)
					},
					{
						label: 'Subject Milestones',
						backgroundColor: subjectBackgroundColor.rgbString(),
						borderColor: subjectColor.rgbString(),
						pointBackgroundColor: subjectColor.rgbString(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: subjectColor.rgbString(),
						data: Object.values(this.report.subjectMilestone[this.subjectId])
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
