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

		<individual-dashboard
			v-if="user"
			:user="user"
			:dates="dates"
			:title="reportTitle"
			:user-props="userProps"
		/>
	</div>
</template>

<style scoped>
@media print {
	.user-selector-container {
		display: none;
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
import { INDIVIDUAL_DASHBOARD_FIELDS } from '@/graphql/merit.js';

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
			reportTitle: 'Faculty Activity Report',
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
		},
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
						email
						evaluatorEvaluations(
							after: $startDate
							before: $endDate
							status: complete
							type: trainee
						) {
							id
						}
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
		},
		leadershipRole: {
			client: 'staff',
			query: gql`
				query IndividualDashboardUserStaffInfo($email: String) {
					staffMember(email: $email) {
						email
						... on Faculty {
							roles
						}
					}
				}
			`,
			variables() {
				let email;
				if (this.user) {
					email = this.user.email;
				}

				return {
					email
				};
			},
			skip() {
				return !this.user;
			},
			manual: true,
			result({ data }) {
				if (data && data.staffMember && data.staffMember.roles) {
					const { roles } = data.staffMember;
					if (roles.length > 0) {
						this.leadershipRole = roles[0];
					}
				}
			}
		}
	},
	watch: {
		user() {
			this.leadershipRole = '';
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
				this.$router.push({
					name: 'merit-individual-dashboard',
					params: { userId }
				});
			}
		}
	},
	components: {
		SelectTwo,
		IndividualDashboard
	}
};
</script>
