import Vue from 'vue';

import AlertList from '@/vue-components/AlertList.vue';
import ComponentList from '@/vue-components/ComponentList.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import DataTable from '@/vue-components/DataTable.vue';
import RichDate from '@/vue-components/RichDate.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';
import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';

import FormBuilder from '@/vue-components/FormBuilder/FormBuilder.vue';
import FormReader from '@/vue-components/FormReader/FormReader.vue';

import moment from 'moment';

import {
	getEvaluationStatusLabel
} from '@/modules/datatable-utils.js';
import {
	isoDateStringObject,
	currentYear,
	renderDate,
	renderDateTime,
	renderDateRange
} from '@/modules/date-utils.js';
import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	ucfirst
} from '@/modules/utils.js';

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
				viewedEvaluation: null,

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
			formFields() {
				return [
					'id',
					'title',
					'created'
				];
			},
			formFieldAccessors() {
				return {
					created(form, action) {
						if (action === 'sort')
							return moment(form.created_at).valueOf();

						return renderDate(form.created_at);
					}
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
			renderDateTime,
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
						],
						form: [
							'title'
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

			toggleFormStatus(form) {
				const newStatus = form.status === 'active'
					? 'inactive'
					: 'active';

				fetch(`/faculty360/forms/${form.id}`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						status: newStatus
					})
				}).then(okOrThrow).then(() => {
					this.fetchForms();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem changing the form status'
					});
				});
			},
			toggleEvaluationStatus(evaluation, event) {
				event.preventDefault();

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
			resendEvaluationHash(evaluation, event) {
				event.preventDefault();

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
			viewEvaluation(evaluation, event) {
				if (event.defaultPrevented)
					return;

				this.viewedEvaluation = evaluation;
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
			RichDate,
			RichDateRange,
			AcademicYearSelector,

			FormBuilder,
			FormReader
		}
	});
}
