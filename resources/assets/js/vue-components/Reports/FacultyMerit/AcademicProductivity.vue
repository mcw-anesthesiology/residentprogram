<template>
	<section class="academic-productivity">
		<h2>
			Academic productivity
			<small v-if="dates && dates.startDate && dates.endDate">
				<rich-date-range :dates="dates" />
			</small>
		</h2>
		<table ref="table">
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

		<bar-chart v-if="showChart" :data="chartData" :options="chartOptions" :height="400" />
	</section>
</template>

<style scoped>
h2 {
	margin-top: 0;
}

thead th {
	text-align: right;
}

table {
	width: 100%;
	margin-bottom: 1em;
}

tr:hover {
	background: #f3f3f3;
}

th, td {
	border: 1px solid #ddd;
	padding: 0.5em 1em;
}

td {
	text-align: right;
	font-family: monospace;
}

.sub-row {
	color: rgba(0, 0, 0, 0.5);
	background: #f9f9f9;
}

.sub-row th {
	padding-left: 2.5em;
}

.sub-row td {
	padding-right: 2.5em;
}

ul {
	padding: 1em;
}

@media print {
	button {
		display: none;
	}

	.academic-productivity :global(canvas) {
		min-height: 100%;
        max-width: 100%;
        max-height: 100%;
        height: auto!important;
        width: auto!important;
    }
}
</style>

<script>
import XLSX from 'xlsx';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import InfoPopover from '#/InfoPopover.vue';
import RichDateRange from '#/RichDateRange.vue';

import { BarChart } from '@/vue-mixins/Chart.js';

import { ucfirst } from '@/modules/text-utils.js';
import { renderDateRange } from '@/modules/date-utils.js';

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
		}
	},
	computed: {
		getBreakdownKey() {
			return r => renderDateRange(r.period_start, r.period_end);
		},
		breakdownKeys() {
			const keys = Array.from(
				new Set(
					this.reports.map(this.getBreakdownKey)
				).values()
			);
			keys.sort();

			return keys;
		},
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
		chartOptions() {
			return {
				maintainAspectRatio: false
			};
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
		}
	},
	methods: {
		ucfirst,
		sortedGroup(arr, key) {
			return sortBy(groupBy(arr, key), 0);
		},
		exportToXlsx() {
			const wb = XLSX.utils.table_to_book(this.$refs.table);
			let filename = 'Academic productivity summary';
			if (this.dates && this.dates.startDate && this.dates.endDate) {
				filename += ` ${renderDateRange(this.dates.startDate, this.dates.endDate)}`;
			}
			XLSX.writeFile(wb, `${filename}.xlsx`);
		}
	},
	components: {
		InfoPopover,
		RichDateRange,
		BarChart
	}
};
</script>
