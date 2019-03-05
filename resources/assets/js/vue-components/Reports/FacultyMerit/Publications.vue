<template>
	<div class="container body-block">
		<p v-if="$apollo.loading">Loading...</p>
		<div v-else-if="usersWithMerit">
			<component-list :fields="['full_name']"
					:items="usersWithMerit"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithMerits">
				<template slot-scope="meritUser">
					<user-with-merit-publications-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import ComponentList from '@/vue-components/ComponentList.vue';

import UserWithMeritPublicationsListItem from '@/vue-components/MeritCompensation/UserWithMeritPublicationsListItem.vue';

import { downloadCsv } from '@/modules/report-utils.js';

export default {
	props: {
		dates: Object,
		formId: [String, Number],
		completeOnly: Boolean
	},

	data() {
		return {
			users: []
		};
	},
	apollo: {
		users: {
			query: gql`
				query PublicationsQuery(
					$formId: ID
					$startDate: String
					$endDate: String
				) {
					users {
						id
						full_name
						meritReports(
							form_id: $formId
							period_start: $startDate
							period_end: $endDate
						) {
							title
							publications {
								title
								author
								link
								role
							}
						}
					}
				}
			`,
			variables() {
				return {
					...this.dates,
					formId: this.formId,
					status: this.completeOnly ? 'COMPLETE' : null
				};
			}
		}
	},
	computed: {
		usersWithMerit() {
			return this.users.filter(u => u.meritReports.length > 0);
		},
	},
	methods: {
		getCsv() {
			if (!this.usersWithMerits)
				return;

			let csv = [
				[
					'Name',
					'Total',
				]
			];

			// TODO

			downloadCsv(csv, 'Publications', this.dates);
		}
	},

	components: {
		ComponentList,
		UserWithMeritPublicationsListItem
	}
};
</script>
