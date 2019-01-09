<template>
	<div class="summary-by-id">
		<merit-report-summary v-if="meritReport"
			v-bind="meritReport"
			:title="meritReportTitle"
			:subject-name="meritReport.user.full_name"
			@close="$emit('close')"
			@alert="$emit('alert', arguments[0])" />
	</div>
</template>

<script>
import { MERIT_REPORT_QUERY } from '@/graphql/merit.js';

import MeritReportSummary from './Summary.vue';

export default {
	props: {
		id: {
			type: [ Number, String ],
			required: true
		},
		title: {
			type: String,
			required: false
		},
		currentUser: {
			type: Object,
			required: false
		}
	},

	data() {
		return {
			meritReport: null
		};
	},

	apollo: {
		meritReport: {
			query: MERIT_REPORT_QUERY,
			variables() {
				return {
					id: this.id
				};
			}
		}
	},

	computed: {
		meritReportTitle() {
			return this.title || this.meritReport.form.name;
		}
	},

	components: {
		MeritReportSummary
	}
};
</script>
