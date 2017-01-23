import Vue from 'vue';
import VueRouter from 'vue-router';

import Reports from '../vue-components/Reports/Reports.vue';
import TraineeReport from '../vue-components/Reports/TraineeReport.vue';
import FormReport from '../vue-components/Reports/FormReport.vue';
import NeedsReport from '../vue-components/Reports/Needs/Report.vue';
import PendingEvalsReport from '../vue-components/Reports/PendingEvalsReport.vue';


Vue.use(VueRouter);

export function createReports(el){
	return new Vue({
		el: el,
		router: new VueRouter({
			routes: [
				{
					path: '/trainee',
					component: TraineeReport
				},
				{
					path: '/form',
					component: FormReport
				},
				{
					path: '/needs-evaluations',
					component: NeedsReport
				},
				{
					path: '/pending-requests',
					component: PendingEvalsReport
				}
			]
		}),
		render(h){
			return h(Reports);
		}
	});
}
