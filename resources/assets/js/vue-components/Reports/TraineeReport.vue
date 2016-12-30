<template>
	<div>
		<div class="container body-block">
			<h2>Trainee report</h2>
			<report-date v-model="dates" />
			<label class="containing-label">
				Training level
				<select-two class="form-control" v-model="trainingLevel">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select-two>
			</label>

			<div class="row">
				<div class="form-group col-sm-10">
					<label class="containing-label">
						User
						<select-two class="form-control" v-if="groupedUsers"
								:options="groupedUsers" v-model="traineeId"
								:multiple="batchPrint">
							<option v-if="!batchPrint" value="-1">All</option>
						</select-two>
					</label>
				</div>
				<div class="form-group col-sm-2">
					<label>
						<input type="checkbox" v-model="show.inactiveUsers" />
						Show inactive users
					</label>
				</div>
			</div>


			<div class="form-group">
				<label>
					<input type="checkbox" v-model="batchPrint" />
					Batch print
				</label>
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" v-model="filterMilestones" />
					Filter milestones
				</label>
			</div>

			<fieldset v-if="filterMilestones">
				<legend>Milestones</legend>
				<div class="filter-milestones-container">
					<div v-for="(milestoneGroup, index) of milestoneGroups" class="milestone-group">
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
				</div>
			</fieldset>

			<button v-if="batchPrint" type="button" class="btn btn-lg btn-primary"
					@click="printAll">
				Print all
			</button>
			<button v-else type="button" class="btn btn-lg btn-primary"
					@click="runReport">
				Run report
			</button>
		</div>

		<div v-if="report">
			<div v-if="batchPrint">
				<individual-report :report="report"
					v-for="id of traineeId"
					:subjectId="Number(id)" ref="individualsToPrint" />
			</div>
			<div v-else>
				<stats-report v-if="traineeId === '-1' && stats" :report="stats" />

				<aggregate-report v-if="traineeId === '-1'" :report="report" />
				<individual-report v-else :report="report"
					:subjectId="Number(traineeId)" />
			</div>
		</div>
	</div>
</template>

<script>
import AggregateReport from './AggregateReport.vue';
import IndividualReport from './IndividualReport.vue';
import ReportDate from './ReportDate.vue';
import StatsReport from './StatsReport.vue';
import SelectTwo from '../SelectTwo.vue';

import {
	getFetchHeaders,
	fetchMilestoneGroups,
	fetchUserGroups
} from '../../modules/utils.js';

export default {
	data(){
		return {
			dates: {
				startDate: '2015-11-01', // FIXME
				endDate: '2016-11-01' // FIXME
			},
			trainingLevel: 'all',
			traineeId: '-1',
			filterMilestones: false,
			milestones: [],
			batchPrint: false,

			show: {
				inactiveUsers: false
			},

			report: null,
			stats: null,

			milestoneGroups: [],
			userGroups: []
		};
	},
	created(){
		fetchUserGroups().then(userGroups => {
			this.userGroups = userGroups;
		});
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
		groupedUsers(){
			if(!this.show.inactiveUsers)
				return this.userGroups.filter(userGroup => userGroup.text !== 'Inactive');

			return this.userGroups;
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
			const reportPromise = fetch('/report/aggregate', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					milestones: this.milestones
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				let err = new Error(response.statusText);
				err.response = response;
				throw err;
			}).then(report => {
				this.report = Object.assign({}, this.report, report);
			}).catch(err => {
				console.error(err);
			});

			const statsPromise = fetch('/report/stats/resident', {
				method: 'POST',
				headers: getFetchHeaders(),
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
				this.stats = Object.assign({}, this.stats, stats);
			}).catch(err => {
				console.error(err);
			});

			return Promise.all([reportPromise, statsPromise]);
		},
		printAll(){
			this.runReport().then(() => {
				this.$nextTick(() => {
					this.$refs.individualsToPrint.map(individual => {
						individual.exportPdf();
					});
				});
			});
		}
	},
	components: {
		ReportDate,
		AggregateReport,
		IndividualReport,
		StatsReport,
		SelectTwo
	}
};
</script>

<style scoped>
	.filter-milestones-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: stretch;
	}

	.milestone-group {
		flex-grow: 0;
		flex-shrink: 1;
		width: 250px;
		min-width: 200px;
		max-width: 100%;
		margin: 10px;
	}

	.milestone-group .panel-body {
		height: 300px;
		overflow: auto;
	}

	.milestone-group .panel-body label {
		font-weight: normal;
	}
</style>
