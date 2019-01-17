<template>
	<div class="report-by-id">
		<div class="container body-block" v-if="meritReport">
			<merit-report
				v-bind="meritReport"
				:title="title"
				:current-user="currentUser"
				:form_id="meritReport.form.id"
				@close="$emit('close')"
				@reload="handleReload"
				@alert="$emit('alert', arguments[0])" />
		</div>
	</div>
</template>

<script>
import { MERIT_REPORT_QUERY } from '@/graphql/merit.js';

import MeritReport from './Report.vue';

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

	methods: {
		handleReload() {
			this.$apollo.queries.meritReport.refetch();
			this.$emit('reload', this.id);
		}
	},

	components: {
		MeritReport
	}
};
</script>
