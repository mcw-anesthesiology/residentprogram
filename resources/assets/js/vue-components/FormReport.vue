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

		<div v-if="report">
			<h2 v-if="report.formContents.title">
				{{ report.formContents.title }}
			</h2>
			<template v-for="item of report.formContents.items">
				<div v-if="item.type === 'question'"
						:class="`question panel ${item.required ? 'panel-primary' : 'panel-default'}`">
					<div v-if="item.text" class="question-header panel-heading">
						<h3 class="question-title panel-title">
							<b>{{ item.id }}: </b>
							{{ item.text }}
						</h3>
					</div>

					<div class="question-body panel-body">
						<div v-for="option of item.options" class="question-option">
							<label>
								<span title="{{ option.description }}">
									<input v-if="item.type === 'checkbox'" type="checkbox"
										:name="`${item.id}[]`" :value="option.value"
										:required="item.required" />
									<input v-if="['radio', 'radiononnumeric'].includes(item.type)"
										type="radio" :name="item.id" :value="option.value"
										:required="item.required" />
									<br />
									{{ option.text }}
								</span>
							</label>
							<div v-if="option.description" class="description well collapse">
								{{ nl2br(option.description) }}
							</div>
						</div>
					</div>
				</div>
				<div v-if="item.type === 'instruction'">

				</div>
			</template>
		</div>
	</div>
</template>

<script>
import ReportDate from './ReportDate.vue';
import SelectTwo from './SelectTwo.vue';

import { nl2br } from '../modules/utils.js';

export default {
	props: {
		groupedUsers: {
			type: Array
		}
	},
	data(){
		return {
			dates: {
				startDate: '2015-11-01', // FIXME
				endDate: '2016-11-01' // FIXME
			},
			formId: 0,
			subjectId: 0,
			report: null,

			groupedForms: []
		};
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
			const csrfToken = document.querySelector('meta[name="csrf-token"]')
				.getAttribute('content');

			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('X-Requested-With', 'XMLHttpRequest');
			headers.append('X-CSRF-TOKEN', csrfToken);

			fetch('/report/form', {
				method: 'POST',
				headers: headers,
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
		},
		nl2br
	},

	components: {
		ReportDate,
		SelectTwo
	}
}
</script>
