<template>
	<div class="manage-visibilities container body-block">
		<h2>Manage visibilities</h2>

		<form @submit="handleSubmit">
			<div class="form-group">
				<label class="containing-label">
					Evaluation completion date
					<start-end-date v-model="dates" />
				</label>
			</div>


			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							Visibility
							<select class="form-control" v-model="visibility">
								<option :value="null">(Form default)</option>
								<option v-for="visibility of VISIBILITIES" :value="visibility">
								{{ ucfirst(visibility) }}
								</option>
							</select>
						</label>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							Form
							<form-select v-model="formId" />
						</label>
					</div>
				</div>
			</div>

			<div class="btn-lg-submit-container">
				<button type="submit" class="btn btn-lg btn-primary" :disabled="!formId">
					Update visiblities
				</button>
			</div>
		</form>

		<div v-if="updatedEvaluations">
			<bootstrap-alert v-if="updatedEvaluations.length === 0" type="warning">
				<p>No evaluations found in the selected date range.</p>
			</bootstrap-alert>
			<div v-else class="panel panel-success">
				<div class="panel-heading">
					<h3 class="panel-title">Updated evaluations</h3>
				</div>
				<div class="panel-body">
					<evaluation-list :evaluations="updatedEvaluations" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.panel-success {
		margin: 2em;
	}
</style>

<script>
import gql from 'graphql-tag';

import StartEndDate from '#/StartEndDate.vue';
import BootstrapAlert from '#/BootstrapAlert.vue';

import { storeError } from '@/modules/errors.js';
import { isoDateStringObject, thisMonth } from '@/modules/date-utils.js';
import { ucfirst } from '@/modules/text-utils.js';

const VISIBILITIES = [
	'visible',
	'hidden',
	'anonymous'
];

export default {
	data() {
		return {
			dates: isoDateStringObject(thisMonth()),
			visibility: null,
			formId: null,

			updatedEvaluations: null,

			VISIBILITIES
		};
	},
	methods: {
		ucfirst,
		handleSubmit() {
			this.updatedEvaluations = null;

			this.$apollo.mutate({
				mutation: gql`
					mutation ManageEvaluationVisibilities(
						$startDate: Date!
						$endDate: Date!
						$formId: ID!
						$visibility: Visibility
					) {
						updatedEvaluations: updateEvaluationVisibilities(
							startDate: $startDate
							endDate: $endDate
							formId: $formId
							visibility: $visibility
						) {
							id
							type
							request_date
							complete_date
							visibility
							comment
							status
							evaluation_date_start
							evaluation_date_end

							form_id
							form {
								id
								title
							}
							subject_id
							subject {
								id
								full_name
							}
							evaluator_id
							evaluator {
								id
								full_name
							}
							requested_by_id
							requestor {
								id
								full_name
							}
						}
					}
				`,
				variables: {
					...this.dates,
					visibility: this.visibility,
					formId: this.formId
				}
			}).then(({ data: { updatedEvaluations } }) => {

				this.updatedEvaluations = updatedEvaluations;
			}).catch(err => {
				storeError(err, this, 'There was a problem updating visibilities');
			});
		}
	},
	components: {
		BootstrapAlert,
		StartEndDate,
		FormSelect: () => import('#/FormSelect.vue'),
		EvaluationList: () => import('#/EvaluationList.vue')
	}
};
</script>
