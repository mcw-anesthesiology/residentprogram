<template>
	<div>
		<div class="container body-block">
			<h1>Individual dashboard</h1>

			<label>
				User
				<select-two :options="groupedUsers" :value="userId" @input="handleUserIdChange" />
			</label>
		</div>

		<div v-if="userId" class="container-fluid body-block">
			<individual-dashboard :dates="dates" :include-incomplete="includeIncomplete" :user-id="userId" />
		</div>
	</div>
</template>

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
			user: null
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
