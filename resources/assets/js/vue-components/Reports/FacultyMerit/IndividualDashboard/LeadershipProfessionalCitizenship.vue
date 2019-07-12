<template>
	<section
		class="individual-merit-dashboard-section leadership-professional-citizenship"
	>
		<h2>Leadership & professional citizenship</h2>

		<section class="details">
			<section class="leadership-roles">
				<h3>Leadership roles</h3>

				<table class="leadership-roles-table">
					<tbody>
						<tr v-for="{roleType, roles} of leadershipRoles">
							<th>{{ roleType }}</th>
							<td class="education-leadership-roles">
								<ul v-if="roles.length > 0">
									<li v-for="role of roles" :key="role">
										{{ role }}
									</li>
								</ul>
							</td>
						</tr>
						<tr>
							<th>Internal</th>
						</tr>
						<tr>
							<th>Regional</th>
						</tr>
						<tr>
							<th>National &amp; International</th>
						</tr>
					</tbody>
				</table>
			</section>

			<section v-if="editorialBoards.size > 0">
				<h3>Journal Editorial Board</h3>
				<section class="journals">
					<journal-editorial-board-item
						v-for="[journal, roles] of Array.from(
							editorialBoards.entries()
						)"
						:key="journal"
						:journal="journal"
						:roles="roles"
						:showPeriods="multiplePeriods"
					/>
				</section>
			</section>

			<section v-if="committeeParticipation.size > 0">
				<h3>Committee participation</h3>
				<div class="committees">
					<committee-participation-item
						v-for="[organization, committees] of Array.from(
							committeeParticipation.entries()
						)"
						:key="organization"
						:organization="organization"
						:committees="committees"
						:showPeriods="multiplePeriods"
					/>
				</div>
			</section>
		</section>
	</section>
</template>

<style scoped>
.leadership-professional-citizenship {
	font-size: 1em;
}

.summary-container {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	padding: 0.5em 0;
}

.summary {
	font-size: 1.25em;
	flex-shrink: 1;
}

.leadership-roles table {
	border-collapse: collapse;
}

.leadership-roles th, .leadership-roles td {
	border: 1px solid #ccc;
}

th {
	font-weight: normal;
}

.summary th,
.summary td {
	padding: 0.25em 0.5em;
}

.summary td {
	text-align: center;
}

.summary td >>> .feather-check {
	color: green;
	height: 1em;
	width: 1em;
}

h3 {
	margin-top: 1em;
	margin-bottom: 0.5em;
}

.committees {
	display: flex;
	flex-wrap: wrap;
	margin: -0.25em;
}

.committees >>> .committee-participation-item {
	margin: 0.25em;
}

.journals {
	padding: 0;
	margin: -0.5em;
	display: flex;
	flex-wrap: wrap;
}

.journals >>> .journal-editorial-board-item {
	margin: 1em;
	flex-grow: 1;
}

@media print {
	.summary {
		font-size: 1em;
	}
}
</style>

<script>
/** @format */

import { CheckIcon } from 'vue-feather-icons';

import DashboardSection from './Section.vue';

import CommitteeParticipationItem from './CommitteeParticipationItem.vue';
import JournalEditorialBoardItem from './JournalEditorialBoardItem.vue';

import { renderYearRange } from '@/modules/date-utils.js';
import { pluralize } from '@/modules/text-utils.js';

export default {
	extends: DashboardSection,
	computed: {
		committeeParticipation() {
			const map = new Map();

			for (const report of this.user.meritReports) {
				if (!report.committeeParticipation) continue;

				const period = renderYearRange(
					report.period_start,
					report.period_end
				);
				for (const cp of report.committeeParticipation) {
					const arr = map.get(cp.organization) || [];
					for (const committee of cp.committees.filter(c => c.role === 'MEMBER')) {
						arr.push({
							period,
							...committee
						});
					}

					if (arr.length > 0) {
						map.set(cp.organization, arr);
					}
				}
			}

			return map;
		},
		editorialBoards() {
			const map = new Map();

			for (const report of this.user.meritReports) {
				if (!report.editorialBoards) continue;

				const period = renderYearRange(
					report.period_start,
					report.period_end
				);
				for (const eb of report.editorialBoards) {
					if (!map.has(eb.journal)) map.set(eb.journal, []);

					map.get(eb.journal).push({
						...eb,
						period
					});
				}
			}

			return map;
		},
		leadershipRoles() {
			const map = new Map();
			for (const report of this.user.meritReports) {
				for (const { roleType, roles } of report.leadershipRoles) {
					let set;
					if (map.has(roleType)) {
						set = map.get(roleType);
					} else {
						set = new Set();
						map.set(roleType, set);
					}


					roles.forEach(role => set.add(role));
				}
			}

			return Array.from(map.entries()).map(([roleType, roles]) => ({
				roleType, roles: roles.values()
			}));
		},
		numCommitteeParticipation() {
			return Array.from(this.committeeParticipation.values()).reduce((total, org) => total + this.sumCollection(org), 0);
		},
		numEditorialBoards() {
			return this.sumCollection(this.editorialBoards);
		},
		directorOfClinicalService() {
			return this.user.meritReports.some(report => report.directorships && report.directorships.clinicalService.length > 0);
		},
		directorOfSimulationCenter() {
			return this.user.meritReports.some(report => report.directorships && report.directorships.simulationCenter.length > 0);
		},
		directorOfVisitingRotators() {
			return this.user.meritReports.some(report => report.directorships && report.directorships.visitingRotators.length > 0);
		},
		participatedInInterviews() {
			return this.user.meritReports.some(report => report.interviews && report.interviews.length > 0);
		}
	},
	methods: {
		pluralize,
		sumCollection(collection) {
			return Array.from(collection.values()).reduce(
				(sum, items) => sum + items.length,
				0
			);
		},
	},
	components: {
		CheckIcon,
		CommitteeParticipationItem,
		JournalEditorialBoardItem
	}
};
</script>
