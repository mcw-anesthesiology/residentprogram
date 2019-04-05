<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="meritReports">
			<reports-yearly-overview :reports="meritReports" />
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import ReportsYearlyOverview from './ReportsYearlyOverview.vue';


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
					$formId: ID
					$status: MeritReportStatus
				) {
					meritReports(
						form_id: $formId
						status: $status
					) {
						id
						period_start
						period_end
						grants {
							type
							agency
							amount
						}
					}
				}
			`,
			variables() {
				return {
					formId: this.formId,
					status: this.completeOnly ? 'COMPLETE' : undefined
				};
			}
		}
	},
	components: {
		LoadingPlaceholder,
		ReportsYearlyOverview
	}
};
</script>
