<template>
	<section
		class="individual-merit-dashboard-section leadership-professional-citizenship"
	>
		<h2>Leadership & professional citizenship</h2>

		<ul class="summary">
			<li>
				<span class="summary-number">
					{{ sumCollection(committeeParticipation) }}
				</span>
				committees
			</li>

			<li>
				<span class="summary-number">
					{{ sumCollection(editorialBoards) }}
				</span>
				journal editorial board positions
			</li>
		</ul>

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
</template>

<style scoped>
.summary {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 0;
}

.summary > li {
	flex-basis: 200px;
	list-style: none;
	margin: 1em;
	padding: 2em;
	border: 1px solid #ccc;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.summary li .summary-number {
	font-size: 1.5em;
	padding: 0.5em;
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

import CommitteeParticipationItem from './CommitteeParticipationItem.vue';
import JournalEditorialBoardItem from './JournalEditorialBoardItem.vue';

import { renderDateRange } from '@/modules/date-utils.js';

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
		}
	},
	methods: {
		sumCollection(collection) {
			return Array.from(collection.values()).reduce(
				(sum, items) => sum + items.length,
				0
			);
		}
	},
	components: {
		CommitteeParticipationItem,
		JournalEditorialBoardItem
	}
};
</script>
