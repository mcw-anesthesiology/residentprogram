<template>
	<div>
		<div class="container body-block">
			<h1>Form report</h1>
			<start-end-date v-model="dates" />
			<div class="form-group">
				<label class="containing-label">
					Form
					<select-two class="form-control" :options="groupedForms"
					v-model="formId"></select-two>
				</label>
			</div>

			<alert-list v-model="alerts" />

			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>

		<div v-if="report" class="container body-block">
			<div class="report-evaluations">
				<bootstrap-alert v-if="report.evals.length > 0" type="info">

					<div class="row">
						<div class="col-md-8">
							<h2>
								{{ report.evals.length }} total form evaluations
							</h2>
						</div>
						<div class="col-md-4 text-right">
							<show-hide-button class="btn btn-info"
									v-model="show.allEvals">
								all
							</show-hide-button>
						</div>
					</div>

					<data-table v-if="show.allEvals"
						:thead="evalsThead" :config="allEvalsConfig" />

				</bootstrap-alert>
				<bootstrap-alert v-else type="warning"
					:text="`No evaluations found for ${report.formContents.title} in report parameters.`" />

				<section>
					<div class="form-horizontal">

						<div class="form-group">
							<div class="col-sm-10">
								<label class="containing-label">
									User
									<select-two class="form-control" :options="groupedUsers"
											v-model="subjectId">
										<option value="">All</option>
									</select-two>
								</label>
							</div>
							<div class="col-sm-2">
								<button type="button" v-if="subjectId"
										class="btn btn-default labelless-button"
										@click="subjectId = null">
									Clear user
								</button>
							</div>
						</div>
					</div>

					<section v-if="subjectId">
						<bootstrap-alert type="info"
								v-if="report.subjectEvals[subjectId] && report.subjectEvals[subjectId].length > 0">

							<div class="row">
								<div class="col-md-8">
									<h2>
										{{ report.subjectEvals[subjectId].length }}
										{{ subject.full_name }} evaluations
									</h2>
								</div>
								<div class="col-md-4 text-right">
									<show-hide-button class="btn btn-info"
											v-model="show.subjectEvals">
										all
									</show-hide-button>
								</div>
							</div>

							<data-table v-if="subjectEvals && show.subjectEvals"
								:thead="evalsThead" :data="subjectEvals"
								:config="subjectEvalsConfig" />

						</bootstrap-alert>
						<bootstrap-alert v-else type="warning"
							:text="`No evaluations found for ${subject.full_name} in report parameters.`" />
					</section>
				</section>
			</div>

			<div class="text-center">
				<button type="button" class="btn btn-default"
						@click="runAllCsvReports">
					Export all to CSV
				</button>
			</div>

			<div v-if="this.reportContents && this.subjectId && this.reportContents.items.length > 0"
					class="panel panel-default">
				<div class="panel-body">
					<fieldset>
						<legend>
							Evaluation list style
						</legend>

						<label>
							<input type="radio" value="details"
								v-model="pdfOptions.evaluationListStyle" />
							Detailed
						</label>
						<label>
							<input type="radio" value="summary"
								v-model="pdfOptions.evaluationListStyle" />
							Summary
						</label>
					</fieldset>

					<div class="text-center">
						<button type="button" class="btn btn-default"
								@click="exportPdf">
							Export PDF
							<svg-icon src="/img/icons/pdf.svg" />
						</button>


						<button type="button" class="btn btn-default"
								@click="runCsvReport">
							Export CSV
						</button>
					</div>
				</div>
			</div>

			<h2 class="form-title" v-if="reportContents.title">
				{{ reportContents.title }}
			</h2>
			<form-report-question v-for="(question, index) of reportQuestions"
				:key="index"
				v-bind="question"
				:hide="hideQuestions[index]"
				:score-question="scoreQuestions[index]"
				:custom-option-values="customOptionValues[index]"
				:disregard-option="disregardOption[index]"
				@hide="hideQuestion(index, arguments[0])"
				@score-question="scoreQuestion(index, arguments[0])"
				@custom-option="handleCustomOption(index, arguments[0])"
				@disregard-option="handleDisregardOption(index, arguments[0])" />
			<hr />
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import round from 'lodash/round';

