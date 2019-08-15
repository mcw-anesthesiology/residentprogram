<template>
	<section
		class="individual-merit-dashboard-section leadership"
	>
		<h2>Leadership roles</h2>

		<table class="leadership-roles-table">
			<tbody>
				<tr v-for="{roleType, roles} of leadershipRoles" :key="roleType" :class="{'no-items': roles.length === 0}">
					<th>{{ roleType }}</th>
					<td>
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
</template>

<style scoped>
.leadership {
	font-size: 1em;
}

table {
	border-collapse: collapse;
	font-size: 1em;
	margin: 0;
	width: 100%;
}

th, td {
	padding: 0.5em;
	border: 1px solid #ccc;
}

td {
	min-width: 7em;
	font-size: 0.9em;
}

.no-items {
	color: rgba(0, 0, 0, 0.5);
}

ul {
	padding-left: 1.5em;
	margin: 0;
}

@media print {
	.summary {
		font-size: 1em;
	}
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

const ROLE_TYPES = [
	'Anesthesia education program',
	'Internal',
	'Regional',
	'National & International'
];

export default {
	extends: DashboardSection,
	computed: {
		leadershipRoles() {
			const map = new Map(ROLE_TYPES.map(type => ([type, new Set()])));

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
	}
}
</script>
