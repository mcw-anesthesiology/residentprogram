<template>
	<div class="case-log-viewer panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">{{ title }}</h3>
		</div>

		<div class="panel-body">
			<case-log-form
				:sections="caseLog.details.sections"
				:location="caseLog.location_id"
				:case-date="caseLog.case_date"
				:comments="caseLog.comment"
				:locations="locations"
				readonly />
		</div>

		<div class="panel-footer text-center">
			<button type="button" class="btn btn-default"
					@click="$emit('close')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import CaseLogForm from './Form.vue';

export default {
	props: {
		caseLog: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	computed: {
		title() {
			return (this.caseLog && this.caseLog.details && this.caseLog.details.title)
				? this.caseLog.details.title
				: '';
		}
	},

	components: {
		CaseLogForm
	}
};
</script>
