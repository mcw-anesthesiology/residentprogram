<template>
	<div>
		<div class="form-container container body-block">
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
			<div v-if="subjects.length > 0" class="subject-container">
				<div class="row">
					<div class="col-xs-10">
						<div class="form-group">
							<label class="containing-label">
								Subject
								<select-two :options="groupedSubjects"
									v-model="subjectId" />
							</label>
						</div>
					</div>
					<div class="col-xs-2">
						<button v-if="subjectId" type="button"
								class="btn btn-default labelless-button"
								@click="subjectId = null">
							Clear
						</button>
					</div>
				</div>
			</div>

			<div class="report-controls-container">
				<div class="report-controls panel panel-default">
					<div class="panel-body">
						<div class="form-group">
							<label class="containing-label">
								Report size
								<small>(Useful for printing)</small>
								<div class="font-size-container">
									<span class="glyphicon glyphicon-zoom-out"></span>
									<input type="range" v-model="reportFontSizeValue"
										min="0.25" max="2" step="any" />
									<span class="glyphicon glyphicon-zoom-in"></span>
								</div>
							</label>
						</div>
						<div class="text-center">
							<button type="button" class="btn btn-lg btn-info"
									@click="handlePrint">
								Print
							</button>
						</div>
					</div>
				</div>
			</div>

			<hr />

			<div class="custom-report" :style="{fontSize: reportFontSize}">
				<h1>
					{{ report.title }}
					<small>
						<span v-if="subject">
							{{ subject.full_name }}:
						</span>
						<RichDateRange :dates="reportDates" />
					</small>
				</h1>
				<report-section v-for="(section, index) of report.results.sections"
					:key="index"
					v-bind="section"
					:subjects="subjects" />
			</div>
		</div>
	</div>
</template>

<style scoped>
	.report-controls-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.report-controls {
		max-width: 100%;
		width: 350px;
	}

	.font-size-container {
		display: flex;
		flex-direction: row;
		justify-content: stretch;
		align-items: center;
	}

	.font-size-container input {
		flex-grow: 1;
		margin: 0 1em;
	}

	h1 small {
		display: block;
		margin-top: 0.25em;
	}

	@media print {
		hr,
		.form-container,
		.report-controls-container,
		.subject-container {
			display: none;
		}
	}
</style>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import StartEndDate from '@/vue-components/StartEndDate.vue';
import SelectTwo from '@/vue-components/SelectTwo.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';
import ReportSection from './Section.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateStringObject, lastQuarter } from '@/modules/date-utils.js';
import { renderDateRange } from '@/modules/date-utils.js';
import { fetchConfig, jsonOrThrow, groupUsers } from '@/modules/utils.js';

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
			report: null,

			reportFontSizeValue: 1,

			subjectId: null
		};
	},
	computed: {
		canRunReport() {
			return Boolean(this.customReportId);
		},
		reportFontSize() {
			return `${this.reportFontSizeValue}em`;
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
		},
		groupedSubjects() {
			if (!this.sortedReportSubjects)
				return;

			return groupUsers(this.sortedReportSubjects);
		},
		subject() {
			if (!this.subjectId || !this.sortedReportSubjects)
				return;

			return this.sortedReportSubjects.find(s => s.id === Number(this.subjectId));
		},
		subjects() {
			return this.subject
				? [this.subject]
				: this.sortedReportSubjects;
		}
	},
	mounted() {
		this.fetchCustomReports();
	},
	methods: {
		renderDateRange,
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
		},
		handlePrint() {
			window.print();
		}
	},
	components: {
		SelectTwo,
		StartEndDate,
		RichDateRange,
		ReportSection
	}
};
</script>