import StartEndDate from '../StartEndDate.vue';
import SelectTwo from '../SelectTwo.vue';
import FormReportQuestion from './FormReportQuestion.vue';
import DataTable from '../DataTable.vue';
import BootstrapAlert from '../BootstrapAlert.vue';
import AlertList from '../AlertList.vue';
import ShowHideButton from '../ShowHideButton.vue';
import SvgIcon from '../SvgIcon.vue';

import {
	canScoreQuestion,
	valuesForAllOptions,
	getResponseValue,
	getResponseValues,
	generateScoresReportCsv
} from 'modules/reports/form-report.js';

import {
	average,
	standardDeviation
} from 'modules/math-utils.js';
import {
	getFetchHeaders,
	jsonOrThrow,
	fetchFormGroups
} from 'modules/utils.js';
import {
	isoDateStringObject,
	currentQuarter,
	renderDateRange
} from 'modules/date-utils.js';
import {
	downloadCsv,
	tableHeader,
	pdfmakeStyle,
	fullWidthTable,
	borderedStripedTable,
	CUSTOM_OPTION_VALUES,
	DISREGARD_OPTION
} from 'modules/report-utils.js';
import {
	renderDateCell,
	createDateCell,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell,
	renderEvaluationStatus
} from 'modules/datatable-utils.js';

