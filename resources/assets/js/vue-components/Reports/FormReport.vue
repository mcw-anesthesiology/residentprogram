<template>
	<div>
		<div class="container body-block">
			<report-date v-model="dates" />
			<label class="containing-label">
				User
				<select-two class="form-control" :options="groupedUsers"
						v-model="subjectId"></select-two>
			</label>
			<label class="containing-label">
				Form
				<select-two class="form-control" :options="groupedForms"
						v-model="formId"></select-two>
			</label>
			<button type="button" class="btn btn-lg btn-primary"
					@click="runReport">
				Run report
			</button>
		</div>

		<div v-if="report" class="container body-block">
			<h2 v-if="reportContents.title">
				{{ reportContents.title }}
			</h2>
			<template v-for="item of reportContents.items">
				<form-report-question v-if="item.type === 'question'" v-bind="item" />
				<div v-if="item.type === 'instruction'">

				</div>
			</template>
		</div>

		<div v-if="report" class="container body-block">
			<h3 class="sub-header">Evaluations included in report</h3>
			<ul class="list-group row">
				<li v-for="evalId of report.subjectEvals" class="list-group-item col-md-6">
					<a :href="`/evaluations/${evalId}`">
						{{ evalId }}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import ReportDate from './ReportDate.vue';
import SelectTwo from '../SelectTwo.vue';
import FormReportQuestion from'./FormReportQuestion.vue';

import { getFetchHeaders } from '../../modules/utils.js';

export default {
	props: {
		groupedUsers: {
			type: Array
		}
	},
	data(){
		return {
			dates: {
				startDate: '2015-08-01', // FIXME
				endDate: '2016-11-01' // FIXME
			},
			formId: 27, // FIXME
			subjectId: 205, // FIXME
			report: null,

			groupedForms: []
		};
	},

	computed: {
		reportContents(){
			let reportContents = this.report.formContents;

			reportContents.items.map(item => {
				item.weight = Number(item.weight);
				item.subjectResponses = this.report.subjectResponses[item.id];
				item.averageResponses = this.report.averageResponses[item.id];
				item.subjectResponseValues = this.report.subjectResponseValues[item.id];

				if(item.type === 'question' && ['checkbox', 'radio', 'radiononnumeric']
						.includes(item.questionType)){
					item.options.map(option => {
						option.responses = this.report.subjectResponses[item.id][option.value];
						option.percentage = this.report.subjectPercentages[item.id][option.value];
						option.averagePercentage = this.report.averagePercentages[item.id][option.value];
					});
				}
			});

			return reportContents;
		}
	},

	created(){
		fetchFormGroups().then(groupedForms => {
			this.groupedForms = groupedForms;
		}).catch(err => {
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
					'form_id': this.formId,
					subject: this.subjectId
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error();
			}).then(report => {
				this.report = Object.assign({}, this.report, report);
			}).catch(err => {
				console.error(err);
			});
		}
	},

	components: {
		ReportDate,
		SelectTwo,
		FormReportQuestion
	}
}
</script>
