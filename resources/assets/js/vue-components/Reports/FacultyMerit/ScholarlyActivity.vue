<template>
	<div class="container body-block">
		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="usersWithMerits">
			<data-table :thead="thead" :data="userScholarlyActivities"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="$apollo.queries.usersWithMerits.refetch()" />
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
				query NationalBoardsQuery(
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
							pubMedIds
							conferencePresentations
							otherPresentations
							chaptersTextbooks
							numGrants
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


			return this.usersWithMerits.flatMap(user => {
				return user.meritReports.map(merit => {
					const pmids = [...(merit.pubMedIds || []), ...Array(4).fill('')].slice(0, 4);

					return [
						user.full_name,
						...pmids,
						merit.conferencePresentations,
						merit.otherPresentations,
						merit.chaptersTextbooks,
						merit.numGrants,
						merit.leadershipRole ? 'Y' : 'N',
						booleanDisplay(merit.teachingFormalCourses)
					];
				});
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

function booleanDisplay(val) {
	if (val == null) {
		return '';
	}

	return val ? 'Y' : 'N';
}
</script>
