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
			<form-reader v-bind="report.formContents" />
		</div>
	</div>
</template>

<script>
import FormReader from './FormReader.vue';
import ReportDate from './ReportDate.vue';
import SelectTwo from './SelectTwo.vue';

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
		}
	},

	components: {
		FormReader,
		ReportDate,
		SelectTwo
	}
}
</script>
