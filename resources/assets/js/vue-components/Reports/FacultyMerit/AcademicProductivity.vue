<template>
	<section class="academic-productivity">
		<h2>
			Academic productivity
			<small v-if="dates && dates.startDate && dates.endDate">
				<rich-date-range :dates="dates" />
			</small>
		</h2>
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
					<th>Total grants</th>
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

thead th {
	text-align: right;
}

th, td {
	border-bottom: 1px solid #ddd;
	padding: 0 0.5em;
}

td {
	text-align: right;
	font-family: monospace;
}

.sub-row {
	opacity: 0.7;
}

.sub-row th {
	padding-left: 3em;
}

.sub-row td {
	padding-right: 3em;
}

ul {
	padding: 1em;
}
</style>

<script>
import XLSX from 'xlsx';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import InfoPopover from '#/InfoPopover.vue';
import RichDateRange from '#/RichDateRange.vue';

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

			if (this.showBreakdowns) {
				for (const key of this.breakdownKeys) {
					map.set(key, []);
				}

				for (const r of this.reports) {
					map.get(this.getBreakdownKey(r)).push(r);
				}
			}

			map.set('Total', this.reports.slice());

			return map;
		},
		publicationTypes() {
			const types = Array.from(new Set(this.reports.flatMap(r => r.publications).map(p => p.publicationType)).values());
			types.sort();
			return types;
		},
		grantTypes() {
			const types = Array.from(new Set(this.reports.flatMap(r => r.grants).map(g => g.type)).values());
			types.sort();
			return types;
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
		RichDateRange
	}
};
</script>
