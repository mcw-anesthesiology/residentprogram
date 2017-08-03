import Vue from 'vue';
import VueRouter from 'vue-router';

import Reports from 'vue-components/Reports/Reports.vue';
import TraineeReport from 'vue-components/Reports/TraineeReport.vue';
import FacultyReport from 'vue-components/Reports/FacultyReport.vue';
import FormReport from 'vue-components/Reports/FormReport.vue';
import NeedsReport from 'vue-components/Reports/Needs/Report.vue';
import PendingEvalsReport from 'vue-components/Reports/PendingEvalsReport.vue';
import FacultyMeritReport from 'vue-components/Reports/FacultyMeritReport.vue';

import FacultyPublicationsReport from 'vue-components/Reports/FacultyMerit/Publications.vue';
import FacultyScholarlyActivityReport from 'vue-components/Reports/FacultyMerit/ScholarlyActivity.vue';

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
					path: '/faculty',
					component: FacultyReport
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
				},
				{
					path: '/faculty-merit',
					component: FacultyMeritReport,
					props: {
						reportTypes: [
							'publications',
							'scholarly-activity'
						]
					},
					children: [
						{
							path: 'publications',
							component: FacultyPublicationsReport
						},
						{
							path: 'scholarly-activity',
							component: FacultyScholarlyActivityReport
						}
					]
				}
			]
		}),
		render(h){
			return h(Reports);
		}
	});
}
