<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`">
		<div v-if="text" class="question-header panel-heading">
			<h3 class="question-title panel-title">
				<b>{{ ucfirst(id) }}: </b>
				<span v-html="md.renderInline(text)"></span>
			</h3>
		</div>

		<div class="panel-body">
			<div class="question-body">
				<form-reader-question-option v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)"
						v-for="option of options" v-bind="option" :questionType="questionType"
						:questionId="id" :required="required" :showDescription="showDescriptions"
						:disabled="true">
					<form-report-question-option-stats v-bind="option" />
				</form-reader-question-option>

				<div v-if="['text', 'number'].includes(questionType)" class="question-option">
					<table class="table table-bordered">
						<tbody>
							<tr>
								<th>Evaluation</th>
								<th>Response</th>
							</tr>
							<tr v-for="(response, evalId) of subjectResponseValues">
								<td>
									<a :href="`/evaluations/${evalId}`">
										{{ evalId }}
									</a>
								</td>
								<td>
									{{ response }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div v-if="options && showChart" class="row">
				<div class="col-md-6">
					<h3>Subject responses</h3>
					<chartjs-chart :id="`${id}-chart`" :type="chartType"
						:data="chartData" :options="chartOptions" />
				</div>
				<div class="col-md-6">
					<h3>Total responses</h3>
					<chartjs-chart :id="`${id}-chart-avg`" :type="chartType"
						:data="averageChartData" :options="chartOptions" />
				</div>
				<div class="form-group">
					<label class="containing-label">
						Chart type
						<select class="form-control" v-model="chartType">
							<option v-for="type of chartTypes" :value="type">
								{{ camelCaseToWords(type) }}
							</option>
						</select>
					</label>
				</div>
			</div>
		</div>

		<div v-if="hasDescriptions || options" class="question-footer panel-footer">
			<div class="question-description-toggle">
				<button v-if="hasDescriptions" type="button" class="btn btn-info"
						@click="showDescriptions = !showDescriptions">
					<span class="glyphicon" :class="showDescriptions ? 'glyphicon-zoom-out' : 'glyphicon-zoom-in'"></span>
					{{ showDescriptions ? 'Hide descriptions' : 'Show descriptions' }}
				</button>
				<button v-if="options" type="button" class="btn btn-info"
						@click="showChart = !showChart">
					<span class="glyphicon glyphicon-stats"></span>
					{{ showChart ? 'Hide chart' : 'Show chart' }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import FormReaderQuestion from '../FormReader/FormReaderQuestion.vue';
import FormReportQuestionOptionStats from './FormReportQuestionOptionStats.vue';
import ChartjsChart from '../ChartjsChart.vue';

import { CHART_COLORS } from '../../modules/constants.js';
import { camelCaseToWords } from '../../modules/utils.js';

export default {
	extends: FormReaderQuestion,
	props: {
		subjectResponses: Object,
		averageResponses: Object,
		subjectResponseValues: Object
	},
	data(){
		return {
			showChart: false,
			chartType: 'pie'
		};
	},
	computed: {
		chartTypes(){
			return [
				'pie',
				'bar',
				'polarArea'
			]
		},
		chartData(){
			return {
				labels: this.options.map(option => option.text || option.value),
				datasets: [
					{
						label: 'Subject responses',
						data: Object.values(this.subjectResponses),
						backgroundColor: CHART_COLORS.OTHER
					}
				]
			};
		},
		averageChartData(){
			return {
				labels: this.options.map(option => option.text || option.value),
				datasets: [
					{
						label: 'Average responses',
						data: Object.values(this.averageResponses),
						backgroundColor: CHART_COLORS.OTHER
					}
				]
			};
		},
		chartOptions(){
			return {
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				}
			};
		}
	},
	methods: {
		camelCaseToWords
	},
	components: {
		FormReportQuestionOptionStats,
		ChartjsChart
	}
}
</script>
