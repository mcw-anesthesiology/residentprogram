import Vue from 'vue';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import StartEndDate from '@/vue-components/StartEndDate.vue';

import CaseLogs from '@/vue-components/CaseLog/CaseLogs.vue';
import CaseLogEditor from '@/vue-components/CaseLog/Editor.vue';
import CaseLogEditorV1 from '@/vue-components/CaseLog/V1/Editor.vue';

import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	userIsType
} from '@/modules/utils.js';
import { currentQuarter, isoDateStringObject } from '@/modules/date-utils.js';

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
				dates: isoDateStringObject(currentQuarter()),
				caseLogs: [],
				show: {
					charts: false,
					addCaseLog: false
				}
			};
		},

		computed: {
			editorComponent() {
				if (this.detailsSchema.case_log_version === 2)
					return 'CaseLogEditor';

				return 'CaseLogEditorV1';
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

		watch: {
			dates() {
				this.fetchCaseLogs();
			}
		},

		methods: {
			fetchCaseLogs() {
				const params = {
					with: {
						location: ['name'],
						user: ['full_name'],
						detailsSchema: true
					}
				};

				if (this.dates.startDate || this.dates.endDate) {
					params.case_date = [];
					if (this.dates.startDate)
						params.case_date.push(['>=', this.dates.startDate]);
					if (this.dates.endDate)
						params.case_date.push(['<=', this.dates.endDate]);
				}

				let query = $.param(params);

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
			handleEditorSubmit() {
				this.show.addCaseLog = false;
				this.fetchCaseLogs();
			}
		},

		components: {
			ComponentList,
			ShowHideButton,
			StartEndDate,
			CaseLogs,
			VueFlatpickr,
			CaseLogEditor,
			CaseLogEditorV1
		}
	});
}
