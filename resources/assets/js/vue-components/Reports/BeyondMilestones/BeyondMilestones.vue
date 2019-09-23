<template>
	<div>
		<div class="container body-block">
			<h2>Beyond milestones response summary</h2>

			<start-end-date v-model="dates" />
			<div class="bm-container">
				<section>
					<h3>Scenarios</h3>
					<table class="table table-striped table-bordered">
						<thead>
							<tr>
								<th rowspan="2">Scenario</th>
								<th colspan="5" class="text-center">
									Average
								</th>
							</tr>
							<tr>
								<th>Me</th>
								<th>Intern</th>
								<th>CA-1</th>
								<th>CA-2</th>
								<th>CA-3</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="scenario in scenarios" :key="scenario.id">
								<th>
									<a href="#" @click.prevent="selectedScenarioId = scenario.id">
										{{ scenario.title }}
									</a>
								</th>
								<td>{{ scenario.myResponseSummary.average ? decimal(scenario.myResponseSummary.average) : '' }}</td>
								<td>{{ getTrainingLevelAverage(scenario, 'INTERN', decimal) }}</td>
								<td>{{ getTrainingLevelAverage(scenario, 'CA1', decimal) }}</td>
								<td>{{ getTrainingLevelAverage(scenario, 'CA2', decimal) }}</td>
								<td>{{ getTrainingLevelAverage(scenario, 'CA3', decimal) }}</td>
							</tr>
						</tbody>
					</table>
				</section>

				<section>
					<h3>Professionalism questions</h3>

					<table class="table table-striped table-bordered">
						<thead>
							<tr>
								<th rowspan="2">Question</th>
								<th colspan="5" class="text-center">
									Average
								</th>
							</tr>
							<tr>
								<th>Me</th>
								<th>Intern</th>
								<th>CA-1</th>
								<th>CA-2</th>
								<th>CA-3</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="pq in professionalismQuestions" :key="pq.id">
								<th>
									{{ pq.text }}
								</th>
								<td>{{ pq.myResponseSummary.average ? percent(pq.myResponseSummary.average) : '' }}</td>
								<td>{{ getTrainingLevelAverage(pq, 'INTERN', percent) }}</td>
								<td>{{ getTrainingLevelAverage(pq, 'CA1', percent) }}</td>
								<td>{{ getTrainingLevelAverage(pq, 'CA2', percent) }}</td>
								<td>{{ getTrainingLevelAverage(pq, 'CA3', percent) }}</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		</div>

		<div class="container body-block">
			<label class="containing-label">
				Select or press on a scenario above to see its details
				<select class="form-control" v-model="selectedScenarioId">
					<option value=""></option>

					<option v-for="scenario of scenarios" :key="scenario.id"
						:value="scenario.id"
					>
						{{ scenario.title }}
					</option>
				</select>
			</label>

			<Scenario v-if="selectedScenario" v-bind="selectedScenario" readonly />
		</div>

		<div class="container body-block further-analysis-controls">
			<show-hide-button class="btn btn-info" v-model="showTraineeReportComparison">
				milestone evaluation report
			</show-hide-button>

			<show-hide-button type="button" class="btn btn-info"
				v-model="showEvaluationLinks"
			>
				individual evaluations
			</show-hide-button>
		</div>

		<trainee-report-comparison v-if="showTraineeReportComparison" :dates="dates" />

		<div v-if="showEvaluationLinks" class="container body-block">
			<div class="bm-container">
				<section>
					<h3>Scenarios</h3>
					<table class="table table-striped table-bordered">
						<tbody>
							<tr v-for="scenario of scenarios" :key="scenario.id">
								<th>{{ scenario.title }}</th>
								<td>
									<ul>
										<li v-for="evalId of scenario.myResponseSummary.evaluationIds" :key="evalId">
											<a :href="`/evaluation/${evalId}`" target="_blank">
												{{ evalId }}
											</a>
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section>
					<h3>Professionalism questions</h3>
					<table class="table table-striped table-bordered">
						<tbody>
							<tr v-for="pq of professionalismQuestions" :key="pq.id">
								<th>{{ pq.text }}</th>
								<td>
									<ul>
										<li v-for="evalId of pq.myResponseSummary.evaluationIds" :key="evalId">
											<a :href="`/evaluation/${evalId}`" target="_blank">
												{{ evalId }}
											</a>
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>

			<div class="text-center">
				<button type="button" class="btn btn-default" @click="showEvaluationLinks = false">
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bm-container {
	display: flex;
	flex-wrap: wrap;
}

.bm-container section {
	padding: 0.5em;
	flex-basis: 50%;
	flex-grow: 1;
}

.further-analysis-controls {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>

<script>
/** @format */

import gql from 'graphql-tag';

import StartEndDate from '#/StartEndDate.vue';
import ShowHideButton from '#/ShowHideButton.vue';
import Scenario from '#/BeyondMilestones/Scenario.vue';

import TraineeReportComparison from './TraineeReportComparison.vue';

import { isoDateString } from '@/modules/date-utils.js';
import { decimal, percent } from '@/modules/formatters.js';

export default {
	data() {
		return {
			dates: {
				startDate: '2018-07-01',
				endDate: isoDateString(new Date())
			},

			showTraineeReportComparison: false,
			showEvaluationLinks: false,

			selectedScenarioId: '',

			professionalismQuestions: [],
			scenarios: [],
			forms: []
		};
	},
	apollo: {
		professionalismQuestions: {
			query: gql`
				{
					professionalismQuestions {
						id
						title
						text
						myResponseSummary {
							average
							num

							evaluationIds
						}
						trainingLevelResponseSummaries {
							trainingLevel
							summary {
								average
								num
							}
						}
					}
				}
			`
		},
		scenarios: {
			query: gql`
				{
					scenarios {
						id
						scenario_difficulty
						title
						intro
						text
						options {
							text
							value
						}
						myResponseSummary {
							average
							num

							evaluationIds
						}
						trainingLevelResponseSummaries {
							trainingLevel
							summary {
								average
								num
							}
						}
					}
				}
			`
		}
	},
	computed: {
		selectedScenario() {
			if (!this.selectedScenarioId || !this.scenarios) return;

			return this.scenarios.find(s => s.id === this.selectedScenarioId);
		}
	},
	methods: {
		decimal,
		percent,
		getTrainingLevelAverage(model, trainingLevel, formatter = null) {
			const tlSummary = model.trainingLevelResponseSummaries.find(
				s => s.trainingLevel === trainingLevel
			);

			let average = tlSummary ? tlSummary.summary.average : '';

			if (average && formatter) {
				average = formatter(average);
			}

			return average;
		}
	},
	components: {
		StartEndDate,
		ShowHideButton,
		Scenario,
		TraineeReportComparison
	}
};
</script>
