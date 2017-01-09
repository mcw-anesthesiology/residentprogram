<template>
	<div>
		<div class="container body-block">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline">
					<label v-for="type of REPORT_TYPES">
						<input type="radio" :value="type" v-model="reportType" />
						{{ ucfirst(type) }}
					</label>
					<a href="/report/needs-eval" class="btn btn-default">
						Needs evaluations
					</a>
				</div>
			</fieldset>
		</div>

		<div v-if="reportType">
			<trainee-report v-if="reportType === REPORT_TYPES.TRAINEE"
				:groupedUsers="groupedUsers" />
			<form-report v-if="reportType === REPORT_TYPES.FORM"
				:groupedUsers="groupedUsers" />
			<needs-report v-if="reportType === REPORT_TYPES.NEEDS"
				:groupedUsers="groupedUsers" />
		</div>
	</div>
</template>

<script>
import TraineeReport from './TraineeReport.vue';
import FormReport from './FormReport.vue';
import NeedsReport from './Needs/Report.vue';

import { REPORT_TYPES } from '../../modules/constants.js';
import { ucfirst, fetchUserGroups } from '../../modules/utils.js';

// TODO: Consider dynamically importing the report types

export default {
	data(){
		return {
			reportType: REPORT_TYPES.TRAINEE,
			groupedUsers: []
		};
	},
	computed: {
		REPORT_TYPES(){
			return REPORT_TYPES;
		}
	},

	created(){
		fetchUserGroups().then(groupedUsers => {
			this.groupedUsers = groupedUsers;
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

</style>
