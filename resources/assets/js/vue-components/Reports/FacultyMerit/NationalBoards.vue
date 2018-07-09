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
			<data-table :thead="thead" :data="userBoards"
				:export-filename="exportFilename"
				reloadable
				exportable
				@reload="fetchUsersWithMerits" />
		</div>
	</div>
</template>

<script>
import DataTable from '@/vue-components/DataTable.vue';
import UsersWithMeritReport from './UsersWithMeritReport.vue';

import { logError } from '@/modules/errors.js';
import { getNationalBoards } from '@/modules/merits/faculty-merit/index.js';
import { isoDateString } from '@/modules/date-utils.js';

export default {
	extends: UsersWithMeritReport,

	computed: {
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
				try {
					boards = `<ul>${getNationalBoards(user.report).map(board =>
						`<li>${board.name} - ${board.role}</li>`
					).join(' ')}</ul>`;
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
