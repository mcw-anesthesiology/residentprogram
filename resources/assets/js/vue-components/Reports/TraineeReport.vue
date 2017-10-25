<template>
	<div>
		<div class="container body-block">
			<h1>Trainee report</h1>
			<start-end-date v-model="dates" />
			<div class="row">
				<div class="form-group col-sm-6">
					<label class="containing-label">
						Evaluation training level
						<training-level-select v-model="trainingLevel" />
					</label>
				</div>
				<div class="form-group col-sm-6">
					<label class="containing-label">
						Trainee current training level
						<span class="glyphicon glyphicon-question-sign"
								ref="currentTrainingLevelHintGlyph"></span>
						<training-level-select v-model="currentTrainingLevel" />
					</label>
				</div>
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
												v-model="milestonesFilter" />
										{{ child.text }}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</fieldset>

			<alert-list v-model="alerts" />

			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>

		<div v-if="report">
			<div class="container body-block">
				<div class="form-group">
					<div class="row">
						<div class="col-md-4">
							<bootstrap-alert type="info">
								<span class="glyphicon glyphicon-info-sign"></span>
								Select a subject to show
								individual reports.
							</bootstrap-alert>
						</div>
						<div class="col-sm-10 col-md-7">
							<label class="containing-label">
								Subject
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
						<div class="col-sm-2 col-md-1">
							<button type="button" class="btn btn-default labelless-button"
									@click="traineeId = null">
								Clear
							</button>
						</div>
					</div>

					<div class="btn-lg-submit-container">
						<button v-if="report && subjects && subjects.length > 0"
								type="button" class="btn btn-lg btn-primary"
								@click="printAll">
							Export all
							<svg-icon src="/img/icons/pdf.svg" />
						</button>
					</div>
				</div>
			</div>

			<template v-if="subjects && subjects.length > 0">
				<individual-report v-for="subject of subjects" :key="subject.id"
					:report="report"
					:subject="subject"
					ref="individualReports" />
			</template>
			<template v-else>
				<stats-report v-if="subjectStats" :report="subjectStats"
						title="Trainee evaluation statistics by trainee">
					<p class="text-center">
						Trainee list can be filtered by
						<b>Trainee current training level</b>
						above
					</p>
				</stats-report>
				<stats-report v-if="evaluatorStats" :report="evaluatorStats"
						title="Faculty evaluation statistics by trainee">
					<p class="text-center">
						Trainee list can be filtered by
						<b>Trainee current training level</b>
						above
					</p>
				</stats-report>
				<aggregate-report :report="report"
					:milestones="milestones" :competencies="competencies" />
			</template>
		</div>
	</div>
</template>

<script>
import AggregateReport from './AggregateReport.vue';
import IndividualReport from './IndividualReport.vue';
import StartEndDate from '../StartEndDate.vue';
import StatsReport from './StatsReport.vue';
import TrainingLevelSelect from './TrainingLevelSelect.vue';
import AlertList from '../AlertList.vue';
import BootstrapAlert from '../BootstrapAlert.vue';
import SelectTwo from '../SelectTwo.vue';
import SvgIcon from '../SvgIcon.vue';

import {
	getFetchHeaders,
	jsonOrThrow,
	fetchMilestones,
	groupMilestones,
	fetchCompetencies
} from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	props: {
		users: {
			type: Array,
			required: true
		},
		groupedUsers: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			trainingLevel: 'all',
			currentTrainingLevel: 'all',
			traineeId: null,
			filterMilestones: false,
			milestonesFilter: [],
			multipleTrainees: false,

			show: {
				inactiveUsers: false
			},

			report: null,
			subjectStats: null,
			evaluatorStats: null,

			milestones: [],
			competencies: [],

			alerts: []
		};
	},
	mounted(){
		fetchMilestones().then(milestones => {
			this.milestones = milestones;
		}).catch(err => {
			console.error(err);
			this.alerts.push({
				type: 'error',
				html: '<strong>Error:</strong> There was a problem fetching milestones'
			});
		});

		fetchCompetencies().then(competencies => {
			this.competencies = competencies;
		}).catch(err => {
			console.error(err);
			this.alerts.push({
				type: 'error',
				html: '<strong>Error:</strong> There was a problem fetching competencies'
			});
		});

		$(this.$refs.currentTrainingLevelHintGlyph).popover({
			title: 'Current training level',
			content: `
				<p>
					Selecting a <b>current training level</b> will include only
					active trainees for that level, whether they have completed
					evaluations or not.
				</p>
				<p>
					Any trainees with completed evaluations associated with the
					<b>evaluation training level</b> who are not currently
					in the selected <b>current training level</b> will be
					excluded.
				</p>
				<dd>
					<dt>Example:</dt>
					<dd>
						<p>
							Jane is currently a fellow, but she completed her
							residency a month late, at the end of July.
						</p>
						<p>
							When running reports for July for the incoming CA-3s,
							Jane's July CA-3 evaluations will be excluded
							from the report by selecting a
							<b>current training level</b> of <i>CA-3</i>.
						</p>
					</dd>
				</dd>`,
			html: true,
			placement: 'auto top'
		});
	},

	computed: {
		milestoneGroups(){
			return groupMilestones(this.milestones);
		},
		filteredUsers(){
			let groupedUsers = this.currentTrainingLevel === 'all'
				? this.groupedUsers.filter(userGroup =>
					userGroup.text.toLowerCase() !== 'faculty')
				: this.groupedUsers.filter(userGroup =>
					userGroup.text.toLowerCase() === this.currentTrainingLevel.toLowerCase());

			return this.show.inactiveUsers
				? groupedUsers
				: groupedUsers.filter(userGroup => userGroup.text !== 'Inactive');

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
				return this.milestonesFilter.includes(id);
			});
		},
		toggleEntireMilestoneGroup(index){
			let groupIds = this.milestoneGroups[index].children.map(child => child.id);
			let newMilestones = this.milestonesFilter.filter(milestone => {
				return !groupIds.includes(milestone);
			});
			if(!this.isEntireMilestoneGroupSelected(index)){
				newMilestones = newMilestones.concat(groupIds);
			}
			this.milestonesFilter = newMilestones;
		},
		runReport(){
			fetch('/report/aggregate', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					currentTrainingLevel: this.currentTrainingLevel,
					milestones: this.milestonesFilter
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

			fetch('/report/stats/trainee/trainee', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign({}, this.dates, {
					trainingLevel: this.currentTrainingLevel
				}))
			}).then(jsonOrThrow).then(stats => {
				this.subjectStats = stats;
			}).catch(err => {
				console.error(err);
			});

			fetch('/report/stats/faculty/trainee', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign({}, this.dates, {
					trainingLevel: this.currentTrainingLevel
				}))
			}).then(jsonOrThrow).then(stats => {
				this.evaluatorStats = stats;
			}).catch(err => {
				console.error(err);
			});
		},
		printAll(){
			this.$refs.individualReports.map(individual => {
				individual.exportPdf();
			});
		}
	},
	components: {
		StartEndDate,
		AggregateReport,
		IndividualReport,
		StatsReport,
		TrainingLevelSelect,
		AlertList,
		BootstrapAlert,
		SelectTwo,
		SvgIcon
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

<style>
	.popover dd {
		padding: 0 1em;
	}
</style>
