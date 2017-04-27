import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import ComponentList from 'vue-components/ComponentList.vue';
import JsonSchemaEditor from 'vue-components/JsonSchemaEditor.vue';
import SelectTwo from 'vue-components/SelectTwo.vue';

import MeritReportListItem from 'vue-components/Manage/Merit/ReportListItem.vue';

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
			reports() {
				return [
					
				];
			},
			formFields() {
				return [
					'id',
					'name'
				];
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
			removeMeritForm(formId) {
				fetch(`/merit-forms/${formId}`, {
					method: 'POST', // DELETE
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(response => {
					if (!response.ok)
						throw Error(response.statusText);
					
					let reportTypeRemovalPromises = [];
					
					for (let reportType in this.meritReportTypeForms) {
						let form = this.meritReportTypeForms[reportType];
						
						if (Number(formId) === Number(form))
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
					
					if (reportTypeRemovalPromises.length > 0) {
						Promise.all(reportTypeRemovalPromises).then(() => {
							this.fetchReportTypeForms();
						});
					}
					
					this.fetchMerits();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem removing the merit form'
					});
				});
			},
			handleReportTypeInput(reportType, meritForm) {
				if (!meritForm || meritForm === this.meritReportTypeForms[reportType])
					return;
					
				meritForm = Number(meritForm);
				
				fetch(`/setting/${reportTypeFormsKey}.${reportType}`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						value: meritForm
					})
				}).then(response => {
					if (response.ok)
						this.fetchReportTypeForms();
					else
						throw Error(response.statusText);
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
			
			MeritReportListItem
		}
	});
}
