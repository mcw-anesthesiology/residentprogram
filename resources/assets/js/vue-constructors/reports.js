import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';
import { mapState, mapGetters } from 'vuex';

import store from './store.js';

import { kebabCaseToWords, } from '@/modules/utils.js';

import StoredAlertList from '#/StoredAlertList.vue';

const TraineeReport = () => import('#/Reports/TraineeReport.vue');
const FacultyReport = () => import('#/Reports/FacultyReport.vue');
const FacultyEvaluationsReport = () => import('#/Reports/FacultyEvaluationsReport.vue');
const FormReport = () => import('#/Reports/FormReport.vue');
const CustomReport = () => import('#/Reports/CustomReport/CustomReport.vue');
const NeedsReport = () => import('#/Reports/Needs/Report.vue');
const PendingEvalsReport = () => import('#/Reports/PendingEvalsReport.vue');
const FacultyMeritReport = () => import('#/Reports/FacultyMeritReport.vue');
const CaseOverlaps = () => import('#/Reports/CaseOverlaps/CaseOverlaps.vue');

const ExportMeritReport = () => import('#/Reports/FacultyMerit/Export.vue');
const FacultyScholarlyActivityReport = () => import('#/Reports/FacultyMerit/ScholarlyActivity.vue');
const FacultySimulationsReport = () => import('#/Reports/FacultyMerit/Simulations.vue');
const FacultyNationalBoardsReport = () => import('#/Reports/FacultyMerit/NationalBoards.vue');
const MeritHistoricalOverview = () => import('#/Reports/FacultyMerit/HistoricalOverview.vue');
const MeritIndividualDashboards = () => import('#/Reports/FacultyMerit/IndividualDashboards.vue');
const SummaryReport = () => import('#/Reports/FacultyMerit/SummaryReport/Report.vue');

const BeyondMilestones = () => import('#/Reports/BeyondMilestones/BeyondMilestones.vue');

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
	},
	{
		path: '/beyond-milestones',
		component: BeyondMilestones
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

export function createBeyondMilestonesReport(el) {
	return new Vue({
		el,
		store,
		apolloProvider,
		components: {
			BeyondMilestones
		}
	});
}
