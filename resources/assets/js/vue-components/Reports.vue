<template>
	<div>
		<div v-if="reportType">
			<trainee-report v-if="reportType === REPORT_TYPES.TRAINEE" />
			<form-report v-if="reportType === REPORT_TYPES.FORM" />

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

import { REPORT_TYPES } from '../modules/constants.js';

export default {
	data(){
		return {
			reportType: ''
		};
	},
	computed: {
		REPORT_TYPES(){
			return REPORT_TYPES;
		}
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
		TraineeReport
	}
}
</script>

<style scoped>

</style>
