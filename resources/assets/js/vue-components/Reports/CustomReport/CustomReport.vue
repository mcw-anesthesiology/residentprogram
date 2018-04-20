<template>
	<div>
		<div class="container body-block">
			<form @submit="runReport">
				<start-end-date v-model="reportDates" />

				<div class="form-group">
					<label class="containing-label">
						Report
						<select v-model="customReportId" class="form-control">
							<option v-for="customReport of customReports"
									:value="customReport.id">
								{{ customReport.title }}
							</option>
						</select>
					</label>
				</div>

				<div class="text-center">
					<button type="submit" class="btn btn-primary btn-lg"
							:disabled="!canRunReport">
						Run report
					</button>
				</div>
			</form>
		</div>

		<div v-if="report" class="container body-block">
			<h1>{{ report.title }}</h1>
			<report-section v-for="(section, index) of report.results.sections"
				:key="index"
				v-bind="section"
				:subjects="sortedReportSubjects" />
		</div>
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import StartEndDate from '@/vue-components/StartEndDate.vue';
import ReportSection from './Section.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateStringObject, lastQuarter } from '@/modules/date-utils.js';
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
			customReports: [],

			reportDates: isoDateStringObject(lastQuarter()),
			customReportId: null,
			report: null
		};
	},
	computed: {
		canRunReport() {
			// FIXME
			return Boolean(this.customReportId);
		},
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
		this.fetchCustomReports();
	},
	methods: {
		fetchCustomReports() {
			fetch('/custom-reports', fetchConfig()).then(jsonOrThrow).then(crs => {
				this.customReports = crs;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching custom reports');
			});
		},
		runReport() {
			if (!this.canRunReport)
				return;

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
		StartEndDate,
		ReportSection
	}
};
</script>
