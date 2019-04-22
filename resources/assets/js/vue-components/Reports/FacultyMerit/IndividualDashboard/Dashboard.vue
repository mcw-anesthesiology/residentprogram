<template>
	<section class="individual-dashboard">
		<loading-placeholder v-if="$apollo.loading" />
		<template v-else-if="user">
			<h1>
				{{ title }}
				<small>
					<rich-date-range :dates="dates" />
				</small>
			</h1>

			<dl>
				<dt>Name</dt>
				<dd>{{ user.full_name }}</dd>
				<template v-for="[name, val] of Array.from(userProps.entries())">
					<dt :key="`${name}:name`">{{ name }}</dt>
					<dd :key="`${name}:val`">{{ val }}</dd>
				</template>
			</dl>

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
.individual-dashboard {
	page-break-inside: avoid;
}

.dashboard-container {
	display: grid;
	grid-gap: 2px;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: repeat(2, 1fr);
	background: #f0f0f0;
}

dl {
	display: flex;
	flex-wrap: wrap;
	margin: 0;
}

dt, dd {
	flex-basis: 50%;
}

@supports (display: grid) {
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5em;
	}
}

@media print {
	.individual-dashboard {
		font-size: 0.5em;
	}
}
</style>

<script>
/** @format */
import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import RichDateRange from '#/RichDateRange.vue';

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
		},
		title: {
			type: String,
			default: 'Individual dashboard'
		},
		role: {
			type: String
		},
		userProps: {
			type: Map,
			default() {
				return new Map();
			}
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
		RichDateRange,
		DashboardCompensation,
		AcademicProductivity,
		LeadershipProfessionalCitizenship,
		DashboardGoals
	}
};
</script>
