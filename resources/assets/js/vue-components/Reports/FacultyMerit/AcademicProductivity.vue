<template>
	<section class="academic-productivity">
		<h2>
			Academic productivity
			<small v-if="dates && dates.startDate && dates.endDate">
				<rich-date-range :dates="dates" />
			</small>
		</h2>
<<<<<<< Updated upstream
		<dl>
			<dt>Total publications</dt>
			<dd>{{ publications.length }}</dd>
			<template v-for="(items, type) of groupBy(publications, 'publicationType')">
				<dt class="sub-item" :key="`dt:${type}`">{{ type }}</dt>
				<dd class="sub-item" :key="`dd:${type}`">{{ items.length }}</dd>
			</template>

			<dt>Total grants</dt>
			<dd>{{ grants.length }}</dd>
			<template v-for="(items, type) of groupBy(grants, 'type')">
				<dt class="sub-item" :key="`dt:${type}`">{{ ucfirst(type.toLowerCase()) }}</dt>
				<dd class="sub-item" :key="`dd:${type}`">{{ items.length }}</dd>
			</template>

			<dt>Total studies</dt>
			<dd>{{ studies.length }}</dd>

			<dt>
				Leadership positions
				<info-popover>
					<ul>
						<li>Committee chair in national organization</li>
						<li>Reviewer or editorial board member for peer-reviewed journal</li>
					</ul>
				</info-popover>
			</dt>
			<dd>{{ leadershipPositions }}</dd>
		</dl>
