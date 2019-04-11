<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="meritReports">
			<academic-productivity :reports="meritReports" />
			<reports-yearly-overview :reports="meritReports" />
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import ReportsYearlyOverview from './ReportsYearlyOverview.vue';
import AcademicProductivity from './AcademicProductivity.vue';

import { YEARLY_OVERVIEW_FIELDS } from '@/graphql/merit.js';


export default {
	props: {
		dates: Object,
		formId: [String, Number],
		completeOnly: Boolean
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
					status: this.completeOnly ? 'COMPLETE' : undefined
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
