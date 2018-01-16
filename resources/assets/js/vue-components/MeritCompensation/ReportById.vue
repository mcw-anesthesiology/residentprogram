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

import { emitError } from '@/modules/errors.js';
import { fetchAllMeritReports } from '@/modules/merit-utils.js';

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
			required: false
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
				emitError(err, this, 'There was a problem fetching past merit reports');
			});
		}
	},

	components: {
		MeritReport
	}
};
</script>
