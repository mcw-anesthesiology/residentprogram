<template>
	<div>
		<div class="user-selector-container container body-block">
			<label>
				User
				<select-two
					:options="groupedUsers"
					:value="userId"
					@input="handleUserIdChange"
				/>
			</label>

			<label>
				Title
				<input type="text" class="form-control" v-model="reportTitle" />
			</label>

			<label>
				Leadership role
				<input
					type="text"
					class="form-control"
					v-model="leadershipRole"
				/>
			</label>
		</div>

		<div
			v-if="userId"
			class="dashboard-container container-fluid body-block"
		>
			<individual-dashboard
				:dates="dates"
				:include-incomplete="includeIncomplete"
				:user-id="userId"
				:title="reportTitle"
				:user-props="userProps"
			/>
		</div>
	</div>
</template>

<style scoped>
@media print {
	.user-selector-container {
		display: none;
	}

	.dashboard-container {
		padding: 0 !important;
		margin: 0 !important;
	}
}
</style>

<script>
/** @format */
import gql from 'graphql-tag';

import SelectTwo from '#/SelectTwo.vue';

import IndividualDashboard from './IndividualDashboard/Dashboard.vue';

import { groupUsers } from '@/modules/utils.js';

import { GROUP_USER_FIELDS } from '@/graphql/user.js';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		},
		includeIncomplete: {
			type: Boolean
		},
		userId: [String, Number]
	},
	data() {
		return {
			usersWithMerits: [],
			user: null,
			reportTitle: 'Individual dashboard',
			leadershipRole: ''
		};
	},
	apollo: {
		usersWithMerits: {
			query: gql`
				query IndividualDashboardsUsers(
					$startDate: Date
					$endDate: Date
					$status: MeritReportStatus
				) {
					usersWithMerits(
						after: $startDate
						before: $endDate
						status: $status
					) {
						...SelectTwoGroupFields
					}
				}
				${GROUP_USER_FIELDS}
			`,
			variables() {
				return {
					...this.dates,
					status: this.includeIncomplete ? undefined : 'COMPLETE'
				};
			}
		}
	},
	computed: {
		groupedUsers() {
			if (!this.usersWithMerits || this.usersWithMerits.length === 0)
				return [];

			return groupUsers(this.usersWithMerits);
		},
		userProps() {
			const map = new Map();

			if (this.leadershipRole) {
				map.set('Leadership role', this.leadershipRole);
			}

			return map;
		}
	},
	methods: {
		handleUserIdChange(userId) {
			if (userId) {
				this.$router.push(`${this.$route.path}/${userId}`);
			}
		}
	},
	components: {
		SelectTwo,
		IndividualDashboard
	}
};
</script>
