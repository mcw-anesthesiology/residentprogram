import BootstrapAlert from '@/vue-components/BootstrapAlert.vue';
import ComponentList from '@/vue-components/ComponentList.vue';
import MeritCompensationReport from '@/vue-components/MeritCompensation/Report.vue';
import MeritReportListItem from '@/vue-components/MeritCompensation/ReportListItem.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { datesEqual } from '@/modules/date-utils.js';
import { getCurrentYearlyMeritDateRange } from '@/modules/merit-utils.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			meritForms: null
		};
	},

	computed: {
		currentYearlyMeritDateRange() {
			return getCurrentYearlyMeritDateRange();
		},
		meritReportFields() {
			return [
				'id',
				'form_name'
			];
		},
		meritReportFieldAccessors() {
			return {
				'form_name': meritReport => meritReport.form.name
			};
		},
		userMeritReports() {
			if (!this.meritReports)
				return [];

			return this.meritReports
				.filter(report => Number(report.user_id) === this.user.id);
		},
		needsToStartReport() {
			if (!this.userMeritReports || this.userMeritReports.length === 0)
				return true;


			return !this.userMeritReports.some(report => {
				let periodDates = {
					startDate: report.period_start,
					endDate: report.period_end
				};

				return (datesEqual(periodDates, this.currentYearlyMeritDateRange)
					&& report.status === 'complete');
			});
		},
		inProgressReport() {
			if (!this.userMeritReports || this.userMeritReports.length === 0)
				return false;

			return this.userMeritReports.find(report =>
				['pending', 'open for editing'].includes(report.status));
		}
	},

	methods: {
		addMeritReport() {
			this.$apollo.mutate({
				mutation: gql`
					createMyMeritChecklist {
						id
					}
				`
			})
		},
		finishMeritReport() {
			if (!this.inProgressReport)
				return;

			this.viewReport(this.inProgressReport.id);
		},
		viewMostRecentSubmission() {
			if (
				!this.userMeritReports
				|| !Array.isArray(this.userMeritReports)
				|| this.userMeritReports.length === 0
			)
				return;

			this.viewReport(this.userMeritReports[0].id);
		}
	},

	components: {
		BootstrapAlert,
		ComponentList,
		MeritCompensationReport,
		MeritReportListItem,
		RichDateRange
	}
};
