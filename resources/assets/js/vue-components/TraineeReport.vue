<template>
	<div>
		<div class="container body-block">
			<h2>Trainee report</h2>
			<report-date v-model="dates" />
			<div class="form-group">
				<label>
					<input type="checkbox" v-model="filterMilestones" />
					Filter milestones
				</label>
			</div>

			<fieldset v-if="filterMilestones">
				<legend>Milestones</legend>
				<div v-for="(milestoneGroup, index) of milestoneGroups" class="milestone-group col-xs-6 col-sm-4 col-md-3 col-lg-2">
					<div class="panel panel-default">
						<div class="panel-heading">
							<label class="panel-title">
								<input type="checkbox"
										:checked="isEntireMilestoneGroupSelected(index)"
										@click="toggleEntireMilestoneGroup(index)" />
								{{ milestoneGroup.text }}
							</label>
						</div>
						<div class="panel-body">
							<div v-for="child of milestoneGroup.children" class="form-group">
								<label>
									<input type="checkbox"
											:value="child.id"
											v-model="milestones" />
									{{ child.text }}
								</label>
							</div>
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset>
				<legend>Graphs</legend>
				<label>
					<input type="radio" value="average" v-model="graphOption" />
					Average only
				</label>
				<label>
					<input type="radio" value="all" v-model="graphOption" />
					All
				</label>
				<label>
					<input type="radio" value="none" v-model="graphOption" />
					None
				</label>
			</fieldset>

			<button type="button" class="btn btn-lg btn-primary"
					@click="runReport">
				Run report
			</button>
		</div>

		<div v-if="report">
			<div v-if="report.stats" class="container body-block">

			</div>

			<div v-if="report.aggregate">
				<div class="container body-block">
					<fieldset>
						<legend>Show in report</legend>
						<label>
							<input type="checkbox" value="milestones" v-model="aggregateShow" />
							Milestones
						</label>
						<label>
							<input type="checkbox" value="competencies" v-model="aggregateShow" />
							Competencies
						</label>
						<label>
							<input type="checkbox" value="standardDeviations" v-model="aggregateShow" />
							Standard Deviations
						</label>
					</fieldset>

					<data-table id="aggregate-table" :thead="aggregateThead"
						:config="aggregateConfig" :data="aggregateData" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'whatwg-fetch';

import DataTable from './DataTable.vue';
import ReportDate from './ReportDate.vue';

import { fetchMilestoneGroups } from '../modules/utils.js';

