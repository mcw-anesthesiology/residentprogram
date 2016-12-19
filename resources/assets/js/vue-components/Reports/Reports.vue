<template>
	<div>
		<div v-if="reportType">
			<trainee-report v-if="reportType === REPORT_TYPES.TRAINEE"
				:groupedUsers="groupedUsers" />
			<form-report v-if="reportType === REPORT_TYPES.FORM"
				:groupedUsers="groupedUsers" />
			<needs-report v-if="reportType === REPORT_TYPES.NEEDS"
				:groupedUsers="groupedUsers" />

			<div class="text-center">
				<button type="button" class="btn btn-lg btn-default"
						@click="handleResetClick">
					Start over
				</button>
			</div>
		</div>


		<div v-else class="container body-block">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline">
					<div v-for="type of REPORT_TYPES" class="form-group col-sm-2">
						<button type="button" class="btn lg btn-primary"
								@click="setReportType(type)">
							{{ ucfirst(type) }}
						</button>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</template>

<script>
import TraineeReport from './TraineeReport.vue';
import FormReport from './FormReport.vue';
import NeedsReport from './Needs/Report.vue';

import { REPORT_TYPES } from '../../modules/constants.js';
import { fetchUserGroups } from '../../modules/utils.js';

export default {
	data(){
		return {
			reportType: '',
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
		ucfirst,
		setReportType(type){
			this.reportType = type;
		},
		handleResetClick(){
			this.reportType = '';
		}
	},
	components: {
		TraineeReport,
		FormReport,
		NeedsReport
	}
}
</script>

<style scoped>

</style>
