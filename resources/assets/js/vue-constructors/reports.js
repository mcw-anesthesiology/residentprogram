import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';
import { mapState, mapGetters } from 'vuex';

import store from './store.js';

import { kebabCaseToWords, } from '@/modules/utils.js';

import StoredAlertList from '@/vue-components/StoredAlertList.vue';

const TraineeReport = () => import('@/vue-components/Reports/TraineeReport.vue');
const FacultyReport = () => import('@/vue-components/Reports/FacultyReport.vue');
const FacultyEvaluationsReport = () => import('@/vue-components/Reports/FacultyEvaluationsReport.vue');
const FormReport = () => import('@/vue-components/Reports/FormReport.vue');
const CustomReport = () => import('@/vue-components/Reports/CustomReport/CustomReport.vue');
const NeedsReport = () => import('@/vue-components/Reports/Needs/Report.vue');
const PendingEvalsReport = () => import('@/vue-components/Reports/PendingEvalsReport.vue');
const FacultyMeritReport = () => import('@/vue-components/Reports/FacultyMeritReport.vue');
const CaseOverlaps = () => import('@/vue-components/Reports/CaseOverlaps/CaseOverlaps.vue');

const ExportMeritReport = () => import('@/vue-components/Reports/FacultyMerit/Export.vue');
const FacultyScholarlyActivityReport = () => import('@/vue-components/Reports/FacultyMerit/ScholarlyActivity.vue');
const FacultySimulationsReport = () => import('@/vue-components/Reports/FacultyMerit/Simulations.vue');
const FacultyNationalBoardsReport = () => import('@/vue-components/Reports/FacultyMerit/NationalBoards.vue');
const MeritHistoricalOverview = () => import('@/vue-components/Reports/FacultyMerit/HistoricalOverview.vue');
const MeritIndividualDashboards = () => import('@/vue-components/Reports/FacultyMerit/IndividualDashboards.vue');
const SummaryReport = () => import('@/vue-components/Reports/FacultyMerit/SummaryReport/Report.vue');

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
		path: '/faculty-evaluations',
		component: FacultyEvaluationsReport
	},
	{
		path: '/custom',
		component: CustomReport
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
				'export',
				'scholarly-activity',
				'simulations',
				'national-boards',
				'historical-overview',
				'individual-dashboards',
				'summary'
			]
		},
		children: [
			{
				path: 'export',
				component: ExportMeritReport
			},
			{
				path: 'scholarly-activity',
				component: FacultyScholarlyActivityReport
			},
			{
				path: 'simulations',
				component: FacultySimulationsReport
			},
			{
				path: 'national-boards',
				component: FacultyNationalBoardsReport
			},
			{
				path: 'historical-overview',
				component: MeritHistoricalOverview
			},
			{
				path: 'individual-dashboards/:userId?',
				name: 'merit-individual-dashboard',
				component: MeritIndividualDashboards,
				props: true
			},
			{
				path: 'summary',
				component: SummaryReport
			}
		]
	},
	{
		path: '/case-overlaps',
		component: CaseOverlaps
	}
];

export function createReports(el){
	return new Vue({
		el,
		apolloProvider,
		router: new VueRouter({
			routes
		}),
		store,
		data(){
			return {
				reportType: 'trainee'
			};
		},
		mounted() {
			this.$store.dispatch('users/fetch');
		},
		computed: {
			...mapState('users', ['users']),
			...mapGetters('users', ['groupedUsers']),
			reportTypes(){
				return routes.map(route => route.path.substring(1));
			}
		},

		methods: {
			kebabCaseToWords
		},
		components: {
			StoredAlertList
		}
	});
}

export function createTraineeReport(el) {
	return new Vue({
		el,
		store,
		mounted() {
			this.$store.dispatch('users/fetch');
		},
		computed: {
			...mapState('users', ['users']),
			...mapGetters('users', ['groupedUsers'])
		},
		components: {
			TraineeReport
		}
	});
}

export function createFormReport(el) {
	return new Vue({
		el,
		store,
		mounted() {
			this.$store.dispatch('users/fetch');
		},
		computed: {
			...mapState('users', ['users'])
		},
		components: {
			FormReport
		}
	});
}
