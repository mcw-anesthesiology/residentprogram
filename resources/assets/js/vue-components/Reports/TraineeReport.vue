<template>
	<div>
		<div class="container body-block">
			<h2>Trainee report</h2>
			<report-date v-model="dates" />
			<label class="containing-label">
				Training level
				<select class="form-control" v-model="trainingLevel">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select>
			</label>

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

			<button type="button" class="btn btn-lg btn-primary"
					@click="runReport">
				Run report
			</button>
		</div>

		<div v-if="report">
			<div class="container body-block">
				<div class="form-group">
					<label class="containing-label">
						User
						<div class="input-group">
							<select-two class="form-control" v-if="filteredUsers"
									:options="filteredUsers" v-model="traineeId"
									:multiple="multipleTrainees">
								<option v-if="!multipleTrainees" value="">All</option>
							</select-two>
							<span class="input-group-addon">
								<label>
									<input type="checkbox" v-model="show.inactiveUsers" />
									Show inactive
								</label>
							</span>
							<span class="input-group-addon">
								<label>
									<input type="checkbox" v-model="multipleTrainees" />
									Select multiple
								</label>
							</span>
						</div>
					</label>
				</div>
				
				<button v-if="report && subjects && subjects.length > 0"
						type="button" class="btn btn-primary" @click="printAll">
					Export all reports to PDFs
				</button>
			</div>
			
			<template v-if="subjects && subjects.length > 0">
				<individual-report v-for="subject of subjects" :report="report"
					:subject="subject" ref="individualReports" />
			</template>
			<template v-else>
				<stats-report v-if="stats" :report="stats" />
				<aggregate-report :report="report" />
			</template>
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
	fetchUsers,
	groupUsers
} from '../../modules/utils.js';

export default {
	data(){
		return {
			dates: {
				startDate: null,
				endDate: null
			},
			trainingLevel: 'all',
			traineeId: null,
			filterMilestones: false,
			milestones: [],
			multipleTrainees: false,

			show: {
				inactiveUsers: false
			},

			report: null,
			stats: null,

			milestoneGroups: [],
			users: []
		};
	},
	created(){
		fetchUsers().then(users => {
			this.users = users;
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
			return groupUsers(this.users);
		},
		filteredUsers(){
			return this.show.inactiveUsers
				? this.groupedUsers
				: this.groupedUsers.filter(userGroup => userGroup.text !== 'Inactive');

		},
		subjects(){
			if(this.traineeId){
				let traineeId = Array.isArray(this.traineeId)
					? this.traineeId
					: [this.traineeId];
				return this.users.filter(user => traineeId.includes(user.id.toString()));
			}
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
			this.$refs.individualReports.map(individual => {
				individual.exportPdf();
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
