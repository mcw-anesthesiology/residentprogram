<template>
	<div>
		<div class="container body-block reports-selector">
			<fieldset>
				<legend>
					Merit report type
				</legend>
				<router-link v-for="type of reportTypes" :key="type"
						:to="`/faculty-merit/${type}`"
						class="report-type-option btn btn-default"
						active-class="disabled">
					{{ kebabCaseToWords(type) }}
				</router-link>
			</fieldset>

			<form class="controls">
				<fieldset>
					<start-end-date :ranges="dateRanges" v-model="dates"
						:render-range-name="n => n"
					/>
				</fieldset>

				<label>
					<input type="checkbox" v-model="includeIncomplete" />
					Include incomplete reports
				</label>
			</form>
		</div>

		<router-view :dates="dates" :form-id="formId" :include-incomplete="includeIncomplete"></router-view>
	</div>
</template>

<style scoped>
	.controls {
		margin: 2em 0;
	}
</style>

<script>
import gql from 'graphql-tag';
import moment from 'moment';

import StartEndDate from '#/StartEndDate.vue';

import { FEATURE_RELEASE_DATES } from '@/modules/constants.js';
import { kebabCaseToWords } from '@/modules/utils.js';
import { isoDateStringObject, currentYear, academicYearForDate, renderDateRange } from '@/modules/date-utils.js';

export default {
	props: {
		reportTypes: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			dates: isoDateStringObject(currentYear()),
			formId: undefined,
			meritReportForms: [],
			includeIncomplete: false
		};
	},
	apollo: {
		meritReportForms: gql`
			query {
				meritReportForms {
					id
					name
					version
					report_slug
				}
			}
		`,
	},

	computed: {
		meritsReleaseDate() {
			return FEATURE_RELEASE_DATES.FACULTY_MERIT;
		},
		academicYears() {
			let maxDate = moment();
			let d = moment(this.meritsReleaseDate);

			let years = [];

			do {
				years.push(academicYearForDate(d.clone()));

				d.add(1, 'year');
			} while (d < maxDate);

			if (this.descending) {
				years.reverse();
			}

			if (this.allTime) {
				years.push({
					startDate: null,
					endDate: null
				});
			}

			years.reverse();

			return years;
		},
		dateRanges() {
			const ranges = {
				'Custom': null
			};

			for (const dates of this.academicYears) {
				ranges[renderDateRange(dates.startDate, dates.endDate)] = dates;
			}

			ranges['All time'] = {
				startDate: undefined,
				endDate: undefined
			};

			return ranges;
		}
	},

	methods: {
		kebabCaseToWords
	},

	components: {
		StartEndDate
	}
};
</script>

<style scoped>
	.report-type-option {
		margin: 0 1em;
	}

	@media print {
		.reports-selector {
			display: none;
		}
	}
</style>
