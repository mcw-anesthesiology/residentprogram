<template>
	<div class="container body-block">

		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="usersWithMerits">
			<data-table :thead="thead" :data="userBoards"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="$apollo.queries.users.refetch()" />
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import DataTable from '@/vue-components/DataTable.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import { logError, storeError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';

export default {
	props: {
		dates: Object,
		formId: [String, Number],
		completeOnly: Boolean
	},

	data() {
		return {
			usersWithMerits: []
		};
	},
	apollo: {
		usersWithMerits: {
			query: gql`
				query NationalBoardsQuery(
					$formId: ID
					$startDate: String
					$endDate: String
				) {
					usersWithMerits(
						form_id: $formId
						period_start: $startDate
						period_end: $endDate
					) {
						id
						full_name
						meritReports(
							form_id: $formId
							period_start: $startDate
							period_end: $endDate
						) {
							title
							nationalBoards {
								name
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
				'National boards'
			]];
		},
		userBoards() {
			if (!this.usersWithMerits)
				return;

			return this.usersWithMerits.map(user => {
				let boards = '';
				const checklist = user.meritReports[0];
				try {
					if (checklist.nationalBoards == null) {
						boards = '<i>Not implemented for merit form</i>';
					} else {
						boards = `<ul>${checklist.nationalBoards.map(board =>
								`<li>${board.name} - ${board.role}</li>`
						).join(' ')}</ul>`;
					}
				} catch (e) {
					logError(e);
					boards = '<i>Error!</i>';
				}

				return [
					user.full_name,
					boards
				];
			});
		},
		exportFilename() {
			return `National boards ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		}
	},

	components: {
		LoadingPlaceholder,
		DataTable
	}
};
</script>
