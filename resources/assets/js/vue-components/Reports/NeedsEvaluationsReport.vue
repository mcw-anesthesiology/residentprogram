<template>
	<div>
		<div class="container body-block">
			<h2>Needs evaluations</h2>
			<report-date v-model="dates" />
			<div class="form-group col-md-6">
				<label class="containing-label">
					<select-two v-model="trainingLevel" :options="trainingLevels" />
				</label>
			</div>
			<button type="button" class="btn btn-primary" @click="runEvalsReport">
				Needs evaluations
			</button>
			<button type="button" class="btn" @click="runCompetenciesReport">
				Needs competencies
			</button>
			<button type="button" class="btn" @click="runMilestonesReport">
				Needs milestones
			</button>
		</div>
	</div>
</template>

<script>
import ReportDate from './ReportDate.vue';
import SelectTwo from '../SelectTwo.vue';

export default {
	data(){
		return {
			dates: {
				startDate: '2015-11-01', // FIXME
				endDate: '2016-11-01' // FIXME
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
			fetch('/report/needs-eval/get', {
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
					throw new Error(response.statusText)
			}).then(evaluations => {
				this.report = Object.assign({}, this.report, {evaluations});
			}).catch(err => {
				
			});
		},
		runCompetenciesReport(){

		}
		runMilestonesReport(){

		},
	},

	components: {
		ReportDate,
		SelectTwo
	}
};
</script>
