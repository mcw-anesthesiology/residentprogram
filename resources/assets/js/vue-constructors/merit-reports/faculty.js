import Vue from 'vue';
import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';
import MeritCompensationReport from 'vue-components/MeritCompensation/Report.vue';
import MeritReportListItem from 'vue-components/MeritCompensation/ReportListItem.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

import { getFetchHeaders, okOrThrow, jsonOrThrow } from 'modules/utils.js';
import {
	academicYearForDate,
	isoDateStringObject,
	datesEqual
} from 'modules/date-utils.js';

export default function createFacultyMeritReports(el, propsData) {
	return new Vue({
		el,
		mixins: [
			HasAlerts
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

				meritCompensationReport: null,

				meritReports: null,

				alerts: []
			};
		},
		propsData,

		mounted() {
			this.fetchMeritForms();
			this.fetchPastMeritReports();
		},

		computed: {
			yearlyFacultyMeritForm() {
				if (
					this.meritReportTypes.faculty_yearly
					&& this.meritReportTypeForms.faculty_yearly
					&& this.meritForms
				) {
					let forms = Array.slice(this.meritForms);
					forms.sort((a, b) => Number(b.version) - Number(a.version));
					return forms.find(form =>
						form.name === this.meritReportTypeForms.faculty_yearly
					);
				}
			},
			currentYearlyMeritDateRange() {
				// FIXME
				return isoDateStringObject(academicYearForDate(new Date()));
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
			meritReportReadonly() {
				return ![
					'pending',
					'open for editing'
				].includes(this.meritCompensationReport.status);
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
					where: {
						user_id: this.user.id
					},
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
			addMeritReport() {
				if (!this.yearlyFacultyMeritForm)
					return;

				let dates = this.currentYearlyMeritDateRange;

				this.meritCompensationReport = {
					period_start: dates.startDate,
					period_end: dates.endDate,
					report: JSON.parse(this.yearlyFacultyMeritForm.form),
					status: 'pending'
				};
			},
			finishMeritReport() {
				this.meritCompensationReport = Object.assign({}, this.inProgressReport);
			},
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
			handleClose() {
				this.meritCompensationReport = null;
			},
			handleSubmit(meritReport) {
				if (this.meritReportReadonly)
					return;

				const url = meritReport.id
					? `/merits/${meritReport.id}`
					: '/merits';

				let method = 'POST';
				if (meritReport.id) {
					// method = 'PATCH';
					meritReport._method = 'PATCH';
				}

				meritReport.user_id = this.user.id;
				meritReport.form_id = this.yearlyFacultyMeritForm.id;

				fetch(url, {
					method,
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify(meritReport)
				}).then(okOrThrow).then(() => {
					this.meritCompensationReport = null;
					this.fetchPastMeritReports();
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the report'
					});
				});
			},
			handleViewReport(id) {
				this.meritCompensationReport = this.meritReports.find(report =>
					report.id === id);
			},
			viewMostRecentSubmission() {
				this.meritCompensationReport = this.meritReports[0];
			},
		},

		components: {
			ComponentList,
			MeritCompensationReport,
			MeritReportListItem,
			RichDateRange
		}
	});
}
