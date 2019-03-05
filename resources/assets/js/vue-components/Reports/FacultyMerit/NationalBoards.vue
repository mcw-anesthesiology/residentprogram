<template>
	<div class="container body-block">

		<p v-if="$apollo.loading">Loading...</p>
		<div v-else-if="usersWithMerit">
			<data-table :thead="thead" :data="userBoards"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="$apollo.queries.users.refetch" />
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
				query NationalBoardsQuery(
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
				'National boards'
			]];
		},
		userBoards() {
			if (!this.usersWithMerit)
				return;

			return this.usersWithMerit.map(user => {
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
		DataTable
	}
};
</script>
