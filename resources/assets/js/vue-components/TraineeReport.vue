<template>
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
			<div v-for="(milestoneGroup, index) of milestoneGroups" class="milestone-group col-md-4">
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
	</div>
</template>

<script>
import 'whatwg-fetch';

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
			drawGraphs: 'average',

			milestoneGroups: []
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
		}
	},
	components: {
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
