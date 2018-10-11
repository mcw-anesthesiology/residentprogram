<template>
	<section class="evaluation-list">
		<fieldset>
			<div class="filters-container">
				<label v-if="forms && forms.length > 1">
					Form
					<v-select :options="forms" v-model="formFilter"
						multiple
					/>
				</label>
				<label v-if="subjects && subjects.length > 1">
					Subject
					<v-select :options="subjects" v-model="subjectFilter"
						multiple
					/>
				</label>
				<label v-if="evaluators && evaluators.length > 1">
					Evaluator
					<v-select :options="evaluators" v-model="evaluatorFilter"
						multiple
					/>
				</label>
				<label v-if="statusOptions && statusOptions.length > 1">
					Status
					<v-select :options="statusOptions" v-model="statusFilter" />
				</label>
			</div>
		</fieldset>

		<component-list :items="evaluationsToShow" :fields="fields"
				:fieldAccessors="fieldAccessors"
				defaultSortBy="id"
				defaultSortOrder="desc"
				:defaultItemsPerPage="5">
			<template slot-scope="evaluation">
				<slot v-bind="evaluation">
					<evaluation-list-item :key="evaluation.id" :evaluation="evaluation" @reload="$emit('reload', evaluation.id)" />
				</slot>
			</template>
		</component-list>
	</section>
</template>

<style scoped>
@supports (display: grid) {
	.evaluation-list :global(.component-list .list-container ol) {
		display: grid;
		grid-gap: 1px;
		grid-template-columns: 1fr;
		background-color: #ddd;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}

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

import { logError } from '@/modules/errors.js';
import { renderDate, renderDateRange } from '@/modules/date-utils.js';
import { ucfirst } from '@/modules/utils.js';

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
					evaluation_date: (e, accessType) => (e.evaluation_date_start && e.evaluation_date_end)
						? accessType === 'search'
							? renderDateRange(
								e.evaluation_date_start,
								e.evaluation_date_end,
								true
							)
							: new Date(e.evaluation_date_start)
						: '',
					requested: (e, accessType) => accessType === 'search'
						? renderDate(e.request_date)
						: new Date(e.request_date),
					completed: (e, accessType) => accessType === 'search'
						? renderDate(e.complete_date)
						: new Date(e.complete_date),
				};
			}
		}
	},
	data() {
		return {
			statusFilter: null,
			subjectFilter: [],
			evaluatorFilter: [],
			formFilter: []
		};
	},
	computed: {
		statusOptions() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].subject) {
					const set = new Set(this.evaluations.map(e => e.status));
					return Array.from(set.values()).map(s => ({
						label: ucfirst(s),
						value: s
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		subjects() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].subject) {
					const map = new Map();
					for (const e of this.evaluations) {
						map.set(e.subject_id, e.subject);
					}

					return Array.from(map.values()).map(s => ({
						value: s.id,
						label: s.full_name
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		evaluators() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].evaluator) {
					const map = new Map();
					for (const e of this.evaluations) {
						map.set(e.evaluator_id, e.evaluator);
					}

					return Array.from(map.values()).map(e => ({
						value: e.id,
						label: e.full_name
					}));
				}
			} catch (e) {
				logError(e);
			}
		},
		forms() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].form) {
					const map = new Map();
					for (const e of this.evaluations) {
						map.set(e.form_id, e.form);
					}

					return Array.from(map.values()).map(f => ({
						value: f.id,
						label: f.title
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
					evaluation.status === this.statusFilter.value
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
		ComponentList
	}
};
</script>
