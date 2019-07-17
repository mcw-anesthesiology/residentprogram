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
						<tr v-for="{roleType, roles} of leadershipRoles" :key="roleType">
							<th>{{ roleType }}</th>
							<td class="education-leadership-roles">
								<ul v-if="roles.length > 0">
									<li v-for="role of roles" :key="role">
										{{ role }}
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h3>Committee participation</h3>
				<div class="committees">
					<committee-participation-item
						v-for="[organizationType, committees] of Array.from(
							committeeParticipation.entries()
						)"
						:key="organizationType"
						:organization="organizationType"
						:committees="committees"
						:showPeriods="multiplePeriods"
					/>
				</div>
			</section>

			<section>
				<h3>Certifications</h3>

				<ul>
					<li v-for="certification of certifications" :key="certification">
						{{ certification.board }}
						<span v-if="certification.specialty">
							- {{ certification.specialty }}
						</span>
					</li>
				</ul>
			</section>

			<section>
				<h3>Organizations</h3>

				<ul>
					<li v-for="org of organizations" :key="org">
						{{ org }}
					</li>
				</ul>
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

.details {
	display: flex;
	flex-wrap: wrap;
}

.summary {
	font-size: 1.25em;
	flex-shrink: 1;
}

.leadership-roles table {
	border-collapse: collapse;
}

.leadership-roles th, .leadership-roles td {
	padding: 0.25em 0.5em;
	border: 1px solid #ccc;
}

th {
	font-weight: normal;
}

.leadership-professional-citizenship h3 {
	margin-top: 0.5em;
	margin-bottom: 0.25em;
}

ul {
	padding-left: 1em;
	margin: 0;
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
				if (!report.committeesByType) continue;

				const period = renderYearRange(
					report.period_start,
					report.period_end
				);
				for (const { organizationType, committees } of report.committeesByType) {
					const arr = map.get(organizationType) || [];
					for (const committee of committees.filter(c => c.role === 'MEMBER')) {
						arr.push({
							period,
							...committee
						});
					}

					if (arr.length > 0) {
						map.set(organizationType, arr);
					}
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
				roleType, roles: Array.from(roles.values())
			}));
		},
		certifications() {
			const map = new Map();

			for (const mr of this.user.meritReports) {
				for (const cert of mr.certifications) {
					map.set(`${cert.board}:${cert.specialty}`, cert);
				}
			}

			return Array.from(map.values());
		},
		organizations() {
			return Array.from(new Set(this.user.meritReports.flatMap(mr => mr.organizations)));
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
