<template>
	<div>
		<div class="user-selector-container container body-block">
			<form>
				<label class="containing-label">
					User
					<select-two
						:options="groupedUsers"
						:value="userId"
						@input="handleUserIdChange"
					/>
				</label>

				<label class="containing-label">
					<input type="checkbox" v-model="showAllUsers" />
					Show all users
				</label>

				<label class="containing-label">
					Title
					<input type="text" class="form-control" v-model="reportTitle" />
				</label>

				<label class="containing-label">
					Leadership role
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="leadershipRole"
						/>
						<span class="input-group-btn">
							<button type="button" class="btn btn-default"
								@click="fetchLeadershipRole"
							>
								Fetch
							</button>
						</span>
					</div>
				</label>


				<label class="containing-label">
					Form
					<form-select v-model="facultyFormId" />
				</label>

				<label class="containing-label">
					Overall abilities question ID
					<input
						type="text"
						class="form-control"
						v-model="overallAbilitiesQuestionId"
					/>
				</label>

				<label class="containing-label">
					Continue to train residents question ID
					<input
						type="text"
						class="form-control"
						v-model="continueToTrainQuestionId"
					/>
				</label>

				<label>
					<input type="checkbox" v-model="includeSummary" />
					Include summary
				</label>
			</form>

			<div class="text-center">
				<button v-if="printingAll" type="button" class="btn btn-warning"
					@click="printingAll = false"
				>
					Cancel
				</button>
				<template v-else>
					<button type="button" class="btn btn-default" @click="printUserDashboard">
						Print
					</button>

					<button type="button" class="btn btn-primary"
						@click="printAll"
					>
						Print all
					</button>
				</template>
			</div>
		</div>

		<individual-dashboard
			ref="dashboard"
			v-show="user"
			:user="user"
			:provider-info="userProviderInfo"
			:dates="dates"
			:title="reportTitle"
			:user-props="userProps"
			:include-summary="includeSummary"
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
import FormSelect from '#/FormSelect.vue';

import IndividualDashboard from './IndividualDashboard/Dashboard.vue';

import { groupUsers } from '@/modules/utils.js';

import { GROUP_USER_FIELDS } from '@/graphql/user.js';
import { SUMMARY_REPORT_USER_FIELDS, SUMMARY_REPORT_CHECKLIST_FIELDS } from '@/graphql/merit.js';

