<template>
	<div class="report-by-id">
		<div class="container body-block" v-if="meritReport">
			<merit-report
				v-bind="meritReport"
				:title="title"
				:current-user="currentUser"
				:form_id="meritReport.form.id"
				@close="$emit('close')"
				@reload="$emit('reload')"
				@alert="$emit('alert', arguments[0])" />
		</div>
	</div>
</template>

<script>
import MeritReport from './Report.vue';

import { fetchAllMeritReports } from 'modules/merit-utils.js';

export default {
	props: {
		id: {
			type: [ Number, String ],
			required: true
		},
		meritReports: {
			type: Array,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		currentUser: {
			type: Object,
			required: false
		}
	},

	data() {
		return {
			fetchedReports: null
		};
	},

	computed: {
		reports() {
			return this.meritReports || this.fetchedReports;
		},
		meritReport() {
			let id = Number(this.id);
			if (Number.isNaN(id) || !this.reports)
				return;

			return this.reports.find(report => report.id === id);
		}
	},

	mounted() {
		if (
			!this.meritReports
			|| !Array.isArray(this.meritReports)
			|| this.meritReports.length === 0
		) {
			this.fetchReports();
		}
	},

	methods: {
		fetchReports() {
			fetchAllMeritReports().then(merits => {
				this.fetchedReports = merits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching past merit reports'
				});
			});
		}
	},

	components: {
		MeritReport
	}
};
</script>

<style scoped>
	.report-by-id {
		order: 2;
	}
</style>
