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
					<user-with-merit-publications-list-item
						v-bind="meritUser" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import AcademicYearSelector from 'vue-components/AcademicYearSelector.vue';
import ComponentList from 'vue-components/ComponentList.vue';
import UserWithMeritPublicationsListItem from 'vue-components/MeritCompensation/UserWithMeritPublicationsListItem.vue';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import {
	getAllPublicationTypes,
	getFacultyPublicationsByType
} from 'modules/merits/faculty-merit.js';

import { isoDateStringObject, lastYear } from 'modules/date-utils.js';
import { downloadCsv } from 'modules/report-utils.js';
import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			dates: isoDateStringObject(lastYear()),
			usersWithMerits: null
		};
	},

	mounted() {
		this.fetchUsersWithMerits();
	},

	computed: {
		meritsReleaseDate() {
			return '2016-07-01';
		},
		usersWithMerit() {
			if (!this.usersWithMerits)
				return;

			let usersWithMerit = [];

			for (let user of this.usersWithMerits) {
				let report = this.getMostRecentCompleteReport(user.merit_reports);

				if (report) {
					usersWithMerit.push(Object.assign({}, user, {report}));
				}
			}

			return usersWithMerit;
		}
	},

	watch: {
		dates() {
			this.fetchUsersWithMerits();
		}
	},

	methods: {
		fetchUsersWithMerits() {
			let q = $.param(this.dates);

			fetch(`/merits/by-user?${q}`, {
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(usersWithMerits => {
				this.usersWithMerits = usersWithMerits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching merits'
				});
			});
		},
		getMostRecentCompleteReport(meritReports) {
			if (!meritReports || meritReports.length < 1)
				return;

			let mostRecent = null;

			for (let meritReport of meritReports) {
				if (
					meritReport.status === 'complete'
					&& (
						mostRecent == null
						|| moment(meritReport.period_end) >= moment(mostRecent.period_end)
					)
				)
					mostRecent = meritReport;
			}

			return mostRecent;
		},
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
			for (let userWithMerits of this.usersWithMerits) {
				let row = [];
				let report = this.getMostRecentCompleteReport(
					userWithMerits.merit_reports
				);
				let pubsByType = Array.from(getFacultyPublicationsByType(report, false).values())
					.map(pubs => pubs.length);
				let totalPubs = Array.from(getFacultyPublicationsByType(report).values())
					.reduce((acc, pubs) =>
						acc + pubs.length
					, 0);

				row.push(
					userWithMerits.full_name,
					totalPubs,
					...pubsByType
				);

				csv.push(row);
			}

			downloadCsv(csv, 'Publications', this.dates);
		}
	},

	components: {
		AcademicYearSelector,
		ComponentList,
		UserWithMeritPublicationsListItem
	}
};
</script>

<style scoped>
	.controls-row {
		margin-bottom: 3em;
	}

	.containing-label {
		width: 100%;
	}
</style>
