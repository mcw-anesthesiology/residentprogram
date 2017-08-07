<template>
	<div class="container body-block">
		<div class="controls-row row">
			<div class="col-sm-4 col-sm-offset-3">
				<label class="containing-label">
					Academic year
					<academic-year-selector v-model="dates"
						:min-date="meritsReleaseDate" />
				</label>
			</div>
			<div v-show="usersWithMerits" class="col-sm-3">
				<button type="button" class="labelless-button btn btn-default"
						@click="getCsv">
					Export CSV
				</button>
			</div>
		</div>

		<div v-if="usersWithMerit">
			<component-list :fields="['full_name']"
					:items="usersWithMerit"
					:paginate="false"
					reloadable
					@reload="fetchUsersWithMerits">
				<template scope="meritUser">
					<user-with-scholarly-activity-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import UsersWithMeritReport from './UsersWithMeritReport.vue';
import UserWithScholarlyActivityListItem from 'vue-components/MeritCompensation/UserWithScholarlyActivityListItem.vue';

import { getScholarlyActivity } from 'modules/merits/faculty-merit/index.js';
import { downloadCsv } from 'modules/report-utils.js';

export default {
	extends: UsersWithMeritReport,

	methods: {
		getCsv() {
			let csv = [
				[
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
				]
			];

			for (let user of this.usersWithMerit) {
				csv.push(getScholarlyActivity(user.report, user.full_name));
			}

			downloadCsv(csv, 'Scholarly Activity', this.dates);
		}
	},

	components: {
		UserWithScholarlyActivityListItem
	}
};
</script>
