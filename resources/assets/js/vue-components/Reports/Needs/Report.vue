<template>
	<div>
		<div class="container body-block">
			<h2>Needs evaluations</h2>
			<report-date v-model="dates" />
			<div class="form-group col-md-4">
				<label class="containing-label">
					Training Level
					<training-level-select v-model="trainingLevel" />
				</label>
			</div>
			<div class="col-md-8">
				<div class="labelless-element btn-group btn-group-justified" role="group">
					<div class="btn-group" role="group">						
						<button type="button" class="btn btn-primary" @click="runEvalsReport">
							Needs evaluations
						</button>
					</div>
					<div class="btn-group" role="group">						
						<button type="button" class="btn btn-default" @click="runCompetenciesReport">
							Needs competencies
						</button>
					</div>
					<div class="btn-group" role="group">						
						<button type="button" class="btn btn-default" @click="runMilestonesReport">
							Needs milestones
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="report.evaluations" class="container body-block">
			<needs-evaluations :trainees="report.evaluations"
				:dates="dates" :evalThreshold="evalThreshold" />			
		</div>
		<div v-if="report.competencies" class="container body-block">
			<needs-competencies v-bind="report.competencies" />
		</div>
		<div v-if="report.milestones" class="container body-block">
			<needs-milestones v-bind="report.milestones" />
		</div>		
	</div>
</template>

<script>
import NeedsEvaluations from './Evaluations.vue';
import NeedsCompetencies from './Competencies.vue';
import NeedsMilestones from './Milestones.vue';

import ReportDate from '../ReportDate.vue';
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
			evalThreshold: 3, // FIXME
			
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
		NeedsCompetencies,
		NeedsMilestones,
		ReportDate,
		TrainingLevelSelect,
		SelectTwo,
		EmailEditor
	}
};
</script>
