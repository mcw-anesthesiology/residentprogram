<template>
	<div :class="`question panel ${required ? 'panel-primary' : 'panel-default'}`"
			:style="{opacity: hide ? 0.7 : 1}">
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
					<div class="text-center"
							v-if="canScoreQuestion && scoreQuestion && valuesForAllOptions && !shouldDisregardOption(option) && (getOptionValue(option) || getOptionValue(option) === 0)">
						<span class="option-value-display">
							Value: {{ getOptionValue(option) }}
						</span>
					</div>
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

			<div v-if="canScoreQuestion && scoreQuestion && valuesForAllOptions && (totalAverageScore || subjectAverageScore)"
					class="scores-container">
				<div v-if="totalAverageScore" class="score-container">
					<small>Total average</small>
					<span class="score">
						{{ round(totalAverageScore, 2) }}
					</span>
				</div>
				<div v-if="subjectAverageScore" class="score-container">
					<small>Subject average</small>
					<span class="score">
						{{ round(subjectAverageScore, 2) }}
					</span>
				</div>
				<div v-if="subjectStandardDev" class="score-container">
					<small>Subject standard deviation</small>
					<span class="score">
						{{ round(subjectStandardDev, 2) }}
					</span>
				</div>
			</div>
		</div>

		<div class="question-footer panel-footer">
			<div class="question-description-toggle">
				<show-hide-button class="btn btn-info" :value="hide"
						@input="$emit('hide', arguments[0])">
					<template slot="glyph"></template>

					<template slot="true">
						Show
					</template>
					<template slot="false">
						Hide
					</template>

					question in PDF
				</show-hide-button>

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

				<show-hide-button v-if="canScoreQuestion" class="btn btn-info"
						v-model="showScoreOptions">
					score options
				</show-hide-button>
			</div>
			<div v-if="canScoreQuestion && showScoreOptions" class="row score-options-row">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="row">
							<label>
								<input type="checkbox" :checked="scoreQuestion"
									@change="$emit('score-question', $event.target.checked)" />
								Compute scores
							</label>
						</div>
					</div>
					<div class="panel-body" v-if="scoreQuestion">
						<div v-if="questionType === 'radiononnumeric'" class="row">
							Question values
							<div v-for="option of options" class="form-horizontal">
								<span class="option-text">
									{{ option.text }}
								</span>
								<div class="col-sm-4">
									<label>
										<input type="checkbox" :checked="disregardOption[option.value]"
											@change="handleDisregardOptionChange(option, $event)" />
										Disregard responses
									</label>
								</div>
								<div class="col-sm-8">
									<label class="containing-label">
										Value
										<input type="number" class="form-control"
											:disabled="disregardOption[option.value]"
											:value="customOptionValues[option.value]"
											@input="handleCustomOptionValueChange(option, $event)" />
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FormReaderQuestionOption from 'vue-components/FormReader/FormReaderQuestionOption.vue';
import FormReportQuestionOptionStats from './FormReportQuestionOptionStats.vue';
import ChartjsChart from '../ChartjsChart.vue';
import ShowHideButton from '../ShowHideButton.vue';
import RichNumberStdDev from '../RichNumberStdDev.vue';

import round from 'lodash/round';
import snarkdown from 'snarkdown';

import {
	canScoreQuestion,
	valuesForAllOptions,
	getResponseValues,
	getResponseValue,
	shouldDisregardOption
} from 'modules/reports/form-report.js';

import { CHART_COLORS } from 'modules/constants.js';
import { average, standardDeviation } from 'modules/math-utils.js';
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
		hide: {
			type: Boolean,
			default: false
		},
		scoreQuestion: {
			type: Boolean,
			default: true
		},
		customOptionValues: {
			type: Object,
			default: {}
		},
		disregardOption: {
			type: Object,
			default: {}
		},

		subjectResponses: Object,
		averageResponses: Object,
		subjectResponseValues: Object
	},
	data(){
		return {
			showDescriptions: false,
			showChart: false,
			chartType: 'pie',

			showScoreOptions: false
		};
	},
	computed: {
		canScoreQuestion() {
			return canScoreQuestion(this.questionType);
		},
		valuesForAllOptions() {
			return valuesForAllOptions(this, this.customOptionValues, this.disregardOption);
		},
		totalScores() {
			if (!this.valuesForAllOptions || !this.averageResponses)
				return;

			return getResponseValues(
				this.averageResponses,
				this.customOptionValues,
				this.disregardOption
			);
		},
		totalAverageScore() {
			if (!this.valuesForAllOptions || !this.totalScores)
				return;

			return average(this.totalScores);
		},
		subjectScores() {
			if (!this.valuesForAllOptions || !this.subjectResponses)
				return;

			return getResponseValues(
				this.subjectResponses,
				this.customOptionValues,
				this.disregardOption
			);
		},
		subjectAverageScore() {
			if (!this.valuesForAllOptions || !this.subjectScores)
				return;

			return average(this.subjectScores);
		},
		subjectStandardDev() {
			if (!this.valuesForAllOptions || !this.subjectScores)
				return;

			return standardDeviation(this.subjectScores);
		},
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
		ucfirst,
		round,
		shouldDisregardValue(value) {
			return shouldDisregardOption(value, this.disregardOption);
		},
		shouldDisregardOption(option) {
			return this.shouldDisregardValue(option.value);
		},
		getValueValue(value) {
			if (!this.canScoreQuestion)
				return;

			return getResponseValue(value, this.customOptionValues);
		},
		getOptionValue(option) {
			return this.getValueValue(option.value);
		},
		handleCustomOptionValueChange(option, event) {
			this.$emit('custom-option', Object.assign({}, this.customOptionValues, {[option.value]: Number(event.target.value)}));
		},
		handleDisregardOptionChange(option, event) {
			this.$emit('disregard-option', Object.assign({}, this.disregardOption, {[option.value]: event.target.checked}));
		}
	},
	components: {
		FormReaderQuestionOption,
		FormReportQuestionOptionStats,
		ChartjsChart,
		ShowHideButton,
		RichNumberStdDev
	}
};
</script>

<style scoped>
	.option-text {
		font-weight: bold;
		font-size: 1.25em;
	}

	.score-options-row {
		text-align: left;
	}

	.scores-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.score-container {
		display: block;
		border: 1px solid rgba(0, 0, 0, 0.15);
		padding: 2em;
		font-size: 1.25em;
		border-radius: 1px;
	}

	.score-container small {
		display: block;
		color: rgba(0, 0, 0, 0.35);
	}

	.score-container .score {
		display: block;
		text-align: center;
		font-size: 1.25em;
	}

	.option-value-display {
		font-size: 1.25em;
	}
</style>
