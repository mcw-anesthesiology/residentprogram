<template>
	<section
		class="individual-merit-dashboard-section leadership-professional-citizenship"
	>
		<h2>Leadership & professional citizenship</h2>

		<ul class="summary">
			<li v-if="numCommitteeParticipation > 0">
				<span class="summary-number">
					{{ numCommitteeParticipation }}
				</span>
				{{ pluralize('Committee', numCommitteeParticipation) }}
			</li>

			<li v-if="numEditorialBoards > 0">
				<span class="summary-number">
					{{ numEditorialBoards }}
				</span>
				{{ pluralize('Editorial board position', numCommitteeParticipation) }}
			</li>

			<li v-if="directorOfClinicalService">
				<span class="summary-number">
					<check-icon />
				</span>
				Director of clinical service
			</li>

			<li v-if="directorOfSimulationCenter">
				<span class="summary-number">
					<check-icon />
				</span>
				Director of simulation center
			</li>

			<li v-if="directorOfVisitingRotators">
				<span class="summary-number">
					<check-icon />
				</span>
				Director of visiting rotators
			</li>

			<li v-if="participatedInInterviews">
				<span class="summary-number">
					<check-icon />
				</span>
				Participated in interviews
			</li>
		</ul>

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
					/>
				</ul>
			</section>
		</section>
	</section>
</template>

<style scoped>
h3 {
	margin-top: 0;
}

.summary {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 0;
}

.summary > li {
	flex-basis: 12.5em;
	flex-shrink: 1;
	list-style: none;
	margin: 1em;
	padding: 1em;
	border: 1px solid #ccc;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.summary li .summary-number {
	display: block;
	font-size: 1.5em;
	margin-right: 1em;
}

.summary li .summary-number :global(svg) {
	color: green;
	height: 1em;
	width: 1em;
}

.details {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.details > * {
	margin: 0.5em;
}

</style>

<script>
/** @format */

import { CheckIcon } from 'vue-feather-icons';

import DashboardSection from './Section.vue';

import CommitteeParticipationItem from './CommitteeParticipationItem.vue';
import JournalEditorialBoardItem from './JournalEditorialBoardItem.vue';

import { renderDateRange } from '@/modules/date-utils.js';
import { pluralize } from '@/modules/text-utils.js';

export default {
	extends: DashboardSection,
	computed: {
		committeeParticipation() {
			const map = new Map();

			for (const report of this.user.meritReports) {
				if (!report.committeeParticipation) continue;

				const period = renderDateRange(
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

				const period = renderDateRange(
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
