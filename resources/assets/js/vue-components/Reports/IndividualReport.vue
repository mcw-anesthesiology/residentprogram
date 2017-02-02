<template>
	<div class="individual-report container body-block">
		<template v-if="report.subjectEvaluations[subjectId] && report.subjectEvaluations[subjectId].length > 0">
			<h2>
				Individual Report
				<small>
					{{ report.subjects[subjectId] }}
				</small>
			</h2>


			<section>
				<h3>Evaluations included in report</h3>
				<data-table :bordered="true" :thead="evaluationsThead"
					:config="evaluationsConfig" :data="evaluationsData" />

				<button type="button" class="btn btn-default center-block"
						@click="exportPdf">
					Export PDF
					<svg-icon src="/img/icons/pdf.svg" />
				</button>
			</section>

			<section>
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
						<data-table :bordered="true"
							:thead="competenciesThead" :data="competenciesData" />
					</div>

					<div :class="milestoneCompetencyWidth" v-if="show.milestones">
						<h4>Milestones</h4>
						<data-table :bordered="true"
							:thead="milestonesThead" :data="milestonesData" />
					</div>
				</div>
			</section>

			<section v-if="show.charts">
				<div class="row charts">
					<div v-if="show.competencies" :class="chartWidth">
						<chartjs-chart v-if="competencyChartData"
							:type="chartType"
							:options="chartOptions" :data="competencyChartData"
							:shouldEmit="true" ref="competencyChart" />
					</div>
					<div v-if="show.milestones" :class="chartWidth">
						<chartjs-chart v-if="milestoneChartData"
							:type="chartType"
							:options="chartOptions" :data="milestoneChartData"
							:shouldEmit="true" ref="milestoneChart" />
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

			<section>
				<h3>Comments</h3>
				<data-table :bordered="true" :thead="commentsThead"
					:config="commentsConfig" :data="commentsData" />

				<button type="button" class="btn btn-primary center-block"
						@click="exportPdf">
					Export PDF
					<svg-icon src="/img/icons/pdf.svg" />
				</button>
			</section>

		</template>
		<bootstrap-alert v-else type="warning">
			No <strong>{{ trainingLevelDisplay }}</strong> evaluations found for
			<strong>{{ subject.full_name }}</strong>
			between <strong>{{ renderDateCell(report.startDate.date) }}</strong>
			and <strong>{{ renderDateCell(report.endDate.date) }}</strong>.
		</bootstrap-alert>
	</div>
</template>

<script>
import Color from 'color';

import BootstrapAlert from '../BootstrapAlert.vue';
import BootstrapButtonInput from '../BootstrapButtonInput.vue';
import ChartjsChart from '../ChartjsChart.vue';
import DataTable from '../DataTable.vue';
import SvgIcon from '../SvgIcon.vue';

import {
	CHART_COLORS,
	RESIDENT_VALUE_MAP,
	FELLOWSHIP_VALUE_MAPS
} from '../../modules/constants.js';
import {
	camelCaseToWords,
	ucfirst
} from '../../modules/utils.js';
import {
	renderIdToEvalUrl,
	renderDateCell,
	renderDateRangeCell,
	renderTrainingLevel
} from '../../modules/datatable-utils.js';
import {
	createRadarScaleCallback,
	tableHeader,
	createResponseLegend
} from '../../modules/report-utils.js';