// Yuck
const overallAbilitiesMappings = [
	{ text: 'unacceptable', value: 1 },
	{ text: 'needs-improvement', value: 2 },
	{ text: 'meets-expectations', value: 3 },
	{ text: 'exceeds-expectations', value: 4 },
	{ text: 'outstanding', value: 5 },

	{ text: 'poor', value: 1 },
	{ text: 'moderately-poor', value: 2 },
	{ text: 'good', value: 3 },
	{ text: 'excellent', value: 4 }
];

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
			providerInfo: null,
			allUsers: [],
			usersWithMerits: [],
			user: null,
			reportTitle: 'Faculty Activity Report',
			leadershipRole: '',
			includeSummary: false,

			printingAll: false,
			showAllUsers: false,

			// FIXME
			facultyFormId: 63,
			overallAbilitiesQuestionId: 'q23',
			continueToTrainQuestionId: 'q20',
			overallAbilitiesMappings,
		};
	},
	apollo: {
		providerInfo: {
			query: gql`
				query FY19CompQuery {
					providerInfo: fy19 {
						lastName
						firstName
						division
						baseSalary
						premiumPay
						totalPay
						totalUnits
						clinicalFTE
					}
				}
			`
		},
		allUsers: {
			query: gql`
				query IndividualDashboardsAllUsers {
					allUsers: users(
						type: FACULTY
						orderBy: [
							{ field: "last_name", order: ASC },
							{ field: "first_name", order: ASC }
						]
					) {
						...SelectTwoGroupFields
					}
				}
				${GROUP_USER_FIELDS}
			`,
			skip() {
				return !this.showAllUsers;
			}
		},
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
						orderBy: [
							{ field: "last_name", order: ASC },
							{ field: "first_name", order: ASC }
						]
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
			},
			skip() {
				return this.showAllUsers;
			}
		},
		user: {
			query: gql`
				query IndividualDashboardUser(
					$userId: ID!
					$after: Date
					$before: Date
					$status: MeritReportStatus
					$subjectResponseFormId: ID!
					$continueToTrainQuestionId: ID!
					$overallAbilitiesQuestionId: ID!
					$overallAbilitiesMappings: [NumericValueMapping]!
					$includeSummary: Boolean!
				) {
					user(id: $userId) {
						id
						first_name
						last_name
						full_name
						email
						...SummaryReportUserFields
						meritReports(
							after: $after
							before: $before
							status: $status
						) {
							...SummaryReportChecklistFields

							period_start @include(if: $includeSummary)
							period_end @include(if: $includeSummary)
							report @include(if: $includeSummary)
							status @include(if: $includeSummary)

							publications {
								publicationType
								title
							}

							committeesByType {
								organizationType
								committees {
									name
									role
								}
							}

							grants {
								project
							}

							studies {
								title
								role
							}

							lectures {
								title
								date
							}
						}
					}
				}
				${SUMMARY_REPORT_USER_FIELDS}
				${SUMMARY_REPORT_CHECKLIST_FIELDS}
			`,
			variables() {
				return {
					includeSummary: this.includeSummary,
					userId: this.userId,
					status: this.includeIncomplete ? undefined : 'COMPLETE',
					after: this.dates.startDate,
					before: this.dates.endDate,

					subjectResponseFormId: this.facultyFormId,
					continueToTrainQuestionId: this.continueToTrainQuestionId,
					overallAbilitiesQuestionId: this.overallAbilitiesQuestionId,

					overallAbilitiesMappings: this.overallAbilitiesMappings
				};
			},
			skip() {
				return !this.userId;
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
		user(user, prevUser) {
			if (!user || (prevUser && user.email !== prevUser.email)) {
				this.leadershipRole = '';
			}
		}
	},
	computed: {
		userProviderInfo() {
			return this.user && this.providerInfo && this.providerInfo.find(pi =>
				this.user.last_name === pi.lastName
				&& this.user.first_name
				&& this.user.first_name.startsWith(pi.firstName)
			);
		},
		userOptions() {
			return this.showAllUsers ? this.allUsers : this.usersWithMerits;
		},
		groupedUsers() {
			if (!this.userOptions || this.userOptions.length === 0)
				return [];

			return groupUsers(this.userOptions);
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
		async handleUserIdChange(userId) {
			if (userId) {
				return this.$router.push({
					name: 'merit-individual-dashboard',
					params: { userId }
				});
			}
		},
		async fetchLeadershipRole() {
			return this.$apollo.queries.leadershipRole.refetch();
		},
		async printAll() {
			this.printingAll = true;

			for (const user of this.usersWithMerits) {
				try {
					if (!this.printingAll)
						break;

					await this.handleUserIdChange(user.id);
					await this.printUserDashboard();
				} catch (err) {
					logError(err);
				}
			}

			this.printingAll = false;
		},
		async printUserDashboard() {
			return new Promise((resolve) => {
				this.$nextTick(() => {
					this.fetchLeadershipRole().then(() => {
						this.$nextTick(() => {
							this.$refs.dashboard.$refs.printButton.handleClick().then(() => {
								resolve();
							});
						});
					});
				});
			});
		}
	},
	components: {
		SelectTwo,
		FormSelect,
		IndividualDashboard
	}
};

async function sleep(timeout) {
	return new Promise((resolve) => {
		window.setTimeout(() => {
			resolve();
		}, timeout);
	});
}
</script>
