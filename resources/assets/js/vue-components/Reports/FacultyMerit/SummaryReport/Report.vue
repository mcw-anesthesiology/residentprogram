<template>
	<section class="summary-report">
		<div class="container body-block">
			<form>
				<label class="containing-label">
					Form
					<form-select v-model="facultyFormId" />
				</label>

				<label class="containing-label">
					Overall abilities question ID
					<input
						type="text"
						class="form-control"
						v-model="overallAbilitiesQuestionId"
					/>
				</label>

				<label class="containing-label">
					Continue to train residents question ID
					<input
						type="text"
						class="form-control"
						v-model="continueToTrainQuestionId"
					/>
				</label>

				<label>
					<input type="checkbox" v-model="groupDivisions" />
					Group by division
				</label>
			</form>
		</div>

		<div
			class="container body-block"
			v-if="rows && !$apollo.loading"
		>
			<div class="table-container">
				<table ref="table" class="table table-striped table-bordered">
					<thead>
						<tr>
							<th rowspan="2" :colspan="facultyColspan">
								Faculty
							</th>
							<th rowspan="2" colspan="3">Compensation</th>
							<th rowspan="2" colspan="2">
								Clinical productivity
							</th>

							<th rowspan="2" colspan="4">
								Education involvement
							</th>
							<th :colspan="academicProductivityColspan">
								Academic productivity
							</th>
							<th :colspan="leadershipColspan">
								Leadership &amp; Professional citizenship
							</th>
						</tr>
						<tr>
							<th :colspan="publicationTypes.length">Publications</th>
							<th colspan="3">Grants</th>
							<th colspan="2">Study participation</th>
							<th v-if="leadershipRoleTypes.length > 0"
								:colspan="leadershipRoleTypes.length"
							>
								Leadership roles
							</th>
							<th colspan="3">Committee participation</th>

							<th rowspan="2">Board certifications</th>
							<th rowspan="2">Organization membership</th>
						</tr>
						<tr>
							<th>Name</th>
							<th v-if="!groupDivisions">Division</th>

							<th>Base salary</th>
							<th>Incentive / Premium pay</th>
							<th>Total compensation</th>

							<th>Total units</th>
							<th>Clinical FTE</th>

							<th>Evaluations completed</th>
							<th>
								"Would you recommend this faculty memeber
								continue to train residents?"
							</th>
							<th>
								"How would you rate this faculty member's
								overall teaching ability?"
							</th>
							<th>Lectures given</th>

							<th
								v-for="pubType of publicationTypes"
								:key="pubType"
							>
								{{ pubType }}
							</th>

							<th>Industry</th>
							<th>Extramural research</th>
							<th>Internal</th>

							<th>PI</th>
							<th>Co-investigator</th>

							<th
								v-for="roleType of leadershipRoleTypes"
								:key="roleType"
							>
								{{ roleType }}
							</th>

							<th>Internal</th>
							<th>Regional / State</th>
							<th>National / International</th>
						</tr>
					</thead>
					<tbody v-if="groupDivisions">
						<template v-for="[division, divisionRows] of divisionGroupedRows">
							<tr :key="division">
								<th :colspan="numReportCells + facultyColspan">{{ division || 'Unknown' }}</th>
							</tr>
							<report-row v-for="row of divisionRows" :key="row.user.full_name"
								:showDivision="false"
								:report="row.report"
								:user="row.user"
								:numReportCells="numReportCells"
								:publicationTypes="publicationTypes"
								:leadershipRoleTypes="leadershipRoleTypes"
								:exporting="exporting"
							/>
						</template>
					</tbody>
					<tbody v-else>
						<report-row v-for="row of rows" :key="row.user.full_name"
							:report="row.report"
							:user="row.user"
							:numReportCells="numReportCells"
							:publicationTypes="publicationTypes"
							:leadershipRoleTypes="leadershipRoleTypes"
							:exporting="exporting"
						/>
					</tbody>
				</table>
			</div>

			<button type="button" class="btn btn-default" @click="exportTable">
				Export to Excel
			</button>
		</div>
		<loading-placeholder v-else />
	</section>
</template>

<style scoped>
.table-container {
	overflow: auto;
	max-height: 600px;
}

table {
}
</style>

<script>
/** @format */

import gql from 'graphql-tag';
import XLSX from 'xlsx';

import FormSelect from '#/FormSelect.vue';
import ExportTableButton from '#/ExportTableButton.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import ReportRow from './ReportRow.vue';

import { SUMMARY_REPORT_FIELDS, PUBLICATION_TYPES } from '@/graphql/merit.js';

import { renderDateRange } from '@/modules/date-utils.js';
import { sortIgnoreCase, bulletizeCell } from '@/modules/utils.js';

// Yuck
const overallAbilitiesMappings = [
	{ text: 'unacceptable', value: 1 },
	{ text: 'needs-improvement', value: 2 },
	{ text: 'meets-expectations', value: 3 },
	{ text: 'exceeds-expectations', value: 4 },
	{ text: 'outstanding', value: 5 },

	{ text: 'poor', value: 1 },
	{ text: 'moderately-poor', value: 2 },
	{ text: 'good', value: 3 },
	{ text: 'excellent', value: 4 }
];

