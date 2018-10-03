import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import MeritReportById from '@/vue-components/MeritCompensation/ReportById.vue';
import MeritSummaryById from '@/vue-components/MeritCompensation/SummaryById.vue';

import AdminSupervisorMeritReportMixin from './admin-supervisor.js';
import FacultyMeritReportMixin from './faculty.js';

export { default as createViewMeritReportForm } from './view-form.js';

import { logWarning, handleError } from '@/modules/errors.js';
import {
	fetchAllMeritReports,
	getYearlyFacultyMeritForm,
	getCurrentYearlyMeritDateRange
} from '@/modules/merit-utils.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';

const router = new VueRouter({
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
});

router.afterEach(() => {
	window.scroll({
		top: 0,
		left: 0
	});
});

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

		router,

		computed: {
			yearlyFacultyForm() {
				const form = getYearlyFacultyMeritForm(
					this.meritForms,
					this.meritReportTypes,
					this.meritReportTypeForms
				);

				if (form)
					return form;

				logWarning('No merit checklist form was returned', {
					meritForms: JSON.parse(JSON.stringify(this.meritForms)),
					meritReportTypes: JSON.parse(JSON.stringify(this.meritReportTypes)),
					meritReportTypeForms: JSON.parse(JSON.stringify(this.meritReportTypeForms))
				});
			}
		},

		methods: {
			fetchReports() {
				this.fetchAllMeritReports();
				this.fetchUsersWithReports();
			},
			fetchAllMeritReports() {
				return fetchAllMeritReports().then(merits => {
					this.meritReports = merits;
				}).catch(err => {
					handleError(err, this, 'There was a problem fetching past merit reports');
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
					handleError(err, this, 'There was a problem fetching merit forms');
				});
			},
			addMeritReport() {
				if (!this.yearlyFacultyForm)
					return;

				const dates = getCurrentYearlyMeritDateRange();

				fetch('/merits', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						user_id: this.user.id,
						form_id: this.yearlyFacultyForm.id,
						period_start: dates.startDate,
						period_end: dates.endDate,
						report: JSON.parse(this.yearlyFacultyForm.form),
						status: 'pending'
					})
				}).then(jsonOrThrow).then(merit => {
					this.fetchAllMeritReports();
					this.viewReport(merit.id);
				}).catch(err => {
					handleError(err, this, 'There was a problem creating a new merit report');
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
