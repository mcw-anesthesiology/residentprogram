<template>
	<div class="container body-block" v-if="meritReport">
		<merit-report
			v-bind="meritReport"
			:title="title"
			:user="user"
			:form-id="yearlyFacultyMeritForm.id"
			@close="handleClose"
			@reload="$emit('reload')"
			@alert="$emit('alert', arguments[0])" />
	</div>
</template>

<script>
import MeritReport from './Report.vue';

import {
	getYearlyFacultyMeritForm,
	getCurrentYearlyMeritDateRange
} from 'modules/merit-utils.js';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		user: {
			type: Object,
			required: false
		},
		meritForms: {
			type: Array,
			required: false
		},
		meritReportTypes: {
			type: Object,
			required: true
		},
		meritReportTypeForms: {
			type: Object,
			required: true
		}
	},

	computed: {
		yearlyFacultyMeritForm() {
			return getYearlyFacultyMeritForm(
				this.meritForms,
				this.meritReportTypes,
				this.meritReportTypeForms
			);
		},
		meritReport() {
			if (!this.yearlyFacultyMeritForm)
				return;

			const dates = getCurrentYearlyMeritDateRange();

			return {
				period_start: dates.startDate,
				period_end: dates.endDate,
				report: JSON.parse(this.yearlyFacultyMeritForm.form),
				status: 'pending'
			};
		}
	},

	methods: {
		handleClose() {
			this.$router.push({path: '/'});
		}
	},

	components: {
		MeritReport
	}
};
</script>
