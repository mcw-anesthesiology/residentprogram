<template>
	<section class="individual-dashboard">
		<loading-placeholder v-if="$apollo.loading" />
		<template v-else-if="user">
			<h2>{{ user.full_name }}</h2>

			<div class="dashboard-container">
				<dashboard-compensation :user="user" />
				<academic-productivity :user="user" />
				<leadership-professional-citizenship :user="user" />
				<dashboard-goals :user="user" />
			</div>
		</template>
	</section>
</template>

<style scoped>
.dashboard-container {
	display: grid;
	grid-gap: 2px;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: repeat(2, 1fr);
	background: #f0f0f0;
}
</style>

<script>
/** @format */
import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import DashboardCompensation from './Compensation.vue';
import AcademicProductivity from './AcademicProductivity.vue';
import LeadershipProfessionalCitizenship from './LeadershipProfessionalCitizenship.vue';
import DashboardGoals from './Goals.vue';

import { INDIVIDUAL_DASHBOARD_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		userId: {
			type: [String, Number],
			required: true
		},
		dates: {
			type: Object,
			required: true
		},
		includeIncomplete: {
			type: Boolean
		}
	},
	data() {
		return {
			user: null
		};
	},
	apollo: {
		user: {
			query: gql`
				query IndividualDashboardUser(
					$userId: ID!
					$startDate: Date
					$endDate: Date
					$status: MeritReportStatus
				) {
					user(id: $userId) {
						id
						full_name
						meritReports(
							after: $startDate
							before: $endDate
							status: $status
						) {
							...IndividualDashboardFields
						}
					}
				}
				${INDIVIDUAL_DASHBOARD_FIELDS}
			`,
			variables() {
				return {
					userId: this.userId,
					...this.dates,
					status: this.includeIncomplete ? undefined : 'COMPLETE'
				};
			}
		}
	},
	components: {
		LoadingPlaceholder,
		DashboardCompensation,
		AcademicProductivity,
		LeadershipProfessionalCitizenship,
		DashboardGoals
	}
};
</script>