=======
		<table ref="table" class="table table-hover">
			<thead>
				<tr>
					<th></th>
					<th v-for="label of Array.from(breakdownReports.keys())" :key="label">
						{{ label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Total publications</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`publications:${bd}`">
						{{ rs.flatMap(r => r.publications).length }}
					</td>
				</tr>
				<tr v-for="type of publicationTypes" class="sub-row" :key="type">
					<th>— {{ type }}</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`publications:${type}:${bd}`">
						{{ rs.flatMap(r => r.publications).filter(p => p.publicationType === type).length }}
					</td>
				</tr>

				<tr>
					<th>Total grants</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`grants:${bd}`">
						{{ rs.flatMap(r => r.grants).length }}
					</td>
				</tr>
				<tr v-for="type of grantTypes" class="sub-row" :key="type">
					<th>— {{ ucfirst(type.toLowerCase()) }}</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`grants:${type}:${bd}`">
						{{ rs.flatMap(r => r.grants).filter(g => g.type === type).length }}
					</td>
				</tr>

				<tr>
					<th>Total studies</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`studies:${bd}`">
						{{ rs.flatMap(r => r.studies).length }}
					</td>
				</tr>

				<tr>
					<th>
						Leadership positions
						<info-popover>
							<ul>
								<li>Committee chair in national organization</li>
								<li>Reviewer or editorial board member for peer-reviewed journal</li>
							</ul>
						</info-popover>
					</th>
					<td v-for="[bd, rs] of Array.from(breakdownReports.entries())" :key="`leadershipPositions:${bd}`">
						{{ rs.reduce((sum, r) => sum + r.leadershipPositions, 0) }}
					</td>
				</tr>
			</tbody>
		</table>

		<button type="button" class="btn btn-default" @click="exportToXlsx">
			Export to Excel
		</button>

		<bar-chart v-if="showChart" :data="chartData" />
>>>>>>> Stashed changes
	</section>
</template>

<style scoped>
.academic-productivity {
	border: 1px solid #888;
	border-radius: 3px;
	margin: 2em;
	padding: 2em;
}

h2 {
	margin-top: 0;
}

dl {
	display: flex;
}

dt, dd {
	flex-basis: 50%;
	border-bottom: 1px solid #ddd;
	padding: 0 0.5em;
}

dd {
	text-align: right;
	font-family: monospace;
}

.sub-item {
	opacity: 0.8;
}

<<<<<<< Updated upstream
dt.sub-item {
	margin-left: 2em;
}

dd.sub-item {
	margin-right: 2em;
}

@supports (display: grid) {
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		grid-row-gap: 0.5em;
	}
=======
.sub-row th {
	padding-left: 2.5em;
}

.sub-row td {
	padding-right: 2.5em;
>>>>>>> Stashed changes
}

ul {
	padding: 1em;
}
</style>

<script>
import groupBy from 'lodash/groupBy';

import InfoPopover from '#/InfoPopover.vue';
import RichDateRange from '#/RichDateRange.vue';

import { BarChart } from '@/vue-mixins/Chart.js';

import { ucfirst } from '@/modules/text-utils.js';

export default {
	props: {
		reports: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		},
		dates: {
			type: Object
<<<<<<< Updated upstream
=======
		},
		showBreakdowns: {
			type: Boolean
		},
		rangeBreakdown: {
			type: String,
			default: 'year'
		},
		additionalBreakdowns: {
			type: Map
		},
		showChart: {
			type: Boolean
>>>>>>> Stashed changes
		}
	},
	computed: {
		publications() {
			return this.reports.flatMap(r => r.publications);
		},
		grants() {
			return this.reports.flatMap(r => r.grants);
		},
<<<<<<< Updated upstream
		studies() {
			return this.reports.flatMap(r => r.studies);
		},
		leadershipPositions() {
			return this.reports.reduce((sum, r) => sum + r.leadershipPositions, 0);
=======
		breakdownReports() {
			const map = new Map();

			if (this.showBreakdowns && this.breakdownKeys.length > 1) {
				for (const key of this.breakdownKeys) {
					map.set(key, []);
				}

				for (const r of this.reports) {
					map.get(this.getBreakdownKey(r)).push(r);
				}
			}

			map.set('Total', this.reports.slice());

			if (this.additionalBreakdowns) {
				for (const [key, reports] of this.additionalBreakdowns.entries()) {
					map.set(key, reports);
				}
			}

			return map;
		},
		publicationTypes() {
			const getTypes = reports => reports.flatMap(r => r.publications).map(p => p.publicationType);

			const set = new Set(getTypes(this.reports));

			if (this.additionalBreakdowns) {
				for (const reports of this.additionalBreakdowns.values()) {
					getTypes(reports).forEach(set.add.bind(set));
				}
			}

			const types = Array.from(set.values());
			types.sort();
			return types;
		},
		grantTypes() {
			const getTypes = reports => reports.flatMap(r => r.grants).map(g => g.type);
			const set = new Set(getTypes(this.reports));

			if (this.additionalBreakdowns) {
				for (const reports of this.additionalBreakdowns.values()) {
					getTypes(reports).forEach(set.add.bind(set));
				}
			}

			const types = Array.from(set.values());
			types.sort();
			return types;
		},
		chartData() {
			if (!this.showChart)
				return;

			return {
				labels: [
					...this.publicationTypes,
					...this.grantTypes.map(type => `${ucfirst(type.toLowerCase())} grants`),
					'Studies',
					'Leadership positions'
				],
				datasets: Array.from(this.breakdownReports.entries()).map(([label, reports]) => {
					const publications = reports.flatMap(r => r.publications);
					const grants = reports.flatMap(r => r.grants);
					const studies = reports.flatMap(r => r.studies);
					const leadershipPositions = reports.reduce((sum, r) => sum + r.leadershipPositions, 0);

					return {
						label,
						data: [
							...this.publicationTypes.map(pubType => publications.filter(p => p.publicationType === pubType).length),
							...this.grantTypes.map(grantType => grants.filter(g => g.type === grantType).length),
							studies.length,
							leadershipPositions
						]
					};
				})
			};
>>>>>>> Stashed changes
		}
	},
	methods: {
		groupBy,
		ucfirst
	},
	components: {
		InfoPopover,
		RichDateRange,
		BarChart
	}
};
</script>