const divisions = [
	'General OR',
	'Cardiac',
	'CVICU',
	'OB',
	'RAAPS',
	'Pain',
	'VA',
	'Leadership'
];

export default {
	props: {
		dates: {
			type: Object,
			required: true
		},
		includeIncomplete: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			providerInfo: [],
			meritReports: [],

			// FIXME
			facultyFormId: 63,
			overallAbilitiesQuestionId: 'q23',
			continueToTrainQuestionId: 'q20',
			overallAbilitiesMappings,

			publicationTypes: PUBLICATION_TYPES,

			groupDivisions: false,
			exporting: false
		};
	},
	apollo: {
		providerInfo: {
			query: gql`
				query FY18CompQuery {
					providerInfo: fy18 {
						lastName
						firstName
						division
						baseSalary
						premiumPay
						totalPay
						totalUnits
						clinicalFTE
					}
				}
			`
		},
		meritReports: {
			query: gql`
				query MeritSummaryReportQuery(
					$after: Date
					$before: Date
					$status: MeritReportStatus
					$subjectResponseFormId: ID!
					$continueToTrainQuestionId: ID!
					$overallAbilitiesQuestionId: ID!
					$overallAbilitiesMappings: [NumericValueMapping]!
				) {
					meritReports(
						after: $after
						before: $before
						status: $status
					) {
						...SummaryReportFields
						user {
							first_name
							last_name
						}
					}
				}
				${SUMMARY_REPORT_FIELDS}
			`,
			variables() {
				return {
					after: this.dates.startDate,
					before: this.dates.endDate,
					status: this.includeIncomplete ? undefined : 'COMPLETE',

					subjectResponseFormId: this.facultyFormId,
					continueToTrainQuestionId: this.continueToTrainQuestionId,
					overallAbilitiesQuestionId: this.overallAbilitiesQuestionId,

					overallAbilitiesMappings: this.overallAbilitiesMappings
				};
			}
		}
	},

	computed: {
		facultyColspan() {
			return this.groupDivisions ? 1 : 2;
		},
		academicProductivityColspan() {
			return this.publicationTypes.length + 3 + 2;
		},
		leadershipColspan() {
			return this.leadershipRoleTypes.length + 3 + 2;
		},
		numReportCells() {
			return 3 + 2 + 4 + this.academicProductivityColspan + this.leadershipColspan;
		},
		exportFilename() {
			const dateStr = renderDateRange(
				this.dates.startDate,
				this.dates.endDate
			);
			return `Faculty checklist summary - ${dateStr}`;
		},
		rows() {
			if (!this.providerInfo || !this.meritReports) return;

			const rows = this.meritReports.map(report => ({
				report,
				user: report.user
			}));
			for (const { lastName, firstName, ...providerInfo } of this.providerInfo) {
				let row = rows.find(r => r.user.last_name === lastName && r.user.first_name && r.user.first_name.startsWith(firstName));

				if (!row) {
					row = {
						user: {
							full_name: `${lastName}, ${firstName}`
						}
					};
					rows.push(row);
				}

				for (const [key, val] of Object.entries(providerInfo)) {
					if (!row.user[key]) {
						row.user[key] = val;
					}
				}
			}

			rows.sort((a, b) =>
				sortIgnoreCase(a.user.full_name, b.user.full_name)
			);

			return rows;
		},
		divisionGroupedRows() {
			if (this.rows && this.groupDivisions) {
				const map = new Map();
				for (const division of divisions) {
					map.set(division, []);
				}
				map.set('Unknown', []);

				for (const row of this.rows) {
					const division = row.user.division || 'Unknown';

					if (!map.has(division)) {
						map.set(division, []);
					}

					map.get(division).push(row);
				}

				return Array.from(map.entries());
			}
		},
		leadershipRoleTypes() {
			if (this.meritReports.length > 0) {
				return this.meritReports[0].leadershipRoles.map(
					lr => lr.roleType
				);
			}

			return [];
		}
	},
	methods: {
		exportTable() {
			const groupDivisions = this.groupDivisions;

			this.exporting = true;
			this.groupDivisions = true;
			const wb = XLSX.utils.book_new();
			this.$nextTick(() => {
				const ws = getSheet(this.$refs.table);
				XLSX.utils.book_append_sheet(wb, ws, 'By division');
				this.groupDivisions = false;
				this.$nextTick(() => {
					const ws = getSheet(this.$refs.table);
					XLSX.utils.book_append_sheet(wb, ws, 'Alphabetical');
					XLSX.writeFile(wb, `${this.exportFilename}.xlsx`, {
						bookSST: true
					});
					this.$nextTick(() => {
						this.exporting = false;
						this.groupDivisions = groupDivisions;
					});
				});
			});
		}
	},
	components: {
		FormSelect,
		ExportTableButton,
		LoadingPlaceholder,
		ReportRow
	}
};

function getSheet(table) {
	const ws = XLSX.utils.table_to_sheet(table);
	// Gross that we need to do this, but the table parser
	// refuses to not strip these out as far as I can tell
	Object.values(ws).forEach(cell => bulletizeCell(cell));

	return ws;
}
</script>
