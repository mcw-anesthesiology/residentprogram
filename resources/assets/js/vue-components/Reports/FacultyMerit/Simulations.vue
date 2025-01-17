<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="usersWithMerits">
			<data-table :thead="thead" :data="userParticipates"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="$apollo.queries.users.refetch()" />
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import DataTable from '@/vue-components/DataTable.vue';

import { logError, storeError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';

export default {
	props: {
		dates: Object,
		formId: [String, Number],
		includeIncomplete: Boolean
	},

	data() {
		return {
			usersWithMerits: []
		};
	},
	apollo: {
		usersWithMerits: {
			query: gql`
				query SimulationsQuery(
					$formId: ID
					$startDate: Date
					$endDate: Date
				) {
					usersWithMerits(
						form_id: $formId
						after: $startDate
						before: $endDate
					) {
						id
						full_name
						meritReports(
							form_id: $formId
							after: $startDate
							before: $endDate
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
					status: this.includeIncomplete ? undefined : 'COMPLETE'
				};
			},
			error(err) {
				storeError(err, this, 'Sorry, there was a problem fetching the report');
			}
		}
	},

	computed: {
		thead() {
			return [[
				'Faculty member',
				'Participates in simulation'
			]];
		},
		userParticipates() {
			if (!this.usersWithMerits)
				return;

			return this.usersWithMerits.flatMap(user => {
				return user.meritReports.map(mr => {
					let participates = '';
					try {
						if (mr.participatesInSimulation) {
							participates = 'X';
						} else if (mr.participatesInSimulation == null) {
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
			});
		},
		exportFilename() {
			return `Simulation ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		}
	},

	components: {
		LoadingPlaceholder,
		DataTable
	}
};
</script>
