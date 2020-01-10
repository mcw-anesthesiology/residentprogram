<template>
	<div class="individual-report container body-block">
		<alert-list v-model="alerts" />
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

					<div class="text-center">
						<button type="button" class="btn btn-primary"
								@click="exportPdf">
							Export PDF
							<svg-icon src="/img/icons/pdf.svg" />
						</button>
						<button type="button" class="btn btn-default"
								@click="saveCharts">
							Save chart images
						</button>
					</div>
			</section>

			<section v-if="highlightedQuestions && highlightedQuestions.length > 0">
				<h3>Highlighted question</h3>
				<highlighted-question v-for="(hq, i) of highlightedQuestions"
					:key="i" :responses="hq" />
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
				<div class="charts">
					<div v-if="evaluations && competencies">
						<div>
							<label class="containing-label">
								Competency to average
								<select class="form-control" v-model="timeChartCompetencyId">
									<option value="">All competencies</option>
									<option v-for="c of competencies" :key="c.id" :value="c.id">
										{{ c.title }}
									</option>
								</select>
							</label>
						</div>
						<chartjs-chart v-if="timeChartData"
							ref="timeChart"
							type="line"
							:options="timeChartOptions"
							:data="timeChartData"
							:shouldEmit="true"
						/>
					</div>
				</div>
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
											<option v-for="type of chartTypes" :key="type" :value="type">
												{{ ucfirst(type) }}
											</option>
										</select>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h3>Comments</h3>
				<data-table :bordered="true" :thead="commentsThead"
					:config="commentsConfig" :data="commentsData" />

				<div class="text-center">
					<button type="button" class="btn btn-primary"
							@click="exportPdf">
						Export PDF
						<svg-icon src="/img/icons/pdf.svg" />
					</button>
					<button type="button" class="btn btn-default"
							@click="saveCharts">
						Save chart images
					</button>
				</div>

			</section>

		</template>
		<bootstrap-alert v-else type="warning">
			No <strong>{{ trainingLevelDisplay }}</strong> evaluations found for
			<strong>{{ report.subjects[subjectId] }}</strong>
			between <strong>{{ renderDateCell(report.startDate.date) }}</strong>
			and <strong>{{ renderDateCell(report.endDate.date) }}</strong>.
		</bootstrap-alert>
	</div>
</template>

<script>
import Color from 'color';
import download from 'downloadjs';
import gql from 'graphql-tag';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import HighlightedQuestion from './HighlightedQuestion.vue';
import BootstrapAlert from '../BootstrapAlert.vue';
import BootstrapButtonInput from '../BootstrapButtonInput.vue';
import ChartjsChart from '../ChartjsChart.vue';
import DataTable from '../DataTable.vue';
import SvgIcon from '../SvgIcon.vue';

import {
	CHART_COLORS,
	RESIDENT_VALUE_MAP,
	FELLOWSHIP_VALUE_MAPS
} from '@/modules/constants.js';
import { handleError } from '@/modules/errors.js';
import { isoDateString, renderDate } from '@/modules/date-utils.js';
import { average } from '@/modules/math-utils.js';
import {
	camelCaseToWords,
	ucfirst,
	fetchConfig,
	jsonOrThrow
} from '@/modules/utils.js';
import {
	renderIdToEvalUrl,
	renderDateCell,
	renderDateRangeCell,
	renderTrainingLevel
} from '@/modules/datatable-utils.js';
import {
	createRadarScaleCallback,
	tableHeader,
	fullWidthTable,
	borderedStripedTable,
	createResponseLegend
} from '@/modules/report-utils.js';

const averageColor = Color(CHART_COLORS.AVERAGE);
const averageBackgroundColor = averageColor.alpha(0.2);

const subjectColor = Color(CHART_COLORS.SUBJECT);
const subjectBackgroundColor = subjectColor.alpha(0.2);

const averageDatasetColors = {
	backgroundColor: averageBackgroundColor.rgb().string(),
	borderColor: averageColor.rgb().string(),
	pointBackgroundColor: averageColor.rgb().string(),
	pointBorderColor: '#fff',
	pointHoverBackgroundColor: '#fff',
	pointHoverBorderColor: averageColor.rgb().string()
};

