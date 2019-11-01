<template>
	<div>
		<div class="container body-block">
			<h1>Evaluator report</h1>

			<form @submit="queryEvaluators">
				<start-end-date v-model="dates"></start-end-date>

				<div>
					<fieldset>
						<legend>Evaluator</legend>
						<user-filter-input v-model="evaluatorFilter" />

						<label class="groups-label">
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

						<user-filter-input v-if="show.advancedSubjectFilter" v-model="subjectFilter" />

						<label v-else>
							Filter type
							<vue-select :options="subjectFilterOptions" v-model="subjectFilterOption" />
						</label>

						<div class="show-container">
							<label class="checkbox-label">
								<input type="checkbox" v-model="show.advancedSubjectFilter" />
								Show advanced options
							</label>
						</div>
					</fieldset>
				</div>


				<div class="btn-lg-submit-container">
					<button type="submit" class="btn btn-primary btn-lg">
						Fetch
					</button>
				</div>
			</form>
		</div>

		<loading-placeholder v-if="$apollo.loading" />

		<div class="container body-block" v-show="!$apollo.loading && evaluators && evaluators.length > 0">
			<table ref="resultsTable" class="table table-striped table-bordered">
				<thead>
					<tr>
						<th rowspan="2">Name</th>
						<th v-for="(period, j) of periods" :key="j" colspan="2">
							<rich-date-range :dates="period" />
						</th>
					</tr>
					<tr>
						<template v-for="(period, i) of periods">
							<th :key="`${i}-complete`">
								Evaluations completed
							</th>
							<th :key="`${i}-requested`">
								Total requested evaluations
							</th>
						</template>
					</tr>
				</thead>
				<tbody>
					<tr v-for="evaluator of evaluators" :key="evaluator.id">
						<th>{{ evaluator.full_name }}</th>
						<template v-for="(period, i) of periods">

							<td :key="`${i}-complete`">
								{{ evaluator.evaluationsCompletedDuringPeriod.filter(inPeriod(period, 'complete_date')).length }}
							</td>
							<td :key="`${i}-requested`">
								{{ evaluator.requestsCreatedDuringPeriod.filter(inPeriod(period, 'request_date')).length }}
							</td>
						</template>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>Average</th>
						<template v-for="(period, i) of periods">

							<td :key="`${i}-complete`">
								{{
									decimal(average(evaluators.map(e => e.evaluationsCompletedDuringPeriod.filter(inPeriod(period, 'complete_date')).length)))
								}}
							</td>
							<td :key="`${i}-requested`">
								{{ decimal(average(evaluators.map(e => e.requestsCreatedDuringPeriod.filter(inPeriod(period, 'request_date')).length))) }}
							</td>
						</template>
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
import moment from 'moment';

import VueSelect from 'vue-select';

import StartEndDate from '#/StartEndDate.vue';
import RichDateRange from '#/RichDateRange.vue';
import ExportTableButton from '#/ExportTableButton.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import UserFilterInput from './UserFilterInput.vue';

import { isoDateStringObject, currentYear, quartersInPeriod } from '@/modules/date-utils.js';
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
				complete_date
			}
			requestsCreatedDuringPeriod: evaluatorEvaluations(
				requestedBetween: { startDate: $startDate, endDate: $endDate }
				subjectFilter: $subjectFilter
			) {
				...EvaluationFields
				request_date
			}
		}
	}

	fragment EvaluationFields on Evaluation {
		id
		status
	}
`;

const SUBJECT_FILTER_OPTIONS = {
	RESIDENCY: 'Residency',
	PEDS_FELLOWSHIP: 'Pediatric anesthesia fellowship'
};

export default {
	data() {
		return {
			dates: isoDateStringObject(currentYear()),
			evaluatorFilter: {
				type: 'FACULTY'
			},
			selectedUserGroups: [],
			subjectFilterOption: null,
			subjectFilter: {
				type: '',
				training_level: '',
				secondary_training_level: ''
			},
			shouldFetchEvaluators: false,
			userGroups: [],

			evaluators: [],

			periods: [],

			show: {
				advancedSubjectFilter: false
			}
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
		subjectFilterOptions() {
			return Object.values(SUBJECT_FILTER_OPTIONS);
		}
	},
	watch: {
		evaluators() {
			this.shouldFetchEvaluators = false;

			const startDate = moment(this.dates.startDate);
			const endDate = moment(this.dates.endDate);

			this.periods = [
				...quartersInPeriod(this.dates).map(period => {
					if (period.startDate < startDate) {
						period.startDate = startDate;
					}
					if (period.endDate > endDate) {
						period.endDate = endDate;
					}

					return period;
				}),
				this.dates
			];
		},
		'show.advancedSubjectFilter'(show) {
			if (!show) {
				this.subjectFilterOption = '';
			}
		},
		subjectFilterOption(option) {
			switch (option) {
			case SUBJECT_FILTER_OPTIONS.RESIDENCY:
				this.subjectFilter = {
					type: 'TRAINEE',
					training_level: 'RESIDENT',
					secondary_training_level: ''
				};
				break;
			case SUBJECT_FILTER_OPTIONS.PEDS_FELLOWSHIP:
				this.subjectFilter = {
					type: 'TRAINEE',
					training_level: 'FELLOW',
					secondary_training_level: 'Pediatric'
				};
				break;
			default:
				this.subjectFilter = {
					type: '',
					training_level: '',
					secondary_training_level: ''
				};
				break;
			}
		}
	},
	methods: {
		average,
		decimal,
		inPeriod(period, prop) {
			const start = moment(period.startDate);
			const end = moment(period.endDate);
			return e => {
				const date = moment(e[prop]);
				return date >= start && date <= end;
			}
		},
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
		LoadingPlaceholder,
		RichDateRange,
		ExportTableButton,
		StartEndDate,
		UserFilterInput
	}
};
</script>

<style scoped>
fieldset {
	display: flex;
	flex-wrap: wrap;
	padding: 1em;
	margin-bottom: 1em;
	justify-content: space-between;
	align-items: flex-end;
}

fieldset > legend {
	margin: 0;
}

fieldset > label {
	margin: 0.5em 1em;
}

fieldset > * {
	flex-grow: 1;
}

.show-container {
	flex-basis: 100%;
	text-align: right;
}

tfoot tr th,
tfoot tr td {
	border-top-width: 2px;
}

td {
	font-family: monospace;
	text-align: right;
}
</style>
