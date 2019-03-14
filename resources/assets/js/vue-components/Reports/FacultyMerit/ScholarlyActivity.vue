<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="usersWithMerits">
			<data-table :thead="thead" :data="userScholarlyActivities"
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
import UserWithScholarlyActivityListItem from '@/vue-components/MeritCompensation/UserWithScholarlyActivityListItem.vue';

import { isoDateString } from '@/modules/date-utils.js';
import { storeError } from '@/modules/errors.js';

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
							pubMedIds
							conferencePresentations
							otherPresentations
							chaptersTextbooks
							grantLeadership
							leadershipRole
							teachingFormalCourses
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
				'Faculty Member',
				'PMID 1',
				'PMID 2',
				'PMID 3',
				'PMID 4',
				'Conference Presentations (#)',
				'Other Presentations (#)',
				'Chapters / Texbooks (#)',
				'Grant Leadership (#)',
				'Leadership or Peer-Review Role (Y/N)',
				'Teaching Formal Courses (Y/N)'
			]];
		},
		userScholarlyActivities() {
			if (!this.usersWithMerits)
				return;


			return this.usersWithMerits.map(user => {
				const merit = user.meritReports[0];

				let pmids = [...(merit.pubMedIds || []), ...Array(4).fill('')].slice(0, 4);

				return [
					user.full_name,
					...pmids,
					merit.conferencePresentations,
					merit.otherPresentations,
					merit.chaptersTextbooks,
					merit.grantLeadership,
					merit.leadershipRole ? 'Y' : 'N',
					merit.teachingFormalCourses ? 'Y' : 'N'
				];
			});
		},
		exportFilename() {
			return `Scholarly activity ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		}
	},

	components: {
		LoadingPlaceholder,
		DataTable,
		UserWithScholarlyActivityListItem
	}
};
</script>
