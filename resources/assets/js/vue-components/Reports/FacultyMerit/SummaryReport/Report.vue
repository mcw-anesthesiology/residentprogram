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
					<input type="text" class="form-control" v-model="overallAbilitiesQuestionId" />
				</label>

				<label class="containing-label">
					Continue to train residents question ID
					<input type="text" class="form-control" v-model="continueToTrainQuestionId" />
				</label>
			</form>
		</div>

		<div class="container body-block" v-if="meritReports">

			<div class="table-container">

				<table ref="table" class="table table-striped table-bordered">
					<thead>
						<tr>
							<th rowspan="2" colspan="2">Faculty</th>
							<th rowspan="2" colspan="3">Compensation</th>
							<th rowspan="2" colspan="2">Clinical productivity</th>


							<th rowspan="2" colspan="4">Education involvement</th>
							<th colspan="17">Academic productivity</th>
							<th colspan="14">Leadership &amp; Professional citizenship</th>
						</tr>
						<tr>
							<th colspan="12">Publications</th>
							<th colspan="3">Grants</th>
							<th colspan="2">Study participation</th>
							<th colspan="4">Leadership roles</th>
							<th colspan="3">Committee participation</th>

							<th rowspan="2">Board certifications</th>
							<th rowspan="2">Organization membership</th>
						</tr>
						<tr>
							<th>Name</th>
							<th>Division</th>

							<th>Base salary</th>
							<th>Incentive / Premium pay</th>
							<th>Total compensation</th>

							<th>Total units</th>
							<th>Clinical FTE</th>

							<th>Evaluations completed</th>
							<th>"Would you recommend this faculty memeber continue to train residents?"</th>
							<th>"How would you rate this faculty member's overall teaching ability?"</th>
							<th>Lectures given</th>

							<th>Peer-reviewed</th>
							<th>Non peer-reviewed</th>
							<th v-for="pubType of publicationTypes" :key="pubType">
								{{ pubType }}
							</th>

							<th>Industry</th>
							<th>Extramural research</th>
							<th>Internal</th>

							<th>PI</th>
							<th>Co-investigator</th>

							<th v-for="roleType of leadershipRoleTypes" :key="roleType">
								{{ roleType }}
							</th>

							<th>Internal</th>
							<th>Regional / State</th>
							<th>National / International</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="report of meritReports" :key="report.id">
							<td>{{ report.user.full_name }}</td>
							<td></td>

							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>

							<td>
								{{ report.user.evaluatorEvaluations.length }}
							</td>
							<td>
								{{ percent(report.user.continueToTrain.withValue.percent) }}
							</td>
							<td>
								{{ report.user.overallAbilities.withNumericValues.average }}
								(
									S.D.:
									{{ report.user.overallAbilities.withNumericValues.stdDev }}
								)
							</td>
							<td>
								{{ report.lectures.length }}
							</td>

							<td></td>
							<td></td>
							<td v-for="pubType of publicationTypes" :key="pubType">
								{{ getPublications(report.publications, pubType) }}
							</td>

							<td>{{ countGrants(report.grants, 'INDUSTRY') }}</td>
							<td>{{ countGrants(report.grants, 'EXTRAMURAL RESEARCH') }}</td>
							<td>{{ countGrants(report.grants, 'INTERNAL') }}</td>

							<td>
								{{ report.studies.reduce((sum, s) => s.primaryInvestigator ? sum + 1 : sum, 0) }}
							</td>
							<td>
								{{ report.studies.reduce((sum, s) => !s.primaryInvestigator ? sum + 1 : sum, 0) }}
							</td>

							<td v-for="{ roleType, roles } of report.leadershipRoles" :key="roleType">
								<ul>
									<li v-for="role of roles" :key="role">
										{{ role }}
									</li>
								</ul>
							</td>

							<td>
								<ul>
									<li v-for="committee of getMemberCommittees(report.committees, 'INTERNAL')">
										{{ committee.name }}
									</li>
								</ul>
							</td>
							<td>
								<ul>
									<li v-for="committee of getMemberCommittees(report.committees, 'REGIONAL')">
										{{ committee.name }}
									</li>
								</ul>
							</td>
							<td>
								<ul>
									<li v-for="committee of getMemberCommittees(report.committees, 'NATIONAL')">
										{{ committee.name }}
									</li>
								</ul>
							</td>

							<td>
								<ul>
									<li v-for="certification of report.certifications">
										{{ certification.board }}
										<span v-if="certification.specialty">
											- {{ certification.specialty }}
										</span>
									</li>
								</ul>
							</td>
							<td>
								<ul>
									<li v-for="organization of report.organizations">
										{{ organization }}
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<export-table-button :table="$refs.table" :filename="exportFilename">
				Export to Excel
			</export-table-button>
		</div>
		<loading-placeholder v-else />
	</section>
