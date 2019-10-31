<template>
	<div>
		<div class="container body-block">
			<h1>Evaluator report</h1>

			<form @submit="queryEvaluators">
				<start-end-date v-model="dates" />

				<fieldset>
					<legend>Evaluator</legend>
					<user-filter-input v-model="evaluatorFilter" />

					<label class="containing-label groups-label">
						Groups
						<vue-select
							:options="userGroups.map(g => ({
								label: g.name,
								value: String(g.id)
							}))"
							v-model="selectedUserGroups"
							multiple
						/>
					</label>
				</fieldset>

				<fieldset>
					<legend>Subject</legend>
					<user-filter-input v-model="subjectFilter" />
				</fieldset>

				<div class="btn-lg-submit-container">
					<button type="submit" class="btn btn-primary btn-lg">
						Fetch
					</button>
				</div>
			</form>
		</div>

		<div class="container body-block" v-show="evaluators.length > 0">
			<table ref="resultsTable" class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Evaluations completed during period</th>
						<th>Total requested evaluations during period</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="evaluator of evaluators" :key="evaluator.id">
						<th>{{ evaluator.full_name }}</th>
						<td>{{ evaluator.evaluationsCompletedDuringPeriod.length }}</td>
						<td>{{ evaluator.requestsCreatedDuringPeriod.length }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>Average</th>
						<td>{{ decimal(average(evaluators.map(e => e.evaluationsCompletedDuringPeriod.length))) }}</td>
						<td>{{ decimal(average(evaluators.map(e => e.requestsCreatedDuringPeriod.length))) }}</td>
					</tr>
				</tfoot>
			</table>

			<export-table-button :table="$refs.resultsTable">
				Export to Excel
			</export-table-button>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import VueSelect from 'vue-select';

import StartEndDate from '#/StartEndDate.vue';
import ExportTableButton from '#/ExportTableButton.vue';
import UserFilterInput from './UserFilterInput.vue';

import { isoDateStringObject, currentYear } from '@/modules/date-utils.js';
import { filterNonemptyValues } from '@/modules/utils.js';
import { average } from '@/modules/math-utils.js';
import { decimal } from '@/modules/formatters.js';

const EVALUATORS_QUERY = gql`
	query EvaluatorReportQuery(
		$startDate: Date!
		$endDate: Date!
		$type: UserType
		$userGroups: [ID!]
		$subjectFilter: UserFilter
	) {
		evaluators: users(
			type: $type
			inGroups: $userGroups
			orderBy: [
				{field: "last_name", order: ASC},
				{field: "first_name", order: ASC}
			]
		) {
			id
			full_name
			evaluationsCompletedDuringPeriod: evaluatorEvaluations(
				completedBetween: { startDate: $startDate, endDate: $endDate }
				subjectFilter: $subjectFilter
				status: complete
			) {
				...EvaluationFields
			}
			requestsCreatedDuringPeriod: evaluatorEvaluations(
				requestedBetween: { startDate: $startDate, endDate: $endDate }
				subjectFilter: $subjectFilter
			) {
				...EvaluationFields
			}
		}
	}

	fragment EvaluationFields on Evaluation {
		id
		status
	}
`;

export default {
	data() {
		return {
			dates: isoDateStringObject(currentYear()),
			evaluatorFilter: {
				type: ''
			},
			subjectFilter: {
				type: '',
				training_level: '',
				secondary_training_level: ''
			},
			shouldFetchEvaluators: false,
			userGroups: [],

			selectedUserGroups: [],

			evaluators: []
		};
	},
	apollo: {
		evaluators: {
			query: EVALUATORS_QUERY,
			variables() {
				return filterNonemptyValues({
					...this.dates,
					...this.evaluatorFilter,
					userGroups: this.selectedUserGroups.length > 0
						? this.selectedUserGroups.map(o => o.value)
						: undefined,
					subjectFilter: filterNonemptyValues(this.subjectFilter),
				});
			},
			skip() {
				return !this.shouldFetchEvaluators;
			}
		},
		userGroups: {
			query: gql`
				query {
					userGroups {
						id
						name
					}
				}
			`
		}
	},
	computed: {
	},
	watch: {
		evaluators() {
			this.shouldFetchEvaluators = false;
		}
	},
	methods: {
		average,
		decimal,
		queryEvaluators() {
			this.shouldFetchEvaluators = true;
		},
		averageCompletedEvaluations(evaluators) {
			return average(evaluators.map(evaluator =>
				evaluator.evaluatorEvaluations.filter(filterComplete).length
			));
		}
	},
	components: {
		VueSelect,
		ExportTableButton,
		StartEndDate,
		UserFilterInput
	}
};
</script>

<style scoped>
fieldset {
	padding: 1em;
	margin-bottom: 1em;
}

fieldset > legend {
	margin: 0;
}

fieldset > label {
	display: inline-block;
	margin: 1em;
}

tfoot tr th,
tfoot tr td {
	border-top-width: 2px;
}
</style>
