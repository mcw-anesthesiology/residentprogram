<template>
	<section class="evaluation-list">
		<fieldset>
			<legend>Evaluation Date filter</legend>
			<start-end-date v-model="dates" all-time />
		</fieldset>

		<fieldset>
			<legend>Filters</legend>

			<div class="filters-container">
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
			</div>
		</fieldset>

		<component-list :items="evaluationsToShow" :fields="fields" :fieldAccessors="fieldAccessors">
			<template slot-scope="evaluation">
				<slot v-bind="evaluation">
					<evaluation-list-item :evaluation="evaluation" />
				</slot>
			</template>
		</component-list>
	</section>
</template>

<style>

@supports (display: grid) {
	.filters-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, 200px);
		grid-gap: 1em;
		justify-content: end;
	}
}
</style>

<script>
import dlv from 'dlv';

import VSelect from 'vue-select';

import EvaluationListItem from './EvaluationListItem.vue';
import ComponentList from './ComponentList.vue';
import StartEndDate from './StartEndDate.vue';

import { logError } from '@/modules/errors.js';
import * as dateUtils from '@/modules/date-utils.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		evaluations: {
			type: Array,
			required: true
		},
		range: {
			type: String,
			default: dateUtils.DATE_RANGES.CURRENT_QUARTER
		},

		fields: {
			type: Array,
			default() {
				return [
					'id',
					'subject_name',
					'evaluator_name',
					'form_title',
					'evaluation_date',
					'requested',
					'completed',
					'status'
				];
			}
		},
		fieldAccessors: {
			type: Object,
			default() {
				return {
					subject_name: e => dlv(e, 'subject.full_name'),
					evaluator_name: e => dlv(e, 'evaluator.full_name'),
					form_title: e => dlv(e, 'form.title'),
					evaluation_date: e => (e.evaluation_date_start && e.evaluation_date_end)
						? dateUtils.renderDateRange(
							e.evaluation_date_start,
							e.evaluation_date_end,
							true
						)
						: '',
					requested: e => dateUtils.renderDate(e.request_date),
					completed: e => dateUtils.renderDate(e.complete_date)
				};
			}
		}
	},
	data() {
		return {
			// eslint-disable-next-line import/namespace
			dates: dateUtils.isoDateStringObject(dateUtils[this.range]()),

			statusFilter: null,
			subjectFilter: [],
			evaluatorFilter: [],
			formFilter: [],


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
					evaluation.status.includes(this.statusFilter.value)
				);
			}

			if (this.subjectFilter && this.subjectFilter.length > 0) {
				const subjectIds = this.subjectFilter.map(v => v.value);
				evaluations = evaluations.filter(e => subjectIds.includes(e.subject_id));
			}

			if (this.evaluatorFilter && this.evaluatorFilter.length > 0) {
				const evaluatorIds = this.evaluatorFilter.map(v => v.value);
				evaluations = evaluations.filter(e => evaluatorIds.includes(e.evaluator_id));
			}

			if (this.formFilter && this.formFilter.length > 0) {
				const formIds = this.formFilter.map(v => v.value);
				evaluations = evaluations.filter(e => formIds.includes(e.form_id));
			}

			return evaluations;
		}
	},
	methods: {
		ucfirst
	},
	components: {
		VSelect,
		EvaluationListItem,
		ComponentList,
		StartEndDate
	}
};
</script>
