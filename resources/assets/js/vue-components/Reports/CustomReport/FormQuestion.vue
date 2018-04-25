<template>
	<div>
		<table class="table table-striped table-bordered">
			<thead>
				<tr>
					<th rowspan="2">Option text</th>
					<th v-if="showValues"
							rowspan="2">
						Value
					</th>
					<th :colspan="subject ? 3 : 1">Responses</th>
				</tr>
				<tr>
					<th v-if="subject">Subject #</th>
					<th v-if="subject">Subject %</th>
					<th>Aggregate %</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="option of options">
					<td>{{ option.text }}</td>
					<td v-if="showValues">
						{{ option.value || '' }}
					</td>
					<td v-if="subject">{{ getSubjectResponses(option) }}</td>
					<td v-if="subject">{{ percent(getSubjectResponses(option) / totalSubjectResponses) }}</td>
					<td>{{ percent(getAllResponses(option) / totalAllResponses) }}</td>
				</tr>
			</tbody>
		</table>

		<div v-if="optionsWithValues.length > 0" class="question-stats">
			<div v-if="subject" class="panel panel-default">
				<div class="panel-heading">
					<span class="panel-title">Subject evaluations</span>
				</div>
				<div class="panel-body">
					<div class="stats-container">
						<small>Subject average</small>
						<span class="value">
							{{ round(subjectAverageScore, 2) }}
						</span>
					</div>

					<div class="stats-container">
						<small>Subject standard deviation</small>
						<span class="value">
							{{ round(subjectStandardDev, 2) }}
						</span>
					</div>
				</div>
			</div>

			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="panel-title">All evaluations</span>
				</div>
				<div class="panel-body">
					<div class="stats-container">
						<small>Overall average</small>
						<span class="value">
							{{ round(totalAverageScore, 2) }}
						</span>
					</div>

					<div class="stats-container">
						<small>Overall standard deviation</small>
						<span class="value">
							{{ round(totalStandardDev, 2) }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.question-stats,
	.question-stats .panel-body {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.stats-container {
		display: block;
		padding: 0.5em;
		font-size: 1.25em;
	}

	.stats-container small {
		display: block;
		color: rgba(0, 0, 0, 0.35);
	}

	.stats-container .value {
		display: block;
		text-align: center;
		font-size: 1.25em;
	}

	.table > tbody > tr > th,
	.table > tbody > tr > td {
		padding: 0.5em;
	}

	@media print {
		th, td {

		}
	}
</style>

<script>
import flatMap from 'lodash/flatMap';
import round from 'lodash/round';

import { percent } from '@/modules/formatters.js';

import { sum, average, standardDeviation } from '@/modules/math-utils.js';

export default {
	props: {
		options: {
			type: Array,
			required: true
		},
		subjects: {
			type: Array,
			required: true
		}
	},
	computed: {
		subject() {
			if (!this.subjects || this.subjects.length !== 1)
				return;

			return this.subjects[0];
		},
		optionsWithValues() {
			return this.options.filter(o => o.value != null);
		},
		showValues() {
			return this.optionsWithValues.length > 0;
		},
		subjectValues() {
			return flatMap(this.optionsWithValues, o =>
				Array(this.getSubjectResponses(o)).fill(o.value)
			);
		},
		allValues() {
			return flatMap(this.optionsWithValues, o =>
				Array(this.getAllResponses(o)).fill(o.value)
			);
		},
		subjectAverageScore() {
			return average(this.subjectValues);
		},
		totalAverageScore() {
			return average(this.allValues);
		},
		subjectStandardDev() {
			return standardDeviation(this.subjectValues);
		},
		totalStandardDev() {
			return standardDeviation(this.allValues);
		},
		totalSubjectResponses() {
			return this.options.reduce((sum, option) =>
				sum + this.getSubjectResponses(option)
			, 0);
		},
		totalAllResponses() {
			return this.options.reduce((sum, option) =>
				sum + this.getAllResponses(option)
			, 0);
		}
	},
	methods: {
		percent,
		round,
		getSubjectResponses(option) {
			if (!this.subject || !option.responses)
				return 0;

			return option.responses[this.subject.id] || 0;
		},
		getAllResponses(option) {
			return sum(Object.values(option.responses));
		}
	}
};
</script>
