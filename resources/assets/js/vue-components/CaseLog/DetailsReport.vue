<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<div class="controls">
				<label class="containing-label">
					Summary type
					<select class="form-control" v-model="currentSummary">
						<option :value="null">Select a summary type</option>
						<option v-for="summary of summaries" :key="summary.text"
								:value="summary">
							{{ summary.text }}
						</option>
					</select>
				</label>
			</div>
		</div>
		<div class="panel-body">
			<div v-if="chartData" class="chart-container">
				<chartjs-chart type="doughnut"
					:data="chartData" :options="chartOptions" />

				<table class="table table-striped">
					<thead>
						<tr>
							<th>Response</th>
							<th>Count</th>
						</tr>
					</thead>
					<tbody v-if="currentSummaryCountsValues">
						<tr v-for="{response, color, count} of summaryDataEntries"
								:key="response">
							<td>
								<span class="color-square"
									:style="{backgroundColor: color}">
								</span>
								{{ response }}
							</td>
							<td>{{ count }}</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th>Total responses</th>
							<td>{{ currentTotalCount }}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import ChartjsChart from '@/vue-components/ChartjsChart.vue';

import { getColors } from '@/modules/chart-utils.js';
import { ADDITIONAL_SUMMARY_NAMES, getAdditionalSummaryMaps } from '@/modules/case-logs/raaps.js';

import {
	getResponses,
	getQuestionnaireIdMap,
	walkQuestionnaireQuestions
} from '@/modules/questionnaire/index.js';

export default {
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			currentSummary: null
		};
	},

	computed: {
		chartOptions() {
			return {};
		},
		idMaps() {
			return this.caseLogs
				.map(caseLog => getQuestionnaireIdMap(caseLog.details));
		},
		additionalSummaries() {
			return getAdditionalSummaryMaps(this.idMaps);
		},
		summaries() {
			const map = new Map();

			for (const questionnaire of this.caseLogs.map(log => log.details)) {
				walkQuestionnaireQuestions(questionnaire, (question, section) => {
					if (question.id && this.responses.has(question.id)) {
						let text = question.text;
						if (section.title)
							text = `${section.title} - ${text}`;

						if (!map.has(question.id)) {
							map.set(question.id, text);
						}
					}
				});
			}

			for (const [id, text] of ADDITIONAL_SUMMARY_NAMES.entries()) {
				if (this.additionalSummaries.has(id) && !map.has(id))
					map.set(id, text);
			}

			return Array.from(map.entries()).map(([id, text]) => ({id, text}));
		},
		responses() {
			const responses = new Map();

			for (const idMap of this.idMaps) {
				for (const [id, question] of idMap.entries()) {
					try {
						const values = getResponses(question);
						if (id && values.length > 0) {
							responses.set(id, values);
						}
					} catch (e) {
						console.error('Failed adding responses', e);
					}
				}
			}

			return responses;
		},
		responseCounts() {
			// FIXME: Should probably use values and map back to responses
			// instead of the responses themselves, in case response text
			// changes but underlying values don't

			const counts = new Map();

			for (const [questionId, responses] of this.responses.entries()) {
				if (responses.length > 0) {
					const questionEntry = counts.has(questionId)
						? counts.get(questionId)
						: new Map();

					for (const response of responses) {
						const count = questionEntry.has(response)
							? questionEntry.get(response)
							: 0;

						questionEntry.set(response, count + 1);
					}

					counts.set(questionId, questionEntry);
				}
			}

			for (const [key, val] of this.additionalSummaries.entries()) {
				counts.set(key, val);
			}

			return counts;
		},
		currentSummaryCounts() {
			if (
				!this.responseCounts
				|| !this.currentSummary
				|| !this.responseCounts.has(this.currentSummary.id)
			)
				return;

			return this.responseCounts.get(this.currentSummary.id);
		},
		currentTotalCount() {
			if (!this.currentSummaryCounts)
				return;

			return Array.from(this.currentSummaryCounts.values())
				.reduce((sum, val) => sum + val, 0);
		},
		currentSummaryCountsValues() {
			if (!this.currentSummaryCounts)
				return;

			const counts = [];
			const responses = [];

			for (const [response, count] of this.currentSummaryCounts.entries()) {
				counts.push(count);
				responses.push(response);
			}

			const colors = getColors(counts.length);

			return {
				counts,
				responses,
				colors
			};
		},
		summaryDataEntries() {
			if (!this.currentSummaryCountsValues)
				return;

			const entries = [];
			const { counts, responses, colors } = this.currentSummaryCountsValues;

			for (let i = 0; i < counts.length; i++) {
				entries.push({
					count: counts[i],
					response: responses[i],
					color: colors[i]
				});
			}

			return entries;
		},
		chartData() {
			if (!this.currentSummaryCountsValues)
				return;

			const { counts, responses, colors } = this.currentSummaryCountsValues;

			return {
				datasets: [{
					label: this.currentSummary.text,
					backgroundColor: colors,
					borderColor: colors,
					data: counts
				}],
				labels: responses
			};
		}
	},

	components: {
		ChartjsChart
	}
};
</script>

<style scoped>
	.controls {
		display: flex;
		justify-content: flex-end;
	}

	.controls .containing-label {
		width: auto;
	}

	.chart-container {
		display: flex;
		flex-wrap: wrap;
	}

	.color-square {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		vertical-align: middle;
	}

	.table-striped > tfoot {
		border-top: 2px solid #ddd;
	}
</style>
