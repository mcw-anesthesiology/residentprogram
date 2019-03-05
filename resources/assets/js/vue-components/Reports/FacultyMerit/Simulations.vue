<template>
	<div class="container body-block">
		<p v-if="$apollo.loading">Loading...</p>
		<div v-else-if="usersWithMerit">
			<data-table :thead="thead" :data="userParticipates"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="fetchUsersWithMerits" />
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import DataTable from '@/vue-components/DataTable.vue';

import { logError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';

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
				query SimulationsQuery(
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
							participatesInSimulation
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
		thead() {
			return [[
				'Faculty member',
				'Participates in simulation'
			]];
		},
		userParticipates() {
			if (!this.usersWithMerit)
				return;

			return this.usersWithMerit.map(user => {
				let participates = '';
				try {
					if (user.meritReports[0].participatesInSimulation) {
						participates = 'X';
					} else if (user.meritReports[0].participatesInSimulation == null) {
						participates = '<i>Not implemented for checklist type</i>';
					}
				} catch (e) {
					logError(e);
					participates = '<i>Error!</i>';
				}

				return [
					user.full_name,
					participates
				];
			});
		},
		exportFilename() {
			return `Simulation ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		}
	},

	components: {
		DataTable
	}
};
</script>
