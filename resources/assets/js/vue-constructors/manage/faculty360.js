import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import ComponentList from 'vue-components/ComponentList.vue';
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import DataTable from 'vue-components/DataTable.vue';
import StartEndDate from 'vue-components/StartEndDate.vue';

import FormBuilder from 'vue-components/FormBuilder/FormBuilder.vue';

import moment from 'moment';

import {
	renderDateTimeCell,
	createDateTimeCell,
	getEvaluationStatusLabel
} from 'modules/datatable-utils.js';
import {
	isoDateStringObject,
	currentYear,
	renderDateRange
} from 'modules/date-utils.js';
import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	ucfirst
} from 'modules/utils.js';

export default function createManageFaculty360(el) {
	return new Vue({
		el,
		props: {

		},
		data() {
			return {
				forms: null,
				evaluations: null,

				evaluationDates: isoDateStringObject(currentYear()),

				formToEdit: null,

				show: {
					createForm: false
				},

				alerts: []
			};
		},

		mounted() {
			this.fetchForms();
			this.fetchEvaluations();
		},

		computed: {
			formsThead() {
				return [[
					'Title',
					'Created',
					'Status',
					'View',
					'Action'
				]];
			},
			formsConfig() {
				return {
					columns: [
						{data: 'title'},
						{
							data: 'created_at',
							render: renderDateTimeCell,
							createdCell: createDateTimeCell
						},
						{
							data: 'status',
							render(status, type) {
								if (type === 'display') {
									let label = status === 'active'
										? 'label-success'
										: 'label-danger';

									return `<span class="status label ${label}">
											${ucfirst(status)}
										</span>`;
								}

								return status;
							}
						},
						{
							data: 'id',
							render(id, type) {
								if (type === 'display') {
									return `<a href="/faculty360/forms/${id}/view"
												target="_blank">
											View form
										</a>`;
								}

								return id;
							}
						},
						{
							data: null,
							orderable: false,
							searchable: false,
							render() {
								// TODO
								return 'TODO';
							}
						}
					]
				};
			},
			evaluationFields() {
				return [
					'id',
					'faculty',
					'evaluation_date'
				];
			},
			evaluationFieldAccessors() {
				return {
					faculty(evaluation) {
						return evaluation.subject.full_name;
					},
					evaluation_date(evaluation, action) {
						if (action === 'sort') {
							return moment(evaluation.evaluation_date_start).valueOf();
						}

						return renderDateRange(
							evaluation.evaluation_date_start,
							evaluation.evaluation_date_end
						);
					}
				};
			}
		},

		watch: {
			evaluationDates() {
				this.fetchEvaluations();
			}
		},

		methods: {
			ucfirst,
			renderDateRange,
			getEvaluationStatusLabel,
			fetchForms() {
				fetch('/faculty360/forms', {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(forms => {
					this.forms = forms;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching forms'
					});
				});
			},
			fetchEvaluations() {
				const query = $.param({
					evaluation_date_start: this.evaluationDates.startDate,
					evaluation_date_end: this.evaluationDates.endDate,
					with: {
						subject: [
							'full_name'
						]
					}
				});

				fetch(`/faculty360/evaluations?${query}`, {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(evals => {
					this.evaluations = evals;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching evaluations'
					});
				});
			},

			toggleEvaluationStatus(evaluation) {
				const newStatus = evaluation.status === 'disabled'
					? evaluation.complete_date !== null
						? 'completed'
						: 'pending'
					: 'disabled';

				fetch(`/faculty360/evaluations/${evaluation.id}`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						status: newStatus
					})
				}).then(okOrThrow).then(() => {
					this.fetchEvaluations();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: "<strong>Error:</strong> There was a problem changing the evaluation's status"
					});
				});
			},
			resendEvaluationHash(evaluation) {
				fetch(`/faculty360/evaluations/${evaluation.id}/send-new`, {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(okOrThrow).then(() => {
					this.alerts.push({
						type: 'success',
						text: 'New link sent successfully!'
					});
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem sending a new completion link'
					});
				});
			},


			handleFormSubmit(form) {
				fetch('/faculty360/forms', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify(form)
				}).then(jsonOrThrow).then(() => {
					this.show.createForm = false;
					this.fetchForms();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the form'
					});
				});
			}
		},

		components: {
			AlertList,
			ComponentList,
			ConfirmationButton,
			DataTable,
			StartEndDate,

			FormBuilder
		}
	});
}
