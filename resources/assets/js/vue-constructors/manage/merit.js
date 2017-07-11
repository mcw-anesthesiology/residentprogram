import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import ComponentList from 'vue-components/ComponentList.vue';
import JsonSchemaEditor from 'vue-components/JsonSchemaEditor.vue';
import SelectTwo from 'vue-components/SelectTwo.vue';

import MeritFormListItem from 'vue-components/Manage/Merit/FormListItem.vue';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

const reportTypeFormsKey = 'reportTypeForms';

export default function createManageMerit(el, propsData) {
	return new Vue({
		el,
		props: {
			meritReportTypes: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				meritForms: [],
				meritReportTypeForms: {},

				pastMeritForms: null,
				merit: null,
				alerts: []
			};
		},
		propsData,

		mounted() {
			this.fetchMerits();
			this.fetchReportTypeForms();
		},

		computed: {
			formFields() {
				return [
					'id',
					'name'
				];
			},
			groupedMeritForms() {
				let forms = new Map();
				this.meritForms.map(form => {
					let nameForms = [];
					if (forms.has(form.name))
						nameForms = forms.get(form.name);

					nameForms.push(form);
					forms.set(form.name, nameForms);
				});

				for (let name of forms.keys()) {
					let nameForms = forms.get(name);
					nameForms.sort((a, b) => Number(b.version) - Number(a.version));
					forms.set(name, nameForms);
				}

				return Array.from(forms.values());
			},
			currentForms() {
				return this.groupedMeritForms.map(forms => forms[0]);
			}
		},

		methods: {
			fetchMerits() {
				fetch('/merit-forms', {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(meritForms => {
					this.meritForms = meritForms;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit forms'
					});
				});
			},
			fetchReportTypeForms() {
				fetch(`/setting/${reportTypeFormsKey}`, {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(response => {
					if (response.ok)
						return response.json();

					if (response.status === 404)
						return {};

					throw Error(response.statusText);
				}).then(reportTypeForms => {
					this.meritReportTypeForms = reportTypeForms;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit report type forms'
					});
				});
			},
			addMerit() {
				this.merit = {
					name: null,
					version: 0,
					form: null
				};
			},
			editMeritForm(forms) {
				this.pastMeritForms = Array.slice(forms);
				let currentForm = forms[0];
				this.merit = {
					id: currentForm.id,
					name: currentForm.name,
					version: currentForm.version,
					form: null
				};
			},
			handleMeritSubmit(form) {
				let merit = Object.assign({}, this.merit, {form});
				merit.version++;

				fetch('/merit-forms', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify(merit)
				}).then(response => {
					if (!response.ok)
						throw Error(response.statusText);

					this.merit = null;
					this.fetchMerits();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the merit form'
					});
				});
			},
			removeMeritForms(forms) {
				let reportTypeRemovalPromises = [];
				let formRemovalPromises = [];

				formRemovalPromises = forms.map(form => {
					return fetch(`/merit-forms/${form.id}`, {
						method: 'POST', // DELETE
						headers: getFetchHeaders(),
						credentials: 'same-origin',
						body: JSON.stringify({
							_method: 'DELETE'
						})
					}).then(response => {
						if (!response.ok)
							throw Error(response.statusText);

						for (let reportType in this.meritReportTypeForms) {
							let form = this.meritReportTypeForms[reportType];

							if (Number(form.id) === Number(form))
								reportTypeRemovalPromises.push(
									fetch(`/setting/${reportTypeFormsKey}.${reportType}`, {
										method: 'POST', // DELETE
										headers: getFetchHeaders(),
										credentials: 'same-origin',
										body: JSON.stringify({
											_method: 'DELETE'
										})
									})
								);
						}


					}).catch(err => {
						console.error(err);
						this.alerts.push({
							type: 'error',
							html: '<strong>Error:</strong> There was a problem removing the merit form'
						});
					});
				});

				if (formRemovalPromises.length > 0) {
					Promise.all(formRemovalPromises).then(() => {
						this.fetchMerits();

						if (reportTypeRemovalPromises.length > 0) {
							Promise.all(reportTypeRemovalPromises).then(() => {
								this.fetchReportTypeForms();
							});
						}
					});
				}
			},
			handleReportTypeInput(reportType, formName) {
				if (!formName || formName === this.meritReportTypeForms[reportType])
					return;

				fetch(`/setting/${reportTypeFormsKey}.${reportType}`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						value: formName
					})
				}).then(response => {
					if (!response.ok)
						throw Error(response.statusText);

					this.fetchReportTypeForms();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving report type form'
					});
				});
			},
			removeReportTypeForm(reportType) {
				fetch(`/setting/${reportTypeFormsKey}.${reportType}`, {
					method: 'POST', // DELETE
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(response => {
					if (!response.ok)
						throw Error(response.statusText);

					this.fetchReportTypeForms();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem removing the type form'
					});
				});
			}
		},

		components: {
			AlertList,
			ComponentList,
			JsonSchemaEditor,
			SelectTwo,

			MeritFormListItem
		}
	});
}
