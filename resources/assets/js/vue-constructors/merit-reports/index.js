import Vue from 'vue';
import VueRouter from 'vue-router';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import MeritReportById from 'vue-components/MeritCompensation/ReportById.vue';
import MeritSummaryById from 'vue-components/MeritCompensation/SummaryById.vue';

import AdminSupervisorMeritReportMixin from './admin-supervisor.js';
import FacultyMeritReportMixin from './faculty.js';

export { default as createMeritReportPrintView } from './print-view.js';

import {
	fetchAllMeritReports,
	getYearlyFacultyMeritForm,
	getCurrentYearlyMeritDateRange
} from 'modules/merit-utils.js';
import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

Vue.use(VueRouter);

export function createMeritReportsHub(el, propsData) {
	return new Vue({
		el,
		mixins: [
			HasAlerts,
			FacultyMeritReportMixin,
			AdminSupervisorMeritReportMixin
		],
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				meritForms: null,
				meritReports: null
			};
		},
		propsData,

		mounted() {
			this.fetchReports();
			this.fetchMeritForms();
		},

		router: new VueRouter({
			routes: [
				{
					path: '/checklist/:id',
					component: MeritReportById,
					props: true
				},
				{
					path: '/summary/:id',
					component: MeritSummaryById,
					props: true
				}
			]
		}),

		methods: {
			fetchReports() {
				this.fetchAllMeritReports();
				this.fetchUsersWithReports();
			},
			fetchAllMeritReports() {
				return fetchAllMeritReports().then(merits => {
					this.meritReports = merits;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching past merit reports'
					});
				});
			},
			fetchMeritForms() {
				return fetch('/merit-forms', {
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
			addMeritReport() {
				const form = getYearlyFacultyMeritForm(
					this.meritForms,
					this.meritReportTypes,
					this.meritReportTypeForms
				);
				const dates = getCurrentYearlyMeritDateRange();

				fetch('/merits', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						user_id: this.user.id,
						form_id: form.id,
						period_start: dates.startDate,
						period_end: dates.endDate,
						report: JSON.parse(form.form),
						status: 'pending'
					})
				}).then(jsonOrThrow).then(merit => {
					this.fetchAllMeritReports();
					this.viewReport(merit.id);
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem creating a new merit report'
					});
				});

			},
			viewReport(id) {
				this.$router.push({ path: `/checklist/${id}` });
			},
			viewReportSummary(id) {
				this.$router.push({ path: `/summary/${id}` });
			},
			handleReload() {
				return this.fetchReports();
			},
			handleClose() {
				this.handleReload();
				this.$router.push({ path: '/' });
			}
		}
	});
}
