<template>
	<div v-if="report" class="container body-block">
		<h1>{{ report.title }}</h1>
		<report-section v-for="(section, index) of report.results.sections"
			:key="index"
			v-bind="section"
			:subjects="sortedReportSubjects" />
	</div>
	<div v-else>

	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ReportSection from './Section.vue';

import { handleError } from '@/modules/errors.js';
import { fetchConfig, jsonOrThrow } from '@/modules/utils.js';

export default {
	mixins: [HasAlerts],
	props: {
		users: {
			type: Array
		},
		groupedUsers: {
			type: Array
		}
	},
	data() {
		return {
			reportDates: {
				// FIXME
				startDate: '2017-01-01',
				endDate: '2018-04-30'
			},
			customReportId: 1, // FIXME
			report: null
		};
	},
	computed: {
		sortedReportSubjects() {
			if (!this.report)
				return;

			const subjects = this.report.subjects;

			return subjects
				// eslint-disable-next-line eqeqeq
				.map(s => this.users.find(u => u.id == s))
				.sort((a, b) => {
					if (a && b) {
						if (a.full_name < b.full_name)
							return -1;
						else if (a.full_name > b.full_name)
							return 1;
					} else if (a) {
						return -1;
					} else if (b) {
						return 1;
					}

					return 0;
				});
		}
	},
	mounted() {
		this.runReport();
	},
	methods: {
		runReport() {
			fetch(`/custom-reports/${this.customReportId}/run`, {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					...this.reportDates
				})
			}).then(jsonOrThrow).then(report => {
				this.report = report;
			}).catch(err => {
				handleError(err, this, 'There was a problem running the report');
			});
		}
	},
	components: {
		ReportSection
	}
};
</script>
