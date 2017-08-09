<template>
	<div class="container body-block">
		<div class="controls-row row">
			<div class="col-sm-6 col-sm-offset-3">
				<label class="containing-label">
					Academic year
					<academic-year-selector v-model="dates"
						:min-date="meritsReleaseDate" />
				</label>
			</div>
		</div>

		<div v-if="usersWithMerit">
			<data-table :thead="thead" :data="userScholarlyActivities"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="fetchUsersWithMerits" />
		</div>
	</div>
</template>

<script>
import DataTable from 'vue-components/DataTable.vue';
import UsersWithMeritReport from './UsersWithMeritReport.vue';
import UserWithScholarlyActivityListItem from 'vue-components/MeritCompensation/UserWithScholarlyActivityListItem.vue';

import { getScholarlyActivity } from 'modules/merits/faculty-merit/index.js';
import { isoDateString } from 'modules/date-utils.js';

export default {
	extends: UsersWithMeritReport,

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
			if (!this.usersWithMerit)
				return;

			let userScholarlyActivities = [];

			for (let user of this.usersWithMerit) {
				userScholarlyActivities.push(getScholarlyActivity(user.report, user.full_name));
			}

			return userScholarlyActivities;
		},
		exportFilename() {
			return `Scholarly activity ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		}
	},

	components: {
		DataTable,
		UserWithScholarlyActivityListItem
	}
};
</script>
