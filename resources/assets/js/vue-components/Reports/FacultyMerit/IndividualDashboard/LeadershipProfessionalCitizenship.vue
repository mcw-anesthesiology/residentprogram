<template>
	<section
		class="individual-merit-dashboard-section leadership-professional-citizenship"
	>
		<h2>Leadership & professional citizenship</h2>

		<div class="summary-container">
			<table class="summary number-summary">
				<tr v-if="numCommitteeParticipation > 0">
					<td>
						{{ numCommitteeParticipation }}
					</td>
					<th>Committees</th>
				</tr>

				<tr v-if="numEditorialBoards > 0">
					<td>
						{{ numEditorialBoards }}
					</td>
					<th>Editorial board positions</th>
				</tr>
			</table>

			<table class="summary check-summary">
				<tr v-if="directorOfClinicalService">
					<td>
						<check-icon />
					</td>
					<th>Director of clinical service</th>
				</tr>

				<tr v-if="directorOfSimulationCenter">
					<td>
						<check-icon />
					</td>
					<th>Director of simulation center</th>
				</tr>

				<tr v-if="directorOfVisitingRotators">
					<td>
						<check-icon />
					</td>
					<th>Director of visiting rotators</th>
				</tr>

				<tr v-if="participatedInInterviews">
					<td>
						<check-icon />
					</td>
					<th>Participated in interviews</th>
				</tr>
			</table>
		</div>

		<section class="details">
			<section v-if="committeeParticipation.size > 0">
				<h3>Committee participation</h3>
				<ul>
					<committee-participation-item
						v-for="[organization, committees] of Array.from(
							committeeParticipation.entries()
						)"
						:key="organization"
						:organization="organization"
						:committees="committees"
						:showPeriods="multiplePeriods"
					/>
				</ul>
			</section>

			<section v-if="editorialBoards.size > 0">
				<h3>Journal Editorial Board</h3>
				<ul>
					<journal-editorial-board-item
						v-for="[journal, roles] of Array.from(
							editorialBoards.entries()
						)"
						:key="journal"
						:journal="journal"
						:roles="roles"
						:showPeriods="multiplePeriods"
					/>
				</ul>
			</section>
		</section>
	</section>
</template>

<style scoped>
.leadership-professional-citizenship {
	font-size: 1em;
}

h3 {
	margin-top: 0;
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

.summary th,
.summary td {
	padding: 0.25em 0.5em;
}

.summary td :global(.feather-check) {
	color: green;
	height: 1em;
	width: 1em;
}

.details {
	display: flex;
	justify-content: space-around;
}

.details > * {
	margin: 0.5em;
}

.details > section > ul {
	padding-left: 1em;
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
					for (const committee of cp.committees) {
						arr.push({
							period,
							...committee
						});
					}

					map.set(cp.organization, arr);
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
		numCommitteeParticipation() {
			return this.sumCollection(this.committeeParticipation);
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
