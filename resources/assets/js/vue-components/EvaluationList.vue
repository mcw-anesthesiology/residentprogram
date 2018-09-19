<template>
	<section class="evaluation-list">
		<fieldset>
			<legend>Evaluation Date filter</legend>
			<start-end-date v-model="dates" all-time />
		</fieldset>

		<fieldset>
			<legend>Filters</legend>
			<label>
				Status
				<v-select v-model="statusFilter" :options="statusOptions.map(o => ({label: ucfirst(o), value: o}))" />
			</label>

			<label v-if="subjects">
				Subject
				<v-select :options="subjects" v-model="subjectFilter"
					multiple
				/>
			</label>

			<label v-if="evaluators">
				Evaluator
				<v-select :options="evaluators" v-model="evaluatorFilter"
					multiple
				/>
			</label>
			<label v-if="forms">
				Form
				<v-select :options="forms" v-model="formFilter"
					multiple
				/>
			</label>
		</fieldset>

		<component-list>
			<template slot-scope="evaluation">
				<pre>{{ JSON.stringify(evaluation) }}</pre>
			</template>
		</component-list>
	</section>
</template>

<script>
import dlv from 'dlv';

import StartEndDate from './StartEndDate.vue';

import { logError } from '@/modules/errors.js';
import * as dateUtils from '@/modules/date-utils.js';

export default {
	props: {
		evaluations: {
			type: Array,
			required: true
		},

		fields: {
			type: Array,
			default() {
				return [
					'id',
					'subject',
					'evaluator',
					'form',
					'evaluation_date',
					'request_date',
					'complete_date',
					'status'
				];
			}
		},
		fieldAccesssors: {
			type: Object,
			default() {
				return {
					subject: e => dlv(e, 'subject.full_name'),
					evaluator: e => dlv(e, 'evaluator.full_name'),
					form: e => dlv(e, 'form.title'),
					evaluation_date: e => (e.evaluation_date_start && e.evaluation_date_end)
						? dateUtils.renderDateRange(
							e.evaluation_date_start,
							e.evaluation_date_end,
							true
						)
						: '',
					request_date: e => dateUtils.renderDate(e.request_date),
					complete_date: e => dateUtils.renderDate(e.complete_date)
				};
			}
		}
	},
	data() {
		return {
			// eslint-disable-next-line import/namespace
			dates: dateUtils.isoDateStringObject(dateUtils[this.range]()),

			statusFilter: '',
			subjectFilter: null,
			evaluatorFilter: null,
			formFilter: null,


			statusOptions: [
				'pending',
				'complete',
				'disabled',
				'cancelled'
			]
		};
	},
	computed: {
		subjects() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].subject) {
					return this.evaluations.map(e => ({
						value: e.subject.id,
						label: e.subject.full_name
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		evaluators() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].evaluator) {
					return this.evaluations.map(e => ({
						value: e.evaluator.id,
						label: e.evaluator.full_name
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		forms() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].form) {
					return this.evaluations.map(e => ({
						value: e.form.id,
						label: e.form.title
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		evaluationsToShow() {
			let evaluations = this.evaluations;

			if (this.statusFilter) {
				evaluations = evaluations.filter(evaluation =>
					evaluation.status.includes(this.statusFilter)
				);
			}

			if (this.subjectFilter) {
				const subjectIds = this.subjectFilter.map(v => v.value);
				evaluations = evaluations.filter(e => subjectIds.includes(e.subject_id));
			}

			if (this.evaluatorFilter) {
				const evaluatorIds = this.evaluatorFilter.map(v => v.value);
				evaluations = evaluations.filter(e => evaluatorIds.includes(e.evaluator_id));
			}

			if (this.formFilter) {
				const formIds = this.formFilter.map(v => v.value);
				evaluations = evaluations.filter(e => formIds.includes(e.form_id));
			}

			return evaluations;
		}
	},
	components: {
		StartEndDate
	}
};
</script>
