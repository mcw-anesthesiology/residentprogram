<template>
	<div>
		<div class="container body-block">
			<h2>Beyond milestones</h2>

			<section>
				<h3>Scenarios</h3>

				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Scenario</th>
							<th>Difficulty</th>
							<th>My average</th>
							<th>CA-1 average</th>
							<th>CA-2 average</th>
							<th>CA-3 average</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="scenario in scenarios" :key="scenario.id">
							<td>
								<a href="#" @click.prevent="selectedScenarioId = scenario.id">
									{{ scenario.title }}
								</a>
							</td>
							<td>{{ scenario.difficulty }}</td>
							<td>{{ scenario.myResponseSummary.average }}</td>
							<td>{{ getTrainingLevelAverage(scenario, 'CA1', decimal) }}</td>
							<td>{{ getTrainingLevelAverage(scenario, 'CA2', decimal) }}</td>
							<td>{{ getTrainingLevelAverage(scenario, 'CA3', decimal) }}</td>
						</tr>
					</tbody>
				</table>

				<div class="panel panel-default">
					<div class="panel-body">
						<label class="containing-label">
							Select or press on a scenario to see its details
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
				</div>
			</section>

			<section>
				<h3>Professionalism questions</h3>

				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Professionalism question</th>
							<th>My average</th>
							<th>CA-1 average</th>
							<th>CA-2 average</th>
							<th>CA-3 average</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="pq in professionalismQuestions" :key="pq.id">
							<td>
								{{ pq.text }}
							</td>
							<td>{{ pq.myResponseSummary.average }}</td>
							<td>{{ getTrainingLevelAverage(pq, 'CA1', percent) }}</td>
							<td>{{ getTrainingLevelAverage(pq, 'CA2', percent) }}</td>
							<td>{{ getTrainingLevelAverage(pq, 'CA3', percent) }}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	</div>
</template>

<script>
/** @format */

import gql from 'graphql-tag';

import StartEndDate from '#/StartEndDate.vue';
import Scenario from '#/BeyondMilestones/Scenario.vue';

import { isoDateString } from '@/modules/date-utils.js';
import { decimal, percent } from '@/modules/formatters.js';

export default {
	data() {
		return {
			dates: {
				startDate: '2018-07-01',
				endDate: isoDateString(new Date())
			},

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

			if (tlSummary) {

			}

			let average = tlSummary ? tlSummary.summary.average : '';

			if (average && formatter) {
				average = formatter(average);
			}

			return average;
		}
	},
	components: {
		StartEndDate,
		Scenario
	}
};
</script>
