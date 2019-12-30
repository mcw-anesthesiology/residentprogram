<template>
	<div class="user-with-report-list-item">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-2">
						<h3>{{ full_name }}</h3>
					</div>
					<div class="col-sm-10">

						<merit-report-list-item
							v-for="report of meritReports"
							:key="report.id"
							v-bind="report"
							:full_name="full_name"
							:user="user"
							@change="$emit('change', item.id)" />
					</div>
				</div>

				<alert-list v-model="alerts" />
			</div>
		</div>
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import MeritReportListItem from './ReportListItem.vue';

export default {
	mixins: [
		HasAlerts
	],
	props: {
		full_name: {
			type: String,
			required: true
		},
		meritReports: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	components: {
		MeritReportListItem
	}
};
</script>
