<template>
	<div>
		<div v-if="me" v-cloak id="faculty-merit-reports-container" class="container">
			<bootstrap-alert v-if="inProgressReport" type="info">
				<p class="lead">
					You have a checklist in progress:
					<span class="progress-form">
						<span>
							{{ inProgressReport.form.name }}
						</span>
						-
						<rich-date-range :dates="inProgressReport" start="period_start" end="period_end" />
					</span>
				</p>
				<div class="btn-lg-submit-container">
					<router-link :to="`/checklist/${inProgressReport.id}`" class="btn btn-lg btn-primary">
						Continue from where you left off
					</router-link>
				</div>
			</bootstrap-alert>
			<bootstrap-alert v-else-if="needsToStartReport" type="info">
				<p class="lead">
					You haven't submitted a checklist yet for this year.
				</p>

				<div class="btn-lg-submit-container">
					<button type="button" class="btn btn-lg btn-primary"
						@click="addMeritReport"
					>
						Start a new checklist
					</button>
				</div>
			</bootstrap-alert>

			<bootstrap-alert v-else type="success">
				<p class="lead">
					You've already completed your checklist for this year. Thanks!
				</p>
				<div class="btn-lg-submit-container">
					<router-link :to="`/checklist/${me.meritReports[me.meritReports.length - 1].id}`" class="btn btn-lg btn-success">
						View your submission
					</router-link>
				</div>
			</bootstrap-alert>

		</div>

		<alert-list v-model="alerts"></alert-list>

		<div class="container body-block">
			<h2>Your checklists</h2>

			<component-list v-if="me && me.meritReports.length > 0"
				:items="me.meritReports"
				:fields="meritReportFields"
				:field-accessors="meritReportFieldAccessors"
				default-sort-order="desc"
				reloadable
				@reload="handleReload"
			>
				<template slot-scope="item">
					<merit-report-list-item v-bind="item"
						@change="handleReload"
						@alert="alerts.push(arguments[0])"
					/>
				</template>
			</component-list>
			<loading-placeholder v-else-if="$apollo.loading" />
			<div v-else>
				<p class="lead">
					You don't have any submitted checklists yet.
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.lead {
		font-size: 1.5em;
		margin: 1em;
		text-align: center;
	}

	.progress-form {
		margin: 1em 0;
		display: block;
		font-size: 1.05em;
		font-weight: bold;
	}

	#faculty-merit-reports-container .alert {
		padding: 4em 2em;
	}

	#faculty-merit-reports-container .alert > .lead {
		margin: 1em;
	}
</style>

<script>
// TODO: Redo this
import gql from 'graphql-tag';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import BootstrapAlert from '#/BootstrapAlert.vue';
import ComponentList from '#/ComponentList.vue';
import MeritReportListItem from '#/MeritCompensation/ReportListItem.vue';
import RichDateRange from '#/RichDateRange.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import { datesEqual } from '@/modules/date-utils.js';
import { getCurrentYearlyMeritDateRange } from '@/modules/merit-utils.js';

import { MY_MERIT_REPORTS_QUERY, MERIT_REPORT_LIST_FIELDS } from '@/graphql/merit.js';

export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			me: null
		};
	},
	apollo: {
		me: {
			query: MY_MERIT_REPORTS_QUERY
		}
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
			if (!this.me || this.me.meritReports.length === 0)
				return true;


			return !this.me.meritReports.some(report => {
				let periodDates = {
					startDate: report.period_start,
					endDate: report.period_end
				};

				return (datesEqual(periodDates, this.currentYearlyMeritDateRange)
					&& report.status === 'COMPLETE');
			});
		},
		inProgressReport() {
			if (!this.me || this.me.meritReports.length === 0)
				return false;

			return this.me.meritReports.find(report =>
				['PENDING', 'OPEN'].includes(report.status));
		}
	},

	methods: {
		handleReload() {
			this.$apollo.queries.me.refetch();
		},
		addMeritReport() {
			this.$apollo.mutate({
				mutation: gql`
					mutation {
						createMyMeritChecklist {
							...MeritReportListFields
						}
					}
					${MERIT_REPORT_LIST_FIELDS}
				`,
				update(store, { data: { createMyMeritChecklist } }) {
					const query = MY_MERIT_REPORTS_QUERY;
					const data = store.readQuery({ query });

					if (data.me) {
						data.me.meritReports.push(createMyMeritChecklist);
					}

					store.writeQuery({ query, data });
				}
			}).then(({ data: { createMyMeritChecklist } }) => {
				this.$router.push(`/checklist/${createMyMeritChecklist.id}`);
			});
		}
	},

	components: {
		BootstrapAlert,
		ComponentList,
		MeritReportListItem,
		RichDateRange,
		LoadingPlaceholder
	}
};
</script>
