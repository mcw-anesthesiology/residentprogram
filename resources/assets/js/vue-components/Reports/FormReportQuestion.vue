<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`">
		<div v-if="text" class="question-header panel-heading">
			<h3 class="question-title panel-title">
				<b>{{ ucfirst(id) }}: </b>
				<span v-html="snarkdown(text)"></span>
			</h3>
		</div>

		<div class="panel-body">
			<div class="question-body">
				<form-reader-question-option v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)"
						v-for="option of options" v-bind="option" :questionType="questionType"
						:questionId="id" :required="required" :showDescription="showDescriptions"
						readonly>
					<form-report-question-option-stats v-bind="option" />
				</form-reader-question-option>

				<div v-if="subjectResponseValues && ['text', 'number'].includes(questionType)"
						class="question-option">
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
				<div v-if="subjectResponses" class="col-md-6">
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
				<show-hide-button v-if="hasDescriptions" class="btn btn-info"
						v-model="showDescriptions">
					<template slot="true">
						<span class="glyphicon glyphicon-zoom-out"></span>
						Hide
					</template>
					<template slot="false">
						<span class="glyphicon glyphicon-zoom-in"></span>
						Show
					</template>

					descriptions

					<template slot="glyph"></template>
				</show-hide-button>

				<show-hide-button v-if="options" class="btn btn-info"
						v-model="showChart">
					<span slot="left-glyph" class="glyphicon glyphicon-stats"></span>

					chart

					<template slot="glyph"></template>
				</show-hide-button>
			</div>
		</div>
	</div>
</template>

<script>
import FormReaderQuestionOption from 'vue-components/FormReader/FormReaderQuestionOption.vue';
import FormReportQuestionOptionStats from './FormReportQuestionOptionStats.vue';
import ChartjsChart from '../ChartjsChart.vue';
import ShowHideButton from '../ShowHideButton.vue';

import snarkdown from 'snarkdown';

import { CHART_COLORS } from 'modules/constants.js';
import { camelCaseToWords, ucfirst } from 'modules/utils.js';

export default {
	props: {
		id: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		questionType: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: false
		},
		required: {
			type: Boolean,
			default: false
		},

		subjectResponses: Object,
		averageResponses: Object,
		subjectResponseValues: Object
	},
	data(){
		return {
			showDescriptions: false,
			showChart: false,
			chartType: 'pie'
		};
	},
	computed: {
		hasDescriptions() {
			if (!this.options)
				return false;

			return this.options.some(option => option.description);
		},
		chartTypes(){
			return [
				'pie',
				'bar',
				'polarArea'
			];
		},
		chartData(){
			if(this.subjectResponses)
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
			if(this.averageResponses)
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
		camelCaseToWords,
		snarkdown,
		ucfirst
	},
	components: {
		FormReaderQuestionOption,
		FormReportQuestionOptionStats,
		ChartjsChart,
		ShowHideButton
	}
};
</script>
