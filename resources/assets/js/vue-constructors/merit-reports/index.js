import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

export { default as createViewMeritReportForm } from './view-form.js';
import { isAdmin } from '@/modules/utils.js';

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: {
				props: {
					user: Object
				},
				template: `<component :is="homeComponent" :user="user" @close="$emit('close')" />`,
				computed: {
					homeComponent() {
						return isAdmin(this.user)
							? () => import('#/MeritCompensation/AdminSupervisorDashboard.vue')
							: () => import('#/MeritCompensation/FacultyDashboard.vue');
					}
				}
			},
			props: true
		},
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
		mixins: [HasAlerts],
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
			handleClose() {
				this.$router.push({ path: '/' });
			}
		}
	});
}