const subjectDatasetColors = {
	backgroundColor: subjectBackgroundColor.rgb().string(),
	borderColor: subjectColor.rgb().string(),
	pointBackgroundColor: subjectColor.rgb().string(),
	pointBorderColor: '#fff',
	pointHoverBackgroundColor: '#fff',
	pointHoverBorderColor: subjectColor.rgb().string()
};

export default {
	mixins: [HasAlerts],
	props: {
		subjectId: {
			type: Number,
			required: true
		},
		subject: {
			type: Object,
			required: false
		},
		report: {
			type: Object,
			required: true
		},
		showAnonymous: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			highlightedQuestions: null,
			show: {
				milestones: true,
				competencies: true,
				standardDeviations: false,
				charts: true
			},
			chartType: 'radar',
			chartOrientation: 'vertical',

			timeChartCompetencyId: '',

			user: {},
			competencies: [],
			evaluations: [],
			loading: false
		};
	},
	apollo: {
		user: {
			query: gql`
				query($id: ID!) {
					user(id: $id) {
						id
						type
						training_level
						secondary_training_level
					}
				}
			`,
			variables() {
				return {
					id: this.subject.id
				};
			}
		},
		competencies: {
			query: gql`
				query {
					competencies {
						id
						title
					}
				}
			`
		},
		evaluations: {
			query: gql`
				query IndividualReportSubjectEvalsQuery(
					$startDate: Date
					$endDate: Date
					$subjectType: UserType
					$subjectTrainingLevel: TrainingLevel
					$subjectSecondaryTrainingLevel: String
				) {
					evaluations(
						after: $startDate
						before: $endDate
						status: complete
						subjectFilter: {
							type: $subjectType
							training_level: $subjectTrainingLevel
							secondary_training_level: $subjectSecondaryTrainingLevel
						}
						orderBy: [
							{
								field: "complete_date",
								order: ASC
							}
						]
					) {
						id
						complete_date
						subject_id

						responses {
							id
							response
							weight

							competencyQuestions {
								id
								competency_id
							}
						}
					}
				}
			`,
			variables() {
				return {
					startDate: this.report.startDate,
					endDate: this.report.endDate,
					subjectType: this.user.type,
					subjectTrainingLevel: this.user.training_level,
					subjectSecondaryTrainingLevel: this.user.secondary_training_level || undefined
				};
			}
		}
	},
	computed: {
		trainingLevelDisplay(){
			if(this.report.trainingLevel === 'all')
				return;

			return renderTrainingLevel(this.report.trainingLevel);
		},
		valueMap(){
			if (this.report.trainingLevel === 'fellow')
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
					this.getEvaluatorName(request, 'evaluator_last', 'evaluator_first'),
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
					this.getEvaluatorName(response),
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
		timeChartOptions() {
			return {
				animation: false,
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				},
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								max: 10,
								stepSize: 1,
								callback: createRadarScaleCallback(this.valueMap)
							}
						}
					]
				}
			};
		},
		timeChartChunks() {
			const chunks = new Map();

			if (this.evaluations) {
				for (const e of this.evaluations) {
					const label = renderDate(e.complete_date);
					const responses = this.timeChartCompetencyId
						? e.responses.filter(r => r.competencyQuestions.find(cq => cq.competency_id == this.timeChartCompetencyId)) // eslint-disable-line eqeqeq
						: e.responses.filter(r => r.competencyQuestions.length > 0);
					chunks.set(label, (chunks.get(label) || []).concat(responses.map(r => ({
						...r,
						subject_id: e.subject_id
					}))));
				}
			}

			return chunks;
		},
		timeChartData() {
			const labels = [];
			const subjectData = [];
			const averageData = [];

			for (const [label, responses] of this.timeChartChunks.entries()) {
				labels.push(label);
				subjectData.push(average(
					// eslint-disable-next-line eqeqeq
					responses.filter(r => r.subject_id == this.subject.id)
						.map(getWeightedResponseValue)
				))
				averageData.push(average(responses.map(getWeightedResponseValue)));
			}

			return {
				labels,
				datasets: [
					{
						label: 'Individual',
						...subjectDatasetColors,
						data: subjectData
					},
					{
						label: 'Average',
						...averageDatasetColors,
						data: averageData
					}
				]
			}
		},
		competencyChartData(){
			try {
				return {
					labels: Object.values(this.report.competencies),
					datasets: [
						{
							label: 'Individual Competency',
							...subjectDatasetColors,
							data: Object.values(this.report.subjectCompetency[this.subjectId])
						},
						{
							label: 'Average Competency',
							...averageDatasetColors,
							data: Object.values(this.report.averageCompetency)
						}
					]
				};
			} catch(err) {
				return null;
			}
		},
		milestoneChartData(){
			try {
				return {
					labels: Object.values(this.report.milestones),
					datasets: [
						{
							label: 'Individual Milestone',
							...subjectDatasetColors,
							data: Object.values(this.report.subjectMilestone[this.subjectId])
						},
						{
							label: 'Average Milestone',
							...averageDatasetColors,
							data: Object.values(this.report.averageMilestone)
						}
					]
				};
			} catch(err) {
				return null;
			}
		}
	},

	mounted() {
		this.fetchHighlightedQuestions();
	},

	methods: {
		camelCaseToWords,
		ucfirst,
		renderDateCell,
		fetchHighlightedQuestions() {
			if (!this.report || !this.report.startDate || !this.report.endDate)
				return;

			const startDate = isoDateString(this.report.startDate);
			const endDate = isoDateString(this.report.endDate);

			this.loading = true;

			fetch(`/highlighted-questions/user/${this.subjectId}`, {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					startDate,
					endDate
				})
			}).then(jsonOrThrow).then(highlightedQuestions => {
				this.highlightedQuestions = highlightedQuestions;
				this.loading = false;
			}).catch(err => {
				handleError(
					err,
					this,
					'There was a problem fetching highlighted questions'
				);
				this.loading = false;
			});
		},
		saveCharts() {
			if (this.$refs.competencyChart && this.$refs.competencyChart.chart)
				download(this.$refs.competencyChart.chart.toBase64Image(),
					`Competencies chart - ${this.report.subjects[this.subjectId]} - ${new Date().toLocaleString()}.png`);
			if (this.$refs.milestoneChart && this.$refs.milestoneChart.chart)
				download(this.$refs.milestoneChart.chart.toBase64Image(),
					`Milestones chart - ${this.report.subjects[this.subjectId]} - ${new Date().toLocaleString()}.png`);
		},
		waitForLoading() {
			return new Promise((resolve) => {
				let interval;
				interval = setInterval(() => {
					if (!this.loading && !this.$apollo.loading) {
						resolve();
						clearInterval(interval);
					}
				}, 500);
			});
		},
		exportPdf() {
			if(!this.report.subjectEvaluations[this.subjectId])
				return;

			Promise.all([
				import('pdfmake/build/pdfmake.js'),
				import('pdfmake/build/vfs_fonts.js'),
				this.waitForLoading()
			]).then(([{default: pdfmake}, {default: pdfFonts}]) => {
				pdfmake.vfs = pdfFonts.pdfMake.vfs;

				// FIXME
				const subjectName = this.report.subjects[this.subjectId];
				const trainingLevel = renderTrainingLevel(this.report.trainingLevel);
				const startDate = this.report.startDate.date
					? this.report.startDate.date.split(' ')[0]
					: this.report.startDate;
				const endDate = this.report.endDate.date
					? this.report.endDate.date.split(' ')[0]
					: this.report.endDate;

				const filename = `${subjectName} Individual Report (${trainingLevel}, ${startDate} to ${endDate}).pdf`;

				let content = [
					{ text: 'Report parameters', style: 'heading' },
					borderedStripedTable({
						table: fullWidthTable({
							headerRows: 1,
							body: [
								['Name', 'Training level', 'Start date', 'End date'].map(tableHeader),
								[
									subjectName,
									trainingLevel,
									startDate,
									endDate
								]
							]
						})
					}),
					{ text: 'Evaluations included in report', style: 'heading' },
					borderedStripedTable({
						table: {
							headerRows: 1,
							widths: ['auto', 'auto', 'auto', '*'],
							body: JSON.parse(JSON.stringify([
								this.evaluationsThead[0].map(tableHeader),
								...this.evaluationsData
							]))
						}
					})
				];

				if (this.highlightedQuestions) {
					content.push(
						{ text: 'Highlighted questions', style: 'heading' }
					);
					for (const hq of this.highlightedQuestions) {
						if (hq.length) {
							content.push(borderedStripedTable({
								table: {
									headerRows: 1,
									body: [
										['Evaluation #', hq[0].highlight_name],
										...hq.map(r => ([
											r.evaluation_id,
											r.highlighted_value
										]))
									]
								}
							}));
						}
					}
				}

				if(this.show.competencies || this.show.milestones)
					content.push(
						{ text: 'Score mapping', style: 'heading' },
						createResponseLegend(this.valueMap)
					);

				if(this.show.competencies)
					content.push(
						{ text: 'Competencies', style: 'heading' },
						borderedStripedTable({
							table: {
								headerRows: 1,
								widths: ['*', 'auto', 'auto'],
								body: JSON.parse(JSON.stringify([
									this.competenciesThead[0].map(tableHeader),
									...this.competenciesData
								]))
							}
						})
					);

				if(this.show.milestones)
					content.push(
						{ text: 'Milestones', style: 'heading' },
						borderedStripedTable({
							table: {
								headerRows: 1,
								widths: ['*', 'auto', 'auto'],
								body: JSON.parse(JSON.stringify([
									this.milestonesThead[0].map(tableHeader),
									...this.milestonesData
								]))
							}
						})
					);

				let charts = [];
				if(this.show.charts){
					if(this.chartOrientation === 'horizontal'){
						let cols = [];
						if(this.show.competencies && this.$refs.competencyChart && this.$refs.competencyChart.chart)
							cols.push({
								image: this.$refs.competencyChart.chart.toBase64Image(),
								width: 200
							});
						else
							cols.push({ text: '', width: '*' });

						if(this.show.milestones && this.$refs.milestoneChart && this.$refs.milestoneChart.chart)
							cols.push({
								image: this.$refs.milestoneChart.chart.toBase64Image(),
								width: 200
							});
						else
							cols.push({ text: '', width: '*' });

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
						if (this.$refs.timeChart && this.$refs.timeChart.chart) {
							charts.push({
								pageBreak: 'before',
								image: this.$refs.timeChart.chart.toBase64Image(),
								width: 550
							});
						}

						if (this.show.competencies && this.$refs.competencyChart && this.$refs.competencyChart.chart) {
							charts.push({
								pageBreak: 'before',
								image: this.$refs.competencyChart.chart.toBase64Image(),
								width: 550
							});
						}

						if (this.show.milestones && this.$refs.milestoneChart && this.$refs.milestoneChart.chart) {
							charts.push({
								image: this.$refs.milestoneChart.chart.toBase64Image(),
								width: 550,
								pageBreak: 'after'
							});
						}
					}
					content.push(...charts);
				}

				content.push(
					{ text: 'Comments', style: 'heading' },
					borderedStripedTable({
						table: {
							headerRows: 1,
							widths: ['auto', 'auto', 'auto', 'auto', '*'],
							body: JSON.parse(JSON.stringify([
								this.commentsThead[0].map(tableHeader),
								...this.commentsData
							]))
						}
					})
				);

				let docDefinition = {
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
				handleError(err, this, `There was a problem exporting the report for ${this.report.subjects[this.subjectId]}`);
			});

		},
		getEvaluatorName(evaluation, lastProp = 'last_name', firstProp = 'first_name') {
			if (evaluation.visibility === 'visible' || this.showAnonymous) {
				return `${evaluation[lastProp]}, ${evaluation[firstProp]}`;
			} else {
				return 'Anonymous';
			}
		}
	},

	components: {
		HighlightedQuestion,
		BootstrapAlert,
		BootstrapButtonInput,
		ChartjsChart,
		DataTable,
		SvgIcon
	}
};

function getWeightedResponseValue(response) {
	return (response.response * response.weight) / 100;
}
</script>

<style scoped>
	.individual-report section {
		margin: 2em 0 0;
	}
</style>
