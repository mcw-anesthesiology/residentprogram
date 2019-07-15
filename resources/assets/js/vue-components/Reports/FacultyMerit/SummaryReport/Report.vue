<template>

</template>

<script>
import gql from 'graphql-tag';

import { SUMMARY_REPORT_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			facultyFormId: null,
			howWouldYouRateQuestionId: null,
			wouldYouRecommendContinueTrainQuestionId: null
		}
	},
	apollo: {
		meritReports: {
			query: gql`
				query MeritSummaryReportQuery(
					$after: DateTime
					$before: DateTime
				) {
					meritReports {
						...SummaryReportFields
					}
				}
				${SUMMARY_REPORT_FIELDS}
			`,
			variables() {
				return {
					after: this.dates.startDate,
					before: this.dates.endDate,

					subjectResponseFormId: this.facultyFormId,
					subjectResponseQuestionId: this.howWouldYouRateQuestionId,

					subjectTextResponseFormId: this.facultyFormId,
					subjectTextResponseQuestionId: this.wouldYouRecommendContinueTrainQuestionId

				}
			}
		}
	}
};
</script>
