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
					<div class="form-group">
						<label class="containing-label">
							User
							<select-two class="form-control" :options="groupedUsers"
									v-model="subjectId">
								<option value="">All</option>
							</select-two>
						</label>
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
			
			<button type="button" class="btn btn-default"
					v-if="this.reportContents && this.reportContents.items.length > 0"
					@click="exportPdf">
				Export PDF
				<svg-icon src="/img/icons/pdf.svg" />
			</button>
			
			<h2 class="form-title" v-if="reportContents.title">
				{{ reportContents.title }}
			</h2>
			<template v-for="item of reportContents.items">
				<form-report-question v-if="item.type === 'question'" v-bind="item" />
				<div v-if="item.type === 'instruction'">

				</div>
			</template>
			<hr />
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import StartEndDate from '../StartEndDate.vue';
import SelectTwo from '../SelectTwo.vue';
import FormReportQuestion from './FormReportQuestion.vue';
import DataTable from '../DataTable.vue';
import BootstrapAlert from '../BootstrapAlert.vue';
import AlertList from '../AlertList.vue';
import ShowHideButton from '../ShowHideButton.vue';
import SvgIcon from '../SvgIcon.vue';

import {
	getFetchHeaders,
	jsonOrThrow,
	fetchFormGroups
} from '../../modules/utils.js';
import {
	isoDateStringObject,
	currentQuarter,
	renderDateRange
} from '../../modules/date-utils.js';
import {
	tableHeader,
	fullWidthTable,
	borderedStripedTable
} from '../../modules/report-utils.js';
import {
	renderDateCell,
	createDateCell,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell,
	renderEvaluationStatus
} from '../../modules/datatable-utils.js';

export default {
	props: {
		users: {
			type: Array
		},
		groupedUsers: {
			type: Array
		}
	},
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			formId: null,
			subjectId: null,
			report: null,

			groupedForms: [],
			subjectEvals: [],
			
			show: {
				allEvals: false,
				subjectEvals: false
			},
			
			pdfOptions: {
				questionPageBreak: null
			},
			
			alerts: []
		};
	},

	computed: {
		subject(){
			if(this.subjectId)
				return this.users.find(user => user.id === Number(this.subjectId));
		},
		reportContents(){
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
						option.averagePercentage = this.report.averagePercentages[item.id]
							? this.report.averagePercentages[item.id][option.value]
							: 0;
					});
				}
			});

			return reportContents;
		},
		
		evalsThead(){
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
		allEvalsConfig(){
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
		subjectEvalsConfig(){
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
		subjectId(subjectId){
			let query = $.param({
				id: this.report.subjectEvals[subjectId].slice(),
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
			});
		}
	},

	created(){
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
		runReport(){
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
		exportPdf(){
			if(!this.reportContents || this.reportContents.items.length < 1)
				return;
				
			let hasSubject = (this.report.subjectEvals[this.subjectId]
				&& this.report.subjectEvals[this.subjectId].length > 0);
			
			Promise.all([
				import('pdfmake/build/pdfmake.js'),
				import('../../vfs_fonts.json')
			]).then(([pdfmake, vfs]) => {
				pdfmake.vfs = vfs;
				
				const filename = `${this.reportContents.title} - ${this.dates.startDate} -- ${this.dates.endDate}.pdf`;
				
				let content = [
					{ text: 'Form Report', style: 'h1' },
					{
						table: fullWidthTable({
							headerRows: 1,
							body: [
								['Form', 'Start date', 'End date'].concat(
									hasSubject
										? ['Subject']
										: []
								).map(tableHeader),
								[
									this.reportContents.title,
									this.dates.startDate,
									this.dates.endDate
								].concat(hasSubject
									? [this.subject.full_name]
									: []
								)
							]
						})
					},
					
					{ text: `Evaluations for ${this.subject.full_name} included in report`, style: 'h2'},
					borderedStripedTable({
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
								],
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
								])
							]
						}
					}),
					
					{ text: this.reportContents.title, style: 'h2' },
					{
						margin: 0,
						type: 'none',
						ol: this.reportContents.items.filter(item =>
								item.type === 'question').map(item => {
							let questionHeading = {
								margin: [0, 20, 0, 5],
								columns: [
									{
										width: 'auto',
										margin: [0, 0, 5, 0],
										text: `${item.id.toUpperCase()}: `,
										fontSize: 16,
										bold: true
									},
									{
										width: '*',
										text: item.text,
										fontSize: 16
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
													option.value
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
												]))
											)
										}
									});
									break;
								case 'text':
									if(hasSubject && item.subjectResponseValues)
										questionBody = {
											table: {
												headerRows: 1,
												widths: ['auto', 'auto', 'auto', '*'],
												body: [
													[
														'Evaluation',
														'Evaluator',
														'Evaluation date',
														'Response'
													].map(tableHeader)
												].concat(
													Object.keys(item.subjectResponseValues).map(evaluation => [
														evaluation,
														'', // FIXME
														'', // FIXME
														item.subjectResponseValues[evaluation]
													])
												)
											}
										};
									break;
							}
							
							return {
								pageBreak: this.pdfOptions.questionPageBreak,
								stack: [
									questionHeading,
									questionBody
								]
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
							fontSize: 24,
							margin: [0, 20],
						},
						h2: {
							bold: true,
							fontSize: 20,
							margin: [0, 10]
						},
						tableHeader: {
							bold: true,
							fontSize: 14
						}
					}
				};
				
				console.log(content);
				
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
