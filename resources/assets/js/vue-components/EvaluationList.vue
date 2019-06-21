<template>
	<section class="evaluation-list">
		<fieldset>
			<div class="filters-container">
				<label v-if="types && types.length > 1">
					Type
					<v-select :options="types" v-model="typeFilter" multiple />
				</label>
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
				<label v-if="subjectTypes && subjectTypes.length > 1">
					Subject type
					<v-select :options="subjectTypes" v-model="subjectTypeFilter" multiple />
				</label>
				<label v-if="evaluatorTypes && evaluatorTypes.length > 1">
					Evalautor type
					<v-select :options="evaluatorTypes" v-model="evaluatorTypeFilter" multiple />
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

				<evaluation-list-item :key="evaluation.id" :evaluation="evaluation" @reload="$emit('reload', evaluation.id)">
					<slot v-bind="evaluation"></slot>
				</evaluation-list-item>
			</template>
		</component-list>
	</section>
</template>

<style scoped>
@supports (display: grid) {
	.evaluation-list >>> .component-list .list-container ol {
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
/** @format */

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
			typeFilter: [],
			subjectFilter: [],
			evaluatorFilter: [],
			formFilter: [],
			subjectTypeFilter: [],
			evaluatorTypeFilter: []
		};
	},
	computed: {
		types() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].type) {
					const set = new Set(this.evaluations.map(e => e.type));
					return sorted(Array.from(set.values()).map(e => ({
						label: ucfirst(e),
						value: e
					})));
				}
			} catch (e) {
				logError(e);
			}
		},
		statusOptions() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].status) {
					const set = new Set(this.evaluations.map(e => e.status));
					return sorted(Array.from(set.values()).map(s => ({
						label: ucfirst(s),
						value: s
					})));
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

					return sorted(Array.from(map.values()).map(s => ({
						value: s.id,
						label: s.full_name
					})));
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

					return sorted(Array.from(map.values()).map(e => ({
						value: e.id,
						label: e.full_name
					})));
				}
			} catch (e) {
				logError(e);
			}
		},
		evaluatorTypes() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].evaluator && this.evaluations[0].evaluator.display_type) {
					const set = new Set();
					for (const e of this.evaluations) {
						if (e.evaluator && e.evaluator.display_type) {
							set.add(e.evaluator.display_type);
						}
					}

					return sorted(Array.from(set.values()).map(t => ({
						label: t,
						value: t
					})));
				}
			} catch (e) {
				logError(e);
			}
		},
		subjectTypes() {
			try {
				if (this.evaluations.length > 0 && this.evaluations[0].subject && this.evaluations[0].subject.display_type) {
					const set = new Set();
					for (const e of this.evaluations) {
						if (e.subject && e.subject.display_type) {
							set.add(e.subject.display_type);
						}
					}

					return sorted(Array.from(set.values()).map(t => ({
						label: t,
						value: t
					})));
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

					return sorted(Array.from(map.values()).map(f => ({
						value: f.id,
						label: f.title
					})));
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
				const subjectIds = new Set(this.subjectFilter.map(v => v.value));
				evaluations = evaluations.filter(e => subjectIds.has(e.subject_id));
			}

			if (this.evaluatorFilter && this.evaluatorFilter.length > 0) {
				const evaluatorIds = new Set(this.evaluatorFilter.map(v => v.value));
				evaluations = evaluations.filter(e => evaluatorIds.has(e.evaluator_id));
			}

			if (this.formFilter && this.formFilter.length > 0) {
				const formIds = new Set(this.formFilter.map(v => v.value));
				evaluations = evaluations.filter(e => formIds.has(e.form_id));
			}

			if (this.typeFilter && this.typeFilter.length > 0) {
				const types = new Set(this.typeFilter.map(v => v.value));
				evaluations = evaluations.filter(e => types.has(e.type));
			}

			if (this.subjectTypeFilter && this.subjectTypeFilter.length > 0) {
				const types = new Set(this.subjectTypeFilter.map(v => v.value));
				evaluations = evaluations.filter(e => types.has(e.subject.display_type));
			}

			if (this.evaluatorTypeFilter && this.evaluatorTypeFilter.length > 0) {
				const types = new Set(this.evaluatorTypeFilter.map(v => v.value));
				evaluations = evaluations.filter(e => types.has(e.evaluator.display_type));
			}

			return evaluations;
		}
	},
	methods: {
		ucfirst,
	},
	components: {
		VSelect,
		EvaluationListItem,
		ComponentList
	}
};

function sorted(arr) {
	arr = arr.slice();
	arr.sort((a, b) => {
		if (a.label < b.label)
			return -1;
		if (a.label > b.label)
			return 1;
		return 0;
	});

	return arr;
}
</script>
