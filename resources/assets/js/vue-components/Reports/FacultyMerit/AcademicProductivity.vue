<template>
	<section class="academic-productivity">
		<h2>
			Academic productivity
			<small v-if="dates && dates.startDate && dates.endDate">
				<rich-date-range :dates="dates" />
			</small>
		</h2>

		<div class="main-row">
			<div class="table-container">
				<table class="publications-table">
					<thead v-if="breakdownReports.size > 1">
						<tr>
							<th></th>
							<th
								v-for="label of Array.from(
									breakdownReports.keys()
								)"
								:key="label"
							>
								{{ label }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Total publications</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`publications:${bd}`"
							>
								{{ rs.flatMap(r => r.publications).length }}
							</td>
						</tr>
						<tr
							v-for="type of publicationTypes"
							class="sub-row"
							:key="type"
							:class="publicationsNoItems(type)"
						>
							<th>{{ type }}</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`publications:${type}:${bd}`"
							>
								{{
									getPublications(
										rs.flatMap(r => r.publications),
										type
									)
								}}
							</td>
						</tr>
					</tbody>
				</table>

				<table class="grants-table">
					<thead v-if="breakdownReports.size > 1">
						<tr>
							<th></th>
							<th
								v-for="label of Array.from(
									breakdownReports.keys()
								)"
								:key="label"
							>
								{{ label }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Total grants</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`grants:${bd}`"
							>
								{{ rs.flatMap(r => r.grants).length }}
							</td>
						</tr>
						<tr
							v-for="type of grantTypes"
							class="sub-row"
							:key="type"
							:class="grantsNoItems(type)"
						>
							<th>{{ enumToWords(type) }}</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`grants:${type}:${bd}`"
							>
								{{
									countGrants(rs.flatMap(r => r.grants), type)
								}}
							</td>
						</tr>
					</tbody>
				</table>

				<table class="studies-table">
					<thead v-if="breakdownReports.size > 1">
						<tr>
							<th></th>
							<th
								v-for="label of Array.from(
									breakdownReports.keys()
								)"
								:key="label"
							>
								{{ label }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Total studies</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`studies:${bd}`"
							>
								{{ rs.flatMap(r => r.studies).length }}
							</td>
						</tr>
						<tr class="sub-row" :class="studiesNoItems(true)">
							<th>
								PI
							</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`studies:pi:${bd}`"
							>
								{{
									rs
										.flatMap(r => r.studies)
										.reduce(
											(sum, s) =>
												s.primaryInvestigator
													? sum + 1
													: sum,
											0
										)
								}}
							</td>
						</tr>
						<tr class="sub-row" :class="studiesNoItems(false)">
							<th>
								Co-investigator
							</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`studies:pi:${bd}`"
							>
								{{
									rs
										.flatMap(r => r.studies)
										.reduce(
											(sum, s) =>
												!s.primaryInvestigator
													? sum + 1
													: sum,
											0
										)
								}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="chart-container" v-if="showChart">
			<apex-chart
				ref="chart"
				type="bar"
				:height="chartHeight"
				:options="chartOptions"
				:series="chartSeries"
			/>
			<img
				v-if="chartImage && chartImage !== 'data:,'"
				:src="chartImage"
			/>
		</div>
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
	font-size: 1em;
	margin-bottom: 1em;
	border-collapse: collapse;
}

tr:hover {
	background: #f3f3f3;
}

th,
td {
	border: 1px solid #ddd;
	padding: 0.25em 0.5em;
}

th {
	font-weight: normal;
}

td {
	text-align: right;
	font-family: monospace;
	color: '#111';
}

tbody tr::first-child th,
tbody tr::first-child td {
	border-bottom: #333;
}

tbody th {
	font-weight: bold;
}

.no-items {
	color: rgba(0, 0, 0, 0.5);
}

.sub-row th {
	font-weight: normal;
}

ul {
	padding: 1em;
}

.education-leadership-roles {
	text-align: left;
	font-family: unset;
}

.education-leadership-roles ul {
	margin: 0;
}

.main-row {
	display: flex;
	flex-wrap: wrap;
}

.table-container {
	flex-grow: 1;
}

.table-container table {
	float: left;
	margin: 0.5em;
}

.chart-container {
	flex-shrink: 1;
}

.chart-container > img {
	display: none;
	width: 100%;
	height: auto;
}

@media print {
	button {
		display: none;
	}

	.main-row {
		flex-wrap: nowrap;
		align-items: stretch;
	}

	.chart-container > img {
		display: block;
	}
}

@supports (display: grid) {
	.table-container {
		display: grid;
		grid-gap: 1em;
		grid-template-areas:
			'publications grants'
			'publications studies';
		align-items: start;
	}

	table.publications-table {
		grid-area: publications;
	}

	table.grants-table {
		grid-area: grants;
	}

	table.studies-table {
		grid-area: studies;
	}
}
</style>

<style>
@media print {
	.chart-container > div {
		display: none;
	}

	.chart-container > img {
		display: block;
	}

	.apexcharts-toolbar {
		display: none;
	}
}
</style>

<script>
/** @format */

import ApexChart from 'vue-apexcharts';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import InfoPopover from '#/InfoPopover.vue';
import RichDateRange from '#/RichDateRange.vue';

import { PUBLICATION_TYPES, GRANT_TYPES } from '@/graphql/merit.js';

import { enumToWords } from '@/modules/text-utils.js';
import { renderYearRange } from '@/modules/date-utils.js';
import {
	getPublications,
	countGrants,
	getMemberCommittees
} from '@/modules/merit-utils.js';

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
		showTotal: {
			type: Boolean,
			default: false
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
	data() {
		return {
			chartImage: null,
			publicationTypes: PUBLICATION_TYPES,
			grantTypes: GRANT_TYPES
		};
	},
	computed: {
		getBreakdownKey() {
			return r => renderYearRange(r.period_start, r.period_end);
		},
		breakdownKeys() {
			const keys = Array.from(
				new Set(this.reports.map(this.getBreakdownKey)).values()
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

			if (
				!this.showBreakdowns ||
				(this.breakdownKeys.length > 1 && this.showTotal)
			) {
				map.set('Total', this.reports.slice());
			}

			if (this.additionalBreakdowns) {
				for (const [
					key,
					reports
				] of this.additionalBreakdowns.entries()) {
					map.set(key, reports);
				}
			}

			return map;
		},
		chartHeight() {
			return 80 + 20 * this.breakdownReports.size;
		},
		chartOptions() {
			const imageUpdater = this.updateChartImage.bind(this);

			return {
				chart: {
					stacked: true,
					events: {
						mounted: imageUpdater,
						updated: imageUpdater
					},
					parentHeightOffset: 0
				},
				xaxis: {
					categories: [...this.breakdownReports.keys()],
					labels: {
						style: {
							fontSize: '10px'
						}
					}
				},
				yaxis: {
					labels: {
						show: this.breakdownReports.size > 1,
						style: {
							fontSize: '10px'
						}
					}
				},
				plotOptions: {
					bar: {
						horizontal: true,
						barHeight: '100%'
					}
				},
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '10px',
						colors: ['#fff']
					}
				},
				stroke: {
					show: true,
					width: 1,
					colors: ['#fff']
				},
				legend: {
					position: 'top',
					fontSize: '10px'
				}
			};
		},
		chartSeries() {
			if (!this.showChart) return;

			const breakdownReports = Array.from(this.breakdownReports.values());

			return [
				...this.publicationTypes.map(name => {
					return {
						name,
						data: breakdownReports.map(
							reports =>
								reports
									.flatMap(r => r.publications)
									.filter(p => p.publicationType === name)
									.length
						)
					};
				}),
				...this.grantTypes.map(name => {
					return {
						name: `${enumToWords(name)} grants`,
						data: breakdownReports.map(
							reports =>
								reports
									.flatMap(r => r.grants)
									.filter(g => g.type === name).length
						)
					};
				}),
				{
					name: 'Studies',
					data: breakdownReports.map(
						reports => reports.flatMap(r => r.studies).length
					)
				},
				{
					name: 'Leadership positions',
					data: breakdownReports.map(reports =>
						reports.reduce(
							(sum, r) => sum + r.leadershipPositions,
							0
						)
					)
				}
			];
		}
	},
	methods: {
		enumToWords,
		getPublications,
		countGrants,
		getMemberCommittees,
		updateChartImage() {
			// wait for animations to complete
			window.setTimeout(async () => {
				this.chartImage = await this.$refs.chart.dataURI();
			}, 1500);
		},
		sortedGroup(arr, key) {
			return sortBy(groupBy(arr, key), 0);
		},
		publicationsNoItems(type) {
			const publications = Array.from(this.breakdownReports.values())
				.flat()
				.flatMap(r => r.publications);

			return this.noItems(getPublications(publications, type));
		},
		grantsNoItems(type) {
			const grants = Array.from(this.breakdownReports.values())
				.flat()
				.flatMap(r => r.grants);

			return this.noItems(countGrants(grants, type));
		},
		studiesNoItems(pi) {
			const studies = Array.from(this.breakdownReports.values())
				.flat()
				.flatMap(r => r.studies)
				.reduce(
					(sum, s) => (s.primaryInvestigator === pi ? sum + 1 : sum),
					0
				);

			return this.noItems(studies);
		},
		noItems(count) {
			return {
				'no-items': count === 0
			};
		}
	},
	components: {
		ApexChart,
		InfoPopover,
		RichDateRange
	}
};
</script>
