import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';

export { default as createViewMeritReportForm } from './view-form.js';

const router = new VueRouter({
	routes: [
		{
			path: '/checklist/:id',
			component: () => import('#/MeritCompensation/ReportById.vue'),
			props: true
		},
		{
			path: '/summary/:id',
			component: () => import('#/MeritCompensation/SummaryById.vue'),
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
		apolloProvider,
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
		propsData,
		router,

		methods: {
			viewReport(id) {
				this.$router.push({ path: `/checklist/${id}` });
			},
			viewReportSummary(id) {
				this.$router.push({ path: `/summary/${id}` });
			},
			handleClose() {
				this.$router.push({ path: '/' });
			}
		},
		components: {
			FacultyDashboard: () => import('#/MeritCompensation/FacultyDashboard.vue'),
			AdminSupervisorDashboard: () => import('#/MeritCompensation/AdminSupervisorDashboard.vue')
		}
	});
}
