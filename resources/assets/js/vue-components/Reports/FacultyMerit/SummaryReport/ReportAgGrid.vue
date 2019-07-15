<template>
	<section class="summary-report">

		<div class="container body-block">

			<div class="grid-container">
				<ag-grid-vue
					class="ag-theme-balham"
					:columnDefs="columnDefs"
					:rowData="meritReports" />
			</div>
		</div>
	</section>
</template>

<style scoped>
.grid-container >>> .ag-theme-balham {
	height: 600px;
}
</style>

<script>
/** @format */

import gql from 'graphql-tag';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { SUMMARY_REPORT_FIELDS } from '@/graphql/merit.js';

import CertificationsRenderer from './CertificationsRenderer.vue';

import { percent } from '@/modules/formatters.js';

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
]

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

			facultyFormId: 3, // FIXME
			overallAbilitiesQuestionId: 'q1',
			continueToTrainQuestionId: 'q2',
			overallAbilitiesMappings
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
		publicationsHeaders() {
			return publicationTypes.map(publicationType => {
				const re = new RegExp(publicationType, 'i');

				return {
					headerName: publicationType,
					valueGetter: ({ data }) => data.publications.filter(p => re.test(p.publicationType)).length
				};
			})
		},
		leadershipRolesHeaders() {
			const roleTypes = [];

			if (this.meritReports.length > 0) {
				return this.meritReports[0].leadershipRoles.map(lr => ({
					headerName: lr.roleType,
					cellRenderer: listRenderer,
					getter(leadershipRoles) {
						return leadershipRoles.find(x => x.roleType === lr.roleType).roles;
					}
				}));
			}

			return roleTypes;
		},
		columnDefs() {
			return [
				{
					headerName: 'Faculty',
					children: [
						{ headerName: 'Name', field: 'user.full_name' },
						{ headerName: 'Division', field: 'user.division' }
					]
				},
				{
					headerName: 'Compensation',
					children: [
						{
							headerName: 'Base salary'
						},
						{
							headerName: 'Incentive / Premium pay',
						},
						{
							headerName: 'Total compensation',
						},
					]
				},
				{
					headerName: 'Clinical productivity',
					children: [
						{
							headerName: 'Total units',
						},
						{
							headerName: 'Clinical FTE'
						}
					]
				},
				{
					headerName: 'Education involvement',
					children: [
						{
							headerName: 'Evaluations completed',
							valueGetter: 'data.user.evaluatorEvaluations.length',
						},
						{
							headerName: '"Would you recommend this faculty member continue to train residents?"',
							valueGetter: 'data.user.continueToTrain.withValue.percent',
							valueFormatter: percentFormatter
						},
						{
							headerName: '"How would you rate this faculty member\'s overall teaching abilities?"',
							field: 'user.overallAbilities.withNumericValues',
							cellRenderer({ value }) {
								return `${value.average} (S.D.: ${value.stdDev})`;
							}
						},
						{
							headerName: 'Lectures given',
							valueGetter: 'data.lectures.length',
						}
					]
				},
				{
					headerName: 'Academic productivity',
					children: [
						{
							headerName: 'Publications',
							children: this.publicationsHeaders
						},
						{
							headerName: 'Grants',
							children: [
								{
									headerName: 'Industry',
									valueGetter: countGrantsAgencyType('INDUSTRY')
								},
								{
									headerName: 'Extramural research',
									valueGetter: countGrantsAgencyType('EXTRAMURAL_RESEARCH')
								},
								{
									headerName: 'Internal',
									valueGetter: countGrantsAgencyType('INTERNAL')
								}
							]
						},
						{
							headerName: 'Study participation',
							children: [
								{
									headerName: 'PI',
									valueGetter: ({ data }) => data.studies.reduce((sum, s) => s.primaryInvestigator ? sum + 1 : sum, 0)
								},
								{
									headerName: 'Co-investigator',
									valueGetter: ({ data }) => data.studies.reduce((sum, s) => s.primaryInvestigator ? sum : sum + 1, 0)
								}
							]
						},
					]
				},
				{
					headerName: 'Leadership & Professional citizenship',
					children: [
						{
							headerName: 'Leadership roles',
							children: this.leadershipRolesHeaders
						},
						{
							headerName: 'Committee participation',
							children: [
								{
									headerName: 'Internal',
									valueGetter: committeeOrgTypeGetter('INTERNAL'),
									cellRenderer: listRenderer
								},
								{
									headerName: 'Regional / State',
									valueGetter: committeeOrgTypeGetter('REGIONAL'),
									cellRenderer: listRenderer
								},
								{
									headerName: 'National / International',
									field: 'committees',
									valueGetter: committeeOrgTypeGetter('NATIONAL'),
									cellRenderer: listRenderer
								}
							]
						},
						{
							headerName: 'Board certifications',
							valueGetter: ({ data }) => data.certifications.map(c => {
								let value = c.board;
								if (c.specialty) {
									value += ` - ${c.specialty}`
								}
								return value;
							})
							cellRenderer: listRenderer
						},
						{
							headerName: 'Organization membership',
							field: 'organizations',
							cellRenderer: listRenderer
						},
					]
				}
			];
		}
	},
	components: {
		AgGridVue
	}
};

function countGrantsAgencyType(agencyType) {
	return ({ data }) => data.grants.reduce((sum, g) => g.agencyType === agencyType ? sum + 1 : sum, 0)
}

function committeeOrgTypeGetter(orgType) {
	return ({ data }) => data.committees.filter(c => c.role === 'MEMBER' && c.organizationType === orgType).map(c => c.name);
}

function countGetter({ value }) {
	return value.length;
}

function listRenderer({ value: values, prop = null, getter = null }) {
	if (getter) {
		values = values.map(getter);
	}

	if (prop) {
		values = values.map(v => v[prop]);
	}

	return `<ul>${values.map(v => `<li>${v}</li>`)}</ul>`;
}

function percentFormatter({ value }) {
	return percent(value);
}
</script>