</template>

<style scoped>
.table-container {
	overflow: auto;
}

table {

}
</style>

<script>
/** @format */

import gql from 'graphql-tag';

import FormSelect from '#/FormSelect.vue';
import ExportTableButton from '#/ExportTableButton.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import { SUMMARY_REPORT_FIELDS } from '@/graphql/merit.js';

import { percent } from '@/modules/formatters.js';
import { renderDateRange } from '@/modules/date-utils.js';

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

const publicationTypes = [
	'Original Article',
	'Review Article',
	'Book / Text',
	'Book Chapter',
	'Editorial',
	'Case Report',
	'Letter to the Editor',
	'Abstract / Poster',
	'Anesthesia Toolbox',
	'MedEd'
];

const isDev = process.env.NODE_ENV === 'development';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			meritReports: [],

			// FIXME
			facultyFormId: isDev ? 3 : 63,
			overallAbilitiesQuestionId: isDev ? 'q1' : 'q23',
			continueToTrainQuestionId: isDev ? 'q2' : 'q20',
			overallAbilitiesMappings,

			publicationTypes
		};
	},
	apollo: {
		meritReports: {
			query: gql`
				query MeritSummaryReportQuery(
					$after: Date
					$before: Date

					$subjectResponseFormId: ID!
					$continueToTrainQuestionId: ID!
					$overallAbilitiesQuestionId: ID!

					$overallAbilitiesMappings: [NumericValueMapping]!
				) {
					meritReports {
						...SummaryReportFields
					}
				}
				${SUMMARY_REPORT_FIELDS}
			`,
			variables() {
				return {
					after: this.dates.starthate,
					before: this.dates.endDate,

					subjectResponseFormId: this.facultyFormId,
					continueToTrainQuestionId: this.continueToTrainQuestionId,
					overallAbilitiesQuestionId: this.overallAbilitiesQuestionId,

					overallAbilitiesMappings: this.overallAbilitiesMappings
				};
			}
		}
	},

	computed: {
		exportFilename() {
			const dateStr = renderDateRange(
				this.dates.startDate,
				this.dates.endDate
			);
			return `Faculty checklist summary - ${dateStr}`;
		},
		leadershipRoleTypes() {
			if (this.meritReports.length > 0) {
				return this.meritReports[0].leadershipRoles.map(lr => lr.roleType);
			}

			return [];
		},
	},
	methods: {
		percent,
		getPublications(publications, pubType) {
			const re = new RegExp(pubType, 'i');

			return publications.reduce((sum, p) => {
				return re.test(p.publicationType) ? sum + 1 : sum
			}, 0);
		},
		countGrants(grants, agencyType) {
			return grants.reduce((sum, g) => g.agencyType === agencyType ? sum + 1 : sum, 0);
		},
		getMemberCommittees(committees, orgType) {
			return committees.filter(c => c.role === 'MEMBER' && c.organizationType === orgType);
		}
	},
	components: {
		FormSelect,
		ExportTableButton,
		LoadingPlaceholder
	}
};
</script>
