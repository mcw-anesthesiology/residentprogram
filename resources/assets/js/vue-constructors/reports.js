import Vue from 'vue';
import VueRouter from 'vue-router';

import TraineeReport from '@/vue-components/Reports/TraineeReport.vue';
import FacultyReport from '@/vue-components/Reports/FacultyReport.vue';
import FormReport from '@/vue-components/Reports/FormReport.vue';
import NeedsReport from '@/vue-components/Reports/Needs/Report.vue';
import PendingEvalsReport from '@/vue-components/Reports/PendingEvalsReport.vue';
import FacultyMeritReport from '@/vue-components/Reports/FacultyMeritReport.vue';
import EgressPairings from '@/vue-components/Reports/EgressPairings/EgressPairings.vue';

import FacultyPublicationsReport from '@/vue-components/Reports/FacultyMerit/Publications.vue';
import FacultyScholarlyActivityReport from '@/vue-components/Reports/FacultyMerit/ScholarlyActivity.vue';
import FacultySimulationsReport from '@/vue-components/Reports/FacultyMerit/Simulations.vue';

import { logError } from '@/modules/errors.js';
import {
	kebabCaseToWords,
	fetchUsers,
	groupUsers
} from '@/modules/utils.js';

Vue.use(VueRouter);

const routes = [
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
				'scholarly-activity',
				'simulations'
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
			},
			{
				path: 'simulations',
				component: FacultySimulationsReport
			}
		]
	},
	{
		path: '/egress-pairings',
		component: EgressPairings
	}
];

export function createReports(el){
	return new Vue({
		el,
		router: new VueRouter({
			routes
		}),
		data(){
			return {
				reportType: 'trainee',
				users: []
			};
		},
		computed: {
			reportTypes(){
				return routes.map(route => route.path.substring(1));
			},
			groupedUsers(){
				return groupUsers(this.users);
			}
		},

		created(){
			fetchUsers().then(users => {
				this.users = users;
			}).catch(logError);
		},

		methods: {
			kebabCaseToWords
		}
	});
}
