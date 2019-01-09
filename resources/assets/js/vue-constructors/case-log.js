import Vue from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import { EditorById, ViewerById } from '@/vue-components/CaseLog/conditional-loaders.js';

import { handleError } from '@/modules/errors.js';
import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	userIsType
} from '@/modules/utils.js';
import { currentQuarter, isoDateStringObject } from '@/modules/date-utils.js';

const router = new VueRouter({
	routes: [
		{ path: '/:id/view', component: ViewerById },
		{ path: '/:id/edit', component: EditorById },
		{ path: '/new', component: () => import('@/vue-components/CaseLog/Editor.vue') }
	]
});

export function createCaseLog(el, propsData) {
	return new Vue({
		mixins: [ HasAlerts ],
		router,
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
				if (Number(this.detailsSchema.case_log_version) === 2)
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
					handleError(err, this, 'There was a problem fetching case logs');
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
					handleError(err, this, 'There was a problem deleting the case log entry');
				});
			},
			removeCaseLog(id) {
				this.caseLogs = this.caseLogs.filter(caseLog =>
					caseLog.id !== id
				);
			},
			handleEditorSubmit() {
				this.$router.push('/');
				this.fetchCaseLogs();
			}
		},

		components: {
			ComponentList: () => import('@/vue-components/ComponentList.vue'),
			ShowHideButton: () => import('@/vue-components/ShowHideButton.vue'),
			StartEndDate: () => import('@/vue-components/StartEndDate.vue'),

			CaseLogs: () => import('@/vue-components/CaseLog/CaseLogs.vue'),
			CaseLogEditor: () => import('@/vue-components/CaseLog/Editor.vue'),
			CaseLogEditorV1: () => import('@/vue-components/CaseLog/V1/Editor.vue'),

			VueFlatpickr,
		}
	});
}
