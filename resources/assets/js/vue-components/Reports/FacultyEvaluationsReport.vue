<template>
	<div>
		<div class="container body-block">
			<h1>Faculty evaluations report</h1>
			<form class="form">
				<label class="containing-label">
					Academic year
					<academic-year-selector v-model="dates"
						minDate="2015-07-01"
					/>
				</label>

				<label class="containing-label">
					Training level
					<select class="form-control" v-model="trainingLevel">
						<option value="">All</option>
						<option v-for="(label, value) of trainingLevels" :value="value">
							{{ label }}
						</option>
					</select>
				</label>

				<label class="containing-label" v-if="showSecondaryTrainingLevels">
					Fellowship
					<select class="form-control" v-model="secondaryTrainingLevel">
						<option value="">All</option>
						<option v-for="value of secondaryTrainingLevels" :value="value">
							{{ value }}
						</option>
					</select>
				</label>
			</form>


			<alert-list v-model="alerts" />
		</div>

		<loading-placeholder v-if="$apollo.loading" />

		<div v-show="!$apollo.loading" class="container body-block">
			<div>
				<table ref="table"
					v-show="users && users.length > 0"
					class="table table-striped table-bordered"
				>
					<thead>
						<tr>
							<th>Trainee</th>
							<th>Complete</th>
							<th>Incomplete</th>
						</tr>
					</thead>
					<tbody v-if="users">
						<template v-for="user of users">
							<tr v-if="user.evaluatorEvaluations.length > 0">
								<th>{{ user.full_name }}</th>
								<td>{{ user.evaluatorEvaluations.filter(e => e.status === 'complete').length }}</td>
								<td>{{ user.evaluatorEvaluations.filter(e => e.status === 'pending').length }}</td>
							</tr>
						</template>
					</tbody>
				</table>

				<export-table-button :table="$refs.table">
					Export
				</export-table-button>
			</div>

			<bootstrap-alert v-if="!users || users.length === 0" type="warning">
				No faculty evaluations found
			</bootstrap-alert>
		</div>
	</div>
</template>

<script>
/** @format */

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import AcademicYearSelector from '../AcademicYearSelector.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import BootstrapAlert from '#/BootstrapAlert.vue';
import ExportTableButton from '#/ExportTableButton.vue';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

import gql from 'graphql-tag';

export default {
	mixins: [HasAlerts],
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			users: null,

			trainingLevel: '',
			secondaryTrainingLevel: '',

			trainingLevels: {
				INTERN: 'Intern',
				CA1: 'CA-1',
				CA2: 'CA-2',
				CA3: 'CA-3',
				FELLOW: 'Fellow'
			},
			secondaryTrainingLevels: [
				'Cardiac',
				'Critical Care',
				'OB',
				'Pain',
				'Pediatric',
				'RAAPS'
			]
		};
	},

	apollo: {
		users: {
			query: gql`
				query FacultyEvaluationsQuery(
					$trainingLevel: TrainingLevel
					$secondaryTrainingLevel: String
					$startDate: Date
					$endDate: Date
				) {
					users(
						type: TRAINEE
						training_level: $trainingLevel
						secondary_training_level: $secondaryTrainingLevel
					) {
						id
						full_name
						evaluatorEvaluations(
							after: $startDate
							before: $endDate
							type: faculty
						) {
							id
							status
						}
					}
				}
			`,
			variables() {
				return {
					...this.dates,
					trainingLevel: this.trainingLevel || undefined,
					secondaryTrainingLevel: (this.showSecondaryTrainingLevels && this.secondaryTrainingLevel) ? this.secondaryTrainingLevel : undefined
				};
			}
		}
	},

	computed: {
		showSecondaryTrainingLevels() {
			return this.trainingLevel === 'FELLOW';
		}
	},

	components: {
		LoadingPlaceholder,
		AcademicYearSelector,
		BootstrapAlert,
		ExportTableButton
	}
};
</script>
