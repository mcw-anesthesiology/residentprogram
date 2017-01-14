<template>
	<div>
		<div class="container body-block">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline">
					<label v-for="type of reportTypes" class="report-type-option">
						<input type="radio" :value="type" v-model="reportType" />
						{{ ucfirst(type) }}
					</label>
				</div>
			</fieldset>
		</div>

		<div v-if="reportType">
			<trainee-report v-if="reportType === 'trainee'"
				:users="users" :groupedUsers="groupedUsers" />
			<form-report v-if="reportType === 'form'"
				:users="users" :groupedUsers="groupedUsers" />
			<needs-report v-if="reportType === 'needs'"
				:users="users" :groupedUsers="groupedUsers" />
		</div>
	</div>
</template>

<script>
import TraineeReport from './TraineeReport.vue';
import FormReport from './FormReport.vue';
import NeedsReport from './Needs/Report.vue';

import { ucfirst, fetchUsers, groupUsers } from '../../modules/utils.js';

// TODO: Consider dynamically importing the report types

export default {
	data(){
		return {
			reportType: 'trainee',
			users: []
		};
	},
	computed: {
		reportTypes(){
			return [
				'trainee',
				'form',
				'needs'
			];
		},
		groupedUsers(){
			return groupUsers(this.users);
		}
	},

	created(){
		fetchUsers().then(users => {
			this.users = users;
		}).catch(err => {
			console.error(err);
		});
	},

	methods: {
		ucfirst
	},
	components: {
		TraineeReport,
		FormReport,
		NeedsReport
	}
};
</script>

<style scoped>
	.report-type-option {
		margin: 0 1em;
	}
</style>
