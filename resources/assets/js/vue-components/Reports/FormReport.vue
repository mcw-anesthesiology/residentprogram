<template>
	<div>
		<div class="container body-block">
			<start-end-date v-model="dates" />
			<label class="containing-label">
				Form
				<select-two class="form-control" :options="groupedForms"
						v-model="formId"></select-two>
			</label>
			
			<alert-list v-model="alerts" />
			
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>

		<div v-if="report" class="container body-block">
			
			<bootstrap-alert v-if="report.evals.length > 0" type="info">
				
				<div class="row">
					<div class="col-md-8">
						<h2>
							{{ report.evals.length }} evaluations
						</h2>
					</div>
					<div class="col-md-4 text-right">
						<show-hide-button class="btn btn-info"
								v-model="show.allEvals">
							all
						</show-hide-button>
					</div>
				</div>
				
				<data-table v-if="show.allEvals" :bordered="false"
					:thead="evalsThead" :config="allEvalsConfig" />

			</bootstrap-alert>
			<bootstrap-alert v-else type="warning"
				:text="`No evaluations found for ${report.formContents.title} in report parameters.`" />
			
			<section>
				<label class="containing-label">
					User
					<select-two class="form-control" :options="groupedUsers"
							v-model="subjectId">
						<option value="">All</option>
					</select-two>
				</label>
				
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
						
						<data-table v-if="show.subjectEvals" :bordered="false"
							:thead="evalsThead" :config="subjectEvalsConfig" />

					</bootstrap-alert>
					<bootstrap-alert v-else type="warning"
						:text="`No evaluations found for ${subject.full_name} in report parameters.`" />
				</section>
			</section>
			
			<h2 class="form-title" v-if="reportContents.title">
				{{ reportContents.title }}
			</h2>
			<template v-for="item of reportContents.items">
				<form-report-question v-if="item.type === 'question'" v-bind="item" />
				<div v-if="item.type === 'instruction'">

				</div>
			</template>
		</div>
	</div>
</template>

<script>
import StartEndDate from '../StartEndDate.vue';
import SelectTwo from '../SelectTwo.vue';
import FormReportQuestion from './FormReportQuestion.vue';
import DataTable from '../DataTable.vue';
import BootstrapAlert from '../BootstrapAlert.vue';
import AlertList from '../AlertList.vue';
import ShowHideButton from '../ShowHideButton.vue';

import { getFetchHeaders, fetchFormGroups } from '../../modules/utils.js';
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
			dates: {
				startDate: null,
				endDate: null
			},
			formId: null,
			subjectId: null,
			report: null,

			groupedForms: [],
			
			show: {
				allEvals: false,
				subjectEvals: false
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
				ajax: {
					url: '/evaluations',
					data: {
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
					{data: "request_date", render: renderDateCell, createdCell: createDateCell},
					{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: "status", render: renderEvaluationStatus}
				],
				order: [[0, 'desc']]
			};
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
		}
	},

	components: {
		StartEndDate,
		SelectTwo,
		FormReportQuestion,
		DataTable,
		BootstrapAlert,
		AlertList,
		ShowHideButton
	}
};
</script>

<style scoped>
	h2 {
		margin-top: 0;
	}
	
	h2.form-title {
		margin: 60px 0 20px;
	}
</style>
