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
				<template slot-scope="meritUser">
					<user-with-merit-publications-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import ComponentList from '@/vue-components/ComponentList.vue';

import UsersWithMeritReport from './UsersWithMeritReport.vue';
import UserWithMeritPublicationsListItem from '@/vue-components/MeritCompensation/UserWithMeritPublicationsListItem.vue';

import {
	getAllPublicationTypes,
	getFacultyPublicationsByType
} from '@/modules/merits/faculty-merit/index.js';
import { downloadCsv } from '@/modules/report-utils.js';

export default {
	extends: UsersWithMeritReport,

	methods: {
		getCsv() {
			if (!this.usersWithMerits)
				return;

			let csv = [
				[
					'Name',
					'Total',
					...getAllPublicationTypes(
						this.usersWithMerits[0].merit_reports[0]
					)
				]
			];
			for (let userWithMerit of this.usersWithMerit) {
				let row = [];
				let pubsByType = Array.from(getFacultyPublicationsByType(userWithMerit.report, false).values())
					.map(pubs => pubs.length);
				let totalPubs = Array.from(getFacultyPublicationsByType(userWithMerit.report).values())
					.reduce((acc, pubs) =>
						acc + pubs.length
					, 0);

				row.push(
					userWithMerit.full_name,
					totalPubs,
					...pubsByType
				);

				csv.push(row);
			}

			downloadCsv(csv, 'Publications', this.dates);
		}
	},

	components: {
		ComponentList,
		UserWithMeritPublicationsListItem
	}
};
</script>
