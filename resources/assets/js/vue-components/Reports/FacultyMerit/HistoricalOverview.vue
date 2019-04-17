<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="meritReports">
			<academic-productivity :reports="meritReports" :dates="dates" show-breakdowns />
			<reports-yearly-overview :reports="meritReports" />
		</div>
	</div>
</template>

<script>
/** @format */

import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import ReportsYearlyOverview from './ReportsYearlyOverview.vue';
import AcademicProductivity from './AcademicProductivity.vue';

import { YEARLY_OVERVIEW_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		dates: Object,
		formId: [String, Number],
		includeIncomplete: {
			type: Boolean,
			default: false
		}
	},
	apollo: {
		meritReports: {
			query: gql`
				query MeritReportsQuery(
					$status: MeritReportStatus
					$startDate: Date
					$endDate: Date
				) {
					meritReports(
						status: $status
						after: $startDate
						before: $endDate
					) {
						...YearlyOverviewFields
					}
				}
				${YEARLY_OVERVIEW_FIELDS}
			`,
			variables() {
				return {
					...this.dates,
					status: this.includeIncomplete ? undefined : 'COMPLETE'
				};
			}
		}
	},
	components: {
		LoadingPlaceholder,
		ReportsYearlyOverview,
		AcademicProductivity
	}
};
</script>
