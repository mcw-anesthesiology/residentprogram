<template>
	<tr>
		<th>{{ user.full_name }}</th>
		<td v-if="showDivision">{{ user.division || '' }}</td>

		<template v-if="report">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>

			<td>
				{{ report.user.evaluatorEvaluations.length }}
			</td>

			<td v-if="report.user.continueToTrain.num > 0">
				{{ percent(report.user.continueToTrain.withValue.percent) }}
				({{ report.user.continueToTrain.withValue.num }}/{{ report.user.continueToTrain.num }})
			</td>
			<td v-else></td>

			<td v-if="report.user.overallAbilities.num > 0">
				{{ decimal(report.user.overallAbilities.withNumericValues.average) }}

				&plusmn;{{
					decimal(
						report.user.overallAbilities.withNumericValues.stdDev
					)
				}}
			</td>
			<td v-else></td>


			<td>
				{{ report.lectures.length }}
			</td>

			<td></td>
			<td></td>
			<td v-for="pubType of publicationTypes" :key="pubType">
				{{ getPublications(report.publications, pubType) }}
			</td>

			<td v-for="grantType of grantTypes" :key="grantType">
				{{ countGrants(report.grants, grantType) }}
			</td>

			<td>
				{{
					report.studies.reduce(
						(sum, s) => (s.primaryInvestigator ? sum + 1 : sum),
						0
					)
				}}
			</td>
			<td>
				{{
					report.studies.reduce(
						(sum, s) => (!s.primaryInvestigator ? sum + 1 : sum),
						0
					)
				}}
			</td>

			<template v-for="{ roleType, roles } of report.leadershipRoles">
				<cell-list :key="roleType" :items="roles" :exporting="exporting" v-slot="slotProps">
					{{ slotProps.item }}
				</cell-list>
			</template>

			<cell-list v-for="orgType of organizationTypes" :key="orgType" :items="getMemberCommittees(report.committees, orgType)" :exporting="exporting" v-slot="slotProps">
				{{ slotProps.item.name }}
			</cell-list>

			<cell-list :items="report.certifications" :exporting="exporting" v-slot="slotProps">
				{{ slotProps.item.board }}
				<span v-if="slotProps.item.specialty">
					- {{ slotProps.item.specialty }}
				</span>
			</cell-list>
			<cell-list :items="report.organizations" :exporting="exporting" v-slot="slotProps">
				{{ slotProps.item }}
			</cell-list>
		</template>
		<template v-else>
			<td v-for="x of Array(numReportCells).fill(null)"></td>
		</template>
	</tr>
</template>

<style scoped>
ul {
	padding-left: 1em;
}
</style>

<script>
/** @format */
import CellList from './CellList.vue';

import { GRANT_TYPES, ORGANIZATION_TYPES } from '@/graphql/merit.js';
import { percent, decimal } from '@/modules/formatters.js';
import { getPublications, countGrants, getMemberCommittees } from '@/modules/merit-utils.js';

export default {
	props: {
		report: Object,
		user: Object,
		publicationTypes: Array,
		numReportCells: Number,
		exporting: {
			type: Boolean,
			default: false
		},
		showDivision: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			grantTypes: GRANT_TYPES,
			organizationTypes: ORGANIZATION_TYPES
		};
	},
	methods: {
		percent,
		decimal,
		getPublications,
		countGrants,
		getMemberCommittees
	},
	components: {
		CellList
	}
};
</script>
