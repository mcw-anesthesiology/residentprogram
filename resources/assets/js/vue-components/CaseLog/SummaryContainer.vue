<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<span class="panel-title">
				Case logs summary
			</span>
			<div class="controls">
				<label class="containing-label">
					Summary type
					<select class="form-control" v-model="currentSummary">
						<option :value="null">Select a summary type</option>
						<option value="ALL">All combined</option>
						<option v-for="summary of summaries" :key="summary.text"
								:value="summary">
							{{ summary.text }}
						</option>
					</select>
				</label>
			</div>
		</div>
		<div id="case-log-summary-container-body" class="panel-body" v-if="responseCounts && selectedSummaries">
			<case-log-summary v-for="summary of selectedSummaries" :key="summary.id"
				:title="summary.text"
				:current-summary-counts="responseCounts.get(summary.id)"
				:num-total-case-logs="caseLogs.length"
			/>
		</div>
		<div class="panel-footer">
			<print-element-button target="#case-log-summary-container-body" filename="Case logs export.pdf"></print-element-button>
		</div>
	</div>
</template>

<script>
import PrintElementButton from '#/PrintElementButton.vue';

import CaseLogSummary from './Summary.vue';

import { logError } from '@/modules/errors.js';
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
		idMaps() {
			return this.caseLogs
				.map(caseLog => getQuestionnaireIdMap(caseLog.details));
		},
		additionalSummaries() {
			return getAdditionalSummaryMaps(this.idMaps);
		},
		summaries() {
			const map = new Map();

			for (const [id, text] of ADDITIONAL_SUMMARY_NAMES.entries()) {
				if (this.additionalSummaries.has(id) && !map.has(id))
					map.set(id, text);
			}

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

			return Array.from(map.entries()).map(([id, text]) => ({id, text}));
		},
		selectedSummaries() {
			if (!this.currentSummary) return [];

			if (this.currentSummary === 'ALL') {
				return this.summaries;
			}

			return [this.currentSummary];
		},
		responses() {
			const responses = new Map();

			for (const idMap of this.idMaps) {
				for (const [id, question] of idMap.entries()) {
					try {
						const values = getResponses(question);
						const prevValues = responses.has(id)
							? responses.get(id)
							: [];

						if (id && values.length > 0) {
							responses.set(id, prevValues.concat(values));
						}
					} catch (e) {
						logError('Failed adding responses', e);
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
	},

	components: {
		CaseLogSummary,
		PrintElementButton
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

	.panel-footer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.panel-footer .btn {
		margin: 0.5em;
	}

	.panel-footer .table-container {
		flex-grow: 1;
	}
</style>