export default {
	props: {
		users: {
			type: Array
		},
		groupedUsers: {
			type: Array
		}
	},
	data() {
		return {
			dates: isoDateStringObject(currentQuarter()),
			formId: null,
			subjectId: null,
			report: null,

			groupedForms: [],
			subjectEvals: [],

			hideQuestions: [],
			scoreQuestions: [],
			customOptionValues: [],
			disregardOption: [],

			show: {
				allEvals: false,
				subjectEvals: false
			},

			pdfOptions: {
				questionPageBreak: null,
				evaluationListStyle: 'details'
			},

			alerts: []
		};
	},

	computed: {
		subject() {
			if(this.subjectId)
				return this.users.find(user => user.id === Number(this.subjectId));
		},
		reportContents() {
			let reportContents = this.report.formContents;

			reportContents.items.map(item => {
				item.weight = Number(item.weight);
				if(this.subjectId && this.report.subjectEvals[this.subjectId]){
					item.subjectResponses = this.report.subjectResponses[this.subjectId]
						? this.report.subjectResponses[this.subjectId][item.id]
						: null;
					item.subjectResponseValues = this.report.subjectResponseValues[this.subjectId]
						? this.report.subjectResponseValues[this.subjectId][item.id]
						: null;
				}
				else {
					item.subjectResponses = null;
					item.subjectResponseValues = null;
				}

				item.averageResponses = this.report.averageResponses[item.id];

				if(item.type === 'question' && ['checkbox', 'radio', 'radiononnumeric']
						.includes(item.questionType)){
					item.options.map(option => {
						if(this.subjectId && this.report.subjectEvals[this.subjectId]){
							option.responses = this.report.subjectResponses[this.subjectId]
								? this.report.subjectResponses[this.subjectId][item.id][option.value]
								: 0;
							option.percentage = this.report.subjectPercentages[this.subjectId]
								? this.report.subjectPercentages[this.subjectId][item.id][option.value]
								: 0;
						}
						else {
							option.responses = null;
							option.percentage = null;
						}
						option.averagePercentage = this.report.averagePercentages[item.id]
							? this.report.averagePercentages[item.id][option.value]
							: 0;
					});
				}
			});

			return reportContents;
		},
		reportQuestions() {
			if (!this.reportContents || !this.reportContents.items)
				return [];

			let questions = this.reportContents.items.filter(item => item.type === 'question');
			this.hideQuestions = Array(questions.length).fill(false);

			return questions;
		},

		evalsThead() {
			return [[
				'#',
				'Subject',
				'Evaluator',
				'Requested By',
				'Form',
				'Evaluation Date',
				'Request Date',
				'Complete Date',
				'Status'
			]];
		},
		allEvalsConfig() {
			return {
				ajax: {
					url: '/evaluations',
					data: {
						id: this.report.evals.slice(),
						with: {
							subject: [
								'full_name'
							],
							evaluator: [
								'full_name'
							],
							requestor: [
								'full_name'
							],
							form: [
								'title'
							]
						}
					},
					dataSrc: ''
				},
				columns: [
					{data: 'url'},
					{data: 'subject.full_name'},
					{data: 'evaluator.full_name'},
					{data: 'requestor.full_name'},
					{data: 'form.title'},
					{
						data: null,
						render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
						createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
					},
					{data: 'request_date', render: renderDateCell, createdCell: createDateCell},
					{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: 'status', render: renderEvaluationStatus}
				],
				order: [[0, 'desc']]
			};
		},
		subjectEvalsConfig() {
			return {
				columns: [
					{data: 'url'},
					{data: 'subject.full_name'},
					{data: 'evaluator.full_name'},
					{data: 'requestor.full_name'},
					{data: 'form.title'},
					{
						data: null,
						render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
						createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
					},
					{data: "request_date", render: renderDateCell, createdCell: createDateCell},
					{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: "status", render: renderEvaluationStatus}
				],
				order: [[0, 'desc']]
			};
		}
	},
	watch: {
		subjectId() {
			this.fetchSubjectEvals();
		},
		report(report) {
			this.fetchSubjectEvals();
			this.hideQuestions = Array(report.formContents.items.length)
				.fill(false);
			this.scoreQuestions = Array(report.formContents.items.length)
				.fill(true);
			this.customOptionValues = Array(report.formContents.items.length)
				.fill(CUSTOM_OPTION_VALUES.get('faculty'));
			this.disregardOption = Array(report.formContents.items.length)
				.fill(DISREGARD_OPTION.get('faculty'));
		}
	},

	created() {
		fetchFormGroups().then(groupedForms => {
			this.groupedForms = groupedForms;
		}).catch(err => {
			this.alerts.push({
				type: 'error',
				html: '<strong>Error: </strong> There was a problem fetching the list of forms'
			});
			console.error(err);
		});
	},

	methods: {
		runCsvReport() {
			let csv = generateScoresReportCsv(
				this.report,
				[this.subject],
				this.hideQuestions,
				this.scoreQuestions,
				this.customOptionValues,
				this.disregardOption
			);

			downloadCsv(
				csv,
				`${this.report.formContents.title} - ${this.subject.full_name}`,
				this.dates
			);
		},
		runAllCsvReports() {
			let subjects = Object.keys(this.report.subjectResponses).map(subjectId => {
				let subject = this.users.find(user => user.id === Number(subjectId));
				let full_name = subject
					? subject.full_name
					: `User # ${subjectId}`;
				return {
					id: subjectId,
					full_name
				};
			});

			let csv = generateScoresReportCsv(
				this.report,
				subjects,
				this.hideQuestions,
				this.scoreQuestions,
				this.customOptionValues,
				this.disregardOption
			);

			downloadCsv(csv, `${this.report.formContents.title} - Aggregate`, this.dates);

		},
		runReport() {
			fetch('/report/form', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					'form_id': this.formId
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response.statusText);
			}).then(report => {
				this.report = Object.assign({}, this.report, report);
			}).catch(err => {
				this.alerts.push({
					type: 'error',
					html: '<strong>Error: </strong> There was a problem running the report'
				});
				console.error(err);
			});
		},
		fetchSubjectEvals() {
			if(!this.subjectId || !this.report || !this.report.subjectEvals || !this.report.subjectEvals[this.subjectId]){
				this.subjectEvals = [];
				return;
			}

			let query = $.param({
				id: this.report.subjectEvals[this.subjectId].slice(),
				with: {
					subject: [
						'full_name'
					],
					evaluator: [
						'full_name'
					],
					requestor: [
						'full_name'
					],
					form: [
						'title'
					]
				}
			});

			fetch(`/evaluations?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
			}).then(jsonOrThrow).then(subjectEvals => {
				this.subjectEvals = subjectEvals;
			}).catch(err => {
				console.error(err);
			});
		},
		hideQuestion(questionIndex, hide) {
			let hideQuestions = this.hideQuestions.slice();
			hideQuestions.splice(questionIndex, 1, hide);

			this.hideQuestions = hideQuestions;
		},
		scoreQuestion(questionIndex, score) {
			let scoreQuestions = this.scoreQuestions.slice();
			scoreQuestions.splice(questionIndex, 1, score);

			this.scoreQuestions = scoreQuestions;
		},
		handleCustomOption(questionIndex, questionCustomOptionValues) {
			let customOptionValues = this.customOptionValues.slice();
			customOptionValues.splice(questionIndex, 1, questionCustomOptionValues);

			this.customOptionValues = customOptionValues;
		},
		handleDisregardOption(questionIndex, questionDisregardOption) {
			let disregardOption = this.disregardOption.slice();
			disregardOption.splice(questionIndex, 1, questionDisregardOption);

			this.disregardOption = disregardOption;
		},
		exportPdf() {
			if(!this.reportContents || this.reportContents.items.length < 1)
				return;

			let hasSubject = (this.report.subjectEvals[this.subjectId]
				&& this.report.subjectEvals[this.subjectId].length > 0);

			Promise.all([
				import('pdfmake/build/pdfmake.js'),
				import('../../vfs_fonts.json')
			]).then(([pdfmake, vfs]) => {
				pdfmake.vfs = vfs;

				const filename = hasSubject
					? `${this.subject.full_name} - ${this.reportContents.title} - ${this.dates.startDate} -- ${this.dates.endDate}.pdf`
					: `${this.reportContents.title} - ${this.dates.startDate} -- ${this.dates.endDate}.pdf`;

				let evalCounts = {
					subjectRequested: 0,
					otherRequested: 0,
					total: 0
				};
				if (this.pdfOptions.evaluationListStyle === 'summary') {
					for (let evaluation of this.subjectEvals) {
						if (evaluation.requested_by_id === evaluation.subject_id)
							evalCounts.subjectRequested++;
						else
							evalCounts.otherRequested++;

						evalCounts.total++;
					}
				}

				let content = [
					{
						text: hasSubject
							? `${this.reportContents.title} - Summary of evaluations for ${this.subject.full_name}`
							: `${this.reportContents.title} - Summary of evaluations`,
						style: 'h1'
					},
					{
						table: fullWidthTable({
							headerRows: 1,
							body: [
								(hasSubject
									? ['Subject']
									: []).concat(
										['Form', 'Start date', 'End date']
									).map(tableHeader),
								(hasSubject
									? [this.subject.full_name]
									: []).concat([
										this.reportContents.title,
										this.dates.startDate,
										this.dates.endDate
									]).map(pdfmakeStyle('tableBody'))
							]
						})
					},

					{ text: `Evaluations included in report`, style: 'h2'},
					this.pdfOptions.evaluationListStyle === 'summary'
						? {
							ul: [
								`${evalCounts.subjectRequested} requested by ${hasSubject ? this.subject.full_name : 'subject'}`,
								`${evalCounts.otherRequested} requested by others`,
								`${evalCounts.total} total`
							]
						}
						: borderedStripedTable({
							table: {
								headerRows: 1,
								widths: [
									'auto',
									'auto',
									'auto',
									'*',
									'auto',
									'auto'
								],
								body: [
									[
										'#',
										'Evaluator',
										'Requested by',
										'Form',
										'Evaluation date',
										'Completed'
									].map(tableHeader),
									...this.subjectEvals.map(subjectEval => [
										subjectEval.id,
										subjectEval.evaluator.full_name,
										subjectEval.requestor.full_name,
										subjectEval.form.title,
										renderDateRange(
											subjectEval.evaluation_date_start,
											subjectEval.evaluation_date_end
										),
										moment(subjectEval.complete_date).calendar()
									]).map(row => row.map(pdfmakeStyle('tableBody')))
								]
							}
						}),

					{ text: this.reportContents.title, style: 'h2' },
					{
						margin: 0,
						type: 'none',
						ol: this.reportQuestions.map((question, index) =>
								Object.assign({}, question, {originalIndex: index})
							).filter((question, index) =>
								!this.hideQuestions[index]).map(item => {
							let questionHeading = this.hideQuestions.some(hide => hide)
								? {
									margin: [0, 20, 0, 5],
									text: item.text,
									style: 'questionText'
								}
								: {
									margin: [0, 20, 0, 5],
									columns: [
										{
											width: 'auto',
											margin: [0, 0, 5, 0],
											text: `${item.id.toUpperCase()}: `,
											bold: true,
											style: 'questionText'
										},
										{
											width: '*',
											text: item.text,
											style: 'questionText'
										}
									]
								};

							let questionBody = '';
							switch(item.questionType){
								case 'checkbox':
								case 'radio':
								case 'radiononnumeric':
									questionBody = borderedStripedTable({
										table: {
											headerRows: 2,
											widths: ['auto', 'auto', '*'].concat(
												hasSubject
													? ['*', '*']
													: []
											),
											body: [
												[
													{
														text: 'Option text',
														rowSpan: 2,
														style: 'tableHeader'
													},
													{
														text: 'Value',
														rowSpan: 2,
														style: 'tableHeader'
													},
													{
														text: 'Responses',
														colSpan: hasSubject
															? 3
															: null,
														style: 'tableHeader'
													}
												].concat(hasSubject
													? [
														{},
														{}
													]
													: []
												),
												[
													'',
													''
												].concat(hasSubject
													? [
														'Subject #',
														'Subject %'
													]
													: []
												).concat([
													'Overall %'
												]).map(tableHeader)
											].concat(
												item.options.map(option => [
													option.text,
													getResponseValue(option.value, this.customOptionValues[item.originalIndex])
												].concat(hasSubject
													? [
														option.responses || '',
														option.percentage
															? `${option.percentage}%`
															: ''
													]
													: []
												).concat([
													option.averagePercentage
														? `${option.averagePercentage}%`
														: ''
												])).map(row => row.map(pdfmakeStyle('tableBody')))
											)
										}
									});
									break;
								case 'text':
									if(hasSubject && item.subjectResponseValues)
										questionBody = borderedStripedTable({
											table: {
												headerRows: 1,
												widths: ['auto', 'auto', 'auto', '*'],
												body: [
													[
														'#',
														'Evaluator',
														'Date',
														'Response'
													].map(tableHeader)
												].concat(
													Object.keys(item.subjectResponseValues).map(evaluationId => [
														evaluationId,
														this.report.evaluators[evaluationId].full_name,
														renderDateRange(
															this.report.evaluations[evaluationId].evaluation_date_start,
															this.report.evaluations[evaluationId].evaluation_date_end
														),
														item.subjectResponseValues[evaluationId]
													]).map(row => row.map(pdfmakeStyle('tableBody')))
												)
											}
										});
									break;
							}

							return {
								pageBreak: this.pdfOptions.questionPageBreak,
								stack: [
									questionHeading,
									questionBody
								].concat((
									this.scoreQuestions[item.originalIndex]
									&& canScoreQuestion(item.questionType)
									&& valuesForAllOptions(item, this.customOptionValues[item.originalIndex], this.disregardOption[item.originalIndex])
								)
									? [{
										columns: [
											{
												table: {
													body: [
														['Total average'],
														[round(average(getResponseValues(
															this.report.averageResponses[item.id],
															this.customOptionValues[item.originalIndex],
															this.disregardOption[item.originalIndex]
														)), 2)]
													]
												}
											}
										].concat(hasSubject
											? [
												{
													table: {
														body: [
															['Subject average'],
															[round(average(getResponseValues(
																this.report.subjectResponses[this.subjectId][item.id],
																this.customOptionValues[item.originalIndex],
																this.disregardOption[item.originalIndex]
															)), 2)]
														]
													}
												},
												{
													table: {
														body: [
															['Subject standard deviation'],
															[round(standardDeviation(getResponseValues(
																this.report.subjectResponses[this.subjectId][item.id],
																this.customOptionValues[item.originalIndex],
																this.disregardOption[item.originalIndex]
															)), 2)]
														]
													}
												}
											]
											: []
										)
									}]
									: []
								)
							};
						})
					}
				];

				let docDefinition = {
					pageSize: 'LETTER',
					content,
					styles: {
						h1: {
							bold: true,
							fontSize: 20,
							margin: [0, 20],
						},
						h2: {
							bold: true,
							fontSize: 16,
							margin: [0, 10]
						},
						questionText: {
							fontSize: 11
						},
						tableHeader: {
							bold: true,
							fontSize: 10
						},
						tableBody: {
							fontSize: 8
						}
					}
				};

				pdfmake.createPdf(docDefinition).download(filename);
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: `<strong>Error:</strong> There was a problem exporting the report for ${this.reportContents.title}`
				});
			});
		}
	},

	components: {
		StartEndDate,
		SelectTwo,
		FormReportQuestion,
		DataTable,
		BootstrapAlert,
		AlertList,
		ShowHideButton,
		SvgIcon
	}
};
</script>

<style scoped>
	h2 {
		margin-top: 0;
	}

	h2.form-title {
		margin: 60px 0 20px;
		page-break-before: always;
	}

	.report-evaluations {
		page-break-inside: avoid;
	}

	hr {
		page-break-before: always;
	}

	@media print {
		.btn-lg-submit-container {
			display: none;
		}
	}
</style>
