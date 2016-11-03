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
			<stats-report v-if="report.stats" :report="report.stats" />

			<aggregate-report v-if="report.aggregate" :report="report.aggregate" />
		</div>
	</div>
</template>

<script>
import AggregateReport from './AggregateReport.vue';
import ReportDate from './ReportDate.vue';
import StatsReport from './StatsReport.vue';

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

			fetch('/report/stats/resident', {
				method: 'POST',
				headers: headers,
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				let err = new Error(response.statusText);
				err.response = response;
				throw err;
			}).then(stats => {
				this.report = Object.assign({}, this.report, {stats: stats});
			}).catch(err => {
				console.error(err);
			});
		}
	},
	components: {
		ReportDate,
		AggregateReport,
		StatsReport
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
