import Vue from 'vue';

import MeritCompensationReport from 'vue-components/MeritCompensation/Report.vue';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';
import { academicYearForDate, isoDateStringObject } from 'modules/date-utils.js';

export default function createFacultyMeritReports(el, propsData) {
	return new Vue({
		el,
		props: {
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
				
				alerts: []
			};
		},
		propsData,
		
		mounted() {
			this.fetchMeritForms();
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
			}
		},
		
		methods: {
			addMeritReport() {
				if (!this.yearlyFacultyMeritForm)
					return;
					
				// FIXME
				let dates = isoDateStringObject(academicYearForDate(new Date()));
				
				this.meritCompensationReport = {
					period_start: dates.startDate,
					period_end: dates.endDate,
					report: this.yearlyFacultyMeritForm.form,
					status: 'pending'
				};
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
			handleSave() {
				// TODO
			},
			handleSubmit() {
				// TODO
			}
		},
		
		components: {
			MeritCompensationReport
		}
	});
}
