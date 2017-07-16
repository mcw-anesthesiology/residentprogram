import Vue from 'vue';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import '@jacobmischka/vue-flatpickr/theme/flatpickr.min.css';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import CaseLogs from 'vue-components/CaseLog/CaseLogs.vue';

import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	userIsType
} from 'modules/utils.js';

export function createCaseLog(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			detailsSchema: {
				type: Object,
				required: true
			},
			locations: {
				type: Array,
				required: true
			}
		},
		propsData,
		data() {
			return {
				caseLogs: [],
				show: {
					charts: false,
					addCaseLog: false
				}
			};
		},

		computed: {
			subsections() {
				let subsections = [];
				for (let schema of this.detailsSchema.schema) {
					for (let subsection of schema.subsections) {
						subsections.push(subsection);
					}
				}

				return subsections;
			},
			isAdmin() {
				return userIsType(this.user, 'admin');
			},
			caseLogFields() {
				return [
					'full_name'
				];
			},
			groupedCaseLogs() {
				if (!this.caseLogs || this.caseLogs.length < 1)
					return [];

				let groupedCaseLogs = new Map();

				for (let caseLog of this.caseLogs) {
					let user = groupedCaseLogs.get(caseLog.user.id);
					if (!user) {
						user = Object.assign(caseLog.user);
						user.caseLogs = [];
					}
					user.caseLogs.push(caseLog);
					groupedCaseLogs.set(user.id, user);
				}

				return Array.from(groupedCaseLogs.values());
			}
		},

		mounted() {
			this.fetchCaseLogs();
		},

		methods: {
			fetchCaseLogs() {
				let query = $.param({
					with: {
						location: ['name'],
						user: ['full_name'],
						detailsSchema: true
					}
				});

				fetch(`/case_logs?${query}`, {
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(caseLogs => {
					this.caseLogs = caseLogs;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching case logs'
					});
				});
			},
			deleteCaseLog(caseLogId) {
				fetch(`/case_logs/${caseLogId}`, {
					method: 'POST', // DELETE
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(okOrThrow).then(() => {
					this.removeCaseLog(caseLogId);
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> there was a problem deleting the case log entry'
					});
				});
			},
			removeCaseLog(id) {
				this.caseLogs = this.caseLogs.filter(caseLog =>
					caseLog.id !== id
				);
			},
			addCaseLog(event) {
				event.preventDefault();

				let body = new FormData(this.$refs.addLogForm);
				fetch('/case_logs', {
					method: 'POST',
					headers: getFetchHeaders({contentType: null}),
					credentials: 'same-origin',
					body
				}).then(okOrThrow).then(() => {
					this.$refs.addLogForm.reset();
					this.show.addCaseLog = false;
					this.fetchCaseLogs();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem adding the case log entry'
					});
				});
			}
		},

		components: {
			ComponentList,
			ShowHideButton,
			CaseLogs,
			VueFlatpickr
		}
	});
}
