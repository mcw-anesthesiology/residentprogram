<template>
	<section class="individual-merit-dashboard-section professional-citizenship">
		<header>
			<h2>Professional Citizenship</h2>
		</header>
		<div class="citizenship-container">
			<section class="committees">
				<h3>Committee participation</h3>
				<div v-if="committees.length > 0" class="committees-container">
					<committee-participation-item
						v-for="[organizationType, committees] of Array.from(
							committeeParticipation.entries()
						)"
						:key="organizationType"
						:organization="organizationType"
						:committees="committees"
					/>
				</div>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>

			<section class="certifications">
				<h3>Certifications</h3>

				<ol v-if="certifications.length > 0">
					<li v-for="certification of certifications"
						:key="`${certification.board}:${certification.specialty}`"
					>
						{{ certification.board }}
						<span v-if="certification.specialty">
							- {{ certification.specialty }}
						</span>
					</li>
				</ol>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>

			<section class="organizations">
				<h3>Organizations</h3>

				<ol v-if="organizations.length > 0">
					<li v-for="org of organizations" :key="org">
						{{ org }}
					</li>
				</ol>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>
		</div>
	</section>
</template>

<script>
/** @format */

import DashboardSection from './Section.vue';

import CommitteeParticipationItem from './CommitteeParticipationItem.vue';

import { renderYearRange } from '@/modules/date-utils.js';
import { pluralize } from '@/modules/text-utils.js';

export default {
	extends: DashboardSection,
	computed: {
		committees() {
			return this.user.meritReports.flatMap(mr => mr.committees);
		},
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

					map.set(organizationType, arr);
				}
			}

			return map;
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
		CommitteeParticipationItem
	}
};
</script>

<style scoped>
.citizenship-container {
	display: grid;
	grid-gap: 1.5em;
	grid-template-areas:
		'committees committees'
		'certifications organizations';
}

.committees {
	grid-area: committees;
}

.certifications {
	grid-area: certifications;
}

.organizations {
	grid-area: organizations;
}

h3 {
	margin-top: 0.5em;
	margin-bottom: 0.25em;
	color: var(--mcw-anesth-dark-green);
}

ul {
	padding-left: 1em;
	margin: 0;
}

ol {
	padding-left: 1.5em;
	margin: 0;
}

li::marker {
	font-weight: bold;
}

.committees-container {
	display: flex;
	justify-content: space-between;
	margin: -1em;
}

.committees-container >>> .committee-participation-item {
	margin: 1em;
}

.organizations ol {
	display: flex;
	flex-wrap: wrap;
	margin: -0.25em -0.75em;
	padding-left: 0;
}

.organizations li {
	list-style-position: inside;
	padding: 0.25em 0.75em;
}

@supports (display: grid) {
	.committees-container {
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		grid-gap: 1em;
	}

	.committtes-container >>> .committee-participation-item {
		margin: 0;
	}
}
</style>
