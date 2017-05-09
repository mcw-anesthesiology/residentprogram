import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import DataTable from 'vue-components/DataTable.vue';
import FormBuilder from 'vue-components/FormBuilder/FormBuilder.vue';

import {
	getFetchHeaders,
	jsonOrThrow,
	ucfirst
} from 'modules/utils.js';
import {
	renderDateTimeCell,
	createDateTimeCell
} from 'modules/datatable-utils.js';

export default function createManageFaculty360(el) {
	return new Vue({
		el,
		props: {

		},
		data() {
			return {
				forms: null,

				formToEdit: null,

				show: {
					createForm: false
				},

				alerts: []
			};
		},

		mounted() {
			this.fetchForms();
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
			}
		},

		methods: {
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
			DataTable,
			FormBuilder
		}
	});
}
