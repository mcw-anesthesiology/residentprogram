<template>
	<div>
		<div class="user-selector-container container body-block">
			<form>
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
		</div>

		<individual-dashboard
			v-if="user"
			:user="user"
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
			usersWithMerits: [],
			user: null,
			reportTitle: 'Faculty Activity Report',
			leadershipRole: '',
			includeSummary: true,

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
				query FY18CompQuery {
					providerInfo: fy18 {
						lastName
						firstName
						division
					}
				}
			`
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
		FormSelect,
		IndividualDashboard
	}
};
</script>
