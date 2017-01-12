<template>
	<div>
		<div class="container body-block">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline">
					<label v-for="type of REPORT_TYPES" class="report-type-option">
						<input type="radio" :value="type" v-model="reportType" />
						{{ ucfirst(type) }}
					</label>
				</div>
			</fieldset>
		</div>

		<div v-if="reportType">
			<trainee-report v-if="reportType === REPORT_TYPES.TRAINEE"
				:users="users" :groupedUsers="groupedUsers" />
			<form-report v-if="reportType === REPORT_TYPES.FORM"
				:users="users" :groupedUsers="groupedUsers" />
			<needs-report v-if="reportType === REPORT_TYPES.NEEDS"
				:users="users" :groupedUsers="groupedUsers" />
		</div>
	</div>
</template>

<script>
import TraineeReport from './TraineeReport.vue';
import FormReport from './FormReport.vue';
import NeedsReport from './Needs/Report.vue';

import { REPORT_TYPES } from '../../modules/constants.js';
import { ucfirst, fetchUsers, groupUsers } from '../../modules/utils.js';

// TODO: Consider dynamically importing the report types

export default {
	data(){
		return {
			reportType: REPORT_TYPES.TRAINEE,
			users: []
		};
	},
	computed: {
		REPORT_TYPES(){
			return REPORT_TYPES;
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