export default {
	data(){
		return {
			dates: {
				startDate: '',
				endDate: ''
			},
			trainingLevel: 'all',
			filterMilestones: false,
			milestones: [],
			graphOption: 'average',
			report: null,

			aggregateShow: [
				'competencies'
			],

			milestoneGroups: [],
			userGroups: {}
		};
	},
	watch: {
		filterMilestones(shouldFilter){
			if(shouldFilter){
				fetchMilestoneGroups().then(milestoneGroups => {
					this.milestoneGroups = milestoneGroups;
				});
			}
		}
	},
	computed: {
		colsPerItem(){
			return this.aggregateShow.includes('standardDeviations')
				? 3
				: 2;
		},
		milestoneColspan(){
			return this.colsPerItem * Object.keys(this.report.aggregate.milestones).length;
		},
		competencyColspan(){
			return this.colsPerItem * Object.keys(this.report.aggregate.competencies).length;
		},
		aggregateThead(){
			let thead = [];
			let row = [];
			row.push({rowspan: 3, text: 'Trainee'});
			if(this.aggregateShow.includes('milestones'))
				row.push({
					colspan: this.milestoneColspan,
					text: 'Milestones'
				});
			if(this.aggregateShow.includes('competencies'))
				row.push({
					colspan: this.competencyColspan,
					text: 'Competencies'
				});
			row.push({colspan: 3, text: 'All'});
			thead.push(row);

			row = [];
			if(this.aggregateShow.includes('milestones')){
				for(let milestoneId in this.report.aggregate.milestones){
					row.push({
						colspan: this.colsPerItem,
						text: this.report.aggregate.milestones[milestoneId]
					});
				}
			}
			if(this.aggregateShow.includes('competencies')){
				for(let competencyId in this.report.aggregate.competencies){
					row.push({
						colspan: this.colsPerItem,
						text: this.report.aggregate.competencies[competencyId]
					});
				}
			}
			row.push({colspan: 3, text: 'Total'});
			thead.push(row);

			row = [];
			if(this.aggregateShow.includes('milestones')){
				for(let milestoneId in this.report.aggregate.milestones){
					row.push({text: 'Average'});
					if(this.aggregateShow.includes('standardDeviations'))
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			if(this.aggregateShow.includes('competencies')){
				for(let competencyId in this.report.aggregate.competencies){
					row.push({text: 'Average'});
					if(this.aggregateShow.includes('standardDeviations'))
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			row.push({text: '# Evaluators'});
			row.push({text: '# Evaluations'});
			row.push({text: '# Trainee Requests'});
			thead.push(row);

			return thead;
		},
		aggregateConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				dom: 'lfprtip',
				scrollX: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedColumns: true,
			};
		},
		aggregateData(){
			let data = [];
			for(let subjectId in this.report.aggregate.subjects){
				let row = [];
				row.push(this.report.aggregate.subjects[subjectId]);
				if(this.aggregateShow.includes('milestones')){
					for(let milestoneId in this.report.aggregate.milestones){
						row.push(
							this.report.aggregate.subjectMilestone
									&& this.report.aggregate.subjectMilestone[subjectId]
									&& this.report.aggregate.subjectMilestone[subjectId][milestoneId]
								? parseFloat(this.report.aggregate.subjectMilestone[subjectId][milestoneId]).toFixed(2)
								: ''
						);

						if(this.aggregateShow.includes('standardDeviations'))
							row.push(
								this.report.aggregate.subjectMilestoneDeviations
										&& this.report.aggregate.subjectMilestoneDeviations[subjectId]
										&& this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId]
									? parseFloat(this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.aggregate.subjectMilestoneEvals
									&& this.report.aggregate.subjectMilestoneEvals[subjectId]
									&& this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId]
								? parseFloat(this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId]).toFixed()
								: 0
						);
					}
				}

				if(this.aggregateShow.includes('competencies')){
					for(let competencyId in this.report.aggregate.competencies){
						row.push(
							this.report.aggregate.subjectCompetency
									&& this.report.aggregate.subjectCompetency[subjectId]
									&& this.report.aggregate.subjectCompetency[subjectId][competencyId]
								? parseFloat(this.report.aggregate.subjectCompetency[subjectId][competencyId]).toFixed(2)
								: ''
						);

						if(this.aggregateShow.includes('standardDeviations'))
							row.push(
								this.report.aggregate.subjectCompetencyDeviations
										&& this.report.aggregate.subjectCompetencyDeviations[subjectId]
										&& this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId]
									? parseFloat(this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.aggregate.subjectCompetencyEvals
									&& this.report.aggregate.subjectCompetencyEvals[subjectId]
									&& this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId]
								? parseFloat(this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId]).toFixed()
								: 0
						);
					}
				}

				row.push(Object.keys(this.report.aggregate.subjectEvaluators[subjectId]).length);
				row.push(Object.keys(this.report.aggregate.subjectEvals[subjectId]).length);
				row.push(Object.keys(this.report.aggregate.subjectRequests[subjectId]).length);

				data.push(row);
			}

			return data;
		}
	},
	methods: {
		isEntireMilestoneGroupSelected(index){
			let groupIds = this.milestoneGroups[index].children.map(child => child.id);
			return groupIds.every(id => {
				return this.milestones.includes(id);
			});
		},
		toggleEntireMilestoneGroup(index){
			let groupIds = this.milestoneGroups[index].children.map(child => child.id);
			let newMilestones = this.milestones.filter(milestone => {
				return !groupIds.includes(milestone);
			});
			if(!this.isEntireMilestoneGroupSelected(index)){
				newMilestones = newMilestones.concat(groupIds);
			}
			this.milestones = newMilestones;
		},
		runReport(){
			let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('X-Requested-With', 'XMLHttpRequest');
			headers.append('X-CSRF-TOKEN', csrfToken);

			fetch('/report/aggregate', {
				method: 'POST',
				headers: headers,
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					graphs: this.graphOption,
					milestones: this.milestones
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				let err = new Error(response.statusText);
				err.response = response;
				throw err;
			}).then(aggregate => {
				this.report = Object.assign({}, this.report, {aggregate: aggregate});
			}).catch(err => {
				console.error(err);
			});
		}
	},
	components: {
		DataTable,
		ReportDate
	}
}
</script>

<style scoped>
	.milestone-group .panel-body {
		height: 300px;
		overflow: auto;
	}

	.milestone-group .panel-body label {
		font-weight: normal;
	}
</style>
