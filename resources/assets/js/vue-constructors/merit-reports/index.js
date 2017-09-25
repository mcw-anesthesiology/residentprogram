import Vue from 'vue';
import VueRouter from 'vue-router';

import MeritReportById from 'vue-components/MeritCompensation/ReportById.vue';
import MeritReportNew from 'vue-components/MeritCompensation/ReportNew.vue';

import AdminSupervisorMeritReportMixin from './admin-supervisor.js';
import FacultyMeritReportMixin from './faculty.js';

export { default as createMeritReportPrintView } from './print-view.js';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

Vue.use(VueRouter);

export function createMeritReportsHub(el, propsData) {
	return new Vue({
		el,
		mixins: [
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
			this.fetchMeritForms();
		},

		router: new VueRouter({
			routes: [
				{
					path: '/checklist/new',
					component: MeritReportNew
				},
				{
					path: '/checklist/:id',
					component: MeritReportById,
					props: true
				}
			]
		}),

		methods: {
			fetchMeritForms() {
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
			addMeritReport() {
				this.$router.push({ path: '/checklist/new' });
			},
			viewReport(id) {
				this.$router.push({ path: `/checklist/${id}` });
			}
		}
	});
}
