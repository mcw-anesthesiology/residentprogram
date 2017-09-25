import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';
import MeritCompensationReport from 'vue-components/MeritCompensation/Report.vue';
import MeritReportListItem from 'vue-components/MeritCompensation/ReportListItem.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';
import { datesEqual } from 'modules/date-utils.js';
import { getCurrentYearlyMeritDateRange } from 'modules/merit-utils.js';

// FIXME: Only do this stuff if user is faculty

export default {
	mixins: [
		HasAlerts
	],
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			meritForms: null,

			alerts: []
		};
	},

	mounted() {
		this.fetchPastMeritReports();
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
		needsToStartReport() {
			if (!this.meritReports || this.meritReports.length === 0)
				return true;


			return !this.meritReports.some(report => {
				let periodDates = {
					startDate: report.period_start,
					endDate: report.period_end
				};

				return (datesEqual(periodDates, this.currentYearlyMeritDateRange)
					&& report.status === 'complete');
			});
		},
		inProgressReport() {
			if (!this.meritReports || this.meritReports.length === 0)
				return false;

			return this.meritReports.find(report =>
				['pending', 'open for editing'].includes(report.status));
		}
	},

	methods: {
		fetchPastMeritReports() {

			let query = $.param({
				user_id: this.user.id,
				with: {
					form: true
				}
			});

			fetch(`/merits?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(merits => {
				this.meritReports = merits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching past merit reports'
				});
			});
		},
		finishMeritReport() {
			if (!this.inProgressReport)
				return;

			this.viewReport(this.inProgressReport.id);
		},
		viewMostRecentSubmission() {
			if (
				!this.meritReports
				|| !Array.isArray(this.meritReports)
				|| this.meritReports.length === 0
			)
				return;

			this.viewReport(this.meritReports[0].id);
		},
		handleReload() {
			this.fetchPastMeritReports();
		}
	},

	components: {
		ComponentList,
		MeritCompensationReport,
		MeritReportListItem,
		RichDateRange
	}
};
