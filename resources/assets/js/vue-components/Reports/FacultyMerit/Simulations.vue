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
			<data-table :thead="thead" :data="userParticipates"
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

import { getParticipatesInSimulation } from '@/modules/merits/faculty-merit/index.js';
import { isoDateString } from '@/modules/date-utils.js';

export default {
	extends: UsersWithMeritReport,

	computed: {
		thead() {
			return [[
				'Faculty member',
				'Participates in simulation'
			]];
		},
		userParticipates() {
			if (!this.usersWithMerit)
				return;

			return this.usersWithMerit.map(user => [
				user.full_name,
				getParticipatesInSimulation(user.report) ? 'X' : ''
			]);
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
