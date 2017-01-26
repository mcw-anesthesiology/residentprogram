<template>
	<div>
		<div class="container body-block">
			<h2>Needs evaluations</h2>
			<start-end-date v-model="dates" />
			<div class="row">
				<div class="form-group col-md-6">
					<label class="containing-label">
						Training Level
						<training-level-select v-model="trainingLevel" />
					</label>
				</div>
				<div class="form-group col-md-6">
					<label class="containing-label">
						Evaluation requirement
						<select class="form-control" v-model="evalThreshold">
							<option value="all">Show all</option>
							<option value="1">1</option>
							<option value="3">3</option>
							<option value="5">5</option>
							<option value="10">10</option>
						</select>
					</label>
				</div>
			</div>
			
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary labelless-button"
						@click="runEvalsReport">
					Run report
				</button>
			</div>
		</div>

		<div v-if="report.evaluations" class="container body-block">
			<needs-evaluations :trainees="report.evaluations"
				:dates="dates" :evalThreshold="evalThreshold" />
		</div>
	</div>
</template>

<script>
import NeedsEvaluations from './Evaluations.vue';
import StartEndDate from '../../StartEndDate.vue';
import TrainingLevelSelect from '../TrainingLevelSelect.vue';
import SelectTwo from '../../SelectTwo.vue';
import EmailEditor from '../../EmailEditor.vue';

import { getFetchHeaders, groupUsers } from '../../../modules/utils.js';

export default {
	data(){
		return {
			dates: {
				startDate: null,
				endDate: null
			},
			trainingLevel: 'all',
			evalThreshold: 3,
			
			report: {
				evaluations: null,
				competencies: null,
				milestones: null
			}
		};
	},
	computed: {
		trainingLevels(){
			return [
				{
					id: 'all',
					text: 'All',
				},
				{
					id: 'intern',
					text: 'Intern',
				},
				{
					id: 'ca-1',
					text: 'CA-1',
				},
				{
					id: 'ca-2',
					text: 'CA-2',
				},
				{
					id: 'ca-3',
					text: 'CA-3',
				},
				{
					id: 'fellow',
					text: 'Fellow',
				}
			];
		}
	},

	methods: {
		runEvalsReport(){
			fetch('/report/needs/evaluations', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					evalThreshold: this.evalThreshold
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response.statusText);
			}).then(evaluations => {
				this.report = Object.assign({}, this.report, {evaluations});
			});
		},
		runCompetenciesReport(){
			fetch('/report/needs/competencies', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response.statusText);
			}).then(competencies => {
				this.report = Object.assign({}, this.report, {competencies});
			});
		},
		runMilestonesReport(){
			fetch('/report/needs/milestones', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response.statusText);
			}).then(milestones => {
				this.report = Object.assign({}, this.report, {milestones});
			});
		},
		groupUsers
	},

	components: {
		NeedsEvaluations,
		StartEndDate,
		TrainingLevelSelect,
		SelectTwo,
		EmailEditor
	}
};
</script>
