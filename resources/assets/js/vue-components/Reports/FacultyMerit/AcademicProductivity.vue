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
				<table ref="table">
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
						>
							<th>{{ type }}</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`publications:${type}:${bd}`"
							>
								{{
									rs
										.flatMap(r => r.publications)
										.filter(p => p.publicationType === type)
										.length
								}}
							</td>
						</tr>

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
						>
							<th>{{ ucfirst(type.toLowerCase()) }}</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`grants:${type}:${bd}`"
							>
								{{
									rs
										.flatMap(r => r.grants)
										.filter(g => g.type === type).length
								}}
							</td>
						</tr>

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

						<tr>
							<th>
								Leadership positions
								<info-popover>
									<ul>
										<li>
											Committee chair in national
											organization
										</li>
										<li>
											Reviewer or editorial board member
											for peer-reviewed journal
										</li>
									</ul>
								</info-popover>
							</th>
							<td
								v-for="[bd, rs] of Array.from(
									breakdownReports.entries()
								)"
								:key="`leadershipPositions:${bd}`"
							>
								{{
									rs.reduce(
										(sum, r) => sum + r.leadershipPositions,
										0
									)
								}}
							</td>
						</tr>
					</tbody>
				</table>

				<button
					type="button"
					class="btn btn-default"
					@click="exportToXlsx"
				>
					Export to Excel
				</button>
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
			<img v-if="chartImage && chartImage !== 'data:,'" :src="chartImage" />
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
	width: 100%;
	margin-bottom: 1em;
	border-collapse: collapse;
}

tr:hover {
	background: #f3f3f3;
}

th,
td {
	border: 1px solid #ddd;
	padding: 0.5em 1em;
}

th {
	font-weight: normal;
}

td {
	text-align: right;
	font-family: monospace;
	color: '#111';
}

tbody th {
	font-weight: bold;
}

.sub-row {
	color: rgba(0, 0, 0, 0.5);
}

.sub-row th {
	font-weight: normal;
}

ul {
	padding: 1em;
}

.main-row {
	display: flex;
	flex-wrap: wrap;
}

.table-container {
	flex-grow: 1;
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

import XLSX from 'xlsx';
import ApexChart from 'vue-apexcharts';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import InfoPopover from '#/InfoPopover.vue';
import RichDateRange from '#/RichDateRange.vue';

import { enumToWords, ucfirst } from '@/modules/text-utils.js';
import { renderYearRange } from '@/modules/date-utils.js';

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
			chartImage: null
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

			if (!this.showBreakdowns || (this.breakdownKeys.length > 1 && this.showTotal)) {
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
		publicationTypes() {
			const getTypes = reports =>
				reports
					.flatMap(r => r.publications)
					.map(p => p.publicationType);

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
			const getTypes = reports =>
				reports.flatMap(r => r.grants).map(g => g.type);
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
		ucfirst,
		updateChartImage() {
			// wait for animations to complete
			window.setTimeout(async () => {
				this.chartImage = await this.$refs.chart.dataURI();
			}, 1500);
		},
		sortedGroup(arr, key) {
			return sortBy(groupBy(arr, key), 0);
		},
		exportToXlsx() {
			const wb = XLSX.utils.table_to_book(this.$refs.table);
			let filename = 'Academic productivity summary';
			if (this.dates && this.dates.startDate && this.dates.endDate) {
				filename += ` ${renderYearRange(
					this.dates.startDate,
					this.dates.endDate
				)}`;
			}
			XLSX.writeFile(wb, `${filename}.xlsx`);
		}
	},
	components: {
		ApexChart,
		InfoPopover,
		RichDateRange
	}
};
</script>