export default {
	props: {
		subject: {
			type: Object,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			show: {
				milestones: true,
				competencies: true,
				standardDeviations: false,
				charts: true
			},
			chartType: 'radar',
			chartOrientation: 'vertical'
		};
	},
	computed: {
		subjectId(){
			return this.subject.id;
		},
		trainingLevelDisplay(){
			if(this.report.trainingLevel === 'all')
				return;
				
			return renderTrainingLevel(this.report.trainingLevel);
		},
		valueMap(){
			if(this.report.trainingLevel === 'fellow')
				return FELLOWSHIP_VALUE_MAPS.get(this.subject.secondary_training_level)
					|| FELLOWSHIP_VALUE_MAPS.get(null);
				
			return RESIDENT_VALUE_MAP;
		},
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
					{ render: renderIdToEvalUrl },
					null,
					null,
					null
				]
			};
		},
		evaluationsData(){
			try {
				return this.report.subjectEvaluations[this.subjectId].map(request => [
					String(request.evaluation_id),
					renderDateRangeCell('evaluation_date_start', 'evaluation_date_end')(request),
					`${request.evaluator_last}, ${request.evaluator_first}`,
					request.form_title
				]);
			} catch(err) {
				return [];
			}
		},
		competenciesThead(){
			let tr = [
				'Competency',
				'Average'
			];
			if(this.show.standardDeviations)
				tr.push('Standard Deviation');
			tr.push('Number of Evaluations');

			return [tr];
		},
		competenciesData(){
			let data = [];
			for(let competencyId in this.report.subjectCompetency[this.subjectId]){
				let tr = [String(this.report.competencies[competencyId])];
				if(this.report.subjectCompetency[this.subjectId][competencyId]){
					tr.push(String(Math.round10(this.report.subjectCompetency[this.subjectId][competencyId], -2)));
					if(this.show.standardDeviations)
						tr.push(String(Math.round10(this.report.subjectCompetencyDeviations[this.subjectId][competencyId], -2)));
				}
				else {
					tr.push('');
					if(this.show.standardDeviations)
						tr.push('');
				}
				tr.push(String(this.report.subjectCompetencyEvals[this.subjectId][competencyId] || 0));
				data.push(tr);
			}

			return data;
		},
		milestonesThead(){
			let tr = [
				'Milestone',
				'Average'
			];

			if(this.show.standardDeviations)
				tr.push('Standard Deviation');
			tr.push('Number of Evaluations');

			return [tr];
		},
		milestonesData(){
			let data = [];
			for(let milestoneId in this.report.subjectMilestone[this.subjectId]){
				let tr = [String(this.report.milestones[milestoneId])];
				if(this.report.subjectMilestone[this.subjectId][milestoneId]){
					tr.push(String(Math.round10(this.report.subjectMilestone[this.subjectId][milestoneId], -2)));
					if(this.show.standardDeviations)
						tr.push(String(Math.round10(this.report.subjectMilestoneDeviations[this.subjectId][milestoneId], -2)));
				}
				else {
					tr.push('');
					if(this.show.standardDeviations)
						tr.push('');
				}

				tr.push(String(this.report.subjectMilestoneEvals[this.subjectId][milestoneId] || 0));

				data.push(tr);
			}

			return data;
		},

		commentsConfig(){
			return {
				columns: [
					{ render: renderIdToEvalUrl },
					null,
					null,
					null,
					null
				]
			};
		},
		commentsThead(){
			return [[
				'#',
				'Evaluation Date',
				'Evaluator',
				'Evaluation Form',
				'Comment'
			]];
		},
		commentsData(){
			try {
				return this.report.subjectTextResponses[this.subjectId].map(response => [
					String(response.evaluation_id),
					renderDateRangeCell('evaluation_date_start', 'evaluation_date_end')(response),
					`${response.last_name}, ${response.first_name}`,
					response.form_title,
					response.response
				]);
			} catch(err) {
				return [];
			}
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
				animation: false,
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
				},
				scale: {
					ticks: {
						beginAtZero: true,
						userCallback: createRadarScaleCallback(this.valueMap)
					}
				}
			};
		},
		competencyChartData(){
			let averageColor = Color(CHART_COLORS.AVERAGE);
			let averageBackgroundColor = averageColor.clone().alpha(0.2);

			let subjectColor = Color(CHART_COLORS.SUBJECT);
			let subjectBackgroundColor = subjectColor.clone().alpha(0.2);
			try {
				return {
					labels: Object.values(this.report.competencies),
					datasets: [
						{
							label: 'Average Competency',
							backgroundColor: averageBackgroundColor.rgbString(),
							borderColor: averageColor.rgbString(),
							pointBackgroundColor: averageColor.rgbString(),
							pointBorderColor: '#fff',
							pointHoverBackgroundColor: '#fff',
							pointHoverBorderColor: averageColor.rgbString(),
							data: Object.values(this.report.averageCompetency)
						},
						{
							label: 'Subject Competency',
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
			} catch(err) {
				return null;
			}
		},
		milestoneChartData(){
			let averageColor = Color(CHART_COLORS.AVERAGE);
			let averageBackgroundColor = averageColor.clone().alpha(0.2);

			let subjectColor = Color(CHART_COLORS.SUBJECT);
			let subjectBackgroundColor = subjectColor.clone().alpha(0.2);
			try {
				return {
					labels: Object.values(this.report.milestones),
					datasets: [
						{
							label: 'Average Milestone',
							backgroundColor: averageBackgroundColor.rgbString(),
							borderColor: averageColor.rgbString(),
							pointBackgroundColor: averageColor.rgbString(),
							pointBorderColor: '#fff',
							pointHoverBackgroundColor: '#fff',
							pointHoverBorderColor: averageColor.rgbString(),
							data: Object.values(this.report.averageMilestone)
						},
						{
							label: 'Subject Milestone',
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
			} catch(err) {
				return null;
			}
		}
	},
	methods: {
		camelCaseToWords,
		ucfirst,
		renderDateCell,
		exportPdf(){
			if(!this.report.subjectEvaluations[this.subjectId])
				return;

			Promise.all([
				import('pdfmake/build/pdfmake.js'),
				import('../../vfs_fonts.json')
			]).then(imports => {
				const [pdfmake, vfs] = imports;
				pdfmake.vfs = vfs;

				const filename = `${this.report.subjects[this.subjectId]} - ${new Date().toLocaleString()}`; // FIXME

				let content = [
					{ text: 'Report parameters', style: 'heading' },
					{
						table: {
							headerRows: 1,
							body: [
								['Name', 'Training level', 'Start date', 'End date'].map(tableHeader),
								[
									this.report.subjects[this.subjectId],
									this.report.trainingLevel,
									this.report.startDate.date
										? this.report.startDate.date.split(' ')[0]
										: this.report.startDate,
									this.report.endDate.date
										? this.report.endDate.date.split(' ')[0]
										: this.report.endDate
								]
							]
						}
					},
					{ text: 'Evaluations included in report', style: 'heading' },
					{
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.evaluationsThead[0].map(tableHeader),
								...this.evaluationsData
							]))
						}
					}
				];

				if(this.show.competencies || this.show.milestones)
					content.push(
						{ text: 'Score mapping', style: 'heading' },
						createResponseLegend(this.valueMap)
					);

				if(this.show.competencies)
					content.push(
						{ text: 'Competencies', style: 'heading' },
						{
							table: {
								headerRows: 1,
								body: JSON.parse(JSON.stringify([
									this.competenciesThead[0].map(tableHeader),
									...this.competenciesData
								]))
							}
						}
					);

				if(this.show.milestones)
					content.push(
						{ text: 'Milestones', style: 'heading' },
						{
							table: {
								headerRows: 1,
								body: JSON.parse(JSON.stringify([
									this.milestonesThead[0].map(tableHeader),
									...this.milestonesData
								]))
							}
						}
					);

				let charts = [];
				if(this.show.charts){
					if(this.chartOrientation === 'horizontal'){
						let cols = [];
						if(this.show.competencies && this.$refs.competencyChart && this.$refs.competencyChart.chart)
							cols.push({
								image: this.$refs.competencyChart.chart.toBase64Image(),
								width: 250
							});
						else
							cols.push({ text: '', width: 250 });

						if(this.show.milestones && this.$refs.milestoneChart && this.$refs.milestoneChart.chart)
							cols.push({
								image: this.$refs.milestoneChart.chart.toBase64Image(),
								width: 250
							});
						else
							cols.push({ text: '', width: 250 });

						charts = [
							{
								pageBreak: 'before',
								columns: cols,
								columnGap: 10
							}
						];
					}
					else {
						charts = [];
						if(this.show.competencies && this.$refs.competencyChart && this.$refs.competencyChart.chart)
							charts.push({
								pageBreak: 'before',
								image: this.$refs.competencyChart.chart.toBase64Image(),
								width: 550
							});

						if(this.show.milestones && this.$refs.milestoneChart && this.$refs.milestoneChart.chart)
							charts.push({
								image: this.$refs.milestoneChart.chart.toBase64Image(),
								width: 550,
								pageBreak: 'after'
							});
					}
					content.push(...charts);
				}

				content.push(
					{ text: 'Comments', style: 'heading' },
					{
						table: {
							headerRows: 1,
							body: JSON.parse(JSON.stringify([
								this.commentsThead[0].map(tableHeader),
								...this.commentsData
							]))
						}
					}
				);

				let docDefinition = {
					pageSize: 'LETTER',
					content: content,
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
			});

		}
	},

	components: {
		BootstrapAlert,
		BootstrapButtonInput,
		ChartjsChart,
		DataTable,
		SvgIcon
	}
};
</script>

<style scoped>
	.individual-report section {
		margin: 2em 0 0;
	}
</style>
